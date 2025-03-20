# useCalendar

Le hook `useCalendar` est le hook principal qui fournit toutes les fonctionnalités du calendrier. Il gère l'état global du calendrier et expose des méthodes pour manipuler cet état.

## API

```tsx
interface UseCalendarReturn {
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
import { useCalendar } from '@calendar/react';

function MyCalendar() {
  const {
    currentDate,
    currentView,
    events,
    setCurrentDate,
    setCurrentView,
    addEvent,
    deleteEvent
  } = useCalendar();

  return (
    <div>
      <p>Date actuelle: {currentDate.toLocaleDateString()}</p>
      <p>Vue actuelle: {currentView}</p>
      <p>Nombre d'événements: {events.length}</p>
    </div>
  );
}
```

## Gestion des événements

```tsx
function MyCalendar() {
  const { events, addEvent, deleteEvent } = useCalendar();

  const handleAddEvent = (event: CalendarEvent) => {
    addEvent(event);
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
  };

  return (
    <div>
      <h2>Événements</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.title}
            <button onClick={() => handleDeleteEvent(event.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Navigation

```tsx
function MyCalendar() {
  const { currentDate, setCurrentDate } = useCalendar();

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
    <div>
      <button onClick={handlePrevMonth}>Mois précédent</button>
      <span>{currentDate.toLocaleDateString()}</span>
      <button onClick={handleNextMonth}>Mois suivant</button>
    </div>
  );
}
```

## Utilisation des grilles

```tsx
function MyCalendar() {
  const { currentView, getMonthGrid, getWeekGrid } = useCalendar();

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
```

## Sélection de date

```tsx
function MyCalendar() {
  const { selectedDate, selectDate } = useCalendar();

  const handleDateSelect = (date: Date) => {
    selectDate(date);
  };

  return (
    <div>
      <p>
        Date sélectionnée :{' '}
        {selectedDate ? selectedDate.toLocaleDateString() : 'Aucune'}
      </p>
      <button onClick={() => handleDateSelect(new Date())}>
        Sélectionner aujourd'hui
      </button>
    </div>
  );
}
```

## Exemple complet

```tsx
import { useCallback, useMemo } from 'react';
import { useCalendar } from '@calendar/react';

function MyCalendar() {
  const {
    currentDate,
    currentView,
    events,
    selectedDate,
    setCurrentDate,
    setCurrentView,
    addEvent,
    deleteEvent,
    selectDate,
    getMonthGrid,
    getWeekGrid,
    getEventsForDate
  } = useCalendar();

  // Mémoriser la grille actuelle
  const grid = useMemo(() => {
    return currentView === 'month' ? getMonthGrid() : getWeekGrid();
  }, [currentView, getMonthGrid, getWeekGrid]);

  // Mémoriser les événements du jour sélectionné
  const selectedDateEvents = useMemo(() => {
    return selectedDate ? getEventsForDate(selectedDate) : [];
  }, [selectedDate, getEventsForDate]);

  // Gestionnaires d'événements mémorisés
  const handleDateSelect = useCallback((date: Date) => {
    selectDate(date);
  }, [selectDate]);

  const handleAddEvent = useCallback((event: CalendarEvent) => {
    try {
      addEvent(event);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'événement:', error);
    }
  }, [addEvent]);

  const handleDeleteEvent = useCallback((eventId: string) => {
    try {
      deleteEvent(eventId);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement:', error);
    }
  }, [deleteEvent]);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>{currentDate.toLocaleDateString()}</h2>
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

      {selectedDate && (
        <div className="calendar-events">
          <h3>Événements du {selectedDate.toLocaleDateString()}</h3>
          {selectedDateEvents.length === 0 ? (
            <p>Aucun événement prévu</p>
          ) : (
            <ul>
              {selectedDateEvents.map(event => (
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
      )}
    </div>
  );
}
```

## Bonnes pratiques

1. **Mémorisation** : Utilisez `useMemo` pour mémoriser les valeurs calculées à partir de l'état du calendrier.

2. **Gestionnaires d'événements** : Utilisez `useCallback` pour mémoriser les gestionnaires d'événements.

3. **Gestion des erreurs** : Gérez les erreurs potentielles lors de l'ajout ou de la suppression d'événements.

4. **Performance** : Évitez les calculs inutiles dans le rendu en utilisant la mémorisation appropriée.

## Prochaines étapes

- Découvrez comment utiliser le hook avec les [composants headless](../components/README.md)
- Apprenez à utiliser le [useCalendarContext](./useCalendarContext.md) pour plus de flexibilité
- Consultez les [exemples](../examples/README.md) pour des cas d'utilisation concrets 