# Introduction à @calendar/react

@calendar/react est une bibliothèque pour construire des calendriers React basée sur le pattern headless/styled. Elle fournit tous les composants et hooks nécessaires pour créer des calendriers tout en offrant un contrôle total sur la logique et l'apparence.

## Philosophie

La bibliothèque suit les principes suivants :

1. **Séparation des préoccupations** : Distinction claire entre logique (headless) et présentation (styled)
2. **Composable** : Les composants peuvent être assemblés de différentes manières
3. **Flexible** : Chaque composant peut être personnalisé ou remplacé
4. **Accessible** : Les composants suivent les bonnes pratiques d'accessibilité

## Architecture

La bibliothèque est organisée selon le pattern headless/styled :

- **Composants Headless** : Gèrent uniquement la logique et les données, sans style
- **Composants Styled** : Implémentent l'apparence visuelle en utilisant les composants headless
- **Hooks** : Gèrent l'état et la logique du calendrier
- **Contexte** : Fournit un état global partagé

## Installation

```bash
npm install @calendar/react
```

## Utilisation de base

La façon la plus simple d'utiliser la bibliothèque est d'utiliser le composant `ReactCalendar` :

```tsx
import { ReactCalendar } from '@calendar/react';

function App() {
  return (
    <ReactCalendar 
      dayNameFormat="long"
      withEvents={true}
      enableDaySelection={true}
    />
  );
}
```

## Utilisation avancée avec les composants styled

Pour plus de contrôle, vous pouvez utiliser les composants styled individuellement :

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
      <div className="calendar">
        <CalendarNavigationStyled />
        <CalendarMonthViewStyled 
          daySize="medium"
          selectionStyle="outline"
        />
        <CalendarEventsStyled />
      </div>
    </CalendarProvider>
  );
}
```

## Utilisation avancée avec les composants headless

Pour un contrôle maximal, vous pouvez utiliser directement les composants headless :

```tsx
import { 
  CalendarProvider, 
  CalendarMonthView, 
  CalendarNavigation, 
  CalendarEvents,
  CalendarDay
} from '@calendar/react';

function MyCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar">
        <CalendarNavigation 
          renderTitle={({ date }) => <h2>{date.toLocaleDateString()}</h2>}
          renderViewSwitcher={({ view, setView }) => (
            <div className="custom-switcher">
              <button onClick={() => setView('month')}>Mois</button>
              <button onClick={() => setView('week')}>Semaine</button>
            </div>
          )}
        />
        
        <CalendarMonthView
          renderDay={({ day, onDayClick, withEvents }) => (
            <div 
              className="custom-day" 
              onClick={() => onDayClick(day)}
            >
              <span className="day-number">{day.dayOfMonth}</span>
              {withEvents && day.events && day.events.length > 0 && (
                <span className="event-indicator">•</span>
              )}
            </div>
          )}
        />
        
        <CalendarEvents 
          renderEvent={({ event }) => (
            <div className="custom-event">
              <h3>{event.title}</h3>
              <p>{event.start.toLocaleTimeString()}</p>
            </div>
          )}
        />
      </div>
    </CalendarProvider>
  );
}
```

## Prochaines étapes

- Découvrez les [composants headless](./components/README.md) pour la logique
- Explorez les [composants styled](./styled/README.md) pour l'apparence
- Apprenez à utiliser les [hooks](./hooks/README.md) pour plus de contrôle
- Consultez les [exemples](./examples/README.md) pour des cas d'utilisation concrets
- Comprenez l'[architecture](./architecture.md) pour tirer pleinement parti de la bibliothèque 