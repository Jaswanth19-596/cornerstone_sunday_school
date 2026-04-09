import { useState } from 'react';
import { Heart, Coffee, Music, BookOpen, Users, MapPin, Shirt, Utensils, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { faqs } from '../data/mockData';

const timeline = [
  { icon: Coffee,   time: '9:00 AM', title: 'Breakfast & Fellowship',  description: 'Arrive hungry! We share a hot breakfast together — eggs, bagels, coffee and more. A relaxed time to chat.' },
  { icon: Music,    time: '9:20 AM', title: 'Worship Together',        description: 'We sing 3–4 songs together. Words are on the screen — just join in however you\'re comfortable!' },
  { icon: BookOpen, time: '9:35 AM', title: 'Bible Teaching',          description: 'A practical, encouraging message from Scripture. Feel free to take notes — or just listen.' },
  { icon: Users,    time: '10:15',   title: 'Head to Main Service',    description: 'We wrap up and walk over to the sanctuary for the 10:30 AM service. You\'re welcome to join us.' },
];

const quickFacts = [
  { icon: MapPin,   title: 'Where do I go?',     body: 'Fellowship Hall, Room 201. Enter the main church entrance and follow the signs — or just ask anyone!' },
  { icon: Shirt,    title: 'What should I wear?', body: 'Come as you are. Jeans, casual, dressed up — all welcome. We care more about you than what you wear.' },
  { icon: Utensils, title: 'Is breakfast free?',  body: 'Yes! Breakfast is our gift to you. Just come hungry and enjoy.' },
];

export default function Newcomer() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <>
      <section className="hero-bg" style={{ padding: '6rem 0 5rem' }}>
        <div className="page-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="anim-1" style={{
            width: '4rem', height: '4rem', background: 'var(--color-surface-2)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem', border: '1px solid rgba(26,28,26,0.1)'
          }}>
            <Heart size={24} color="var(--color-accent-rose)" />
          </div>
          <h1 className="heading-lg anim-2" style={{ color: 'var(--color-white)', marginBottom: '1.25rem' }}>
            We're So Glad You're Here
          </h1>
          <p className="body-large anim-3" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto' }}>
            Visiting somewhere new can feel a little nerve-wracking. Here's everything you need to walk in confident and leave feeling at home.
          </p>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>Your First Sunday</span>
            <h2 className="heading-md">What to Expect</h2>
          </div>

          <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {timeline.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.title} style={{ display: 'flex', gap: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '3.5rem', flexShrink: 0 }}>
                    <div style={{
                      width: '3.5rem', height: '3.5rem', borderRadius: '50%',
                      background: 'var(--color-brand-100)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, zIndex: 1,
                    }}>
                      <Icon size={20} color="var(--color-brand-600)" />
                    </div>
                    {i < timeline.length - 1 && (
                      <div style={{ width: '2px', flex: 1, background: 'var(--color-brand-100)', minHeight: '2.5rem' }} />
                    )}
                  </div>

                  <div style={{ flex: 1, paddingBottom: i < timeline.length - 1 ? '2.5rem' : 0, paddingTop: '0.5rem' }}>
                    <span style={{
                      display: 'inline-block', padding: '0.2rem 0.75rem', borderRadius: '100px',
                      background: 'rgba(68,99,123,0.1)', color: 'var(--color-accent-blue)',
                      fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem'
                    }}>
                      {item.time}
                    </span>
                    <h3 className="heading-sm" style={{ marginBottom: '0.375rem' }}>
                      {item.title}
                    </h3>
                    <p className="body-text">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-brand">
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--color-brand-200)' }}>Common Questions</span>
            <h2 className="heading-md" style={{ color: 'white' }}>Quick Answers</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            {quickFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div key={fact.title} className="card-dark" style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '3.5rem', height: '3.5rem', background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}>
                    <Icon size={20} color="var(--color-brand-200)" />
                  </div>
                  <h3 className="heading-sm" style={{ color: 'white', marginBottom: '0.75rem' }}>{fact.title}</h3>
                  <p className="body-text" style={{ color: 'rgba(255,255,255,0.7)' }}>{fact.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>FAQs</span>
            <h2 className="heading-md">More Questions</h2>
          </div>
          <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="card"
                  style={{ padding: '1.5rem', cursor: 'pointer', borderColor: isOpen ? 'var(--color-brand-500)' : 'var(--color-border)' }}
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-ink)' }}>
                      {faq.question}
                    </h3>
                    <span style={{ color: 'var(--color-ink-faint)', flexShrink: 0 }}>
                      {isOpen ? <ChevronUp size={20} color="var(--color-brand-600)" /> : <ChevronDown size={20} />}
                    </span>
                  </div>
                  {isOpen && (
                    <p className="body-text" style={{ marginTop: '1.25rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 6rem', background: 'var(--color-surface)' }}>
        <div className="page-container">
          <div style={{ background: 'var(--color-brand-100)', border: '1px solid var(--color-brand-200)', borderRadius: '24px', padding: '3rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="heading-md" style={{ marginBottom: '1rem', color: 'var(--color-brand-900)' }}>
              Want someone to greet you?
            </h2>
            <p className="body-text" style={{ color: 'var(--color-brand-800)', maxWidth: '500px', margin: '0 auto 2rem' }}>
              Let us know you're coming and we'll have someone at the door to welcome you, show you around, and answer any questions.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:cornerstone@firstbaptist.org" className="btn-primary" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 1.75rem',
                textDecoration: 'none'
              }}>
                Email Us <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
