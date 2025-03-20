# Calendrier avec événements

Cet exemple montre comment créer un calendrier qui gère des événements en utilisant les composants headless de @calendar/react. Il inclut l'ajout, la suppression et l'affichage des événements.

## Description

Le calendrier avec événements comprend :
- Une grille de calendrier avec affichage des événements
- Un formulaire pour ajouter de nouveaux événements
- La possibilité de supprimer des événements
- Un design moderne avec des indicateurs visuels pour les événements

## Code

```tsx
import { useState } from 'react';
import {
  CalendarProvider,
  CalendarNavigation,
  CalendarGrid,
  CalendarEvents,
} from '@calendar/react';
import './styles.css';

interface Event {
  id: string;
  title: string;
  date: Date;
  description?: string;
}

function CalendarWithEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
  });

  const handleAddEvent = (date: Date) => {
    if (!newEvent.title.trim()) return;

    const event: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEvent.title,
      date,
      description: newEvent.description,
    };

    setEvents([...events, event]);
    setNewEvent({ title: '', description: '' });
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <CalendarProvider>
      <div className="calendar-container">
        <CalendarNavigation
          className="calendar-navigation"
          buttonClassName="nav-button"
          dateFormat="MMMM YYYY"
        />
        <div className="calendar-content">
          <CalendarGrid
            className="calendar-grid"
            headerClassName="calendar-header"
            cellClassName="calendar-cell"
            renderCell={(day) => (
              <div
                className={`
                  day-cell
                  ${day.isToday ? 'today' : ''}
                  ${!day.isCurrentMonth ? 'other-month' : ''}
                `}
              >
                <span className="day-number">{day.dayOfMonth}</span>
                {day.isCurrentMonth && (
                  <span className="day-name">{day.dayName}</span>
                )}
                <CalendarEvents
                  date={day.date}
                  events={events.filter(
                    (event) =>
                      event.date.toDateString() === day.date.toDateString()
                  )}
                  renderEvent={(event) => (
                    <div className="event-item">
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
              </div>
            )}
          />
          <div className="event-form">
            <h3>Ajouter un événement</h3>
            <input
              type="text"
              placeholder="Titre de l'événement"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="event-input"
            />
            <textarea
              placeholder="Description (optionnel)"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="event-textarea"
            />
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
}

export default CalendarWithEvents;
```

## Styles

```css
.calendar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.calendar-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1rem;
  margin-top: 1rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #e5e7eb;
  padding: 1px;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #f3f4f6;
  padding: 1px;
}

.calendar-header > div {
  padding: 0.5rem;
  text-align: center;
  font-weight: 500;
  color: #6b7280;
}

.calendar-cell {
  background-color: white;
  padding: 0.5rem;
  min-height: 120px;
}

.day-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  min-height: 120px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
}

.day-cell:hover {
  background-color: #f9fafb;
}

.day-cell.today {
  background-color: #f0f9ff;
}

.day-cell.other-month {
  color: #9ca3af;
}

.day-number {
  font-size: 1.25rem;
  font-weight: 500;
  color: #111827;
}

.day-name {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.event-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
  margin-top: 0.25rem;
  background-color: #e0f2fe;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.event-title {
  color: #0369a1;
  font-weight: 500;
}

.delete-button {
  background: none;
  border: none;
  color: #0369a1;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0 0.25rem;
}

.delete-button:hover {
  color: #0c4a6e;
}

.event-form {
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.event-form h3 {
  margin: 0 0 1rem 0;
  color: #111827;
  font-size: 1.25rem;
}

.event-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.event-textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  min-height: 100px;
  resize: vertical;
}

@media (max-width: 768px) {
  .calendar-content {
    grid-template-columns: 1fr;
  }

  .event-form {
    margin-top: 1rem;
  }
}
```

## Utilisation

1. **Installation des dépendances**

```bash
npm install @calendar/react
```

2. **Importation des composants**

```tsx
import {
  CalendarProvider,
  CalendarNavigation,
  CalendarGrid,
  CalendarEvents,
} from '@calendar/react';
```

3. **Création du composant**

```tsx
function MyCalendar() {
  const [events, setEvents] = useState([]);

  return (
    <CalendarProvider>
      <div className="calendar-container">
        <CalendarNavigation />
        <div className="calendar-content">
          <CalendarGrid
            renderCell={(day) => (
              <div className="day-cell">
                <span>{day.dayOfMonth}</span>
                <CalendarEvents
                  date={day.date}
                  events={events.filter(
                    (event) =>
                      event.date.toDateString() === day.date.toDateString()
                  )}
                  renderEvent={(event) => (
                    <div className="event-item">
                      <span>{event.title}</span>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        ×
                      </button>
                    </div>
                  )}
                />
              </div>
            )}
          />
          <div className="event-form">
            {/* Formulaire d'ajout d'événement */}
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
}
```

## Personnalisation

Vous pouvez personnaliser l'apparence et le comportement du calendrier avec événements en :

1. **Modifiant les styles des événements** : Ajustez les couleurs, les espacements et les animations
2. **Ajoutant des fonctionnalités** : Implémentez la modification d'événements, les catégories, etc.
3. **Personnalisant le formulaire** : Ajoutez des champs supplémentaires ou modifiez la mise en page

## Exemple de personnalisation

```tsx
function CustomCalendarWithEvents() {
  return (
    <CalendarProvider>
      <div className="calendar-container">
        <CalendarNavigation
          renderPrevButton={() => (
            <button className="custom-nav-button">
              <span>←</span>
            </button>
          )}
          renderNextButton={() => (
            <button className="custom-nav-button">
              <span>→</span>
            </button>
          )}
        />
        <div className="calendar-content">
          <CalendarGrid
            renderCell={(day) => (
              <div className="custom-day-cell">
                <span className="custom-day-number">
                  {day.dayOfMonth}
                </span>
                <CalendarEvents
                  date={day.date}
                  events={events.filter(
                    (event) =>
                      event.date.toDateString() === day.date.toDateString()
                  )}
                  renderEvent={(event) => (
                    <div className="custom-event-item">
                      <span className="custom-event-title">
                        {event.title}
                      </span>
                      <button
                        className="custom-delete-button"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        ×
                      </button>
                    </div>
                  )}
                />
              </div>
            )}
          />
          <div className="custom-event-form">
            {/* Formulaire personnalisé */}
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
}
```

## Prochaines étapes

- Découvrez comment [personnaliser](./custom-calendar.md) davantage le calendrier
- Apprenez à ajouter des fonctionnalités avancées comme la modification d'événements
- Consultez la documentation des [composants](../components/README.md) pour plus d'options 