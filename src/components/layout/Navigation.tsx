import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="page-container header-inner">
      <Link to="/" className="wordmark" onClick={() => setOpen(false)}><span className="brand-symbol" aria-hidden="true">✳</span><span>Cornerstone<small>FIRST BAPTIST CHURCH · HAMMOND, IN</small></span></Link>
      <nav className="desktop-links" aria-label="Main navigation">
        <NavLink to="/" end>Our class</NavLink><NavLink to="/events">Gatherings</NavLink><NavLink to="/resources">Study notes</NavLink><NavLink to="/signups">Lend a hand</NavLink>
      </nav>
      <Link className="visit-link" to="/new">Come this Sunday <ArrowUpRight size={17}/></Link>
      <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-links" aria-label="Mobile navigation">{[['/','Our class'],['/events','Gatherings'],['/resources','Study notes'],['/signups','Lend a hand'],['/new','Come this Sunday']].map(([to,label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}</nav>}
  </header>;
}
