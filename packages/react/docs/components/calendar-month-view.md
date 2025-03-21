# CalendarMonthView

Le `CalendarMonthView` est un composant headless qui affiche une vue mensuelle du calendrier. Il gère la logique de génération et d'affichage des jours du mois, sans imposer de style particulier.

## Props

```tsx
interface CalendarMonthViewProps {
  // Format des noms de jours ('narrow', 'short', 'long')
  dayNameFormat?: 'narrow' | 'short' | 'long';
  
  // Fonction de rendu pour un jour individuel
  renderDay?: (props: {
    day: CalendarDay;
    isSelected: boolean;
    onDayClick: (day: CalendarDay) => void;
  }) => React.ReactNode;
  
  // Fonction de rendu pour les jours de la semaine (en-tête)
  renderWeekdays?: (dayNames: string[]) => React.ReactNode;
  
  // Fonction de rendu pour la grille complète des jours
  renderGrid?: (props: {
    days: CalendarDay[][];
    renderDay: (day: CalendarDay) => React.ReactNode;
  }) => React.ReactNode;
  
  // Classe CSS à appliquer au conteneur
  className?: string;
}

// Type d'un jour du calendrier
interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  isToday: boolean;
  isCurrentMonth: boolean;
  isWeekend: boolean;
  events: CalendarEvent[];
  // Le nom du jour (lundi, mardi, etc.)
  dayOfWeek?: string;
}
```

## Utilisation de base

```tsx
import { CalendarProvider, CalendarMonthView } from '@calendar/react';

function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarMonthView />
    </CalendarProvider>
  );
}
```

## Personnalisation du rendu des jours

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarMonthView
        renderDay={({ day, isSelected, onDayClick }) => (
          <div 
            className={`
              day-cell
              ${day.isToday ? 'today' : ''}
              ${day.isCurrentMonth ? 'current-month' : 'other-month'}
              ${isSelected ? 'selected' : ''}
              ${day.isWeekend ? 'weekend' : ''}
            `}
            onClick={() => onDayClick(day)}
          >
            <span className="day-number">{day.dayOfMonth}</span>
            {day.events.length > 0 && (
              <div className="event-indicator">
                {day.events.length}
              </div>
            )}
          </div>
        )}
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
      <CalendarMonthView
        dayNameFormat="long"
      />
    </CalendarProvider>
  );
}
```

## Personnalisation complète de la grille

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarMonthView
        renderGrid={({ days, renderDay }) => (
          <div className="custom-grid">
            {days.map((week, weekIndex) => (
              <div key={weekIndex} className="week-row">
                {week.map(day => (
                  <div key={day.date.toISOString()} className="day-wrapper">
                    {renderDay(day)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      />
    </CalendarProvider>
  );
}
```

## Utilisation avec des composants personnalisés

```tsx
// Composant personnalisé pour un jour
function CustomDay({ day, isSelected, onDayClick }) {
  return (
    <button
      className={`day-button ${isSelected ? 'selected' : ''}`}
      onClick={() => onDayClick(day)}
    >
      <span>{day.dayOfMonth}</span>
      {day.events.length > 0 && <span className="dot" />}
    </button>
  );
}

// Composant personnalisé pour les jours de la semaine
function CustomWeekdays({ dayNames }) {
  return (
    <div className="weekdays-header">
      {dayNames.map((name, index) => (
        <div key={index} className="weekday-name">
          {name}
        </div>
      ))}
    </div>
  );
}

function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarMonthView
        renderDay={CustomDay}
        renderWeekdays={CustomWeekdays}
      />
    </CalendarProvider>
  );
}
```

## Intégration avec useCalendarContext

```tsx
import { useCalendarContext, CalendarProvider, CalendarMonthView } from '@calendar/react';

function CalendarWithInfo() {
  const { currentDate, setCurrentDate, selectDate, selectedDate } = useCalendarContext();
  
  return (
    <div className="calendar-container">
      <div className="calendar-info">
        <p>Date actuelle: {currentDate.toLocaleDateString()}</p>
        <p>Date sélectionnée: {selectedDate?.toLocaleDateString() || 'Aucune'}</p>
      </div>
      
      <CalendarMonthView />
      
      <button onClick={() => selectDate(new Date())}>
        Sélectionner aujourd'hui
      </button>
    </div>
  );
}

function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarWithInfo />
    </CalendarProvider>
  );
}
```

## Bonnes pratiques

1. **Utiliser la fonction renderDay pour personnaliser l'apparence des jours** : C'est la méthode recommandée pour personnaliser l'apparence des jours sans avoir à redéfinir la grille complète.

2. **Utiliser dayNameFormat pour des noms de jours cohérents** : Ce prop permet de définir le format des noms de jours de manière cohérente dans toute l'application.

3. **Préserver la structure de la grille** : Si vous personnalisez la fonction renderGrid, assurez-vous de maintenir la structure en semaines et jours pour une expérience utilisateur cohérente.

4. **Déléguer la gestion des événements au contexte** : Utilisez les fonctions fournies par useCalendarContext pour gérer les événements et les dates sélectionnées plutôt que de réimplémneter cette logique. 