import React from 'react';
import { CalendarEvent, CalendarEventProps } from '../components/calendar-event';
import { CalendarEvent as CoreCalendarEvent } from '@calendar/core';

// Styles pour les événements
const styles = `
.event-container {
  margin-bottom: 8px;
  border-radius: 4px;
  overflow: hidden;
  transition: background-color 0.15s;
}

.event-container:hover {
  background-color: #f5f5f5;
}

.event-compact {
  padding: 2px 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  border-left: 3px solid #1a73e8;
  background-color: #e8f0fe;
  color: #174ea6;
  border-radius: 2px;
  margin-bottom: 2px;
  cursor: pointer;
}

.event-detailed {
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-left: 4px solid #1a73e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.event-time {
  color: #666;
  font-size: 12px;
}

.event-actions {
  display: flex;
  gap: 8px;
}

.event-action-button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.event-action-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #333;
}

/* Couleurs différentes pour les événements */
.event-blue {
  border-left-color: #1a73e8;
}
.event-blue.event-compact {
  background-color: #e8f0fe;
  color: #174ea6;
}

.event-green {
  border-left-color: #0f9d58;
}
.event-green.event-compact {
  background-color: #e6f4ea;
  color: #137333;
}

.event-red {
  border-left-color: #ea4335;
}
.event-red.event-compact {
  background-color: #fce8e6;
  color: #b31412;
}

.event-orange {
  border-left-color: #f09300;
}
.event-orange.event-compact {
  background-color: #fef7e0;
  color: #b06000;
}

.event-purple {
  border-left-color: #a142f4;
}
.event-purple.event-compact {
  background-color: #f3e8fd;
  color: #681da8;
}
`;

// Fonction pour générer une couleur déterministe basée sur l'ID
function getEventColor(eventId: string): 'blue' | 'green' | 'red' | 'orange' | 'purple' {
  const colors = ['blue', 'green', 'red', 'orange', 'purple'] as const;
  const hash = eventId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export interface CalendarEventStyledProps extends CalendarEventProps {
  // Aucune prop supplémentaire pour le moment
}

/**
 * Version stylisée du composant CalendarEvent
 */
export function CalendarEventStyled({
  event,
  variant = 'detailed',
  onClick,
  onEdit,
  className = '',
  ...otherProps
}: CalendarEventStyledProps) {
  // Déterminer la couleur de l'événement (peut être déterministe basé sur l'ID)
  const color = getEventColor(event.id);
  
  // Format des heures pour l'affichage
  const formatTime = (date: Date) => {
    if (event.allDay) {
      return '';
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <>
      <style>{styles}</style>
      <CalendarEvent
        event={event}
        variant={variant}
        onClick={onClick}
        onEdit={onEdit}
        className={`event-container ${className}`}
        renderContent={({ event, deleteEvent, onEdit }) => {
          if (variant === 'compact') {
            return (
              <div className={`event-compact event-${color}`}>
                <div className="event-title">{event.title}</div>
                {!event.allDay && <div className="event-time">{formatTime(event.start)}</div>}
              </div>
            );
          }
          
          return (
            <div className={`event-detailed event-${color}`}>
              <div>
                <div className="event-title">{event.title}</div>
                <div className="event-time">
                  {event.allDay ? 'Toute la journée' : 
                    `${formatTime(event.start)} - ${formatTime(event.end)}`
                  }
                </div>
              </div>
              
              <div className="event-actions">
                {onEdit && (
                  <button
                    className="event-action-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(event);
                    }}
                    aria-label="Modifier l'événement"
                  >
                    <span aria-hidden="true">✎</span>
                  </button>
                )}
                
                <button
                  className="event-action-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEvent(event.id);
                  }}
                  aria-label="Supprimer l'événement"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
          );
        }}
        {...otherProps}
      />
    </>
  );
} 