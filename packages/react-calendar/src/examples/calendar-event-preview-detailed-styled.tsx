import React from 'react';
import { CalendarEvent } from "@calendar/calendar-core";
import { getEventColor, formatEventTime } from '../utils/event-utils';

// Styles spécifiques pour l'aperçu détaillé d'un événement
const styles = `
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

.event-green {
  border-left-color: #0f9d58;
}

.event-red {
  border-left-color: #ea4335;
}

.event-orange {
  border-left-color: #f09300;
}

.event-purple {
  border-left-color: #a142f4;
}
`;

interface CalendarEventPreviewDetailedStyledProps {
    event: CalendarEvent;
    onEdit?: (event: CalendarEvent) => void;
    onDelete?: () => void;
}

export const CalendarEventPreviewDetailedStyled = ({ 
    event, 
    onEdit, 
    onDelete 
}: CalendarEventPreviewDetailedStyledProps) => {
    // Détermine la couleur de l'événement
    const color = getEventColor(event.id);

    return (
        <>
            <style>{styles}</style>
            <div className={`event-detailed event-${color}`}>
                <div>
                    <div className="event-title">{event.title}</div>
                    <div className="event-time">
                        {event.allDay ? 'Toute la journée' : 
                            `${formatEventTime(event.start)} - ${formatEventTime(event.end)}`
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
                    
                    {onDelete && (
                        <button
                            className="event-action-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                            aria-label="Supprimer l'événement"
                        >
                            <span aria-hidden="true">×</span>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}; 