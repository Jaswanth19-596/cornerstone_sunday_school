import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail } from 'lucide-react';

const links = [
  { label: 'Home',      href: '/' },
  { label: 'Events',    href: '/events' },
  { label: 'Resources', href: '/resources' },
  { label: "I'm New",   href: '/new' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-brand-950)', color: 'white' }}>
      <div style={{ height: '4px', background: 'var(--color-brand-500)' }} />

      <div className="page-container" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '32px', height: '32px', background: 'var(--color-brand-800)', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L9 16M4 6L14 6M3 11L15 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.0625rem', lineHeight: 1.1 }}>Cornerstone</div>
                <div style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>First Baptist Church</div>
              </div>
            </div>
            <p className="body-text" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem' }}>
              Growing together in faith, fellowship, and love. Every Sunday at 9:00 AM. A family within the church.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-brand-200)', marginBottom: '1.5rem' }}>Navigate</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {links.map((l) => (
                <Link key={l.href} to={l.href} style={{ fontWeight: 600, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = 'white'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)'}
                >{l.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-brand-200)', marginBottom: '1.5rem' }}>Find Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={16} color="var(--color-brand-500)" style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem', lineHeight: 1.5 }}>Sibley street<br />Hammond, Indiana</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={16} color="var(--color-brand-500)" style={{ flexShrink: 0 }} />
                <a href="tel:+15551234567" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem', textDecoration: 'none' }}>(555) 123-4567</a>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail size={16} color="var(--color-brand-500)" style={{ flexShrink: 0 }} />
                <a href="mailto:cornerstone@firstbaptist.org" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem', textDecoration: 'none' }}>cornerstone@firstbaptist.org</a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
            &copy; {new Date().getFullYear()} First Baptist Church · All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              Made with <Heart size={14} color="var(--color-accent-rose)" /> for our community
            </p>
            <Link to="/admin" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.2)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
