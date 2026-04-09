import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home',      href: '/' },
  { label: 'Events',    href: '/events' },
  { label: 'Resources', href: '/resources' },
  { label: "I'm New",   href: '/new' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'rgba(17,26,17,0.97)' : 'var(--color-brand-950)',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      transition: 'background 0.3s ease, box-shadow 0.3s ease',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
    }}>
      <div className="page-container">
        <div style={{ height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px', height: '38px',
              background: 'var(--color-brand-600)',
              borderRadius: '11px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L9 16M4 6L14 6M3 11L15 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'white', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                Cornerstone
              </div>
              <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.06em', lineHeight: 1 }}>
                First Baptist Church
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'none', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
            {navItems.map(({ label, href }) => (
              <Link key={href} to={href} className={pathname === href ? 'nav-link-active' : 'nav-link'}>
                {label}
              </Link>
            ))}
          </div>

          {/* CTA + burger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/new" id="nav-cta" className="btn-primary" style={{ padding: '0.5625rem 1.25rem', fontSize: '0.875rem', display: 'none' }}>
              Visit Us
            </Link>
            <button
              onClick={() => setOpen(p => !p)}
              className="mobile-btn"
              aria-label="Menu"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px', padding: '0.5rem',
                color: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div style={{
        overflow: 'hidden',
        maxHeight: open ? '400px' : '0',
        transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
        background: 'var(--color-brand-950)',
        borderTop: open ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}>
        <div className="page-container" style={{ paddingTop: '0.75rem', paddingBottom: '1.25rem' }}>
          {navItems.map(({ label, href }) => (
            <Link key={href} to={href} style={{
              display: 'block', padding: '0.875rem 1rem',
              borderRadius: '12px', marginBottom: '0.25rem',
              fontSize: '1.0625rem', fontWeight: pathname === href ? 700 : 500,
              color: pathname === href ? 'white' : 'rgba(255,255,255,0.6)',
              background: pathname === href ? 'rgba(255,255,255,0.08)' : 'transparent',
              transition: 'all 0.15s',
            }}>
              {label}
            </Link>
          ))}
          <Link to="/new" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}>
            Plan My Visit
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-btn  { display: none !important; }
          #nav-cta     { display: inline-flex !important; }
        }
      `}</style>
    </nav>
  );
}
