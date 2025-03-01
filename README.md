# 📅 Calendar Kit

Calendar Kit est une bibliothèque headless modulaire et extensible pour la gestion de calendriers et de plannings. 

## 🌟 Caractéristiques

- 🧠 **Architecture headless** : Toute la logique sans aucun style prédéfini
- 🧩 **Modulaire** : Core package + implémentations spécifiques aux frameworks
- 🔌 **Extensible** : Conçu pour être étendu avec des plugins
- 🚀 **Performant** : Optimisé pour gérer efficacement les événements et les rendus
- 📦 **Léger** : Pas de dépendances externes pour le package core
- 💪 **TypeScript** : Typé de bout en bout pour une meilleure expérience de développement

## 📦 Structure du projet

Le projet est organisé en monorepo avec la structure suivante :

```
calendar-kit/
├── packages/
│   ├── core/         # Logique principale du calendrier (framework-agnostic)
│   ├── react/        # Implémentation React (hooks + composants)
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
```

### React

```tsx
import { HeadlessCalendar } from '@calendar/react';

function MyCalendar() {
  return (
    <HeadlessCalendar defaultView="month" defaultDate={new Date()}>
      {({ view, currentDate, goToNext, goToPrev, goToToday, setView, events }) => (
        <div>
          {/* Votre UI personnalisée ici */}
          <div>
            <button onClick={goToPrev}>Précédent</button>
            <button onClick={goToToday}>Aujourd'hui</button>
            <button onClick={goToNext}>Suivant</button>
          </div>
          
          <div>
            <select value={view} onChange={(e) => setView(e.target.value)}>
              <option value="day">Jour</option>
              <option value="week">Semaine</option>
              <option value="month">Mois</option>
              <option value="year">Année</option>
            </select>
          </div>
          
          <div>
            {/* Afficher le calendrier selon la vue */}
            {view === 'month' && <MonthView date={currentDate} events={events} />}
            {/* ... autres vues ... */}
          </div>
        </div>
      )}
    </HeadlessCalendar>
  );
}
```

Ou avec les sous-composants :

```tsx
import { HeadlessCalendar } from '@calendar/react';

function MyCalendar() {
  return (
    <HeadlessCalendar defaultView="month" defaultDate={new Date()}>
      <div>
        <HeadlessCalendar.Navigation>
          {({ goToPrev, goToToday, goToNext }) => (
            <div>
              <button onClick={goToPrev}>Précédent</button>
              <button onClick={goToToday}>Aujourd'hui</button>
              <button onClick={goToNext}>Suivant</button>
            </div>
          )}
        </HeadlessCalendar.Navigation>
        
        <HeadlessCalendar.ViewSelector>
          {({ view, setView }) => (
            <select value={view} onChange={(e) => setView(e.target.value)}>
              <option value="day">Jour</option>
              <option value="week">Semaine</option>
              <option value="month">Mois</option>
              <option value="year">Année</option>
            </select>
          )}
        </HeadlessCalendar.ViewSelector>
        
        <HeadlessCalendar.Events>
          {({ events }) => (
            <div>
              {/* Afficher les événements */}
              {events.map(event => (
                <div key={event.id}>
                  <h3>{event.title}</h3>
                  <p>{event.start.toLocaleString()} - {event.end.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </HeadlessCalendar.Events>
      </div>
    </HeadlessCalendar>
  );
}
```

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