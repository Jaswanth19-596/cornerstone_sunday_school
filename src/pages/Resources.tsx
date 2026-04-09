import { useState } from 'react';
import { BookOpen, Search, Calendar, User, ChevronDown, ChevronUp } from 'lucide-react';
import { useResources } from '../hooks/useData';
import { formatDate } from '../utils/helpers';

export default function Resources() {
  const { resources } = useResources();
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = resources.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.speaker.toLowerCase().includes(query.toLowerCase()) ||
    r.scripture.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <section className="hero-bg" style={{ padding: '6rem 0 5rem' }}>
        <div className="page-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="eyebrow anim-1" style={{ display: 'inline-block', marginBottom: '1.25rem', color: 'var(--color-brand-200)', borderBottom: '2px solid var(--color-accent-blue)', paddingBottom: '0.25rem' }}>
            Study &amp; Grow
          </span>
          <h1 className="heading-lg anim-2" style={{ color: 'var(--color-white)', marginBottom: '1.25rem' }}>
            Sermons &amp; Resources
          </h1>
          <p className="body-large anim-3" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto' }}>
            Miss a Sunday or want to revisit a message? Browse our archive of sermons and study materials.
          </p>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="page-container" style={{ maxWidth: '800px' }}>
          <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
            <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-ink-faint)', pointerEvents: 'none' }} />
            <input
              className="input"
              type="text"
              placeholder="Search sermons, topics, scripture…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ paddingLeft: '3rem', fontSize: '1.0625rem' }}
            />
          </div>

          <p className="caption" style={{ marginBottom: '1.5rem', fontWeight: 600 }}>
            {filtered.length} sermon{filtered.length !== 1 ? 's' : ''} available
          </p>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--color-ink-faint)' }}>
              <BookOpen size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
              <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-ink-muted)' }}>No results</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {filtered.map((sermon) => {
                const isOpen = expanded === sermon.id;
                return (
                  <div
                    key={sermon.id}
                    className="card"
                    style={{ padding: '1.75rem', cursor: 'pointer', borderColor: isOpen ? 'var(--color-brand-500)' : 'var(--color-border)', boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-xs)' }}
                    onClick={() => setExpanded(isOpen ? null : sermon.id)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                      <div style={{ flex: 1 }}>
                        {sermon.series && (
                          <span style={{
                            display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '100px',
                            background: 'var(--color-surface-2)', color: 'var(--color-ink-soft)',
                            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                            marginBottom: '0.75rem',
                          }}>
                            {sermon.series}
                          </span>
                        )}
                        <h3 className="heading-sm" style={{ marginBottom: '0.375rem' }}>
                          {sermon.title}
                        </h3>
                        <p style={{ fontWeight: 700, color: 'var(--color-brand-600)', marginBottom: '0.75rem' }}>
                          {sermon.scripture}
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-ink-muted)' }}>
                            <User size={14} /> {sermon.speaker}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-ink-muted)' }}>
                            <Calendar size={14} /> {formatDate(sermon.date)}
                          </span>
                        </div>
                      </div>
                      <div style={{ color: 'var(--color-ink-faint)', flexShrink: 0, background: 'var(--color-surface-2)', borderRadius: '50%', padding: '0.5rem' }}>
                        {isOpen ? <ChevronUp size={20} color="var(--color-brand-600)" /> : <ChevronDown size={20} />}
                      </div>
                    </div>

                    {isOpen && (
                      <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                        <p className="body-text" style={{ marginBottom: '1.5rem' }}>
                          {sermon.description}
                        </p>
                        {sermon.scriptureText && (
                          <div style={{
                            background: 'var(--color-brand-50)', borderRadius: '16px', padding: '1.5rem',
                            borderLeft: '4px solid var(--color-brand-600)'
                          }}>
                            <p style={{ fontSize: '1.0625rem', fontStyle: 'italic', color: 'var(--color-brand-900)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                              &ldquo;{sermon.scriptureText}&rdquo;
                            </p>
                            <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-brand-600)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                              {sermon.scripture}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
