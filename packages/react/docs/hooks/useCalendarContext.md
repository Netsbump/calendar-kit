# useCalendarContext

Le hook `useCalendarContext` permet d'accéder au contexte du calendrier dans les composants headless. Il fournit l'état et les méthodes nécessaires pour gérer le calendrier.

## API

```tsx
interface CalendarContextValue {
  // État
  currentDate: Date;
  view: CalendarView;
  events: CalendarEvent[];
  selectedDate: Date | null;

  // Actions
  goToNext: () => void;
  goToPrev: () => void;
  goToToday: () => void;
  setView: (view: CalendarView) => void;
  selectDate: (date: Date | null) => void;
  addEvent: (event: CalendarEvent) => void;
  deleteEvent: (eventId: string) => void;

  // Utilitaires
  getMonthGrid: () => CalendarDay[][];
  getWeekGrid: () => CalendarDay[][];
  getEventsForDate: (date: Date) => CalendarEvent[];
}
```

## Utilisation dans un composant headless

```tsx
import { useCalendarContext } from '@calendar/react';

function CalendarNavigation() {
  const { 
    currentDate,
    view,
    goToNext,
    goToPrev,
    goToToday,
    setView 
  } = useCalendarContext();

  return (
    <div>
      <h2>{currentDate.toLocaleDateString()}</h2>
      <div>
        <button onClick={goToPrev}>←</button>
        <button onClick={goToToday}>Aujourd'hui</button>
        <button onClick={goToNext}>→</button>
      </div>
      <div>
        <button 
          onClick={() => setView('month')}
          className={view === 'month' ? 'active' : ''}
        >
          Mois
        </button>
        <button 
          onClick={() => setView('week')}
          className={view === 'week' ? 'active' : ''}
        >
          Semaine
        </button>
      </div>
    </div>
  );
}
```

## Utilisation dans un composant styled

```tsx
import { useCalendarContext } from '@calendar/react';

function CalendarNavigationStyled() {
  const { 
    currentDate,
    view,
    goToNext,
    goToPrev,
    goToToday,
    setView 
  } = useCalendarContext();

  return (
    <div className="calendar-navigation">
      <h2 className="calendar-title">
        {new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(currentDate)}
      </h2>
      <div className="navigation-buttons">
        <button 
          className="nav-button"
          onClick={goToPrev}
          aria-label="Mois précédent"
        >
          ←
        </button>
        <button 
          className="nav-button"
          onClick={goToToday}
          aria-label="Aujourd'hui"
        >
          Aujourd'hui
        </button>
        <button 
          className="nav-button"
          onClick={goToNext}
          aria-label="Mois suivant"
        >
          →
        </button>
      </div>
      <div className="view-selector">
        <button 
          className={`view-button ${view === 'month' ? 'active' : ''}`}
          onClick={() => setView('month')}
          aria-label="Vue mois"
        >
          Mois
        </button>
        <button 
          className={`view-button ${view === 'week' ? 'active' : ''}`}
          onClick={() => setView('week')}
          aria-label="Vue semaine"
        >
          Semaine
        </button>
      </div>
    </div>
  );
}
```

## Bonnes pratiques

1. **Utilisation dans les composants headless**
   - Utilisez `useCalendarContext` pour accéder aux données et méthodes
   - Ne passez pas les données en props
   - Fournissez des props de rendu personnalisé

2. **Gestion des événements**
   - Les méthodes du contexte gèrent les événements
   - Ajoutez vos propres callbacks si nécessaire

3. **Performance**
   - Utilisez `useMemo` pour les valeurs calculées
   - Utilisez `useCallback` pour les gestionnaires d'événements

## Exemple complet

```tsx
import { useCallback, useMemo } from 'react';
import { useCalendarContext } from '@calendar/react';

function CalendarGrid() {
  const { 
    view,
    getMonthGrid,
    getWeekGrid,
    selectedDate,
    selectDate 
  } = useCalendarContext();

  // Mémoriser la grille actuelle
  const grid = useMemo(() => {
    return view === 'month' ? getMonthGrid() : getWeekGrid();
  }, [view, getMonthGrid, getWeekGrid]);

  // Mémoriser le gestionnaire de clic
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
``` 