import React from 'react';
import { CalendarEventList, CalendarEventListProps } from '../components/calendar-event-list';
import { CalendarEventStyled } from './calendar-event-styled';
import { CalendarEvent as CoreCalendarEvent } from '@calendar/calendar-core';

// Styles pour la liste d'événements
const styles = `
.event-list-container {
  padding: 16px;
}

.event-list-header {
  margin-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 8px;
}

.event-list-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.event-list-events {
  margin-bottom: 16px;
}

.event-list-empty {
  padding: 16px;
  text-align: center;
  color: #666;
  font-style: italic;
  background-color: #f9f9f9;
  border-radius: 4px;
}
`;

export interface CalendarEventListStyledProps extends CalendarEventListProps {
  // Aucune prop supplémentaire pour le moment
}

/**
 * Version stylisée du composant CalendarEventList
 */
export function CalendarEventListStyled({
  events,
  variant = 'detailed',
  className = '',
  onEventClick,
  onEventEdit,
  day,
  date,
  sortEvents,
  ...otherProps
}: CalendarEventListStyledProps) {
  // Format de la date pour l'affichage
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  return (
    <>
      <style>{styles}</style>
      <CalendarEventList
        events={events}
        variant={variant}
        className={`event-list-container ${className}`}
        onEventClick={onEventClick}
        onEventEdit={onEventEdit}
        day={day}
        date={date}
        sortEvents={sortEvents}
        renderHeader={({ eventCount, date }) => {
          if (!date) return null;
          
          return (
            <div className="event-list-header">
              <h3 className="event-list-title">
                {eventCount === 0 
                  ? `Aucun événement pour le ${formatDate(date)}`
                  : eventCount === 1
                    ? `1 événement pour le ${formatDate(date)}`
                    : `${eventCount} événements pour le ${formatDate(date)}`
                }
              </h3>
            </div>
          );
        }}
        renderEvent={({ event, deleteEvent, onEdit }) => (
          <CalendarEventStyled 
            event={event}
            variant={variant}
            onClick={onEventClick ? () => onEventClick(event) : undefined}
            onEdit={onEdit}
          />
        )}
        renderEmptyState={() => (
          <div className="event-list-empty">
            Aucun événement prévu pour cette période.
          </div>
        )}
        {...otherProps}
      />
    </>
  );
} 