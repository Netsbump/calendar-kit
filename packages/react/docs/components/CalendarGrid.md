# CalendarGrid

Le `CalendarGrid` est le composant qui affiche la grille du calendrier. Il gère l'affichage des jours en vue mois ou semaine, et permet une personnalisation complète de l'apparence de chaque cellule.

## Props

```tsx
interface CalendarGridProps {
  // Classe CSS pour le conteneur de la grille
  className?: string;
  // Classe CSS pour le conteneur des en-têtes de colonnes
  headerClassName?: string;
  // Classe CSS pour le conteneur des cellules
  cellClassName?: string;
  // Fonction de rendu personnalisée pour les en-têtes de colonnes
  renderHeader?: (day: string) => React.ReactNode;
  // Fonction de rendu personnalisée pour les cellules
  renderCell?: (day: CalendarDay) => React.ReactNode;
  // Format des noms de jours (court, long, etc.)
  dayNameFormat?: 'short' | 'long';
}
```

## Utilisation de base

```tsx
import { CalendarGrid } from '@calendar/react';

function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarGrid />
    </CalendarProvider>
  );
}
```

## Personnalisation de l'apparence

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarGrid
        className="my-grid"
        headerClassName="my-header"
        cellClassName="my-cell"
        dayNameFormat="short"
      />
    </CalendarProvider>
  );
}
```

## Rendu personnalisé des cellules

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarGrid
        renderCell={(day) => (
          <div className={`my-day ${day.isToday ? 'today' : ''}`}>
            <span className="day-number">{day.dayOfMonth}</span>
            {day.isCurrentMonth && (
              <span className="day-name">{day.dayName}</span>
            )}
          </div>
        )}
      />
    </CalendarProvider>
  );
}
```

## Rendu personnalisé des en-têtes

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarGrid
        renderHeader={(dayName) => (
          <div className="my-header-cell">
            <span className="header-text">{dayName}</span>
          </div>
        )}
      />
    </CalendarProvider>
  );
}
```

## Styles CSS recommandés

```css
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #e5e7eb;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #f3f4f6;
}

.calendar-cell {
  background-color: white;
  padding: 0.5rem;
  min-height: 100px;
}

.calendar-cell.today {
  background-color: #f0f9ff;
}

.calendar-cell.other-month {
  color: #9ca3af;
}
```

## Accessibilité

Le `CalendarGrid` implémente les bonnes pratiques d'accessibilité :

- Utilisation de `role="grid"` pour le conteneur principal
- Utilisation de `role="row"` pour les lignes
- Utilisation de `role="gridcell"` pour les cellules
- Support de la navigation au clavier
- États ARIA appropriés pour les jours sélectionnés et aujourd'hui

## Exemple complet avec styles

```tsx
import { CalendarProvider, CalendarGrid } from '@calendar/react';
import './styles.css';

function MyCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar-container">
        <CalendarGrid
          className="calendar-grid"
          headerClassName="calendar-header"
          cellClassName="calendar-cell"
          renderCell={(day) => (
            <div
              className={`
                day-cell
                ${day.isToday ? 'today' : ''}
                ${!day.isCurrentMonth ? 'other-month' : ''}
                ${day.isSelected ? 'selected' : ''}
              `}
            >
              <span className="day-number">{day.dayOfMonth}</span>
              {day.isCurrentMonth && (
                <span className="day-name">{day.dayName}</span>
              )}
            </div>
          )}
        />
      </div>
    </CalendarProvider>
  );
}
```

```css
.calendar-container {
  max-width: 800px;
  margin: 0 auto;
}

.day-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  min-height: 100px;
  border: 1px solid #e5e7eb;
}

.day-cell.today {
  background-color: #f0f9ff;
}

.day-cell.other-month {
  color: #9ca3af;
}

.day-cell.selected {
  background-color: #dbeafe;
}

.day-number {
  font-size: 1.25rem;
  font-weight: 500;
}

.day-name {
  font-size: 0.875rem;
  color: #6b7280;
}
``` 