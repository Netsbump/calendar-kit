# Hooks

Les hooks sont des fonctions utilitaires qui permettent d'accéder et de manipuler l'état du calendrier de manière simple et efficace.

## Liste des hooks

### [useCalendar](./useCalendar.md)
Le hook principal qui fournit toutes les fonctionnalités du calendrier.

### [useCalendarContext](./useCalendarContext.md)
Hook pour accéder au contexte du calendrier et à ses fonctionnalités.

## Utilisation de base

```tsx
import { useCalendar } from '@calendar/react';

function MyCalendar() {
  const {
    currentDate,
    currentView,
    events,
    setCurrentDate,
    setCurrentView,
    addEvent,
    deleteEvent
  } = useCalendar();

  return (
    <div>
      <p>Date actuelle: {currentDate.toLocaleDateString()}</p>
      <p>Vue actuelle: {currentView}</p>
      <p>Nombre d'événements: {events.length}</p>
    </div>
  );
}
```

## Utilisation avec le contexte

```tsx
import { useCalendarContext } from '@calendar/react';

function MyCustomComponent() {
  const { currentDate, events } = useCalendarContext();

  return (
    <div>
      <h2>Événements du {currentDate.toLocaleDateString()}</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Bonnes pratiques

1. **Utilisation dans les composants** : Les hooks doivent être utilisés uniquement dans des composants React ou d'autres hooks personnalisés.

2. **Ordre des hooks** : Les hooks doivent toujours être appelés dans le même ordre à chaque rendu.

3. **Performance** : Utilisez `useMemo` et `useCallback` pour optimiser les performances lorsque nécessaire.

4. **Gestion des erreurs** : Gérez les cas d'erreur appropriés lors de l'utilisation des hooks.

## Exemple complet

```tsx
import { useCallback, useMemo } from 'react';
import { useCalendar } from '@calendar/react';

function MyCalendar() {
  const {
    currentDate,
    currentView,
    events,
    setCurrentDate,
    setCurrentView,
    addEvent,
    deleteEvent
  } = useCalendar();

  // Mémoriser les événements du jour courant
  const todayEvents = useMemo(() => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === currentDate.toDateString();
    });
  }, [events, currentDate]);

  // Mémoriser le gestionnaire d'ajout d'événement
  const handleAddEvent = useCallback((event) => {
    try {
      addEvent(event);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'événement:', error);
    }
  }, [addEvent]);

  // Mémoriser le gestionnaire de suppression d'événement
  const handleDeleteEvent = useCallback((eventId) => {
    try {
      deleteEvent(eventId);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement:', error);
    }
  }, [deleteEvent]);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>{currentDate.toLocaleDateString()}</h2>
        <div className="view-controls">
          <button
            onClick={() => setCurrentView('month')}
            className={currentView === 'month' ? 'active' : ''}
          >
            Mois
          </button>
          <button
            onClick={() => setCurrentView('week')}
            className={currentView === 'week' ? 'active' : ''}
          >
            Semaine
          </button>
        </div>
      </div>

      <div className="calendar-events">
        <h3>Événements du jour</h3>
        {todayEvents.length === 0 ? (
          <p>Aucun événement prévu</p>
        ) : (
          <ul>
            {todayEvents.map(event => (
              <li key={event.id}>
                <span className="event-time">
                  {new Date(event.start).toLocaleTimeString()}
                </span>
                <span className="event-title">{event.title}</span>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="delete-button"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
```

## Prochaines étapes

- Découvrez les détails de chaque hook dans les pages suivantes
- Apprenez à utiliser les [composants headless](../components/README.md) avec les hooks
- Consultez les [exemples](../examples/README.md) pour des cas d'utilisation concrets 