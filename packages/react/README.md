# @calendar/react

Une bibliothèque headless pour construire des calendriers React.

## Installation

```bash
npm install @calendar/react
```

## Utilisation rapide

Pour une utilisation simple, utilisez le composant `ReactCalendar` :

```tsx
import { ReactCalendar } from '@calendar/react';

function App() {
  return (
    <ReactCalendar 
      dayNameFormat="long"
      withEvents={true}
      withDaySelection={true}
    />
  );
}
```

## Composants Headless

Pour plus de flexibilité, vous pouvez construire votre propre calendrier en utilisant les composants headless :

```tsx
import { 
  CalendarProvider, 
  CalendarGrid, 
  CalendarNavigation, 
  CalendarEvents 
} from '@calendar/react';

function MyCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar">
        <CalendarNavigation />
        <CalendarGrid />
        <CalendarEvents />
      </div>
    </CalendarProvider>
  );
}
```

## Documentation complète

Pour plus de détails sur l'utilisation des composants headless, consultez notre [documentation complète](./docs/README.md). 