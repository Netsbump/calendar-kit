# ReactCalendar

Le `ReactCalendar` est un composant d'assemblage qui intègre tous les composants styled et le provider pour offrir une expérience clé en main. C'est le moyen le plus simple et rapide d'ajouter un calendrier complet à votre application.

## Props

```tsx
interface ReactCalendarProps {
  // Date initiale du calendrier
  initialDate?: Date;
  
  // Vue initiale (mois ou semaine)
  initialView?: 'month' | 'week';
  
  // Événements initiaux
  initialEvents?: CalendarEvent[];
  
  // Format des noms de jours ('narrow', 'short', 'long')
  dayNameFormat?: 'narrow' | 'short' | 'long';
  
  // Si true, permet la sélection des jours
  enableDaySelection?: boolean;
  
  // Taille des cellules des jours ('small', 'medium', 'large')
  daySize?: 'small' | 'medium' | 'large';
  
  // Style de la sélection des jours ('outline', 'fill')
  selectionStyle?: 'outline' | 'fill';
  
  // Si true, affiche les jours des mois adjacents
  showAdjacentMonths?: boolean;
  
  // Si true, affiche les indicateurs d'événements
  showEventIndicators?: boolean;
  
  // Classe CSS pour le conteneur principal
  className?: string;
  
  // Classe CSS pour la navigation
  navigationClassName?: string;
  
  // Classe CSS pour la vue principale (mois ou semaine)
  viewClassName?: string;
  
  // Classe CSS pour la section des événements
  eventsClassName?: string;
  
  // Callback appelé lors du changement de date
  onDateChange?: (date: Date) => void;
  
  // Callback appelé lors du changement de vue
  onViewChange?: (view: 'month' | 'week') => void;
  
  // Callback appelé lors de la sélection d'un jour
  onDaySelect?: (date: Date) => void;
  
  // Callback appelé lors de l'ajout d'un événement
  onEventAdd?: (event: CalendarEvent) => void;
  
  // Callback appelé lors de la suppression d'un événement
  onEventDelete?: (eventId: string) => void;
}
```

## Utilisation de base

```tsx
import { ReactCalendar } from '@calendar/react';

function App() {
  return (
    <div className="app">
      <h1>Mon Application</h1>
      <ReactCalendar />
    </div>
  );
}
```

## Utilisation avec des événements

```tsx
import { ReactCalendar } from '@calendar/react';

function App() {
  const events = [
    {
      id: '1',
      title: 'Réunion d\'équipe',
      start: new Date(2023, 5, 15, 10, 0),
      end: new Date(2023, 5, 15, 11, 30),
    },
    {
      id: '2',
      title: 'Déjeuner',
      start: new Date(2023, 5, 15, 12, 0),
      end: new Date(2023, 5, 15, 13, 0),
    },
  ];

  const handleEventAdd = (event) => {
    console.log('Nouvel événement:', event);
    // Ajouter l'événement à votre état ou base de données
  };

  return (
    <div className="app">
      <h1>Calendrier des événements</h1>
      <ReactCalendar 
        initialEvents={events}
        onEventAdd={handleEventAdd}
      />
    </div>
  );
}
```

## Personnalisation de l'apparence

```tsx
import { ReactCalendar } from '@calendar/react';
import './calendar-styles.css';

function App() {
  return (
    <div className="app">
      <h1>Calendrier personnalisé</h1>
      <ReactCalendar 
        className="my-calendar"
        navigationClassName="my-navigation"
        viewClassName="my-view"
        eventsClassName="my-events"
        daySize="large"
        selectionStyle="fill"
        dayNameFormat="long"
        showAdjacentMonths={true}
        showEventIndicators={true}
      />
    </div>
  );
}
```

## Intégration avec une application

```tsx
import { useState, useEffect } from 'react';
import { ReactCalendar } from '@calendar/react';
import { fetchEvents, saveEvent, deleteEvent } from './api';

function CalendarApp() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEvents();
  }, []);

  const handleEventAdd = async (event) => {
    try {
      const savedEvent = await saveEvent(event);
      setEvents(prev => [...prev, savedEvent]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'événement:', error);
    }
  };

  const handleEventDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(prev => prev.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement:', error);
    }
  };

  if (isLoading) {
    return <div>Chargement du calendrier...</div>;
  }

  return (
    <div className="calendar-app">
      <h1>Calendrier des événements</h1>
      <ReactCalendar 
        initialEvents={events}
        onEventAdd={handleEventAdd}
        onEventDelete={handleEventDelete}
        enableDaySelection={true}
        onDaySelect={(date) => console.log('Jour sélectionné:', date)}
      />
    </div>
  );
}
```

## Avec la vue semaine

```tsx
import { ReactCalendar } from '@calendar/react';

function App() {
  return (
    <div className="app">
      <h1>Calendrier hebdomadaire</h1>
      <ReactCalendar initialView="week" />
    </div>
  );
}
```

## Personnalisation avancée

Si vous avez besoin d'une personnalisation plus poussée que ce que `ReactCalendar` permet, vous pouvez toujours utiliser les composants styled individuellement :

```tsx
import { 
  CalendarProvider, 
  CalendarMonthViewStyled, 
  CalendarWeekViewStyled,
  CalendarNavigationStyled, 
  CalendarEventsStyled 
} from '@calendar/react';
import { useState } from 'react';

function CustomCalendar() {
  const [view, setView] = useState('month');
  
  return (
    <CalendarProvider initialView={view} onViewChange={setView}>
      <div className="custom-calendar-container">
        <div className="custom-header">
          <h2>Mon Calendrier Personnalisé</h2>
          <CalendarNavigationStyled className="custom-navigation" />
        </div>
        
        <div className="custom-view">
          {view === 'month' ? (
            <CalendarMonthViewStyled className="custom-month-view" />
          ) : (
            <CalendarWeekViewStyled className="custom-week-view" />
          )}
        </div>
        
        <div className="custom-sidebar">
          <CalendarEventsStyled className="custom-events" />
          <div className="custom-controls">
            <button onClick={() => setView('month')}>Vue Mois</button>
            <button onClick={() => setView('week')}>Vue Semaine</button>
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
}
```

## Bonnes pratiques

1. **Commencez simple** : Utilisez `ReactCalendar` avec des props minimales pour démarrer, puis ajoutez des personnalisations progressivement.

2. **Gestion des événements** : Utilisez les callbacks `onEventAdd` et `onEventDelete` pour synchroniser les événements avec votre état ou votre backend.

3. **Performance** : Si vous avez beaucoup d'événements, pensez à les paginer ou à les filtrer côté serveur plutôt que de tous les charger à la fois.

4. **Évolution vers une personnalisation avancée** : Si vous avez besoin de plus de flexibilité, passez aux composants styled individuels, puis aux composants headless si nécessaire.

5. **Accessibilité** : Le `ReactCalendar` intègre des fonctionnalités d'accessibilité par défaut, assurez-vous de ne pas les désactiver lors de vos personnalisations. 