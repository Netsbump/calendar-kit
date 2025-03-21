# Composants

@calendar/react propose deux types de composants : headless et styled.

## Composants Headless

Les composants headless fournissent la logique et la structure sans imposer de style ou d'apparence. Ils sont parfaits pour les développeurs qui souhaitent un contrôle total sur l'apparence de leur calendrier.

### Liste des composants headless

### [CalendarProvider](./calendar-provider.md)
Le composant racine qui fournit le contexte et l'état global du calendrier.

### [CalendarMonthView](./calendar-month-view.md)
Affiche la vue mensuelle du calendrier avec la logique de gestion des jours et événements.

### [CalendarWeekView](./calendar-week-view.md)
Affiche la vue hebdomadaire du calendrier avec la logique de gestion des jours et événements.

### [CalendarNavigation](./calendar-navigation.md)
Gère la logique de navigation entre les mois/semaines et le changement de vue.

### [CalendarEvents](./calendar-events.md)
Gère la logique d'affichage et de gestion des événements.

## Composants Styled

Les composants styled encapsulent les composants headless et ajoutent des styles par défaut. Ils sont parfaits pour les développeurs qui souhaitent une solution clé en main avec une apparence soignée.

### Liste des composants styled

### [CalendarMonthViewStyled](./calendar-month-view-styled.md)
Version stylisée de CalendarMonthView avec une apparence par défaut.

### [CalendarWeekViewStyled](./calendar-week-view-styled.md)
Version stylisée de CalendarWeekView avec une apparence par défaut.

### [CalendarNavigationStyled](./calendar-navigation-styled.md)
Version stylisée de CalendarNavigation avec une apparence par défaut.

### [CalendarEventsStyled](./calendar-events-styled.md)
Version stylisée de CalendarEvents avec une apparence par défaut.

### [ReactCalendar](./react-calendar.md)
Composant d'assemblage qui intègre tous les composants styled et le provider pour une expérience clé en main.

## Utilisation avec les composants headless

```tsx
import { 
  CalendarProvider, 
  CalendarMonthView, 
  CalendarNavigation, 
  CalendarEvents 
} from '@calendar/react';

function MyCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar">
        <CalendarNavigation />
        <CalendarMonthView />
        <CalendarEvents />
      </div>
    </CalendarProvider>
  );
}
```

## Utilisation avec les composants styled

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
        <CalendarMonthViewStyled />
        <CalendarEventsStyled />
      </div>
    </CalendarProvider>
  );
}
```

## Utilisation du composant tout-en-un

```tsx
import { ReactCalendar } from '@calendar/react';

function MyCalendar() {
  return (
    <ReactCalendar />
  );
}
```

## Personnalisation

### Personnalisation des composants headless

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar">
        <CalendarNavigation 
          renderPrevButton={() => <button>Précédent</button>}
          renderNextButton={() => <button>Suivant</button>}
        />
        <CalendarMonthView 
          renderDay={({ day }) => (
            <div className={`my-day ${day.isToday ? 'today' : ''}`}>
              {day.dayOfMonth}
            </div>
          )}
        />
      </div>
    </CalendarProvider>
  );
}
```

### Personnalisation des composants styled

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar">
        <CalendarNavigationStyled 
          className="my-navigation"
          buttonClassName="my-button"
        />
        <CalendarMonthViewStyled 
          className="my-grid"
          dayClassName={day => 
            day.isToday ? 'today-cell' : 'normal-cell'
          }
        />
      </div>
    </CalendarProvider>
  );
}
```

## Prochaines étapes

- Consultez l'[architecture](../architecture.md) pour comprendre le fonctionnement interne
- Découvrez les détails de chaque composant dans les pages suivantes
- Apprenez à utiliser les [hooks](../hooks/README.md) pour plus de contrôle
- Consultez les [exemples](../examples/README.md) pour des cas d'utilisation concrets 