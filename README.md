# 📅 Calendar Kit

Calendar Kit est une bibliothèque headless modulaire et extensible pour la gestion de calendriers et de plannings. 

## 🌟 Caractéristiques

- 🧠 **Architecture headless** : Toute la logique sans aucun style prédéfini
- 🧩 **Modulaire** : Core package + implémentations spécifiques aux frameworks
- 🔌 **Extensible** : Conçu pour être étendu avec des plugins (a voir)
- 📦 **Léger** : Pas de dépendances externes pour le package core (uniquement date-fns)
- 💪 **TypeScript** : Typé de bout en bout pour une meilleure expérience de développement

## 📦 Structure du projet

Le projet est organisé en monorepo avec la structure suivante :

```
calendar-kit/
├── packages/
│   ├── core/         # Logique principale du calendrier (framework-agnostic)
│   ├── react/        # Implémentation React (hooks + composants + exemples)
│   └── ... (futures implémentations Vue, Angular, etc.)
├── apps/
│   └── storybook/    # Documentation et visualisation des composants
└── ...
```

## 🚀 Installation

```bash
# Installer avec npm
npm install @calendar/core @calendar/react

# Ou avec yarn
yarn add @calendar/core @calendar/react

# Ou avec pnpm
pnpm add @calendar/core @calendar/react
```

## 📚 Utilisation

### Core (Framework-agnostic)

Le package `@calendar/core` contient toute la logique de gestion du calendrier indépendante de tout framework. Il fournit une API puissante pour créer, manipuler et interroger un calendrier, gérer les événements, et générer des grilles de dates.

```typescript
import { createCalendar } from '@calendar/core';

// Créer une instance de calendrier
const calendar = createCalendar({
  defaultView: 'month',
  defaultDate: new Date(),
  firstDayOfWeek: 1, // Lundi
});

// Naviguer dans le calendrier
calendar.goToNext();
calendar.goToPrev();
calendar.goToToday();
calendar.goToDate(new Date(2023, 0, 1));

// Changer de vue
calendar.setView('week');

// Gérer les événements
const event = calendar.addEvent({
  title: 'Réunion',
  start: new Date(2023, 0, 1, 10, 0),
  end: new Date(2023, 0, 1, 11, 0),
  allDay: false,
});

// Récupérer les événements
const events = calendar.getEvents();

// Générer des grilles de dates
const monthGrid = calendar.getMonthGrid();
const weekGrid = calendar.getWeekGrid();

// Sélectionner une date
calendar.selectDate(new Date(2023, 0, 15));
```

### React

## 📆 Composant ReactCalendar

Pour une utilisation simple et rapide, le composant `ReactCalendar` offre une solution prête à l'emploi avec une interface utilisateur complète :

```tsx
import { ReactCalendar } from '@calendar/react';

function App() {
  return (
    <ReactCalendar 
      dayNameFormat="long"
      withEvents={true}
      withDaySelection={true}
      onDayClick={(day) => console.log('Jour cliqué:', day)}
      onEventAdd={(event) => console.log('Événement ajouté:', event)}
      onViewChange={(view) => console.log('Vue changée:', view)}
      onDateChange={(date) => console.log('Date changée:', date)}
    />
  );
}
```

Le composant `ReactCalendar` prend en charge plusieurs options :
- `dayNameFormat` : Format des noms de jours ('short', 'long', 'narrow')
- `withEvents` : Activer la gestion des événements
- `withDaySelection` : Activer la sélection des jours
- `className` : Classes CSS personnalisées
- Callbacks : `onDayClick`, `onEventAdd`, `onViewChange`, `onDateChange`

## 🧩 Hooks React

Vous pouvez également utiliser le hook `useCalendar` directement :

```tsx
import { useCalendar } from '@calendar/react';

function MyCalendar() {
  const {
    view,
    currentDate,
    events,
    goToNext,
    goToPrev,
    goToToday,
    setView,
    addEvent,
    updateEvent,
    deleteEvent,
  } = useCalendar({
    defaultView: 'month',
    defaultDate: new Date(),
    onViewChange: (view) => console.log(`Vue changée: ${view}`),
    onDateChange: (date) => console.log(`Date changée: ${date}`),
  });

  // Votre UI personnalisée ici
  return (
    <div>
      {/* ... */}
    </div>
  );
}
```

## 🛠️ Développement

### Prérequis

- Node.js 16+
- PNPM 8+

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-username/calendar-kit.git
cd calendar-kit

# Installer les dépendances
pnpm install

# Construire tous les packages
pnpm build
```

### Scripts disponibles

- `pnpm dev` : Lancer le mode développement pour tous les packages
- `pnpm build` : Construire tous les packages
- `pnpm test` : Exécuter les tests
- `pnpm lint` : Vérifier le code avec Biome
- `pnpm format` : Formater le code avec Biome
- `pnpm storybook` : Lancer Storybook pour la documentation

## 📝 Licence

MIT 