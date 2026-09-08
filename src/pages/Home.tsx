import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function Home() {
 return <>
  <section className="home-hero page-container">
   <div className="hero-intro"><div><p className="eyebrow">SUNDAY SCHOOL · HAMMOND, INDIANA</p><h1>A Sunday morning.<br/>A place to <em>belong.</em></h1></div><div className="hero-aside"><p>Breakfast around the table.<br/>Time in God’s Word.<br/>People to walk alongside.</p><Link to="/new" className="text-link">Get to know Cornerstone <ArrowUpRight size={19}/></Link></div></div>
   <figure className="community-photo"><img src="/images/0a3c1153-323a-4474-98d4-5df5483a7ad2.JPG" alt="The Cornerstone class gathered together at First Baptist Church" fetchPriority="high"/><figcaption><span>A little glimpse of our church family.</span><span>01 / LIFE AT CORNERSTONE</span></figcaption></figure>
   <div className="sunday-strip"><div><span className="small-label">WHEN WE MEET</span><strong>Every Sunday, 9:00 AM</strong></div><div><span className="small-label">WHERE WE GATHER</span><strong>First Baptist Church, Hammond</strong></div><Link to="/new">Your first Sunday <ArrowRight size={20}/></Link></div>
  </section>
  <section className="page-container about-section"><p className="eyebrow">WELCOME TO CORNERSTONE</p><div><h2>Life is better when<br/>we grow <em>together.</em></h2><p>We’re a Sunday School class at First Baptist Church in Hammond, Indiana. Each week, we gather for breakfast, worship, and Bible study with Aneesh Ankem before joining the main service.</p><p>Whether you’ve been here for years or you’re walking through the door for the first time, you’re welcome at our table.</p><Link className="text-link" to="/new">Come as you are <ArrowUpRight size={18}/></Link></div></section>
  <section className="morning-section"><div className="page-container"><div className="section-heading"><div><p className="eyebrow">SLOW DOWN. SETTLE IN.</p><h2>A morning shared.</h2></div><Link className="text-link" to="/new">What to expect <ArrowUpRight size={18}/></Link></div><div className="morning-grid">{[
   ['01','A seat at the table','Breakfast & fellowship','Start with a meal and a conversation. It’s a simple way to get to know the people sitting beside you.'],
   ['02','Room for reflection','Worship & Bible study','Sing together, open the Bible, and explore what God’s Word means for our everyday lives.'],
   ['03','A church family','Keep growing together','Share in prayer and friendship, then head to the main church service together.'],
  ].map(([n,title,tag,description]) => <article key={n}><span className="morning-number">{n}</span><p className="small-label">{tag}</p><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
  <section className="page-container explore-section"><figure><img src="/images/32c18e72-fb77-4e6f-aca5-d3b073f85fe1.JPG" alt="A moment together with the Cornerstone community" loading="lazy"/><figcaption>More than a Sunday morning.</figcaption></figure><div><p className="eyebrow">STAY A LITTLE LONGER</p><h2>There’s more<br/>to share.</h2><Link className="explore-link" to="/events"><div><h3>Gather with us</h3><p>Our calendar and class gatherings.</p></div><ArrowUpRight/></Link><Link className="explore-link" to="/resources"><div><h3>Keep studying</h3><p>Messages, Scripture, and study notes.</p></div><ArrowUpRight/></Link></div></section>
 </>;
}
