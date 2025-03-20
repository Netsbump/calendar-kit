import React, { useState } from 'react';
import { useCalendarContext } from './CalendarProvider';
import type { CalendarEvent } from '@calendar/core';

export interface CalendarEventsProps {
  className?: string;
  renderEvent?: (event: CalendarEvent) => React.ReactNode;
}

export function CalendarEvents({ className = '', renderEvent }: CalendarEventsProps) {
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

  return (
    <div className={`p-4 ${className}`}>
      <h3 className="text-lg font-medium mb-4">
        Événements du {selectedDate.toLocaleDateString()}
      </h3>
      
      <form onSubmit={handleAddEvent} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            placeholder="Nouvel événement"
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ajouter
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {dayEvents.map((event) => (
          <div
            key={event.id}
            className="p-2 bg-blue-50 rounded flex justify-between items-center"
          >
            {renderEvent ? renderEvent(event) : (
              <>
                <div>
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-gray-600">
                    {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
                  </div>
                </div>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Supprimer l'événement"
                >
                  ×
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 