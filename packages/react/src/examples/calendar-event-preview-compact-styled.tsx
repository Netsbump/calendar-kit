import React from 'react';
import { CalendarEvent } from "@calendar/core";
import { getEventColor, formatEventTime } from '../utils/event-utils';

// Styles spécifiques pour l'aperçu compact d'un événement
const styles = `
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

.event-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.event-time {
  color: #666;
  font-size: 12px;
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

interface CalendarEventPreviewCompactStyledProps {
    event: CalendarEvent;
}

export const CalendarEventPreviewCompactStyled = ({ event }: CalendarEventPreviewCompactStyledProps) => {
    // Détermine la couleur de l'événement
    const color = getEventColor(event.id);

    return (
        <>
            <style>{styles}</style>
            <div className={`event-compact event-${color}`}>
                <div className="event-title">{event.title}</div>
                {!event.allDay && <div className="event-time">{formatEventTime(event.start)}</div>}
            </div>
        </>
    );
};
