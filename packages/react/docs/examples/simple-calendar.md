# Calendrier simple

Cet exemple montre comment créer un calendrier simple en utilisant le composant tout-en-un `ReactCalendar` de @calendar/react. Il s'agit de la solution la plus rapide et la plus simple pour intégrer un calendrier dans votre application.

## Description

Le calendrier simple comprend :
- Une barre de navigation avec les boutons précédent/suivant et sélection de vue
- Une vue mensuelle ou hebdomadaire du calendrier
- La mise en évidence du jour actuel et des jours sélectionnés
- Un design responsive et moderne par défaut
- Gestion des événements (affichage, ajout, suppression)

## Code

### Version de base

```tsx
import { ReactCalendar } from '@calendar/react';
import './styles.css';

function SimpleCalendar() {
  return (
    <div className="calendar-container">
      <h1>Mon Calendrier</h1>
      <ReactCalendar className="my-calendar" />
    </div>
  );
}

export default SimpleCalendar;
```

### Version avec personnalisation basique

```tsx
import { ReactCalendar } from '@calendar/react';
import './styles.css';

function SimpleCalendar() {
  const handleDaySelect = (date) => {
    console.log('Jour sélectionné:', date);
  };

  return (
    <div className="calendar-container">
      <h1>Mon Calendrier</h1>
      <ReactCalendar 
        className="my-calendar"
        initialView="month"
        dayNameFormat="short"
        enableDaySelection={true}
        onDaySelect={handleDaySelect}
        daySize="medium"
        selectionStyle="fill"
      />
    </div>
  );
}

export default SimpleCalendar;
```

### Version avec événements

```tsx
import { ReactCalendar } from '@calendar/react';
import { useState } from 'react';
import './styles.css';

function SimpleCalendar() {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Réunion',
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
    },
  ]);

  const handleEventAdd = (event) => {
    setEvents([...events, { ...event, id: Math.random().toString() }]);
  };

  const handleEventDelete = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div className="calendar-container">
      <h1>Mon Calendrier avec Événements</h1>
      <ReactCalendar 
        className="my-calendar"
        initialEvents={events}
        onEventAdd={handleEventAdd}
        onEventDelete={handleEventDelete}
        enableDaySelection={true}
        dayNameFormat="long"
        showEventIndicators={true}
      />
    </div>
  );
}

export default SimpleCalendar;
```

## Styles CSS

```css
/* styles.css */
.calendar-container {
  font-family: 'Roboto', sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.my-calendar {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

## Utilisation

### Étape 1 : Installation

```bash
npm install @calendar/react
```

### Étape 2 : Importation

```tsx
import { ReactCalendar } from '@calendar/react';
```

### Étape 3 : Utilisation

```tsx
function App() {
  return (
    <div className="app">
      <ReactCalendar />
    </div>
  );
}
```

## Personnalisation

Le composant `ReactCalendar` accepte de nombreuses props pour personnaliser son apparence et son comportement :

### Props principales

| Prop | Type | Description |
|------|------|-------------|
| `initialDate` | `Date` | Date initiale du calendrier |
| `initialView` | `'month' \| 'week'` | Vue initiale du calendrier |
| `dayNameFormat` | `'narrow' \| 'short' \| 'long'` | Format d'affichage des noms de jours |
| `daySize` | `'small' \| 'medium' \| 'large'` | Taille des cellules de jours |
| `selectionStyle` | `'outline' \| 'fill'` | Style visuel de la sélection |
| `enableDaySelection` | `boolean` | Activation de la sélection des jours |
| `showAdjacentMonths` | `boolean` | Afficher les jours des mois adjacents |
| `showEventIndicators` | `boolean` | Afficher les indicateurs d'événements |

### Props de personnalisation CSS

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Classe CSS du conteneur principal |
| `navigationClassName` | `string` | Classe CSS de la barre de navigation |
| `viewClassName` | `string` | Classe CSS de la vue (mois/semaine) |
| `eventsClassName` | `string` | Classe CSS de la section des événements |

### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onDateChange` | `(date: Date) => void` | Appelé lors du changement de date |
| `onViewChange` | `(view: 'month' \| 'week') => void` | Appelé lors du changement de vue |
| `onDaySelect` | `(date: Date) => void` | Appelé lors de la sélection d'un jour |
| `onEventAdd` | `(event: CalendarEvent) => void` | Appelé lors de l'ajout d'un événement |
| `onEventDelete` | `(eventId: string) => void` | Appelé lors de la suppression d'un événement |

## Niveau de personnalisation supérieur

Si vous avez besoin de plus de personnalisation, vous pouvez toujours utiliser les composants styled individuels ou les composants headless. Consultez les exemples [Calendrier avec événements](./calendar-with-events.md) et [Calendrier personnalisé](./custom-calendar.md) pour plus de détails.

## Prochaines étapes

- Explorez l'[architecture](../architecture.md) pour comprendre le fonctionnement interne
- Consultez les [composants individuels](../components/README.md) pour une personnalisation plus poussée
- Découvrez l'exemple [Calendrier avec événements](./calendar-with-events.md) pour une gestion avancée des événements 