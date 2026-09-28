import { needs, useSignups, useSignupWeek } from '../hooks/useSignups';
import { notificationsEnabled } from '../lib/notifications';

export default function SignupSummary() {
  const week = useSignupWeek();
  return <WeeklySummary key={week} week={week} />;
}

function WeeklySummary({ week }: { week: string }) {
  const { commitments, custom, loading, loadError } = useSignups(week);
  const rows = needs.map(([id, group, title, detail]) => ({ id, group, title, detail, name: commitments[id] }));
  const date = new Date(`${week}T12:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric' });
  return <section className="card">
    <h2 className="heading-md">Sunday, {date} · Sign-ups</h2>
    <p>{Object.keys(commitments).length} of {needs.length} regular spots covered · {custom.length} extra items</p>
    <p className="signup-note">{notificationsEnabled ? 'Notification emails are being sent through EmailJS to the recipient configured in its template.' : 'Email notifications are not connected yet. Add the EmailJS values to .env and restart the website.'}</p>
    {loading && <p role="status">Loading sign-ups…</p>}{loadError && <p role="alert">{loadError}</p>}
    {['Breakfast', 'Helping hands', 'Extra items'].map(group => <section className="signup-group" key={group}><h3 className="heading-sm">{group}</h3>
      <div className="signup-summary-table"><table><thead><tr><th scope="col">Item / job</th><th scope="col">Who</th><th scope="col">Amount / notes</th></tr></thead><tbody>
        {(group === 'Extra items' ? custom : rows.filter(row => row.group === group)).map(row => <tr key={row.id}><th scope="row">{row.title}</th><td>{row.name || 'Still needed'}</td><td>{row.detail || '—'}</td></tr>)}
      </tbody></table></div>{group === 'Extra items' && custom.length === 0 && <p>No extra items yet.</p>}
    </section>)}
    <p>A fresh list starts every Monday (Chicago time). Previous Sundays remain separate, and commitments never carry over.</p>
  </section>;
}
