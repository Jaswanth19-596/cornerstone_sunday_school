import { useCallback, useEffect, useState } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db, firebaseEnabled } from '../lib/firebase';
import { events as defaultEvents, pastSermons as defaultResources } from '../data/mockData';
import type { Event, Participant, Sermon } from '../types';

export interface EmailMember { id: string; email: string; }

function useSharedCollection<T extends { id: string }>(name: string, fallback: T[]) {
  const [items, setItems] = useState<T[]>(fallback);
  const [ready, setReady] = useState(!firebaseEnabled);
  const [identity, setIdentity] = useState('');

  useEffect(() => {
    const currentAuth = auth;
    if (!firebaseEnabled || !currentAuth) return;
    return onAuthStateChanged(currentAuth, user => {
      if (user) setIdentity(user.uid);
      else void signInAnonymously(currentAuth).catch(() => setReady(true));
    });
  }, []);

  useEffect(() => {
    if (!firebaseEnabled || !db || !identity) return;
    return onSnapshot(collection(db, name), snapshot => {
      setItems(snapshot.docs.map(item => ({ id: item.id, ...item.data() }) as T));
      setReady(true);
    }, () => setReady(true));
  }, [identity, name]);

  const add = useCallback(async (item: Omit<T, 'id'>) => {
    if (!firebaseEnabled || !db) throw new Error('Connect Firebase before editing shared content.');
    await addDoc(collection(db, name), item);
  }, [name]);

  const update = useCallback(async (id: string, updates: Partial<T>) => {
    const database = db;
    if (!firebaseEnabled || !database) throw new Error('Connect Firebase before editing shared content.');
    const { id: ignored, ...data } = updates;
    void ignored;
    await setDoc(doc(database, name, id), data, { merge: true });
  }, [name]);

  const remove = useCallback(async (id: string) => {
    const database = db;
    if (!firebaseEnabled || !database) throw new Error('Connect Firebase before editing shared content.');
    await deleteDoc(doc(database, name, id));
  }, [name]);

  const restoreDefaults = useCallback(async () => {
    const database = db;
    if (!firebaseEnabled || !database) throw new Error('Connect Firebase before restoring starter content.');
    await Promise.all(fallback.map(({ id, ...item }) => setDoc(doc(database, name, id), item)));
  }, [fallback, name]);

  return { items, add, update, remove, restoreDefaults, ready };
}

export function useEvents() {
  const shared = useSharedCollection<Event>('events', defaultEvents);
  return { events: shared.items, addEvent: shared.add, updateEvent: shared.update, deleteEvent: shared.remove, resetEvents: shared.restoreDefaults, ready: shared.ready };
}

export function useResources() {
  const shared = useSharedCollection<Sermon>('resources', defaultResources);
  return { resources: shared.items, addResource: shared.add, updateResource: shared.update, deleteResource: shared.remove, resetResources: shared.restoreDefaults, ready: shared.ready };
}

export function useEmails() {
  const shared = useSharedCollection<EmailMember>('contacts', []);
  return { emails: shared.items, addEmail: async (email: string) => shared.add({ email: email.trim().toLowerCase() }), deleteEmail: shared.remove, ready: shared.ready };
}

export function useEventParticipants(eventId: string | null) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [identity, setIdentity] = useState('');

  useEffect(() => {
    const currentAuth = auth;
    if (!firebaseEnabled || !currentAuth) return;
    return onAuthStateChanged(currentAuth, user => {
      if (user) setIdentity(user.uid);
      else void signInAnonymously(currentAuth).catch(() => undefined);
    });
  }, []);

  useEffect(() => {
    if (!firebaseEnabled || !db || !identity || !eventId) return;
    return onSnapshot(collection(db, 'eventParticipants', eventId, 'items'), snapshot => {
      setParticipants(snapshot.docs.map(item => item.data() as Participant));
    }, () => setParticipants([]));
  }, [eventId, identity]);

  const addParticipants = useCallback(async (emails: string[]) => {
    const database = db;
    if (!database || !eventId) throw new Error('Choose an event first.');
    const existing = new Set(participants.map(participant => participant.email));
    await Promise.all(emails.filter(email => !existing.has(email)).map(email =>
      addDoc(collection(database, 'eventParticipants', eventId, 'items'), { email, invitedAt: new Date().toISOString() })
    ));
  }, [eventId, participants]);

  return { participants, addParticipants };
}
