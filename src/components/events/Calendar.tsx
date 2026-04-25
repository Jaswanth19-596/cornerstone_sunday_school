import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Send, Pencil, Trash2 } from 'lucide-react';
import type { Event } from '../../types';

interface CalendarProps {
  events: Event[];
  isAdmin?: boolean;
  onDateClick?: (date: string) => void;
  onEditEvent?: (id: string) => void;
  onDeleteEvent?: (id: string) => void;
  onInviteEvent?: (event: Event) => void;
}

export default function Calendar({ 
  events, 
  isAdmin = false, 
  onDateClick, 
  onEditEvent, 
  onDeleteEvent, 
  onInviteEvent 
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = [];
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  // Previous month padding
  const prevMonthDays = daysInMonth(year, month - 1);
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, currentMonth: false, monthOffset: -1 });
  }

  // Current month
  for (let i = 1; i <= totalDays; i++) {
    days.push({ day: i, currentMonth: true, monthOffset: 0 });
  }

  // Next month padding
  const remaining = 42 - days.length; // 6 weeks
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, currentMonth: false, monthOffset: 1 });
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  const getEventsForDate = (d: number, mOffset: number) => {
    const targetDate = new Date(year, month + mOffset, d);
    const dateStr = targetDate.toISOString().split('T')[0];
    return events.filter(e => e.date === dateStr);
  };

  const TYPE_COLORS: Record<string, string> = {
    'sunday-gathering': 'var(--color-brand-600)',
    social: 'var(--color-accent-blue)',
    service: 'var(--color-brand-500)',
    special: 'var(--color-accent-rose)',
  };

  return (
    <div className="card" style={{ padding: '1.5rem', background: 'var(--color-white)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 className="heading-sm" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <CalendarIcon size={20} className="text-brand-600" />
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={goToToday} className="btn-ghost" style={{ fontSize: '0.875rem', padding: '0.25rem 0.75rem' }}>Today</button>
          <div style={{ display: 'flex', background: 'var(--color-surface-2)', borderRadius: '10px', padding: '0.25rem' }}>
            <button onClick={prevMonth} className="btn-ghost" style={{ padding: '0.25rem' }}><ChevronLeft size={20} /></button>
            <button onClick={nextMonth} className="btn-ghost" style={{ padding: '0.25rem' }}><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div style={{ overflowX: 'auto', margin: '0 -0.5rem', padding: '0 0.5rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          gap: '1px', 
          background: 'var(--color-border)', 
          border: '1px solid var(--color-border)', 
          borderRadius: '12px', 
          overflow: 'hidden',
          minWidth: '600px' // Ensure days don't get too squeezed
        }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} style={{ padding: '0.75rem', textAlign: 'center', background: 'var(--color-surface-2)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-ink-muted)', letterSpacing: '0.05em' }}>
            {d}
          </div>
        ))}
        {days.map((d, i) => {
          const dayEvents = getEventsForDate(d.day, d.monthOffset);
          const isToday = d.currentMonth && d.day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
          const targetDate = new Date(year, month + d.monthOffset, d.day).toISOString().split('T')[0];

          return (
            <div 
              key={i} 
              style={{ 
                minHeight: '120px', 
                background: d.currentMonth ? 'var(--color-white)' : 'var(--color-surface)',
                padding: '0.5rem',
                position: 'relative'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '0.5rem' 
              }}>
                <span style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: isToday ? 800 : 600,
                  color: isToday ? 'var(--color-brand-600)' : d.currentMonth ? 'var(--color-ink)' : 'var(--color-ink-faint)',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: isToday ? 'var(--color-brand-100)' : 'transparent'
                }}>
                  {d.day}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {dayEvents.map(event => (
                  <div 
                    key={event.id}
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.5rem',
                      borderRadius: '6px',
                      background: TYPE_COLORS[event.type] || 'var(--color-brand-600)',
                      color: 'white',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'default'
                    }}
                    title={`${event.title} - ${event.time}${event.endTime ? ` - ${event.endTime}` : ''}`}
                  >
                    <span>{event.time}{event.endTime ? ` - ${event.endTime}` : ''}</span>
                    <span style={{ fontWeight: 800 }}>{event.title}</span>
                    
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Legend */}
      <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', padding: '1rem', background: 'var(--color-surface)', borderRadius: '12px' }}>
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-ink-muted)', textTransform: 'capitalize' }}>
              {type.replace('-', ' ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
