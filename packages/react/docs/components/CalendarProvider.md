# CalendarProvider

Le `CalendarProvider` est le composant racine qui fournit le contexte et l'état global du calendrier. Il doit être utilisé comme wrapper pour tous les autres composants du calendrier.

## Props

```tsx
interface CalendarProviderProps {
  // Date initiale du calendrier
  initialDate?: Date;
  // Vue initiale (mois ou semaine)
  initialView?: 'month' | 'week';
  // Événements initiaux
  initialEvents?: CalendarEvent[];
  // Callback appelé lors du changement de date
  onDateChange?: (date: Date) => void;
  // Callback appelé lors du changement de vue
  onViewChange?: (view: 'month' | 'week') => void;
  // Callback appelé lors de l'ajout d'un événement
  onEventAdd?: (event: CalendarEvent) => void;
  // Callback appelé lors de la suppression d'un événement
  onEventDelete?: (eventId: string) => void;
  // Enfants du composant
  children: React.ReactNode;
}
```

## Utilisation de base

```tsx
import { CalendarProvider } from '@calendar/react';

function MyCalendar() {
  return (
    <CalendarProvider>
      {/* Autres composants du calendrier */}
    </CalendarProvider>
  );
}
```

## Utilisation avec des événements

```tsx
function MyCalendar() {
  const handleEventAdd = (event: CalendarEvent) => {
    console.log('Nouvel événement:', event);
  };

  const handleEventDelete = (eventId: string) => {
    console.log('Événement supprimé:', eventId);
  };

  return (
    <CalendarProvider
      initialEvents={[
        {
          id: '1',
          title: 'Réunion',
          start: new Date(),
          end: new Date(),
        },
      ]}
      onEventAdd={handleEventAdd}
      onEventDelete={handleEventDelete}
    >
      {/* Autres composants du calendrier */}
    </CalendarProvider>
  );
}
```

## Utilisation avec le hook useCalendarContext

Le `CalendarProvider` expose un contexte qui peut être utilisé via le hook `useCalendarContext` :

```tsx
import { useCalendarContext } from '@calendar/react';

function MyCustomComponent() {
  const { 
    currentDate, 
    currentView, 
    events,
    setCurrentDate,
    setCurrentView,
    addEvent,
    deleteEvent 
  } = useCalendarContext();

  return (
    <div>
      <p>Date actuelle: {currentDate.toLocaleDateString()}</p>
      <p>Vue actuelle: {currentView}</p>
      <p>Nombre d'événements: {events.length}</p>
    </div>
  );
}
```

## Bonnes pratiques

1. **Toujours wrapper les composants du calendrier** : Le `CalendarProvider` doit être le composant parent de tous les autres composants du calendrier.

2. **Gestion des événements** : Utilisez les callbacks `onEventAdd` et `onEventDelete` pour synchroniser les événements avec votre application.

3. **État initial** : Définissez l'état initial via les props `initialDate`, `initialView` et `initialEvents` pour un contrôle total sur l'état initial du calendrier.

4. **Performance** : Le `CalendarProvider` utilise React.memo pour éviter les re-rendus inutiles. Assurez-vous que les callbacks passés en props sont mémorisés avec `useCallback`.

## Exemple complet

```tsx
import { useCallback } from 'react';
import { 
  CalendarProvider, 
  CalendarGrid, 
  CalendarNavigation, 
  CalendarEvents 
} from '@calendar/react';

function MyCalendar() {
  const handleEventAdd = useCallback((event: CalendarEvent) => {
    // Synchroniser avec votre backend
    console.log('Nouvel événement:', event);
  }, []);

  const handleEventDelete = useCallback((eventId: string) => {
    // Synchroniser avec votre backend
    console.log('Événement supprimé:', eventId);
  }, []);

  return (
    <CalendarProvider
      initialDate={new Date()}
      initialView="month"
      initialEvents={[]}
      onEventAdd={handleEventAdd}
      onEventDelete={handleEventDelete}
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