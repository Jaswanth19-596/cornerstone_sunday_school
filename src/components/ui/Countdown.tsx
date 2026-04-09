import { useState, useEffect } from 'react';
import { getCountdownToSunday } from '../../utils/helpers';
import { Sun } from 'lucide-react';

export default function Countdown() {
  const [countdown, setCountdown] = useState(getCountdownToSunday());
  const isGathering = countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0;

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdownToSunday()), 30000);
    return () => clearInterval(timer);
  }, []);

  if (isGathering) {
    return (
      <div style={{
        background: 'var(--color-slate-800)',
        borderRadius: '20px',
        padding: '2rem',
        textAlign: 'center',
        boxShadow: 'var(--shadow-blue)',
      }}>
        <Sun size={28} style={{ color: 'var(--color-coral-400)', marginBottom: '0.75rem' }} />
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-ivory)', marginBottom: '0.375rem' }}>
          We're gathering now!
        </p>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.9375rem', color: 'rgba(254,252,249,0.55)' }}>
          Fellowship Hall · Room 201
        </p>
      </div>
    );
  }

  const units = [
    { value: countdown.days,    label: 'Days' },
    { value: countdown.hours,   label: 'Hrs' },
    { value: countdown.minutes, label: 'Min' },
  ];

  return (
    <div style={{
      background: 'var(--color-white)',
      border: '1px solid rgba(15,30,53,0.07)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: 'var(--shadow-card)',
    }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <span className="eyebrow" style={{ display: 'block', marginBottom: '0.375rem' }}>
          Next Sunday
        </span>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--color-ink)',
        }}>
          9:00 AM · Fellowship Hall
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'stretch' }}>
        {units.map(({ value, label }, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, var(--color-slate-800) 0%, var(--color-slate-700) 100%)',
                borderRadius: '14px',
                padding: '1rem 0.5rem 0.75rem',
                marginBottom: '0.5rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 600,
                  color: 'var(--color-ivory)',
                  lineHeight: 1,
                  display: 'block',
                }}>
                  {String(value).padStart(2, '0')}
                </span>
              </div>
              <span style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-faint)',
              }}>
                {label}
              </span>
            </div>
            {i < units.length - 1 && (
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                color: 'var(--color-coral-500)',
                opacity: 0.5,
                paddingBottom: '1.5rem',
                flexShrink: 0,
              }}>
                :
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '1.5rem',
        paddingTop: '1.25rem',
        borderTop: '1px solid rgba(15,30,53,0.06)',
        fontFamily: 'var(--font-display)',
        fontSize: '0.9375rem',
        fontStyle: 'italic',
        color: 'var(--color-ink-muted)',
        textAlign: 'center',
      }}>
        "For where two or three gather in my name…"
      </div>
    </div>
  );
}
