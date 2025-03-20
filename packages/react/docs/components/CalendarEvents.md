# CalendarEvents

Le `CalendarEvents` est le composant qui gère l'affichage et la gestion des événements dans le calendrier. Il permet d'afficher les événements associés à chaque jour et de gérer leur ajout/suppression.

## Props

```tsx
interface CalendarEventsProps {
  // Classe CSS pour le conteneur des événements
  className?: string;
  // Classe CSS pour le conteneur de la liste des événements
  listClassName?: string;
  // Classe CSS pour chaque événement
  eventClassName?: string;
  // Fonction de rendu personnalisée pour chaque événement
  renderEvent?: (event: CalendarEvent) => React.ReactNode;
  // Fonction de rendu personnalisée pour le formulaire d'ajout d'événement
  renderEventForm?: (onSubmit: (event: CalendarEvent) => void) => React.ReactNode;
  // Format de l'heure des événements
  timeFormat?: string;
}
```

## Utilisation de base

```tsx
import { CalendarEvents } from '@calendar/react';

function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarEvents />
    </CalendarProvider>
  );
}
```

## Personnalisation de l'apparence

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarEvents
        className="my-events"
        listClassName="my-events-list"
        eventClassName="my-event"
        timeFormat="HH:mm"
      />
    </CalendarProvider>
  );
}
```

## Rendu personnalisé des événements

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarEvents
        renderEvent={(event) => (
          <div className="event-item">
            <span className="event-time">
              {event.start.toLocaleTimeString()}
            </span>
            <span className="event-title">{event.title}</span>
            <button 
              className="delete-button"
              onClick={() => handleDeleteEvent(event.id)}
            >
              ×
            </button>
          </div>
        )}
      />
    </CalendarProvider>
  );
}
```

## Rendu personnalisé du formulaire d'ajout

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarEvents
        renderEventForm={(onSubmit) => (
          <form 
            className="event-form"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              onSubmit({
                id: Date.now().toString(),
                title: formData.get('title') as string,
                start: new Date(formData.get('start') as string),
                end: new Date(formData.get('end') as string),
              });
            }}
          >
            <input
              type="text"
              name="title"
              placeholder="Titre de l'événement"
              required
            />
            <input
              type="datetime-local"
              name="start"
              required
            />
            <input
              type="datetime-local"
              name="end"
              required
            />
            <button type="submit">Ajouter</button>
          </form>
        )}
      />
    </CalendarProvider>
  );
}
```

## Styles CSS recommandés

```css
.calendar-events {
  padding: 1rem;
  background-color: white;
  border-left: 1px solid #e5e7eb;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
}

.event-time {
  font-size: 0.875rem;
  color: #6b7280;
}

.event-title {
  flex: 1;
  font-weight: 500;
}

.delete-button {
  padding: 0.25rem 0.5rem;
  background-color: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.event-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
}

.event-form input {
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.event-form button {
  padding: 0.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}
```

## Accessibilité

Le `CalendarEvents` implémente les bonnes pratiques d'accessibilité :

- Utilisation de `role="list"` pour la liste des événements
- Utilisation de `role="listitem"` pour chaque événement
- Labels ARIA appropriés pour les boutons et formulaires
- Support de la navigation au clavier
- Messages d'erreur et d'aide pour les formulaires

## Exemple complet avec styles

```tsx
import { CalendarProvider, CalendarEvents } from '@calendar/react';
import './styles.css';

function MyCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar-container">
        <div className="calendar-main">
          {/* Autres composants du calendrier */}
        </div>
        <CalendarEvents
          className="calendar-events"
          listClassName="events-list"
          eventClassName="event-item"
          timeFormat="HH:mm"
          renderEvent={(event) => (
            <div className="event-item">
              <span className="event-time">
                {event.start.toLocaleTimeString()}
              </span>
              <span className="event-title">{event.title}</span>
              <button 
                className="delete-button"
                onClick={() => handleDeleteEvent(event.id)}
                aria-label={`Supprimer l'événement ${event.title}`}
              >
                ×
              </button>
            </div>
          )}
          renderEventForm={(onSubmit) => (
            <form 
              className="event-form"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                onSubmit({
                  id: Date.now().toString(),
                  title: formData.get('title') as string,
                  start: new Date(formData.get('start') as string),
                  end: new Date(formData.get('end') as string),
                });
              }}
            >
              <input
                type="text"
                name="title"
                placeholder="Titre de l'événement"
                required
                aria-label="Titre de l'événement"
              />
              <input
                type="datetime-local"
                name="start"
                required
                aria-label="Date et heure de début"
              />
              <input
                type="datetime-local"
                name="end"
                required
                aria-label="Date et heure de fin"
              />
              <button type="submit">Ajouter</button>
            </form>
          )}
        />
      </div>
    </CalendarProvider>
  );
}
```

```css
.calendar-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.calendar-main {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.calendar-events {
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.event-item:hover {
  background-color: #e5e7eb;
}

.event-time {
  font-size: 0.875rem;
  color: #6b7280;
  min-width: 60px;
}

.event-title {
  flex: 1;
  font-weight: 500;
  color: #111827;
}

.delete-button {
  padding: 0.25rem 0.5rem;
  background-color: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-button:hover {
  background-color: #fecaca;
}

.event-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  margin-top: 1rem;
}

.event-form input {
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.event-form input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.event-form button {
  padding: 0.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.event-form button:hover {
  background-color: #2563eb;
}
``` 