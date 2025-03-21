# CalendarNavigation

Le `CalendarNavigation` est un composant headless qui gère la navigation entre les mois/semaines et le changement de vue. Il fournit la logique et la structure, mais ne contient pas de styles.

## Props

```tsx
interface CalendarNavigationProps {
  /**
   * Classe CSS personnalisée pour le conteneur.
   * Utile pour :
   * - Utiliser des classes Tailwind
   * - Appliquer des classes CSS personnalisées
   * - Styling via des frameworks CSS-in-JS
   * - Classes conditionnelles basées sur des props/états
   */
  className?: string;

  /**
   * Styles CSS personnalisés pour le conteneur.
   * Utile pour :
   * - Styles inline React
   * - Styles dynamiques basés sur des props/états
   * - Styles spécifiques à un composant
   * - Styles qui changent fréquemment (meilleure performance)
   */
  style?: React.CSSProperties;

  /**
   * Fonction de rendu personnalisée pour le titre
   */
  renderTitle?: (currentDate: Date) => React.ReactNode;

  /**
   * Fonction de rendu personnalisée pour les boutons de navigation
   */
  renderNavigation?: (props: {
    goToPrev: () => void;
    goToToday: () => void;
    goToNext: () => void;
  }) => React.ReactNode;

  /**
   * Fonction de rendu personnalisée pour le sélecteur de vue
   */
  renderViewSelector?: (props: {
    view: CalendarView;
    onViewChange: (view: CalendarView) => void;
  }) => React.ReactNode;

  /**
   * Fonction appelée lorsque la vue change
   */
  onViewChange?: (view: CalendarView) => void;

  /**
   * Fonction appelée lorsque la date change
   */
  onDateChange?: (date: Date) => void;
}
```

## Utilisation de base

```tsx
import { CalendarNavigation } from '@calendar/react';

function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarNavigation />
    </CalendarProvider>
  );
}
```

## Personnalisation du rendu

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarNavigation
        renderTitle={(date) => (
          <h2 className="calendar-title">
            {new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(date)}
          </h2>
        )}
        renderNavigation={({ goToPrev, goToToday, goToNext }) => (
          <div className="navigation-buttons">
            <button onClick={goToPrev}>←</button>
            <button onClick={goToToday}>Aujourd'hui</button>
            <button onClick={goToNext}>→</button>
          </div>
        )}
        renderViewSelector={({ view, onViewChange }) => (
          <div className="view-selector">
            <button 
              onClick={() => onViewChange('month')}
              className={view === 'month' ? 'active' : ''}
            >
              Mois
            </button>
            <button 
              onClick={() => onViewChange('week')}
              className={view === 'week' ? 'active' : ''}
            >
              Semaine
            </button>
          </div>
        )}
      />
    </CalendarProvider>
  );
}
```

## Utilisation avec styles

Pour une implémentation avec des styles prédéfinis, utilisez le composant styled :

```tsx
import { CalendarNavigationStyled } from '@calendar/react/examples';

function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarNavigationStyled />
    </CalendarProvider>
  );
}
```

## Bonnes pratiques

1. **Utilisation du contexte**
   - Le composant utilise `useCalendarContext` pour accéder aux données
   - Pas besoin de passer les données en props

2. **Personnalisation du rendu**
   - Utilisez les props de rendu pour personnaliser l'apparence
   - Gardez la logique dans le composant headless

3. **Gestion des événements**
   - Les callbacks sont gérés automatiquement
   - Vous pouvez ajouter vos propres callbacks si nécessaire

## Exemple complet avec styles personnalisés

```tsx
import { CalendarNavigation } from '@calendar/react';
import './styles.css';

function MyCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar-container">
        <CalendarNavigation
          className="calendar-navigation"
          renderTitle={(date) => (
            <h2 className="calendar-title">
              {new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(date)}
            </h2>
          )}
          renderNavigation={({ goToPrev, goToToday, goToNext }) => (
            <div className="navigation-buttons">
              <button 
                className="nav-button"
                onClick={goToPrev}
                aria-label="Mois précédent"
              >
                ←
              </button>
              <button 
                className="nav-button"
                onClick={goToToday}
                aria-label="Aujourd'hui"
              >
                Aujourd'hui
              </button>
              <button 
                className="nav-button"
                onClick={goToNext}
                aria-label="Mois suivant"
              >
                →
              </button>
            </div>
          )}
          renderViewSelector={({ view, onViewChange }) => (
            <div className="view-selector">
              <button 
                className={`view-button ${view === 'month' ? 'active' : ''}`}
                onClick={() => onViewChange('month')}
                aria-label="Vue mois"
              >
                Mois
              </button>
              <button 
                className={`view-button ${view === 'week' ? 'active' : ''}`}
                onClick={() => onViewChange('week')}
                aria-label="Vue semaine"
              >
                Semaine
              </button>
            </div>
          )}
        />
      </div>
    </CalendarProvider>
  );
}
```

```css
.calendar-container {
  max-width: 800px;
  margin: 0 auto;
}

.calendar-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.calendar-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: #111827;
}

.navigation-buttons {
  display: flex;
  gap: 0.5rem;
}

.nav-button,
.view-button {
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-button:hover,
.view-button:hover {
  background-color: #f9fafb;
}

.nav-button:focus,
.view-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6;
}

.view-button.active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}
``` 