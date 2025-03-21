# useCalendar

Le hook `useCalendar` est le hook principal qui initialise et configure le calendrier. Il est utilisé au niveau racine de l'application pour fournir le contexte à tous les composants headless.

## API

```tsx
interface UseCalendarOptions {
  /**
   * Date initiale du calendrier
   */
  initialDate?: Date;

  /**
   * Vue initiale du calendrier
   */
  initialView?: CalendarView;

  /**
   * Événements initiaux
   */
  initialEvents?: CalendarEvent[];

  /**
   * Fonction appelée lorsque la vue change
   */
  onViewChange?: (view: CalendarView) => void;

  /**
   * Fonction appelée lorsque la date change
   */
  onDateChange?: (date: Date) => void;

  /**
   * Fonction appelée lorsqu'une date est sélectionnée
   */
  onSelectDate?: (date: Date) => void;

  /**
   * Fonction appelée lorsqu'un événement est ajouté
   */
  onEventAdd?: (event: CalendarEvent) => void;

  /**
   * Fonction appelée lorsqu'un événement est supprimé
   */
  onEventDelete?: (eventId: string) => void;
}

interface UseCalendarReturn {
  // État
  currentDate: Date;
  view: CalendarView;
  events: CalendarEvent[];
  selectedDate: Date | null;

  // Actions
  goToNext: () => void;
  goToPrev: () => void;
  goToToday: () => void;
  setView: (view: CalendarView) => void;
  selectDate: (date: Date | null) => void;
  addEvent: (event: CalendarEvent) => void;
  deleteEvent: (eventId: string) => void;

  // Utilitaires
  getMonthGrid: () => CalendarDay[][];
  getWeekGrid: () => CalendarDay[][];
  getEventsForDate: (date: Date) => CalendarEvent[];
}
```

## Utilisation de base

```tsx
import { useCalendar } from '@calendar/react';

function Calendar() {
  const calendar = useCalendar({
    initialDate: new Date(),
    initialView: 'month',
    onViewChange: (view) => console.log('Vue changée:', view),
    onDateChange: (date) => console.log('Date changée:', date)
  });

  return (
    <CalendarProvider value={calendar}>
      <div className="calendar">
        <CalendarNavigation />
        <CalendarGrid />
      </div>
    </CalendarProvider>
  );
}
```

## Gestion des événements

```tsx
function Calendar() {
  const calendar = useCalendar({
    initialEvents: [
      {
        id: '1',
        title: 'Réunion',
        start: new Date(),
        end: new Date(),
        allDay: false
      }
    ],
    onEventAdd: (event) => console.log('Événement ajouté:', event),
    onEventDelete: (eventId) => console.log('Événement supprimé:', eventId)
  });

  return (
    <CalendarProvider value={calendar}>
      <div className="calendar">
        <CalendarNavigation />
        <CalendarGrid />
        <CalendarEvents />
      </div>
    </CalendarProvider>
  );
}
```

## Bonnes pratiques

1. **Utilisation au niveau racine**
   - Utilisez `useCalendar` uniquement au niveau racine de votre application
   - Passez le résultat au `CalendarProvider`

2. **Configuration initiale**
   - Définissez les valeurs initiales via les options
   - Configurez les callbacks pour les événements importants

3. **Composants headless**
   - Utilisez `useCalendarContext` dans les composants headless
   - Ne passez pas les données en props

## Exemple complet

```tsx
import { useCalendar } from '@calendar/react';
import { CalendarProvider } from '@calendar/react';
import { CalendarNavigation } from '@calendar/react';
import { CalendarGrid } from '@calendar/react';
import { CalendarEvents } from '@calendar/react';

function Calendar() {
  const calendar = useCalendar({
    initialDate: new Date(),
    initialView: 'month',
    initialEvents: [],
    onViewChange: (view) => {
      console.log('Vue changée:', view);
    },
    onDateChange: (date) => {
      console.log('Date changée:', date);
    },
    onSelectDate: (date) => {
      console.log('Date sélectionnée:', date);
    },
    onEventAdd: (event) => {
      console.log('Événement ajouté:', event);
    },
    onEventDelete: (eventId) => {
      console.log('Événement supprimé:', eventId);
    }
  });

  return (
    <CalendarProvider value={calendar}>
      <div className="calendar">
        <CalendarNavigation />
        <CalendarGrid />
        <CalendarEvents />
      </div>
    </CalendarProvider>
  );
}
``` 