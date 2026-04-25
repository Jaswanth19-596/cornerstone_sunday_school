import { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, List } from 'lucide-react';
import { useEvents } from '../hooks/useData';
import { Link } from 'react-router-dom';
import Calendar from '../components/events/Calendar';

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

export default function Events() {
  const { events } = useEvents();
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface-2)' }}>
      {/* Hero Section */}
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

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Left Column: List View */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h2 className="heading-md" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <List size={24} className="text-brand-600" /> Upcoming Events
            </h2>
            {sortedEvents.length === 0 ? (
              <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--color-ink-muted)' }}>
                <CalendarIcon size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                <p style={{ fontWeight: 600 }}>No upcoming events scheduled.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {sortedEvents.map(event => {
                  const d = new Date(event.date);
                  const colors = TYPE_COLORS[event.type] ?? TYPE_COLORS['special'];
                  return (
                    <div key={event.id} className="card" style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                        <div style={{ 
                          width: '60px', 
                          height: '60px', 
                          background: 'var(--color-brand-50)', 
                          borderRadius: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          border: '1px solid rgba(104,145,101,0.1)'
                        }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brand-600)', textTransform: 'uppercase' }}>
                            {d.toLocaleString('default', { month: 'short' })}
                          </span>
                          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-brand-900)', lineHeight: 1 }}>
                            {d.getDate()}
                          </span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.5rem' }}>
                            <h3 style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--color-ink)' }}>{event.title}</h3>
                            <span style={{
                              padding: '0.2rem 0.6rem', borderRadius: '100px', background: colors.bg, color: colors.text,
                              fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em'
                            }}>
                              {TYPE_LABELS[event.type] ?? event.type}
                            </span>
                          </div>
                          <p className="body-text" style={{ fontSize: '0.875rem', color: 'var(--color-ink-muted)', marginBottom: '1rem', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {event.description}
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', color: 'var(--color-ink-muted)', fontSize: '0.8125rem', fontWeight: 600 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                              <Clock size={14} className="text-brand-600" /> {event.time}{event.endTime ? ` - ${event.endTime}` : ''}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                              <MapPin size={14} className="text-brand-600" /> {event.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Calendar View */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             <h2 className="heading-md" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <CalendarIcon size={24} className="text-brand-600" /> Monthly Schedule
            </h2>
            <div style={{ position: 'sticky', top: '2rem' }}>
              <Calendar events={events} />
              
              <div style={{ marginTop: '2.5rem', background: 'var(--color-brand-950)', borderRadius: '24px', padding: '2.5rem 2rem', textAlign: 'center', color: 'white' }}>
                <h3 className="heading-sm" style={{ color: 'white', marginBottom: '0.75rem' }}>Visit Us this Sunday</h3>
                <p className="body-text" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>Our weekly gathering starts at 9:00 AM. We'd love to meet you!</p>
                <Link to="/new" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Plan Your Visit <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
