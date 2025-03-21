# CalendarMonthViewStyled

Le `CalendarMonthViewStyled` est un composant styled qui encapsule `CalendarMonthView` et y ajoute des styles prédéfinis. Il permet d'afficher rapidement une vue mensuelle du calendrier avec une apparence soignée, sans avoir à implémenter tous les styles vous-même.

## Props

```tsx
interface CalendarMonthViewStyledProps {
  // Format des noms de jours ('narrow', 'short', 'long')
  // Cette prop est transmise au composant headless sous-jacent
  dayNameFormat?: 'narrow' | 'short' | 'long';
  
  // Classe CSS pour le conteneur principal
  className?: string;
  
  // Classe CSS pour l'en-tête des jours de la semaine
  weekdayHeaderClassName?: string;
  
  // Classe CSS pour chaque nom de jour de la semaine
  weekdayNameClassName?: string;
  
  // Classe CSS pour la grille des jours
  gridClassName?: string;
  
  // Classe CSS ou fonction retournant une classe CSS pour chaque jour
  dayClassName?: string | ((day: CalendarDay) => string);
  
  // Taille des cellules des jours ('small', 'medium', 'large')
  daySize?: 'small' | 'medium' | 'large';
  
  // Style de la sélection des jours ('outline', 'fill')
  selectionStyle?: 'outline' | 'fill';
  
  // Si true, les jours des mois adjacents sont affichés
  showAdjacentMonths?: boolean;
  
  // Si true, les indicateurs d'événements sont affichés
  showEventIndicators?: boolean;
}
```

## Utilisation de base

```tsx
import { CalendarProvider, CalendarMonthViewStyled } from '@calendar/react';

function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarMonthViewStyled />
    </CalendarProvider>
  );
}
```

## Personnalisation des styles via les props

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarMonthViewStyled 
        className="my-calendar-view"
        weekdayHeaderClassName="my-weekday-header"
        weekdayNameClassName="my-weekday-name"
        gridClassName="my-calendar-grid"
        dayClassName="my-calendar-day"
        daySize="large"
        selectionStyle="fill"
        showAdjacentMonths={true}
        showEventIndicators={true}
      />
    </CalendarProvider>
  );
}
```

## Personnalisation conditionnelle des jours

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarMonthViewStyled 
        dayClassName={(day) => {
          if (day.isToday) return 'today-cell';
          if (day.isWeekend) return 'weekend-cell';
          if (!day.isCurrentMonth) return 'other-month-cell';
          return 'normal-cell';
        }}
      />
    </CalendarProvider>
  );
}
```

## Personnalisation du format des noms de jours

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarMonthViewStyled 
        dayNameFormat="long"
      />
    </CalendarProvider>
  );
}
```

## Styles CSS personnalisés

Vous pouvez cibler les classes CSS prédéfinies pour personnaliser davantage l'apparence :

```css
/* style.css */
.calendar-month-view {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.calendar-weekday-header {
  background-color: #f5f5f5;
  font-weight: bold;
}

.calendar-weekday-name {
  color: #555;
}

.calendar-grid {
  gap: 2px;
}

.calendar-day {
  transition: all 0.2s ease;
}

.calendar-day.today {
  background-color: #e3f2fd;
  font-weight: bold;
}

.calendar-day.selected {
  background-color: #bbdefb;
}

.calendar-day.weekend {
  color: #f44336;
}

.calendar-day:hover {
  background-color: #f5f5f5;
}

.calendar-day .event-indicator {
  background-color: #2196f3;
}
```

```tsx
import './style.css';

function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarMonthViewStyled />
    </CalendarProvider>
  );
}
```

## Combinaison avec d'autres composants styled

```tsx
import { 
  CalendarProvider, 
  CalendarMonthViewStyled, 
  CalendarNavigationStyled, 
  CalendarEventsStyled 
} from '@calendar/react';

function MyCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar-container">
        <CalendarNavigationStyled className="my-navigation" />
        <CalendarMonthViewStyled className="my-month-view" />
        <CalendarEventsStyled className="my-events" />
      </div>
    </CalendarProvider>
  );
}
```

## Personnalisation avancée

Si vous avez besoin de plus de contrôle, vous pouvez toujours accéder au composant headless sous-jacent :

```tsx
import { 
  CalendarProvider, 
  CalendarMonthView,
  useCalendarContext 
} from '@calendar/react';
import './my-custom-styles.css';

// Composant entièrement personnalisé basé sur le composant headless
function MyCustomCalendarMonthView(props) {
  const { dayNameFormat } = props;
  
  return (
    <CalendarMonthView
      dayNameFormat={dayNameFormat}
      className="my-custom-calendar"
      renderDay={({ day, isSelected, onDayClick }) => (
        <div 
          className={`
            my-custom-day
            ${day.isToday ? 'my-today' : ''}
            ${isSelected ? 'my-selected' : ''}
          `}
          onClick={() => onDayClick(day)}
        >
          <span className="my-day-number">{day.dayOfMonth}</span>
          {day.events.length > 0 && (
            <div className="my-event-dots">
              {Array.from({ length: Math.min(day.events.length, 3) }).map((_, i) => (
                <span key={i} className="my-event-dot" />
              ))}
            </div>
          )}
        </div>
      )}
    />
  );
}

function MyCalendar() {
  return (
    <CalendarProvider>
      <MyCustomCalendarMonthView dayNameFormat="short" />
    </CalendarProvider>
  );
}
```

## Bonnes pratiques

1. **Utiliser les props de classe pour la personnalisation simple** : Pour des personnalisations légères, utilisez les props `className`, `dayClassName`, etc.

2. **Utiliser des fonctions pour les classes conditionnelles** : Pour appliquer des classes différentes selon les propriétés du jour, utilisez une fonction pour `dayClassName`.

3. **Respecter la hiérarchie des styles** : Les styles définis directement via les props ont la priorité sur les styles CSS.

4. **Créer un composant personnalisé pour les cas complexes** : Si vous avez besoin d'une personnalisation très spécifique, créez votre propre composant basé sur `CalendarMonthView`. 