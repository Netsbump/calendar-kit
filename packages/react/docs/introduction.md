# Introduction à @calendar/react

@calendar/react est une bibliothèque headless pour construire des calendriers React. Elle fournit tous les composants et hooks nécessaires pour créer des calendriers personnalisés tout en gardant le contrôle total sur l'apparence et le comportement.

## Philosophie

La bibliothèque suit les principes suivants :

1. **Headless** : Aucun style n'est imposé, vous avez un contrôle total sur l'apparence
2. **Composable** : Les composants peuvent être assemblés de différentes manières
3. **Flexible** : Chaque composant peut être personnalisé ou remplacé
4. **Accessible** : Les composants suivent les bonnes pratiques d'accessibilité

## Structure

La bibliothèque est composée de :

- **Composants Headless** : Des composants React sans style qui gèrent la logique
- **Hooks** : Des hooks React pour gérer l'état et la logique du calendrier
- **Composants d'exemple** : Des implémentations prêtes à l'emploi

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
      withDaySelection={true}
    />
  );
}
```

## Utilisation avancée

Pour plus de contrôle, vous pouvez utiliser les composants headless :

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

## Personnalisation

Chaque composant peut être personnalisé :

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar">
        <CalendarNavigation className="my-navigation" />
        <CalendarGrid 
          renderDay={(day) => (
            <div className="my-day">
              {day.dayOfMonth}
            </div>
          )}
        />
        <CalendarEvents 
          renderEvent={(event) => (
            <div className="my-event">
              {event.title}
            </div>
          )}
        />
      </div>
    </CalendarProvider>
  );
}
```

## Prochaines étapes

- Découvrez les [composants headless](./components/README.md)
- Apprenez à utiliser les [hooks](./hooks/README.md)
- Consultez les [exemples](./examples/README.md) 