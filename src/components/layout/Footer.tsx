import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
export default function Footer() {
 return <footer className="site-footer"><div className="page-container">
   <div className="footer-top"><div><span className="eyebrow">THERE’S A PLACE FOR YOU HERE</span><h2>See you Sunday.</h2></div><Link to="/new" className="footer-invite">Plan your first visit <ArrowUpRight size={24}/></Link></div>
   <div className="footer-middle"><div className="wordmark">Cornerstone<small>FIRST BAPTIST CHURCH</small></div><p>Sunday mornings, 9:00–10:15 AM<br/>Sibley Street · Hammond, Indiana</p><div className="footer-links"><Link to="/events">Gatherings</Link><Link to="/resources">Study notes</Link><Link to="/new">Visiting us</Link></div></div>
   <div className="footer-bottom"><span>© {new Date().getFullYear()} Cornerstone Class</span><span>Faith. Friendship. A shared table.</span><Link to="/admin">Class administration</Link></div>
 </div></footer>;
}
