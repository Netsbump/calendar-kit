import React from 'react';
import { CalendarEvent, CalendarEventProps } from '../components/calendar-event';
import { CalendarEventPreviewCompactStyled } from './calendar-event-preview-compact-styled';
import { CalendarEventPreviewDetailedStyled } from './calendar-event-preview-detailed-styled';

// Styles spécifiques pour le conteneur d'événement
const containerStyles = `
.event-container {
  margin-bottom: 8px;
  border-radius: 4px;
  overflow: hidden;
  transition: background-color 0.15s;
}

.event-container:hover {
  background-color: #f5f5f5;
}
`;

export interface CalendarEventStyledProps extends CalendarEventProps {
  // Aucune prop supplémentaire pour le moment
}

/**
 * Version stylisée du composant CalendarEvent
 * Utilise des composants spécialisés pour le rendu des différentes variantes
 */
export function CalendarEventStyled({
  event,
  variant = 'detailed',
  onClick,
  onEdit,
  className = '',
  ...otherProps
}: CalendarEventStyledProps) {
  
  return (
    <>
      <style>{containerStyles}</style>
      <CalendarEvent
        event={event}
        variant={variant}
        onClick={onClick}
        onEdit={onEdit}
        className={`event-container ${className}`}
        renderContent={({ event, deleteEvent, onEdit }) => {
          if (variant === 'compact') {
            return <CalendarEventPreviewCompactStyled event={event} />;
          }
          
          return (
            <CalendarEventPreviewDetailedStyled 
              event={event} 
              onEdit={onEdit} 
              onDelete={() => deleteEvent(event.id)} 
            />
          );
        }}
        {...otherProps}
      />
    </>
  );
} 