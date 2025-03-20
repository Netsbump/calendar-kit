# useCalendarContext

Le hook `useCalendarContext` permet d'accéder au contexte du calendrier et à ses fonctionnalités. Il est particulièrement utile lorsque vous avez besoin d'accéder à l'état du calendrier dans des composants enfants sans passer les props à travers plusieurs niveaux.

## API

```tsx
interface CalendarContextValue {
  // État
  currentDate: Date;
  currentView: 'month' | 'week';
  events: CalendarEvent[];
  selectedDate: Date | null;

  // Actions
  setCurrentDate: (date: Date) => void;
  setCurrentView: (view: 'month' | 'week') => void;
  addEvent: (event: CalendarEvent) => void;
  deleteEvent: (eventId: string) => void;
  selectDate: (date: Date | null) => void;

  // Utilitaires
  getMonthGrid: () => CalendarDay[][];
  getWeekGrid: () => CalendarDay[][];
  getEventsForDate: (date: Date) => CalendarEvent[];
}
```

## Utilisation de base

```tsx
import { useCalendarContext } from '@calendar/react';

function MyCustomComponent() {
  const { currentDate, events } = useCalendarContext();

  return (
    <div>
      <h2>Événements du {currentDate.toLocaleDateString()}</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Utilisation dans un composant enfant

```tsx
function CalendarHeader() {
  const { currentDate, setCurrentDate } = useCalendarContext();

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar-header">
      <button onClick={handlePrevMonth}>←</button>
      <span>{currentDate.toLocaleDateString()}</span>
      <button onClick={handleNextMonth}>→</button>
    </div>
  );
}

function CalendarGrid() {
  const { currentView, getMonthGrid, getWeekGrid } = useCalendarContext();

  const grid = currentView === 'month' ? getMonthGrid() : getWeekGrid();

  return (
    <div className="calendar-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="calendar-row">
          {row.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className={`calendar-cell ${day.isToday ? 'today' : ''}`}
            >
              {day.dayOfMonth}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Calendar() {
  return (
    <CalendarProvider>
      <div className="calendar">
        <CalendarHeader />
        <CalendarGrid />
      </div>
    </CalendarProvider>
  );
}
```

## Gestion des événements dans un composant enfant

```tsx
function EventList() {
  const { selectedDate, getEventsForDate, deleteEvent } = useCalendarContext();

  const events = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="event-list">
      <h3>Événements du {selectedDate?.toLocaleDateString()}</h3>
      {events.length === 0 ? (
        <p>Aucun événement prévu</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <span className="event-time">
                {new Date(event.start).toLocaleTimeString()}
              </span>
              <span className="event-title">{event.title}</span>
              <button
                onClick={() => deleteEvent(event.id)}
                className="delete-button"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Exemple complet avec composants enfants

```tsx
import { useCallback, useMemo } from 'react';
import { useCalendarContext } from '@calendar/react';

function CalendarHeader() {
  const { currentDate, currentView, setCurrentDate, setCurrentView } = useCalendarContext();

  const handlePrevMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  }, [currentDate, setCurrentDate]);

  const handleNextMonth = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  }, [currentDate, setCurrentDate]);

  return (
    <div className="calendar-header">
      <button onClick={handlePrevMonth}>←</button>
      <span>{currentDate.toLocaleDateString()}</span>
      <button onClick={handleNextMonth}>→</button>
      <div className="view-controls">
        <button
          onClick={() => setCurrentView('month')}
          className={currentView === 'month' ? 'active' : ''}
        >
          Mois
        </button>
        <button
          onClick={() => setCurrentView('week')}
          className={currentView === 'week' ? 'active' : ''}
        >
          Semaine
        </button>
      </div>
    </div>
  );
}

function CalendarGrid() {
  const { currentView, getMonthGrid, getWeekGrid, selectedDate, selectDate } = useCalendarContext();

  const grid = useMemo(() => {
    return currentView === 'month' ? getMonthGrid() : getWeekGrid();
  }, [currentView, getMonthGrid, getWeekGrid]);

  const handleDateSelect = useCallback((date: Date) => {
    selectDate(date);
  }, [selectDate]);

  return (
    <div className="calendar-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="calendar-row">
          {row.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className={`
                calendar-cell
                ${day.isToday ? 'today' : ''}
                ${selectedDate?.toDateString() === day.date.toDateString() ? 'selected' : ''}
              `}
              onClick={() => handleDateSelect(day.date)}
            >
              <span className="day-number">{day.dayOfMonth}</span>
              {day.isCurrentMonth && (
                <span className="day-name">{day.dayName}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function EventList() {
  const { selectedDate, getEventsForDate, deleteEvent } = useCalendarContext();

  const events = useMemo(() => {
    return selectedDate ? getEventsForDate(selectedDate) : [];
  }, [selectedDate, getEventsForDate]);

  const handleDeleteEvent = useCallback((eventId: string) => {
    try {
      deleteEvent(eventId);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement:', error);
    }
  }, [deleteEvent]);

  if (!selectedDate) return null;

  return (
    <div className="calendar-events">
      <h3>Événements du {selectedDate.toLocaleDateString()}</h3>
      {events.length === 0 ? (
        <p>Aucun événement prévu</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <span className="event-time">
                {new Date(event.start).toLocaleTimeString()}
              </span>
              <span className="event-title">{event.title}</span>
              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="delete-button"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Calendar() {
  return (
    <CalendarProvider>
      <div className="calendar">
        <CalendarHeader />
        <CalendarGrid />
        <EventList />
      </div>
    </CalendarProvider>
  );
}
```

## Bonnes pratiques

1. **Utilisation dans les composants enfants** : Utilisez `useCalendarContext` dans les composants enfants qui ont besoin d'accéder à l'état du calendrier.

2. **Mémorisation** : Utilisez `useMemo` et `useCallback` pour optimiser les performances des composants qui utilisent le contexte.

3. **Gestion des erreurs** : Gérez les erreurs potentielles lors de l'utilisation des méthodes du contexte.

4. **Performance** : Évitez les re-rendus inutiles en mémorisant les valeurs calculées et les gestionnaires d'événements.

## Prochaines étapes

- Découvrez comment utiliser le hook avec les [composants headless](../components/README.md)
- Apprenez à utiliser le [useCalendar](./useCalendar.md) pour plus de contrôle
- Consultez les [exemples](../examples/README.md) pour des cas d'utilisation concrets 