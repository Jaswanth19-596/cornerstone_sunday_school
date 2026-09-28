import { useState } from 'react';
import { Check, Coffee, HeartHandshake } from 'lucide-react';
import PageHeading from '../components/ui/PageHeading';
import { needs, useSignups, useSignupWeek } from '../hooks/useSignups';
import type { CustomItem } from '../hooks/useSignups';

type Commitments = Record<string, string>;
export default function Signups() {
  const week = useSignupWeek();
  return <SignupWeek key={week} week={week} />;
}
function SignupWeek({ week }: { week: string }) {
  const { commitments, custom, save: persist, loading, saving, loadError, owned } = useSignups(week);
  const [customEdit, setCustomEdit] = useState<CustomItem | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [removed, setRemoved] = useState<{ id: string; name: string } | null>(null);
  const date = new Date(`${week}T12:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric' });
  async function save(next: Commitments, announcement: string) {
    try {
      await persist({ commitments: next, custom });
      setError(''); setMessage(announcement);
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Your sign-up could not be saved. Please try again.');
      return false;
    }
  }
  const remaining = needs.length - Object.keys(commitments).length;
  return <>
    <PageHeading label="A LITTLE HELP, A WARM WELCOME" title="Lend a hand this Sunday." description="Bring something for breakfast or help out on the morning. Pick a spot and add your name. Every little bit helps." />
    <section className="page-container signup-page">
      {loading && <p role="status">Loading this Sunday’s sign-ups…</p>}
      {loadError && <p role="alert" className="signup-error">{loadError}</p>}
      <fieldset disabled={loading || saving || Boolean(loadError)} className="signup-fieldset">
      <div className="signup-date"><div><p className="eyebrow">THIS WEEK</p><h2>{date}</h2><p>Breakfast at 9:00 AM · Cornerstone class</p></div><span className="signup-count">{remaining ? `${remaining} spots still need a hand` : 'Every spot is covered!'}</span></div>
      <div className="signup-feedback" role="status">{saving ? 'Saving…' : message}{removed && <button className="signup-text-button" onClick={async () => { if (await save({ ...commitments, [removed.id]: removed.name }, 'Your sign-up has been restored.')) setRemoved(null); }}>Undo cancellation</button>}</div>
      {error && <p role="alert" className="signup-error">{error}</p>}
      {['Breakfast', 'Helping hands'].map(group => <section className="signup-group" key={group} aria-label={group}>
        <div className="signup-group-heading">{group === 'Breakfast' ? <Coffee size={24} /> : <HeartHandshake size={24} />}<div><h2>{group}</h2><p>{group === 'Breakfast' ? 'Bring your item by 9:00 AM. Suggested amounts are below.' : 'A few small jobs that make everyone feel at home.'}</p></div></div>
        {needs.filter(n => n[1] === group).map(([id, , title, detail]) => {
          const claimed = commitments[id];
          return <article className={`signup-row${claimed ? ' is-claimed' : ''}`} key={id}>
            <div className="signup-row-main"><div><h3>{title}</h3><p>{detail}</p>{claimed && <p className="signup-person"><Check size={16} aria-hidden="true" /> {claimed} · Signed up</p>}</div>
              {editing !== id && (!claimed || owned.includes(id)) && <button className={claimed ? 'signup-secondary' : 'signup-primary'} aria-label={`${claimed ? 'Change sign-up for' : 'Sign up for'} ${title}`} onClick={() => { setEditing(id); setName(claimed || owned.map(key => commitments[key]).find(Boolean) || ''); setError(''); }}>{claimed ? 'Change' : group === 'Breakfast' ? 'I’ll bring this' : 'I’ll help'}</button>}
            </div>
            {editing === id && <form className="signup-form" onSubmit={async e => {
              e.preventDefault();
              if (!name.trim()) { setError('Please enter your name.'); return; }
              if (await save({ ...commitments, [id]: name.trim() }, `Thanks, ${name.trim()}! You’re signed up for ${title.toLowerCase()}.`)) { setEditing(null); setRemoved(null); }
            }}>
              <label htmlFor={`name-${id}`}>Your name</label><input id={`name-${id}`} autoFocus autoComplete="name" placeholder="First and last name" maxLength={80} required value={name} onChange={e => setName(e.target.value)} />
              <div className="signup-actions"><button className="signup-primary" type="submit">{claimed ? 'Save changes' : 'Sign me up'}</button><button className="signup-secondary" type="button" onClick={() => { setEditing(null); setError(''); }}>Never mind</button>{claimed && <button type="button" className="signup-text-button" onClick={async () => {
                const next = { ...commitments }; delete next[id];
                if (await save(next, `${title} is available again.`)) { setRemoved({ id, name: claimed }); setEditing(null); }
              }}>Cancel my sign-up</button>}</div>
            </form>}
          </article>;
        })}
      </section>)}
      <section className="signup-group" aria-label="Bring something else">
        <div className="signup-group-heading"><Coffee size={24} /><div><h2>Have something else in mind?</h2><p>Homemade muffins, a favorite dish—there’s room at the table.</p></div></div>
        {custom.map(item => <article className="signup-row" key={item.id}><div className="signup-row-main"><div><h3>{item.title}</h3><p>{item.detail}</p><p className="signup-person"><Check size={16} />{item.name}</p></div>{owned.includes(item.id) && <button className="signup-secondary" onClick={() => setCustomEdit(item)} aria-label={`Change ${item.title}`}>Change</button>}</div></article>)}
        {!customEdit ? <button className="signup-primary" onClick={() => setCustomEdit({ id: crypto.randomUUID(), name: owned.map(key => commitments[key]).find(Boolean) || '', title: '', detail: '' })}>I’ll bring something else</button> : <form className="signup-form" onSubmit={async e => {
          e.preventDefault();
          if (!customEdit.name.trim() || !customEdit.title.trim()) { setError('Please enter your name and what you’ll bring.'); return; }
          const item = { ...customEdit, name: customEdit.name.trim(), title: customEdit.title.trim(), detail: customEdit.detail.trim() };
          try { await persist({ commitments, custom: [...custom.filter(c => c.id !== item.id), item] }); setMessage(`Thanks, ${item.name}! You’re bringing ${item.title}.`); setError(''); setCustomEdit(null); }
          catch (error) { setError(error instanceof Error ? error.message : 'Your sign-up could not be saved. Please try again.'); }
        }}>
          <label htmlFor="custom-name">Your name</label><input id="custom-name" autoFocus autoComplete="name" required maxLength={80} value={customEdit.name} onChange={e => setCustomEdit({ ...customEdit, name: e.target.value })} />
          <label htmlFor="custom-title">What will you bring?</label><input id="custom-title" placeholder="e.g. Homemade muffins" required maxLength={100} value={customEdit.title} onChange={e => setCustomEdit({ ...customEdit, title: e.target.value })} />
          <label htmlFor="custom-detail">Amount or a note (optional)</label><input id="custom-detail" placeholder="e.g. 2 dozen, nut-free" maxLength={200} value={customEdit.detail} onChange={e => setCustomEdit({ ...customEdit, detail: e.target.value })} />
          <div className="signup-actions"><button className="signup-primary" type="submit">{custom.some(c => c.id === customEdit.id) ? 'Save changes' : 'Sign me up'}</button><button className="signup-secondary" type="button" onClick={() => setCustomEdit(null)}>Never mind</button>{custom.some(c => c.id === customEdit.id) && <button className="signup-text-button" type="button" onClick={async () => { try { await persist({ commitments, custom: custom.filter(c => c.id !== customEdit.id) }); setMessage('Your custom item has been canceled.'); setCustomEdit(null); } catch (error) { setError(error instanceof Error ? error.message : 'Could not cancel. Please try again.'); } }}>Cancel my sign-up</button>}</div>
        </form>}
      </section>
      <p className="signup-note">Each sign-up is for this Sunday only. A fresh list opens every Monday; nobody is signed up automatically.</p>
      <p className="signup-note">Plans change. Come back on this device and choose “Change” to update or cancel your sign-up.</p>
      </fieldset>
    </section>
  </>;
}
