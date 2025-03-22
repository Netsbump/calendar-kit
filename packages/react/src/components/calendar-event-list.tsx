import React from 'react';
import { CalendarEvent as CoreCalendarEvent, CalendarDay } from '@calendar/core';
import { CalendarEvent, CalendarEventProps } from './calendar-event';

export interface CalendarEventListProps {
  /**
   * Liste des événements à afficher
   */
  events: CoreCalendarEvent[];
  
  /**
   * Variante d'affichage
   */
  variant?: 'compact' | 'detailed';
  
  /**
   * Classes CSS additionnelles
   */
  className?: string;
  
  /**
   * Fonction appelée lorsqu'un événement est cliqué
   */
  onEventClick?: (event: CoreCalendarEvent) => void;
  
  /**
   * Fonction appelée pour éditer un événement
   */
  onEventEdit?: (event: CoreCalendarEvent) => void;
  
  /**
   * Fonction de rendu pour l'en-tête de la liste
   */
  renderHeader?: (props: {
    eventCount: number;
    date?: Date;
  }) => React.ReactNode;
  
  /**
   * Fonction de rendu pour un événement individuel
   */
  renderEvent?: CalendarEventProps['renderContent'];
  
  /**
   * Fonction de rendu pour le message quand il n'y a pas d'événements
   */
  renderEmptyState?: () => React.ReactNode;
  
  /**
   * Jour associé à cette liste (optionnel)
   */
  day?: CalendarDay;
  
  /**
   * Date associée à cette liste (optionnel)
   */
  date?: Date;
  
  /**
   * Fonction de tri des événements
   */
  sortEvents?: (a: CoreCalendarEvent, b: CoreCalendarEvent) => number;
}

/**
 * Composant headless qui gère l'affichage d'une liste d'événements
 */
export function CalendarEventList({
  events,
  variant = 'detailed',
  className = '',
  onEventClick,
  onEventEdit,
  renderHeader,
  renderEvent,
  renderEmptyState,
  day,
  date,
  sortEvents
}: CalendarEventListProps) {
  // Trier les événements (par défaut par heure de début)
  const sortedEvents = [...events].sort(sortEvents || ((a, b) => {
    // Les événements toute la journée en premier
    if (a.allDay && !b.allDay) return -1;
    if (!a.allDay && b.allDay) return 1;
    
    // Ensuite par heure de début
    return a.start.getTime() - b.start.getTime();
  }));
  
  // Date à utiliser pour l'en-tête
  const headerDate = date || (day ? day.date : undefined);
  
  // Rendu par défaut pour l'en-tête
  const defaultRenderHeader = ({ eventCount, date }: { eventCount: number; date?: Date }) => {
    if (!date) return null;
    
    const formattedDate = date.toLocaleDateString();
    
    return (
      <div>
        <h3>
          {eventCount === 0 
            ? `Aucun événement pour le ${formattedDate}`
            : eventCount === 1
              ? `1 événement pour le ${formattedDate}`
              : `${eventCount} événements pour le ${formattedDate}`
          }
        </h3>
      </div>
    );
  };
  
  // Rendu par défaut pour l'état vide
  const defaultRenderEmptyState = () => (
    <div>
      <p>Aucun événement</p>
    </div>
  );
  
  return (
    <div className={className}>
      {/* En-tête */}
      {renderHeader 
        ? renderHeader({ eventCount: events.length, date: headerDate }) 
        : defaultRenderHeader({ eventCount: events.length, date: headerDate })
      }
      
      {/* Liste d'événements */}
      {sortedEvents.length > 0 ? (
        <div>
          {sortedEvents.map((event) => (
            <CalendarEvent
              key={event.id}
              event={event}
              variant={variant}
              onClick={onEventClick}
              onEdit={onEventEdit}
              renderContent={renderEvent}
            />
          ))}
        </div>
      ) : (
        /* État vide */
        renderEmptyState ? renderEmptyState() : defaultRenderEmptyState()
      )}
    </div>
  );
} 