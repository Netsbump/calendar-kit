import React, { useState } from 'react';
import { useCalendarContext } from './calendar-provider';
import type { CalendarEvent } from '@calendar/core';

export interface CalendarEventsProps {
  className?: string;
  style?: React.CSSProperties;
  renderTitle?: (date: Date) => React.ReactNode;
  renderEventForm?: (props: {
    onSubmit: (e: React.FormEvent) => void;
    newEventTitle: string;
    setNewEventTitle: (title: string) => void;
  }) => React.ReactNode;
  renderEvent?: (event: CalendarEvent) => React.ReactNode;
  renderEventList?: (props: {
    events: CalendarEvent[];
    renderEvent: (event: CalendarEvent) => React.ReactNode;
  }) => React.ReactNode;
}

export function CalendarEvents({
  className = '',
  style,
  renderTitle,
  renderEventForm,
  renderEvent,
  renderEventList,
}: CalendarEventsProps) {
  const { selectedDate, events, addEvent, deleteEvent, onEventAdd } = useCalendarContext();
  const [newEventTitle, setNewEventTitle] = useState('');

  if (!selectedDate) {
    return null;
  }

  const dayEvents = events.filter(
    event => event.start.toDateString() === selectedDate.toDateString()
  );

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: newEventTitle,
      start: selectedDate,
      end: new Date(selectedDate.getTime() + 60 * 60 * 1000), // +1h
      allDay: false,
    };

    addEvent(newEvent);
    onEventAdd?.(newEvent);
    setNewEventTitle('');
  };

  const defaultRenderTitle = (date: Date) => (
    <h3>Événements du {date.toLocaleDateString()}</h3>
  );

  const defaultRenderEventForm = ({ onSubmit, newEventTitle, setNewEventTitle }: {
    onSubmit: (e: React.FormEvent) => void;
    newEventTitle: string;
    setNewEventTitle: (title: string) => void;
  }) => (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e);
    }}>
      <div>
        <input
          type="text"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
          placeholder="Nouvel événement"
        />
        <button type="submit">Ajouter</button>
      </div>
    </form>
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
      {events.map((event) => (
        <div key={event.id}>
          {renderEvent(event)}
        </div>
      ))}
    </div>
  );

  return (
    <div className={className} style={style}>
      {renderTitle ? renderTitle(selectedDate) : defaultRenderTitle(selectedDate)}
      
      {renderEventForm ? renderEventForm({
        onSubmit: handleAddEvent,
        newEventTitle,
        setNewEventTitle,
      }) : defaultRenderEventForm({
        onSubmit: handleAddEvent,
        newEventTitle,
        setNewEventTitle,
      })}

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