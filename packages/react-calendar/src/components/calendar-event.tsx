import React from 'react';
import { CalendarEvent as CoreCalendarEvent } from '@calendar/calendar-core';
import { useCalendarContext } from './calendar-provider';

export interface CalendarEventProps {
  /**
   * L'événement à afficher
   */
  event: CoreCalendarEvent;
  
  /**
   * Fonction appelée lorsque l'événement est cliqué
   */
  onClick?: (event: CoreCalendarEvent) => void;
  
  /**
   * Fonction appelée pour éditer un événement
   */
  onEdit?: (event: CoreCalendarEvent) => void;
  
  /**
   * Fonction de rendu pour le contenu de l'événement
   */
  renderContent?: (props: {
    event: CoreCalendarEvent;
    deleteEvent: (id: string) => void;
    onEdit?: (event: CoreCalendarEvent) => void;
  }) => React.ReactNode;
  
  /**
   * Indique si l'affichage est compact (pour une cellule de jour)
   * ou détaillé (pour une vue liste)
   */
  variant?: 'compact' | 'detailed';
  
  /**
   * Classes CSS additionnelles
   */
  className?: string;
}

/**
 * Composant headless qui gère un événement individuel dans le calendrier
 */
export function CalendarEvent({
  event,
  onClick,
  onEdit,
  renderContent,
  variant = 'detailed',
  className = ''
}: CalendarEventProps) {
  const { deleteEvent } = useCalendarContext();
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Éviter que le clic se propage à la cellule du jour
    if (onClick) {
      onClick(event);
    }
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Éviter que le clic se propage
    deleteEvent(event.id);
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Éviter que le clic se propage
    if (onEdit) {
      onEdit(event);
    }
  };
  
  // Format des heures pour l'affichage
  const formatTime = (date: Date) => {
    if (event.allDay) {
      return '';
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Rendu par défaut pour le contenu de l'événement
  const defaultRenderContent = ({ 
    event, 
    deleteEvent,
    onEdit 
  }: { 
    event: CoreCalendarEvent;
    deleteEvent: (id: string) => void;
    onEdit?: (event: CoreCalendarEvent) => void;
  }) => {
    if (variant === 'compact') {
      return (
        <div>
          <div>{event.title}</div>
          {!event.allDay && <div>{formatTime(event.start)}</div>}
        </div>
      );
    }
    
    return (
      <div>
        <div>
          <div>{event.title}</div>
          <div>
            {event.allDay ? 'Toute la journée' : 
              `${formatTime(event.start)} - ${formatTime(event.end)}`
            }
          </div>
        </div>
        <div>
          {onEdit && (
            <button
              onClick={handleEdit}
              aria-label="Modifier l'événement"
            >
              ✎
            </button>
          )}
          <button
            onClick={handleDelete}
            aria-label="Supprimer l'événement"
          >
            ×
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div 
      className={className} 
      onClick={handleClick}
      style={{ 
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      {renderContent ? 
        renderContent({ event, deleteEvent, onEdit }) : 
        defaultRenderContent({ event, deleteEvent, onEdit })
      }
    </div>
  );
} 