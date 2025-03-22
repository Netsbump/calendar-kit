import React from 'react';
import { useCalendarContext } from './calendar-provider';
import type { CalendarEvent, CalendarDay } from '@calendar/core';

export interface CalendarEventsProps {
  /**
   * Classes CSS personnalisées 
   */
  className?: string;
  
  /**
   * Style CSS personnalisé
   */
  style?: React.CSSProperties;
  
  /**
   * Fonction de rendu pour le titre de la section d'événements
   */
  renderTitle?: (date: Date) => React.ReactNode;
  
  /**
   * Fonction de rendu pour un événement individuel
   */
  renderEvent?: (event: CalendarEvent) => React.ReactNode;
  
  /**
   * Fonction de rendu pour la liste d'événements
   */
  renderEventList?: (props: {
    events: CalendarEvent[];
    renderEvent: (event: CalendarEvent) => React.ReactNode;
  }) => React.ReactNode;
  
  /**
   * Fonction appelée lorsqu'un jour est cliqué
   * Cette fonction permet d'ouvrir une modal pour l'ajout d'événement
   */
  onDayClick?: (day: CalendarDay) => void;
}

/**
 * Composant qui affiche les événements pour un jour sélectionné
 * Avec notre nouvelle approche, le formulaire d'ajout est géré par une modal
 */
export function CalendarEvents({
  className = '',
  style,
  renderTitle,
  renderEvent,
  renderEventList,
  onDayClick,
}: CalendarEventsProps) {
  const { selectedDate, events, deleteEvent } = useCalendarContext();

  if (!selectedDate) {
    return null;
  }

  const dayEvents = events.filter(
    event => event.start.toDateString() === selectedDate.toDateString()
  );

  const defaultRenderTitle = (date: Date) => (
    <h3>Événements du {date.toLocaleDateString()}</h3>
  );

  const defaultRenderEvent = (event: CalendarEvent) => (
    <div>
      <div>
        <div>{event.title}</div>
        <div>
          {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
        </div>
      </div>
      <button
        onClick={() => deleteEvent(event.id)}
        aria-label="Supprimer l'événement"
      >
        ×
      </button>
    </div>
  );

  const defaultRenderEventList = ({ events, renderEvent }: {
    events: CalendarEvent[];
    renderEvent: (event: CalendarEvent) => React.ReactNode;
  }) => (
    <div>
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id}>
            {renderEvent(event)}
          </div>
        ))
      ) : (
        <div>Aucun événement</div>
      )}
    </div>
  );

  return (
    <div className={className} style={style}>
      {renderTitle ? renderTitle(selectedDate) : defaultRenderTitle(selectedDate)}

      {renderEventList ? renderEventList({
        events: dayEvents,
        renderEvent: renderEvent || defaultRenderEvent,
      }) : defaultRenderEventList({
        events: dayEvents,
        renderEvent: renderEvent || defaultRenderEvent,
      })}
    </div>
  );
} 