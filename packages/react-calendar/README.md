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
      interactionMode="events"
      locale="fr-FR"
    />
  );
}
```

## Modes d'interaction disponibles

Le calendrier supporte différents modes d'interaction :

- `view-only` : Mode lecture seule (par défaut)
- `selection` : Permet la sélection de jours
- `events` : Mode complet avec sélection de jours et gestion d'événements

## Internationalisation

Le calendrier supporte l'internationalisation avec deux locales principales :

- `locale="fr-FR"` : Interface en français, la semaine commence le lundi (par défaut)
- `locale="en-US"` : Interface en anglais, la semaine commence le dimanche

### Personnalisation des traductions

Vous pouvez personnaliser les textes de l'interface pour chaque locale en utilisant la propriété `customTranslations` :

```tsx
import { ReactCalendar } from '@calendar/react';

function App() {
  return (
    <ReactCalendar 
      locale="fr-FR"
      customTranslations={{
        'fr-FR': {
          today: 'Jour actuel',
          nextMonth: 'Mois suivant',
          prevMonth: 'Mois précédent'
        },
        'en-US': {
          today: 'Current day'
        }
      }}
    />
  );
}
```

### Accès direct aux fonctions d'internationalisation

Le hook `useCalendarContext` vous donne accès à l'objet `i18n` qui fournit plusieurs méthodes utiles :

```tsx
import { useCalendarContext } from '@calendar/react';

function MyComponent() {
  const { i18n } = useCalendarContext();
  
  return (
    <div>
      <p>{i18n.t('today')}</p>
      <p>{i18n.formatDate(new Date(), { month: 'long', year: 'numeric' })}</p>
      <p>{i18n.getDayNames('short').join(', ')}</p>
      <p>{i18n.getMonthNames('long')[0]} est le premier mois de l'année</p>
    </div>
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
    <CalendarProvider 
      locale="fr-FR"
      customTranslations={{
        'fr-FR': {
          today: 'Jour actuel'
        }
      }}
    >
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