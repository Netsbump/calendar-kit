import React, { useState } from 'react';
import { CalendarEvents } from '../components/calendar-events';
import { useCalendarContext } from '../components/calendar-provider';
import { CalendarEventFormModalStyled } from './calendar-event-form-modal-styled';
import type { CalendarEvent, CalendarDay } from '@calendar/calendar-core';

export interface CalendarEventsStyledProps {
  className?: string;
  style?: React.CSSProperties;
}

export function CalendarEventsStyled({ className = '', style }: CalendarEventsStyledProps) {
  const { deleteEvent, i18n, selectedDate } = useCalendarContext();
  
  // État pour savoir quel jour est sélectionné pour le formulaire modal
  const [selectedDay, setSelectedDay] = useState<CalendarDay | undefined>(undefined);
  
  // État pour contrôler l'ouverture/fermeture de la modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Fonction pour ouvrir la modal d'ajout d'événement
  const openEventModal = (day: CalendarDay) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };
  
  // Fonction pour fermer la modal
  const closeEventModal = () => {
    setIsModalOpen(false);
  };

  const renderTitle = (date: Date) => (
    <h3 style={{
      fontSize: '1.125rem',
      fontWeight: 500,
      marginBottom: '1rem'
    }}>
      {i18n.t('events')} {i18n.formatDate(date, { day: 'numeric', month: 'long' })}
    </h3>
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
    <>
      {/* Affichage de la modal pour l'ajout d'événement */}
      <CalendarEventFormModalStyled
        isOpen={isModalOpen}
        onClose={closeEventModal}
        selectedDay={selectedDay}
      />
      
      <CalendarEvents
        className={`calendar-events ${className}`}
        style={{
          padding: '1rem',
          ...style
        }}
        renderTitle={renderTitle}
        renderEvent={renderEvent}
        renderEventList={renderEventList}
        onDayClick={openEventModal}
      />
    </>
  );
} 