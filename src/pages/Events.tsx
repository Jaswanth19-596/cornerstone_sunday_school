import { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useEvents } from '../hooks/useData';
import { Link } from 'react-router-dom';

const TYPE_LABELS: Record<string, string> = {
  'sunday-gathering': 'Sunday Gathering',
  social: 'Social',
  service: 'Service',
  special: 'Special',
};

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  'sunday-gathering': { bg: 'var(--color-surface-2)', text: 'var(--color-ink-soft)' },
  social:   { bg: 'rgba(68,99,123,0.1)',  text: 'var(--color-accent-blue)' },
  service:  { bg: 'var(--color-brand-100)', text: 'var(--color-brand-600)' },
  special:  { bg: 'rgba(213,62,101,0.1)', text: 'var(--color-accent-rose)' },
};

const filters = [
  { value: 'all',              label: 'All' },
  { value: 'sunday-gathering', label: 'Sunday' },
  { value: 'social',           label: 'Social' },
  { value: 'service',          label: 'Service' },
  { value: 'special',          label: 'Special' },
];

export default function Events() {
  const { events } = useEvents();
  const [selected, setSelected] = useState('all');

  const filtered = events
    .filter((e) => selected === 'all' || e.type === selected)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <>
      <section className="hero-bg" style={{ padding: '6rem 0 5rem' }}>
        <div className="page-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="eyebrow anim-1" style={{ display: 'inline-block', marginBottom: '1.25rem', color: 'var(--color-brand-200)', borderBottom: '2px solid var(--color-accent-blue)', paddingBottom: '0.25rem' }}>
            Stay Connected
          </span>
          <h1 className="heading-lg anim-2" style={{ color: 'var(--color-white)', marginBottom: '1.25rem' }}>
            Events &amp; Gatherings
          </h1>
          <p className="body-large anim-3" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto' }}>
            From weekly Sunday mornings to community service and special celebrations — here's what's coming up.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="page-container">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', padding: '1.5rem 0' }}>
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setSelected(f.value)}
                style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: selected === f.value ? 700 : 600,
                  border: selected === f.value ? '2px solid var(--color-brand-600)' : '2px solid transparent',
                  background: selected === f.value ? 'var(--color-brand-600)' : 'var(--color-surface-2)',
                  color: selected === f.value ? 'white' : 'var(--color-ink-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="page-container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--color-ink-faint)' }}>
              <Calendar size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-ink-muted)' }}>No events found</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
              {filtered.map((event) => {
                const d = new Date(event.date);
                const colors = TYPE_COLORS[event.type] ?? TYPE_COLORS['special'];
                return (
                  <div key={event.id} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    
                    <div style={{
                      flexShrink: 0, width: '4.5rem', padding: '0.75rem 0', textAlign: 'center',
                      background: 'var(--color-brand-50)', borderRadius: '12px', border: '1px solid rgba(104,145,101,0.1)'
                    }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-brand-600)', marginBottom: '0.25rem' }}>
                        {d.toLocaleString('default', { month: 'short' })}
                      </div>
                      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-brand-900)', lineHeight: 1 }}>
                        {d.getDate()}
                      </div>
                    </div>

                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <h3 className="heading-sm" style={{ margin: 0 }}>{event.title}</h3>
                        <span style={{
                          padding: '0.25rem 0.75rem', borderRadius: '100px', background: colors.bg, color: colors.text,
                          fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                        }}>
                          {TYPE_LABELS[event.type] ?? event.type}
                        </span>
                      </div>
                      
                      <p className="body-text" style={{ marginBottom: '1rem' }}>{event.description}</p>
                      
                      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-ink-muted)' }}>
                          <Clock size={14} /> {event.time}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-ink-muted)' }}>
                          <MapPin size={14} /> {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ marginTop: '4rem', background: 'var(--color-surface-2)', border: '1px solid rgba(26,28,26,0.1)', borderRadius: '24px', padding: '3rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '4rem auto 0' }}>
            <h3 className="heading-sm" style={{ marginBottom: '0.75rem' }}>Every Sunday at 9:00 AM</h3>
            <p className="body-text" style={{ marginBottom: '1.5rem' }}>Our door is always open. You're always welcome.</p>
            <Link to="/new" className="btn-primary">
              Plan My First Visit <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
