# Calendrier personnalisé

Cet exemple montre comment créer un calendrier hautement personnalisé en utilisant les composants headless de @calendar/react. Il inclut des fonctionnalités avancées comme la sélection de plage de dates, les vues personnalisées et les thèmes.

## Description

Le calendrier personnalisé comprend :
- Une sélection de plage de dates avec indicateurs visuels
- Une vue personnalisée avec des informations supplémentaires
- Un thème sombre/clair
- Des animations et transitions fluides
- Une barre latérale personnalisée

## Code

```tsx
import { useState, useCallback } from 'react';
import {
  CalendarProvider,
  CalendarNavigation,
  CalendarGrid,
  CalendarEvents,
} from '@calendar/react';
import './styles.css';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

function CustomCalendar() {
  const [dateRange, setDateRange] = useState<DateRange>({
    start: null,
    end: null,
  });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleDateClick = useCallback((date: Date) => {
    setDateRange((prev) => {
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: null };
      }
      return {
        start: prev.start,
        end: date,
      };
    });
  }, []);

  const isDateInRange = useCallback(
    (date: Date) => {
      if (!dateRange.start || !dateRange.end) return false;
      return date >= dateRange.start && date <= dateRange.end;
    },
    [dateRange]
  );

  const isDateStart = useCallback(
    (date: Date) => {
      return dateRange.start?.toDateString() === date.toDateString();
    },
    [dateRange.start]
  );

  const isDateEnd = useCallback(
    (date: Date) => {
      return dateRange.end?.toDateString() === date.toDateString();
    },
    [dateRange.end]
  );

  return (
    <CalendarProvider>
      <div className={`calendar-container ${theme}`}>
        <div className="calendar-header">
          <CalendarNavigation
            className="calendar-navigation"
            buttonClassName="nav-button"
            dateFormat="MMMM YYYY"
          />
          <button
            className="theme-toggle"
            onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
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
                  ${isDateInRange(day.date) ? 'in-range' : ''}
                  ${isDateStart(day.date) ? 'range-start' : ''}
                  ${isDateEnd(day.date) ? 'range-end' : ''}
                `}
                onClick={() => handleDateClick(day.date)}
              >
                <span className="day-number">{day.dayOfMonth}</span>
                {day.isCurrentMonth && (
                  <span className="day-name">{day.dayName}</span>
                )}
                <div className="day-info">
                  <span className="day-events">
                    {day.events?.length || 0} événements
                  </span>
                  {day.isToday && <span className="today-badge">Aujourd'hui</span>}
                </div>
              </div>
            )}
          />
          <div className="calendar-sidebar">
            <div className="sidebar-section">
              <h3>Plage sélectionnée</h3>
              {dateRange.start && dateRange.end ? (
                <p>
                  Du {dateRange.start.toLocaleDateString()} au{' '}
                  {dateRange.end.toLocaleDateString()}
                </p>
              ) : (
                <p>Sélectionnez une plage de dates</p>
              )}
            </div>
            <div className="sidebar-section">
              <h3>Statistiques</h3>
              <ul className="stats-list">
                <li>Total des événements: 12</li>
                <li>Événements aujourd'hui: 3</li>
                <li>Événements cette semaine: 8</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
}

export default CustomCalendar;
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
  transition: all 0.3s ease;
}

.calendar-container.dark {
  background-color: #1f2937;
  color: #f9fafb;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.calendar-navigation {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-button {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.dark .nav-button {
  background-color: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

.theme-toggle {
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  transition: transform 0.2s;
}

.theme-toggle:hover {
  transform: scale(1.1);
}

.calendar-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #e5e7eb;
  padding: 1px;
  border-radius: 0.5rem;
  overflow: hidden;
}

.dark .calendar-grid {
  background-color: #374151;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #f3f4f6;
  padding: 1px;
}

.dark .calendar-header {
  background-color: #374151;
}

.calendar-header > div {
  padding: 0.5rem;
  text-align: center;
  font-weight: 500;
  color: #6b7280;
}

.dark .calendar-header > div {
  color: #9ca3af;
}

.calendar-cell {
  background-color: white;
  padding: 0.5rem;
  min-height: 120px;
}

.dark .calendar-cell {
  background-color: #1f2937;
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

.dark .day-cell {
  border-color: #374151;
}

.day-cell:hover {
  background-color: #f3f4f6;
}

.dark .day-cell:hover {
  background-color: #374151;
}

.day-cell.today {
  background-color: #e0f2fe;
}

.dark .day-cell.today {
  background-color: #0c4a6e;
}

.day-cell.other-month {
  color: #9ca3af;
}

.dark .day-cell.other-month {
  color: #6b7280;
}

.day-cell.in-range {
  background-color: #e0f2fe;
}

.dark .day-cell.in-range {
  background-color: #0c4a6e;
}

.day-cell.range-start,
.day-cell.range-end {
  background-color: #3b82f6;
  color: white;
}

.day-number {
  font-size: 1.25rem;
  font-weight: 500;
  color: #111827;
}

.dark .day-number {
  color: #f9fafb;
}

.day-name {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.dark .day-name {
  color: #9ca3af;
}

.day-info {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.dark .day-info {
  color: #9ca3af;
}

.today-badge {
  background-color: #3b82f6;
  color: white;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.calendar-sidebar {
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.dark .calendar-sidebar {
  background-color: #374151;
  border-color: #4b5563;
}

.sidebar-section {
  margin-bottom: 1.5rem;
}

.sidebar-section h3 {
  margin: 0 0 0.5rem 0;
  color: #111827;
  font-size: 1rem;
}

.dark .sidebar-section h3 {
  color: #f9fafb;
}

.stats-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.stats-list li {
  padding: 0.25rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.dark .stats-list li {
  color: #9ca3af;
}

@media (max-width: 768px) {
  .calendar-content {
    grid-template-columns: 1fr;
  }

  .calendar-sidebar {
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
function MyCustomCalendar() {
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });

  return (
    <CalendarProvider>
      <div className="calendar-container">
        <CalendarNavigation />
        <div className="calendar-content">
          <CalendarGrid
            renderCell={(day) => (
              <div
                className={`
                  day-cell
                  ${isDateInRange(day.date) ? 'in-range' : ''}
                  ${isDateStart(day.date) ? 'range-start' : ''}
                  ${isDateEnd(day.date) ? 'range-end' : ''}
                `}
                onClick={() => handleDateClick(day.date)}
              >
                <span>{day.dayOfMonth}</span>
                <div className="day-info">
                  <span>{day.events?.length || 0} événements</span>
                </div>
              </div>
            )}
          />
          <div className="calendar-sidebar">
            {/* Contenu de la barre latérale */}
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
}
```

## Personnalisation

Vous pouvez personnaliser le calendrier en :

1. **Ajoutant des fonctionnalités** :
   - Sélection de plage de dates
   - Thème sombre/clair
   - Statistiques et informations supplémentaires
   - Animations et transitions

2. **Modifiant l'apparence** :
   - Couleurs et thèmes
   - Mise en page et espacement
   - Typographie et icônes
   - Responsive design

3. **Améliorant l'expérience utilisateur** :
   - Retours visuels
   - Interactions et animations
   - Accessibilité
   - Performance

## Exemple de personnalisation avancée

```tsx
function AdvancedCustomCalendar() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <CalendarProvider>
      <div className={`calendar-container ${theme}`}>
        <div className="calendar-header">
          <div className="view-controls">
            <button
              className={view === 'month' ? 'active' : ''}
              onClick={() => setView('month')}
            >
              Mois
            </button>
            <button
              className={view === 'week' ? 'active' : ''}
              onClick={() => setView('week')}
            >
              Semaine
            </button>
            <button
              className={view === 'day' ? 'active' : ''}
              onClick={() => setView('day')}
            >
              Jour
            </button>
          </div>
          <CalendarNavigation />
          <button
            className="theme-toggle"
            onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <div className="calendar-content">
          <CalendarGrid
            view={view}
            renderCell={(day) => (
              <div
                className={`
                  day-cell
                  ${isDateInRange(day.date) ? 'in-range' : ''}
                  ${isDateStart(day.date) ? 'range-start' : ''}
                  ${isDateEnd(day.date) ? 'range-end' : ''}
                `}
                onClick={() => handleDateClick(day.date)}
              >
                <span className="day-number">{day.dayOfMonth}</span>
                <div className="day-info">
                  <span className="day-events">
                    {day.events?.length || 0} événements
                  </span>
                  {day.isToday && <span className="today-badge">Aujourd'hui</span>}
                </div>
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
          <div className="calendar-sidebar">
            <div className="sidebar-section">
              <h3>Plage sélectionnée</h3>
              {dateRange.start && dateRange.end ? (
                <p>
                  Du {dateRange.start.toLocaleDateString()} au{' '}
                  {dateRange.end.toLocaleDateString()}
                </p>
              ) : (
                <p>Sélectionnez une plage de dates</p>
              )}
            </div>
            <div className="sidebar-section">
              <h3>Statistiques</h3>
              <ul className="stats-list">
                <li>Total des événements: 12</li>
                <li>Événements aujourd'hui: 3</li>
                <li>Événements cette semaine: 8</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
}
```

## Prochaines étapes

- Découvrez comment ajouter des [événements](./calendar-with-events.md)
- Apprenez à personnaliser davantage le calendrier avec des [composants](../components/README.md)
- Consultez la documentation des [hooks](../hooks/README.md) pour plus de fonctionnalités 