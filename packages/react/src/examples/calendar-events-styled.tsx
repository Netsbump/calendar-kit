import React from 'react';
import { CalendarEvents } from '../components/calendar-events';
import { useCalendarContext } from '../components/calendar-provider';
import type { CalendarEvent } from '@calendar/core';

export interface CalendarEventsStyledProps {
  className?: string;
  style?: React.CSSProperties;
}

export function CalendarEventsStyled({ className = '', style }: CalendarEventsStyledProps) {
  const { deleteEvent, i18n } = useCalendarContext();

  const renderTitle = (date: Date) => (
    <h3 style={{
      fontSize: '1.125rem',
      fontWeight: 500,
      marginBottom: '1rem'
    }}>
      {i18n.t('events')} {i18n.formatDate(date, { day: 'numeric', month: 'long' })}
    </h3>
  );

  const renderEventForm = ({ onSubmit, newEventTitle, setNewEventTitle }: {
    onSubmit: (e: React.FormEvent) => void;
    newEventTitle: string;
    setNewEventTitle: (title: string) => void;
  }) => (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      style={{ marginBottom: '1rem' }}
    >
      <div style={{
        display: 'flex',
        gap: '0.5rem'
      }}>
        <input
          type="text"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
          placeholder={i18n.t('newEvent')}
          style={{
            flex: 1,
            padding: '0.5rem 0.75rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#3b82f6';
          }}
        >
          {i18n.t('save')}
        </button>
      </div>
    </form>
  );

  const renderEvent = (event: CalendarEvent) => (
    <div style={{
      padding: '0.5rem',
      backgroundColor: '#eff6ff',
      borderRadius: '0.375rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <div style={{ fontWeight: 500 }}>{event.title}</div>
        <div style={{
          fontSize: '0.875rem',
          color: '#4b5563'
        }}>
          {i18n.formatDate(event.start, { hour: '2-digit', minute: '2-digit' })} - {i18n.formatDate(event.end, { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      <button
        onClick={() => deleteEvent(event.id)}
        style={{
          color: '#ef4444',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          padding: '0.25rem 0.5rem'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.color = '#dc2626';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.color = '#ef4444';
        }}
        aria-label={i18n.t('delete')}
      >
        ×
      </button>
    </div>
  );

  const renderEventList = ({ events, renderEvent }: {
    events: CalendarEvent[];
    renderEvent: (event: CalendarEvent) => React.ReactNode;
  }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id}>
            {renderEvent(event)}
          </div>
        ))
      ) : (
        <div style={{ padding: '0.5rem', textAlign: 'center', color: '#6b7280' }}>
          {i18n.t('noEvents')}
        </div>
      )}
    </div>
  );

  return (
    <CalendarEvents
      className={`calendar-events ${className}`}
      style={{
        padding: '1rem',
        ...style
      }}
      renderTitle={renderTitle}
      renderEventForm={renderEventForm}
      renderEvent={renderEvent}
      renderEventList={renderEventList}
    />
  );
} 