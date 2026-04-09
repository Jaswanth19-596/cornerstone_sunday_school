import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock, Calendar, BookOpen, Plus, Pencil, Trash2,
  X, LogOut, ArrowLeft, Save, RotateCcw,
} from 'lucide-react';
import { useEvents, useResources } from '../hooks/useData';
import type { Event, Sermon } from '../types';

const ADMIN_PASSWORD = 'grace2024';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

const emptyEvent: Omit<Event, 'id'> = {
  title: '', date: '', time: '', location: '', description: '', type: 'sunday-gathering',
};

function EventForm({ initial, onSave, onCancel }: { initial: Omit<Event, 'id'>; onSave: (e: Omit<Event, 'id'>) => void; onCancel: () => void; }) {
  const [form, setForm] = useState(initial);
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="card" style={{ marginBottom: '1.5rem', border: '2px solid var(--color-forest-500)', boxShadow: 'var(--shadow-md)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0 1.5rem' }}>
        <Field label="Title"><input className="input" value={form.title} onChange={(e) => set('title')(e.target.value)} /></Field>
        <Field label="Date"><input className="input" type="date" value={form.date} onChange={(e) => set('date')(e.target.value)} /></Field>
        <Field label="Time"><input className="input" value={form.time} onChange={(e) => set('time')(e.target.value)} /></Field>
        <Field label="Location"><input className="input" value={form.location} onChange={(e) => set('location')(e.target.value)} /></Field>
        <Field label="Type">
          <select className="input" value={form.type} onChange={(e) => set('type')(e.target.value as Event['type'])}>
            <option value="sunday-gathering">Sunday Gathering</option>
            <option value="social">Social Event</option>
            <option value="service">Service Project</option>
            <option value="special">Special Event</option>
          </select>
        </Field>
      </div>
      <Field label="Description">
        <textarea className="input" rows={3} style={{ resize: 'none' }} value={form.description} onChange={(e) => set('description')(e.target.value)} />
      </Field>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button onClick={onCancel} className="btn-ghost"><X size={16} /> Cancel</button>
        <button onClick={() => { if (form.title && form.date) onSave(form); }} className="btn-primary" style={{ padding: '0.625rem 1.5rem' }}>
          <Save size={16} /> Save Event
        </button>
      </div>
    </div>
  );
}

const emptyResource: Omit<Sermon, 'id'> = {
  title: '', speaker: '', date: '', scripture: '', description: '', scriptureText: '', series: '',
};

function ResourceForm({ initial, onSave, onCancel }: { initial: Omit<Sermon, 'id'>; onSave: (r: Omit<Sermon, 'id'>) => void; onCancel: () => void; }) {
  const [form, setForm] = useState(initial);
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="card" style={{ marginBottom: '1.5rem', border: '2px solid var(--color-forest-500)', boxShadow: 'var(--shadow-md)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0 1.5rem' }}>
        <Field label="Title"><input className="input" value={form.title} onChange={(e) => set('title')(e.target.value)} /></Field>
        <Field label="Speaker"><input className="input" value={form.speaker} onChange={(e) => set('speaker')(e.target.value)} /></Field>
        <Field label="Date"><input className="input" type="date" value={form.date} onChange={(e) => set('date')(e.target.value)} /></Field>
        <Field label="Scripture"><input className="input" value={form.scripture} onChange={(e) => set('scripture')(e.target.value)} /></Field>
        <Field label="Series (optional)"><input className="input" value={form.series ?? ''} onChange={(e) => set('series')(e.target.value)} /></Field>
      </div>
      <Field label="Description">
        <textarea className="input" rows={2} style={{ resize: 'none' }} value={form.description} onChange={(e) => set('description')(e.target.value)} />
      </Field>
      <Field label="Scripture Text (optional)">
        <textarea className="input" rows={2} style={{ resize: 'none' }} value={form.scriptureText ?? ''} onChange={(e) => set('scriptureText')(e.target.value)} />
      </Field>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button onClick={onCancel} className="btn-ghost"><X size={16} /> Cancel</button>
        <button onClick={() => { if (form.title && form.speaker && form.date) onSave(form); }} className="btn-primary" style={{ padding: '0.625rem 1.5rem' }}>
          <Save size={16} /> Save Resource
        </button>
      </div>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed]   = useState(false);
  const [pw, setPw]           = useState('');
  const [pwError, setPwError] = useState(false);
  const [tab, setTab]         = useState<'events' | 'resources'>('events');

  const { events, addEvent, updateEvent, deleteEvent, resetEvents } = useEvents();
  const [editingEventId, setEditingEventId]   = useState<string | null>(null);
  const [addingEvent, setAddingEvent]         = useState(false);

  const { resources, addResource, updateResource, deleteResource, resetResources } = useResources();
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
  const [addingResource, setAddingResource]       = useState(false);

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-brand-950)', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 className="heading-lg" style={{ color: 'white', marginBottom: '0.5rem' }}>Admin Login</h1>
            <p className="body-text" style={{ color: 'rgba(255,255,255,0.6)' }}>Sunday School · Grace Community</p>
          </div>
          <div className="card-dark" style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="label" style={{ color: 'rgba(255,255,255,0.7)' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                <input
                  type="password" className="input" placeholder="Enter password" value={pw}
                  onChange={(e) => { setPw(e.target.value); setPwError(false); }}
                  onKeyDown={(e) => { if (e.key === 'Enter') { if (pw === ADMIN_PASSWORD) setAuthed(true); else setPwError(true); } }}
                  style={{ paddingLeft: '2.75rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
                  autoFocus
                />
              </div>
              {pwError && <p style={{ fontSize: '0.875rem', color: '#EF4444', marginTop: '0.5rem', fontWeight: 600 }}>Incorrect password.</p>}
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { if (pw === ADMIN_PASSWORD) setAuthed(true); else setPwError(true); }}>
              Sign In
            </button>
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <Link to="/" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>← Back to site</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const sortedResources = [...resources].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-2)' }}>
      <div style={{ background: 'var(--color-brand-950)', padding: '0 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
          <div style={{ color: 'white', fontWeight: 700 }}>Admin Panel</div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}><ArrowLeft size={16} /> View Site</Link>
            <button onClick={() => setAuthed(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '0.375rem 0.75rem', color: 'white', cursor: 'pointer' }}><LogOut size={14} /> Sign Out</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          {(['events', 'resources'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '0.75rem 1.5rem', borderRadius: '100px', fontSize: '0.9375rem', fontWeight: 700,
              border: tab === t ? '2px solid var(--color-brand-600)' : '2px solid var(--color-border)',
              background: tab === t ? 'var(--color-brand-600)' : 'white',
              color: tab === t ? 'white' : 'var(--color-ink-muted)', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'capitalize'
            }}>
              {t === 'events' ? '📅 Events' : '📖 Resources'}
            </button>
          ))}
        </div>

        {tab === 'events' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 className="heading-md">Events</h2>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => { if (confirm('Reset to defaults?')) resetEvents(); }} className="btn-outline" style={{ padding: '0.5rem 1rem' }}><RotateCcw size={16} /> Reset</button>
                <button onClick={() => { setAddingEvent(true); setEditingEventId(null); }} className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}><Plus size={16} /> Add Event</button>
              </div>
            </div>

            {addingEvent && <EventForm initial={emptyEvent} onSave={(e) => { addEvent(e); setAddingEvent(false); }} onCancel={() => setAddingEvent(false)} />}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {sortedEvents.map((event) => (
                <div key={event.id}>
                  {editingEventId === event.id ? (
                    <EventForm initial={event} onSave={(updates) => { updateEvent(event.id, updates); setEditingEventId(null); }} onCancel={() => setEditingEventId(null)} />
                  ) : (
                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', padding: '1.5rem' }}>
                      <div style={{ flex: 1, minWidth: '140px' }}>
                        <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-ink)' }}>{event.title}</div>
                        <div className="caption" style={{ marginTop: '0.25rem' }}>{event.date} · {event.time}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
                        <button onClick={() => { setEditingEventId(event.id); setAddingEvent(false); }} className="btn-outline" style={{ padding: '0.5rem 1rem' }}><Pencil size={14} /> Edit</button>
                        <button onClick={() => { if (confirm('Delete?')) deleteEvent(event.id); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '100px', fontWeight: 700, cursor: 'pointer' }}><Trash2 size={14} /> Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'resources' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 className="heading-md">Resources</h2>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => { if (confirm('Reset to defaults?')) resetResources(); }} className="btn-outline" style={{ padding: '0.5rem 1rem' }}><RotateCcw size={16} /> Reset</button>
                <button onClick={() => { setAddingResource(true); setEditingResourceId(null); }} className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}><Plus size={16} /> Add Resource</button>
              </div>
            </div>

            {addingResource && <ResourceForm initial={emptyResource} onSave={(r) => { addResource(r); setAddingResource(false); }} onCancel={() => setAddingResource(false)} />}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {sortedResources.map((sermon) => (
                <div key={sermon.id}>
                  {editingResourceId === sermon.id ? (
                    <ResourceForm initial={sermon} onSave={(updates) => { updateResource(sermon.id, updates); setEditingResourceId(null); }} onCancel={() => setEditingResourceId(null)} />
                  ) : (
                    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', padding: '1.5rem' }}>
                      <div style={{ flex: 1, minWidth: '140px' }}>
                        <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-ink)' }}>{sermon.title}</div>
                        <div className="caption" style={{ marginTop: '0.25rem' }}>{sermon.speaker} · {sermon.date}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
                        <button onClick={() => { setEditingResourceId(sermon.id); setAddingResource(false); }} className="btn-outline" style={{ padding: '0.5rem 1rem' }}><Pencil size={14} /> Edit</button>
                        <button onClick={() => { if (confirm('Delete?')) deleteResource(sermon.id); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '100px', fontWeight: 700, cursor: 'pointer' }}><Trash2 size={14} /> Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
