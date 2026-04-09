import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Coffee, BookOpen, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { thisWeekPlan, testimonials } from '../data/mockData';

const carouselImages = [
  "/images/0a3c1153-323a-4474-98d4-5df5483a7ad2.JPG",
  "/images/32c18e72-fb77-4e6f-aca5-d3b073f85fe1.JPG",
  "/images/IMG_7810.JPG"
];

function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p === 0 ? carouselImages.length - 1 : p - 1));
  const next = () => setCurrent((p) => (p + 1) % carouselImages.length);

  return (
    <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', aspectRatio: '4/3', width: '100%', background: 'var(--color-brand-800)' }}>
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)`, height: '100%', padding: 0 }}>
        {carouselImages.map((src, i) => (
          <div key={i} className="carousel-slide" style={{ padding: 0, height: '100%' }}>
            <img src={src} alt="Cornerstone Class" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      
      {/* Controls */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', pointerEvents: 'none' }}>
        <button onClick={prev} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '1px solid rgba(255,255,255,0.4)', pointerEvents: 'auto', cursor: 'pointer' }}>
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '1px solid rgba(255,255,255,0.4)', pointerEvents: 'auto', cursor: 'pointer' }}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
        {carouselImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === current ? 'var(--color-brand-200)' : 'rgba(255,255,255,0.5)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-bg" style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px' }}>
            <span className="eyebrow anim-1" style={{ display: 'inline-block', marginBottom: '1.25rem', color: 'var(--color-brand-200)', borderBottom: '2px solid var(--color-accent-blue)', paddingBottom: '0.25rem' }}>
              Every Sunday · 9:00 AM
            </span>
            <h1 className="heading-xl anim-2" style={{ color: 'var(--color-white)', marginBottom: '1.5rem' }}>
              Cornerstone Class at <br />
              <span style={{ color: 'var(--color-brand-200)' }}>First Baptist Church</span>.
            </h1>
            <p className="body-large anim-3" style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', marginBottom: '2.5rem', fontSize: '1.125rem' }}>
              Breakfast, worship, and Bible study every Sunday morning with Aneesh Ankem — before joining the main service. All are welcome, exactly as you are.
            </p>
            <div className="anim-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <Link to="/new" className="btn-accent" style={{ padding: '1rem 2rem', fontSize: '1.0625rem' }}>
                Plan Your Visit <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="anim-5" style={{ marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={18} color="white" />
              </div>
              <div>
                <p style={{ color: 'white', fontWeight: 600, fontSize: '0.9375rem' }}>Sibley street, Hammond, Indiana</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>First Baptist Church</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="section bg-surface">
        <div className="page-container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 4rem' }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>Our Purpose</span>
            <h2 className="heading-md" style={{ marginBottom: '1.25rem' }}>A family within the church</h2>
            <p className="body-text">We believe that spiritual growth happens best in community. Our Cornerstone class is a place where you can build deep friendships while studying God's Word.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(213,62,101,0.1)', color: 'var(--color-accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Coffee size={24} />
              </div>
              <h3 className="heading-sm" style={{ marginBottom: '0.75rem' }}>Shared Meals</h3>
              <p className="body-text">Every Sunday starts with a hot breakfast. It's a casual time to catch up, meet new people, and share life together.</p>
            </div>
            <div className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-brand-100)', color: 'var(--color-brand-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <BookOpen size={24} />
              </div>
              <h3 className="heading-sm" style={{ marginBottom: '0.75rem' }}>Bible Study</h3>
              <p className="body-text">We dive into Scripture with practical, encouraging teachings from Aneesh Ankem that apply directly to our everyday lives.</p>
            </div>
            <div className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(68,99,123,0.1)', color: 'var(--color-accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Clock size={24} />
              </div>
              <h3 className="heading-sm" style={{ marginBottom: '0.75rem' }}>Real Community</h3>
              <p className="body-text">Beyond Sunday mornings, we support each other through prayer, service projects, and social gatherings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THIS WEEK ── */}
      <section className="section bg-surface-2">
        <div className="page-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            
            <div style={{ maxWidth: '600px' }}>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>Coming Up This Sunday</span>
              <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>Join us this week</h2>
              <p className="body-large" style={{ marginBottom: '2.5rem' }}>We're gathering to worship, study, and break bread together. Whether it's your first time or you've been here for years, we have a seat saved for you.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--color-white)', border: '1px solid var(--color-border)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.25rem' }}><BookOpen size={16} color="var(--color-brand-600)" /></div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: 'var(--color-ink)' }}>Sermon: {thisWeekPlan.sermon.title}</h4>
                    <p className="body-text" style={{ fontSize: '0.9375rem', marginTop: '0.25rem' }}>{thisWeekPlan.sermon.description}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--color-white)', border: '1px solid var(--color-border)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.25rem' }}><Coffee size={16} color="var(--color-accent-blue)" /></div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: 'var(--color-ink)' }}>Breakfast</h4>
                    <p className="body-text" style={{ fontSize: '0.9375rem', marginTop: '0.25rem' }}>{thisWeekPlan.breakfastMenu.main} with {thisWeekPlan.breakfastMenu.sides.join(', ')}.</p>
                  </div>
                </div>
              </div>
              <Link to="/new" className="btn-primary">Plan Your Visit</Link>
            </div>
            
            {/* Image Carousel */}
            <ImageCarousel />

          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="section bg-brand">
        <div className="page-container" style={{ textAlign: 'center' }}>
          <Quote size={40} color="var(--color-accent-blue)" style={{ margin: '0 auto 2rem', opacity: 0.5 }} />
          <h2 className="heading-md" style={{ color: 'var(--color-white)', maxWidth: '800px', margin: '0 auto 2.5rem', lineHeight: 1.4, fontWeight: 500 }}>
            "The Cornerstone class is more than just a gathering—it's a family. Every week, I witness God at work... there's a place for you here."
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: 'var(--color-white)', fontWeight: 700 }}>Aneesh Ankem</h4>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Sunday School Teacher</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
