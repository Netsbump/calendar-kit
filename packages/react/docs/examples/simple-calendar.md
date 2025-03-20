# Calendrier simple

Cet exemple montre comment créer un calendrier simple en utilisant les composants headless de @calendar/react. Il inclut la navigation entre les mois, l'affichage de la grille du calendrier et la sélection de dates.

## Description

Le calendrier simple comprend :
- Une barre de navigation avec les boutons précédent/suivant
- Une grille de calendrier affichant les jours du mois
- La mise en évidence du jour actuel et des jours sélectionnés
- Un design responsive et moderne

## Code

```tsx
import { useCallback, useMemo } from 'react';
import {
  CalendarProvider,
  CalendarNavigation,
  CalendarGrid,
} from '@calendar/react';
import './styles.css';

function SimpleCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar-container">
        <CalendarNavigation
          className="calendar-navigation"
          buttonClassName="nav-button"
          dateFormat="MMMM YYYY"
        />
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

export default SimpleCalendar;
```

## Styles

```css
.calendar-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.calendar-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem 0.5rem 0 0;
  border-bottom: 1px solid #e5e7eb;
}

.nav-button {
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-button:hover {
  background-color: #f9fafb;
}

.nav-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #e5e7eb;
  padding: 1px;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #f3f4f6;
  padding: 1px;
}

.calendar-header > div {
  padding: 0.5rem;
  text-align: center;
  font-weight: 500;
  color: #6b7280;
}

.calendar-cell {
  background-color: white;
  padding: 0.5rem;
  min-height: 100px;
}

.day-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  min-height: 100px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
}

.day-cell:hover {
  background-color: #f9fafb;
}

.day-cell.today {
  background-color: #f0f9ff;
}

.day-cell.other-month {
  color: #9ca3af;
}

.day-number {
  font-size: 1.25rem;
  font-weight: 500;
  color: #111827;
}

.day-name {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

@media (max-width: 640px) {
  .calendar-container {
    padding: 0.5rem;
  }

  .day-cell {
    min-height: 80px;
    padding: 0.25rem;
  }

  .day-number {
    font-size: 1rem;
  }

  .day-name {
    font-size: 0.75rem;
  }
}
```

## Utilisation

1. **Installation des dépendances**

```bash
npm install @calendar/react
```

2. **Importation des composants**

```tsx
import {
  CalendarProvider,
  CalendarNavigation,
  CalendarGrid,
} from '@calendar/react';
```

3. **Création du composant**

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar-container">
        <CalendarNavigation />
        <CalendarGrid />
      </div>
    </CalendarProvider>
  );
}
```

4. **Ajout des styles**

Copiez les styles CSS fournis dans votre fichier de styles.

## Personnalisation

Vous pouvez personnaliser l'apparence du calendrier en :

1. **Modifiant les classes CSS** : Ajustez les styles pour correspondre à votre design
2. **Utilisant des props** : Modifiez les props des composants pour changer leur comportement
3. **Rendant personnalisé** : Utilisez les fonctions de rendu personnalisé pour modifier l'apparence des cellules

## Exemple de personnalisation

```tsx
function CustomCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar-container">
        <CalendarNavigation
          renderPrevButton={() => (
            <button className="custom-nav-button">
              <span>←</span>
            </button>
          )}
          renderNextButton={() => (
            <button className="custom-nav-button">
              <span>→</span>
            </button>
          )}
        />
        <CalendarGrid
          renderCell={(day) => (
            <div className="custom-day-cell">
              <span className="custom-day-number">{day.dayOfMonth}</span>
              {day.isCurrentMonth && (
                <span className="custom-day-name">{day.dayName}</span>
              )}
            </div>
          )}
        />
      </div>
    </CalendarProvider>
  );
}
```

## Prochaines étapes

- Découvrez comment ajouter des [événements](./calendar-with-events.md)
- Apprenez à [personnaliser](./custom-calendar.md) davantage le calendrier
- Consultez la documentation des [composants](../components/README.md) pour plus d'options 