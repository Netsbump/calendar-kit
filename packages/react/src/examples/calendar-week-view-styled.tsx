import React from 'react';
import { CalendarWeekView } from '../components/calendar-week-view';
import type { CalendarDay } from '@calendar/core';

export interface CalendarWeekViewStyledProps {
  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

/**
 * Version styled du composant CalendarWeekView
 */
export function CalendarWeekViewStyled({
  className = ''
}: CalendarWeekViewStyledProps) {
  const renderGrid = ({ 
    days, 
    renderDay, 
    onDayClick, 
    withEvents 
  }: {
    days: CalendarDay[];
    renderDay: (props: { 
      day: CalendarDay;
      onDayClick: (day: CalendarDay) => void;
      withEvents: boolean;
    }) => React.ReactNode;
    onDayClick: (day: CalendarDay) => void;
    withEvents: boolean;
  }) => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '4px'
    }}>
      {days.map((day) => renderDay({ day, onDayClick, withEvents }))}
    </div>
  );

  return (
    <CalendarWeekView
      className={`calendar-week-view ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}
      renderWeekday={({ day }) => (
        <div className="weekday" style={{
          textAlign: 'center',
          fontWeight: 600,
          color: '#64748b',
          padding: '8px',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {day}
        </div>
      )}
      renderWeekdays={({ dayNames }) => (
        <div className="weekdays" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          marginBottom: '8px',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '8px'
        }}>
          {dayNames.map((day) => (
            <div key={day}>
              <div className="weekday" style={{
                textAlign: 'center',
                fontWeight: 600,
                color: '#64748b',
                padding: '8px',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {day}
              </div>
            </div>
          ))}
        </div>
      )}
      renderDay={({ day, onDayClick, withEvents }) => (
        <div 
          key={`day-${day.date.toISOString()}`}
          className="calendar-day"
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            padding: '4px',
            minHeight: '100px',
            backgroundColor: day.isCurrentMonth ? 'white' : '#f9fafb',
            opacity: day.isCurrentMonth ? 1 : 0.5,
            cursor: 'pointer'
          }}
          onClick={() => onDayClick(day)}
        >
          <div 
            className="day-number"
            style={{
              fontWeight: day.isToday ? 600 : 400,
              color: day.isToday ? '#3b82f6' : '#111827',
              marginBottom: '4px'
            }}
          >
            {day.dayOfMonth}
          </div>
          {withEvents && day.events && day.events.length > 0 && (
            <div className="events" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}>
              {day.events.map((event) => (
                <div 
                  key={event.id}
                  className="event"
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '2px 4px',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {event.title}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      renderGrid={renderGrid}
    />
  );
} 