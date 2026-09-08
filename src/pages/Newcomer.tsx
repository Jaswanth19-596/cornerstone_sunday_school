import { ArrowUpRight } from 'lucide-react';
import { faqs } from '../data/mockData';
import PageHeading from '../components/ui/PageHeading';
const morning = [
 ['9:00 AM','Breakfast & fellowship','Start with breakfast and a conversation. There’s time to settle in and meet the class.'],
 ['9:20 AM','Worship together','We sing together. Join in as you feel comfortable, or simply listen.'],
 ['9:35 AM','Open the Bible','Explore Scripture through a practical lesson. Bring your questions and your curiosity.'],
 ['10:15 AM','On to the main service','We wrap up before the 10:30 AM church service. You’re welcome to come along.'],
];
export default function Newcomer() {
 return <>
  <PageHeading label="YOUR FIRST SUNDAY" title="Come in. You’re welcome here." description="A new place is easier when you know what to expect. Here’s a little introduction to your morning with us."/>
  <section className="page-container visit-layout"><aside className="visit-note"><p className="eyebrow">THE ESSENTIALS</p><h2>We’ll save<br/>you a seat.</h2><dl><dt>When</dt><dd>Sundays · 9:00–10:15 AM</dd><dt>Where</dt><dd>First Baptist Church<br/>Sibley Street, Hammond, Indiana</dd><dt>What to bring</dt><dd>Yourself, and a Bible if you have one.</dd></dl><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=First+Baptist+Church+Sibley+Street+Hammond+Indiana" target="_blank" rel="noreferrer">Find the church <ArrowUpRight size={18}/></a></aside><div className="visit-schedule"><p className="eyebrow">THE RHYTHM OF OUR MORNING</p>{morning.map(([time,title,body]) => <article key={time}><span>{time}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>
  <section className="faq-section page-container"><div><p className="eyebrow">A FEW HELPFUL ANSWERS</p><h2>Before you visit.</h2></div><div>{faqs.map(faq => <details key={faq.id}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>
 </>;
}
