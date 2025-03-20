# CalendarNavigation

Le `CalendarNavigation` est le composant qui gère la navigation entre les mois/semaines et le changement de vue. Il permet aux utilisateurs de naviguer dans le calendrier et de basculer entre les vues mois et semaine.

## Props

```tsx
interface CalendarNavigationProps {
  // Classe CSS pour le conteneur de navigation
  className?: string;
  // Classe CSS pour le conteneur des boutons
  buttonClassName?: string;
  // Fonction de rendu personnalisée pour le bouton précédent
  renderPrevButton?: () => React.ReactNode;
  // Fonction de rendu personnalisée pour le bouton suivant
  renderNextButton?: () => React.ReactNode;
  // Fonction de rendu personnalisée pour le bouton de vue
  renderViewButton?: (view: 'month' | 'week') => React.ReactNode;
  // Format de la date affichée
  dateFormat?: string;
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

## Personnalisation de l'apparence

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarNavigation
        className="my-navigation"
        buttonClassName="my-button"
        dateFormat="MMMM YYYY"
      />
    </CalendarProvider>
  );
}
```

## Rendu personnalisé des boutons

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <CalendarNavigation
        renderPrevButton={() => (
          <button className="nav-button">
            <span>←</span>
          </button>
        )}
        renderNextButton={() => (
          <button className="nav-button">
            <span>→</span>
          </button>
        )}
        renderViewButton={(view) => (
          <button className="view-button">
            {view === 'month' ? 'Vue Mois' : 'Vue Semaine'}
          </button>
        )}
      />
    </CalendarProvider>
  );
}
```

## Styles CSS recommandés

```css
.calendar-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.nav-button {
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-button:hover {
  background-color: #f9fafb;
}

.view-button {
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.view-button:hover {
  background-color: #f9fafb;
}

.current-date {
  font-size: 1.25rem;
  font-weight: 500;
}
```

## Accessibilité

Le `CalendarNavigation` implémente les bonnes pratiques d'accessibilité :

- Utilisation de `role="navigation"` pour le conteneur principal
- Boutons avec des labels ARIA appropriés
- Support de la navigation au clavier
- États ARIA pour les boutons actifs/inactifs

## Exemple complet avec styles

```tsx
import { CalendarProvider, CalendarNavigation } from '@calendar/react';
import './styles.css';

function MyCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar-container">
        <CalendarNavigation
          className="calendar-navigation"
          buttonClassName="nav-button"
          dateFormat="MMMM YYYY"
          renderPrevButton={() => (
            <button className="nav-button" aria-label="Mois précédent">
              <span>←</span>
            </button>
          )}
          renderNextButton={() => (
            <button className="nav-button" aria-label="Mois suivant">
              <span>→</span>
            </button>
          )}
          renderViewButton={(view) => (
            <button 
              className="view-button"
              aria-label={`Basculer vers la vue ${view === 'month' ? 'semaine' : 'mois'}`}
            >
              {view === 'month' ? 'Vue Mois' : 'Vue Semaine'}
            </button>
          )}
        />
        {/* Autres composants du calendrier */}
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

.current-date {
  font-size: 1.25rem;
  font-weight: 500;
  color: #111827;
}
``` 