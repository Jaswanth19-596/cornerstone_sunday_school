import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously, type User } from 'firebase/auth';
import { collection, doc, onSnapshot, writeBatch } from 'firebase/firestore';
import { auth, db, firebaseEnabled } from '../lib/firebase';
import { sendSignupNotification } from '../lib/notifications';
import { changedSignupIds, type StoredItem } from '../lib/signupChanges';

export const needs = [
  ['coffee', 'Breakfast', 'Coffee', '2 pots'], ['juice', 'Breakfast', 'Orange juice', '1 gallon'],
  ['bagels', 'Breakfast', 'Bagels & cream cheese', '2 dozen bagels'], ['fruit', 'Breakfast', 'Fresh fruit', '1 large platter'],
  ['pastries', 'Breakfast', 'Pastries', '1 dozen'], ['supplies', 'Breakfast', 'Plates, cups & napkins', 'Enough for 30 people'],
  ['setup', 'Helping hands', 'Set up breakfast', 'Arrive at 8:40 AM'], ['welcome', 'Helping hands', 'Welcome visitors', 'Be ready at 8:50 AM'],
  ['cleanup', 'Helping hands', 'Help clean up', 'After breakfast'],
] as const;

export interface CustomItem { id: string; name: string; title: string; detail: string }
export interface SignupData { commitments: Record<string, string>; custom: CustomItem[] }
interface ViewData extends SignupData { owned: string[]; items: Record<string, StoredItem> }

const empty = (): ViewData => ({ commitments: {}, custom: [], owned: [], items: {} });

export function sundayKey(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const part = (type: string) => parts.find(p => p.type === type)!.value;
  const date = new Date(`${part('year')}-${part('month')}-${part('day')}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + (7 - date.getUTCDay()) % 7);
  return date.toISOString().slice(0, 10);
}

export function useSignupWeek() {
  const [week, setWeek] = useState(() => sundayKey());
  useEffect(() => {
    const update = () => setWeek(sundayKey());
    const interval = window.setInterval(update, 30000);
    window.addEventListener('focus', update);
    return () => { clearInterval(interval); window.removeEventListener('focus', update); };
  }, []);
  return week;
}

function asView(raw: Record<string, StoredItem>, uid: string): ViewData {
  const result = empty();
  result.items = raw;
  for (const [id, item] of Object.entries(raw)) {
    if (item.kind === 'standard') result.commitments[id] = item.name;
    else result.custom.push({ id, name: item.name, title: item.title, detail: item.detail });
    if (item.ownerUid === uid) result.owned.push(id);
  }
  return result;
}

export function useSignups(week: string) {
  const [data, setData] = useState<ViewData>(empty);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const currentAuth = auth;
    const database = db;
    if (!firebaseEnabled || !currentAuth || !database) {
      setLoadError('Sign-ups will be available once Firebase is connected.');
      setLoading(false);
      return;
    }
    let stopItems: (() => void) | undefined;
    const stopAuth = onAuthStateChanged(currentAuth, currentUser => {
      setUser(currentUser);
      stopItems?.();
      if (!currentUser) {
        void signInAnonymously(currentAuth).catch(() => { setLoadError('Could not start sign-ups. Please refresh and try again.'); setLoading(false); });
        return;
      }
      stopItems = onSnapshot(collection(database, 'weeklySignups', week, 'items'), snapshot => {
        const raw = Object.fromEntries(snapshot.docs.map(item => [item.id, item.data() as StoredItem]));
        setData(asView(raw, currentUser.uid)); setLoadError(''); setLoading(false);
      }, () => { setLoadError('Could not load sign-ups. Please refresh and try again.'); setLoading(false); });
    });
    return () => { stopAuth(); stopItems?.(); };
  }, [week]);

  async function save(next: SignupData) {
    if (!db || !user) throw new Error('Sign-ups are still loading. Please try again.');
    if (week !== sundayKey()) throw new Error('A new week has started. Please refresh before signing up.');
    setSaving(true);
    try {
      const desired: Record<string, StoredItem> = {};
      for (const [id, name] of Object.entries(next.commitments)) {
        const need = needs.find(([needId]) => needId === id);
        if (!need) throw new Error('That sign-up item is not available.');
        desired[id] = { name, title: need[2], detail: need[3], kind: 'standard', ownerUid: data.items[id]?.ownerUid || user.uid };
      }
      for (const item of next.custom) desired[item.id] = { name: item.name, title: item.title, detail: item.detail, kind: 'custom', ownerUid: data.items[item.id]?.ownerUid || user.uid };

      const changes: string[] = [];
      const batch = writeBatch(db);
      for (const id of changedSignupIds(data.items, desired)) {
        const before = data.items[id], after = desired[id];
        const reference = doc(db, 'weeklySignups', week, 'items', id);
        if (!after) { batch.delete(reference); changes.push(`${before.name} canceled ${before.title}.`); }
        else { batch.set(reference, after); changes.push(`${after.name} ${before ? 'updated' : 'signed up for'} ${after.title}${after.detail ? ` (${after.detail})` : ''}.`); }
      }
      if (!changes.length) return;
      await batch.commit();
      const view = asView(desired, user.uid);
      setData(view);
      const summary = [...Object.entries(view.commitments).map(([id, name]) =>
        `${name}: ${needs.find(([needId]) => needId === id)?.[2] || id}`
      ), ...view.custom.map(item => `${item.name}: ${item.title}${item.detail ? ` — ${item.detail}` : ''}`)].join('\n');
      void sendSignupNotification({ week, change: changes.join('\n'), summary }).catch(() => undefined);
    } finally { setSaving(false); }
  }

  return { commitments: data.commitments, custom: data.custom, owned: data.owned, save, loading, saving, loadError };
}
