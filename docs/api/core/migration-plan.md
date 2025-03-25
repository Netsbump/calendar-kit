# 🧭 Plan de migration vers une architecture modulaire feature-based

On garde tout ce que tu as déjà — mais on commence à **extraire des features indépendantes**, qui pourront être composées dynamiquement dans ton `createCalendar()`.

## 🪜 Étape 1 – Structuration initiale

On va poser une base propre :

```bash
calendar-core/
├── core/                # Le noyau, comme TanStack
│   ├── createCalendar.ts
│   ├── types.ts
├── features/            # Chaque feature est indépendante
│   ├── navigation/      ← Aller à une date, suivant, aujourd’hui...
│   │   ├── navigation.feature.ts
│   │   └── types.ts
│   ├── selection/       ← Gérer la date sélectionnée
│   ├── events/          ← Gérer les événements
│   ├── views/           ← Vue jour / semaine / mois / année
├── utils/
│   ├── grid.ts
│   └── formatting.ts
├── index.ts             # Export tout ce qui est public
```

## 🎯 Objectif de l’étape 1

1. Créer un `createBaseCalendar()` minimal dans `core/createCalendar.ts`
2. Extraire la feature navigation (avec `goToNext()`, `goToPrev()`, etc.)
3. La brancher dans ton `createCalendar()` final via composition

### 🧱 Étape 1.1 – Base du core/createCalendar.ts

```ts
// core/createCalendar.ts
import { Calendar, CalendarOptions } from './types'

export function createBaseCalendar(): Calendar {
  return {
    // Valeurs par défaut, seront étendues par les features
    view: 'month',
    currentDate: new Date(),
    firstDayOfWeek: 0,
    events: [],

    // Méthodes vides par défaut
    goToDate: () => {},
    goToNext: () => {},
    goToPrev: () => {},
    goToToday: () => {},

    setView: () => {},
    addEvent: () => { throw new Error('Not implemented') },
    updateEvent: () => null,
    deleteEvent: () => false,
    getEvents: () => [],

    getMonthGrid: () => { throw new Error('Not implemented') },
    getWeekGrid: () => { throw new Error('Not implemented') },
    getDayNames: () => [],
    getMonthNames: () => [],

    selectDate: () => {},
    getSelectedDate: () => undefined,
  }
}
```

---

### 🧱 Étape 1.2 – Feature : navigation

```ts
// features/navigation/navigation.feature.ts
import { addDays, addWeeks, addMonths, addYears, startOfDay } from 'date-fns'
import { CalendarView } from '../../core/types'
import type { Calendar } from '../../core/types'

export function withNavigation(calendar: Calendar, options: { defaultDate?: Date, defaultView?: CalendarView }) {
  let currentDate = startOfDay(options.defaultDate ?? new Date())
  let view: CalendarView = options.defaultView ?? 'month'

  calendar.currentDate = new Date(currentDate)
  calendar.view = view

  calendar.goToDate = (date: Date) => {
    currentDate = startOfDay(date)
    calendar.currentDate = new Date(currentDate)
  }

  calendar.goToNext = () => {
    switch (calendar.view) {
      case 'day': currentDate = addDays(currentDate, 1); break
      case 'week': currentDate = addWeeks(currentDate, 1); break
      case 'month': currentDate = addMonths(currentDate, 1); break
      case 'year': currentDate = addYears(currentDate, 1); break
    }
    calendar.currentDate = new Date(currentDate)
  }

  calendar.goToPrev = () => {
    switch (calendar.view) {
      case 'day': currentDate = addDays(currentDate, -1); break
      case 'week': currentDate = addWeeks(currentDate, -1); break
      case 'month': currentDate = addMonths(currentDate, -1); break
      case 'year': currentDate = addYears(currentDate, -1); break
    }
    calendar.currentDate = new Date(currentDate)
  }

  calendar.goToToday = () => {
    currentDate = startOfDay(new Date())
    calendar.currentDate = new Date(currentDate)
  }

  return calendar
}
```

### 🧱 Étape 1.3 – Composition dans createCalendar.ts

```ts
// core/createCalendar.ts
import { Calendar, CalendarOptions } from './types'
import { createBaseCalendar } from './createBaseCalendar'
import { withNavigation } from '../features/navigation/navigation.feature'

export function createCalendar(options: CalendarOptions = {}): Calendar {
  let calendar = createBaseCalendar()

  calendar = withNavigation(calendar, {
    defaultDate: options.defaultDate,
    defaultView: options.defaultView
  })

  // 👇 Prochainement on fera :
  // calendar = withEvents(calendar, options.events)
  // calendar = withSelection(calendar, ...)
  // calendar = withViews(calendar)

  return calendar
}
```

---

## ✅ Étape 1 complétée

Tu as maintenant :
- Une base légère et isolée
- Une première feature en plugin (withNavigation)
- Un système prêt à être étendu

---

## 📦 Prochaine étape : organisation du projet (React & Exemples)

🎯 Objectif : s’aligner sur l’organisation TanStack
📁 Composants headless React

Tu avais déjà des composants dans `packages/react-calendar/src/components`, mais certains dépendaient du `Context`.
➡️ On va les refondre pour qu’ils soient headless, en utilisant l’instance `calendar` passée en prop.

Exemple de composant refactoré :

```tsx
function CalendarNavigation({ calendar }: { calendar: Calendar }) {
  return (
    <div>
      <button onClick={calendar.goToPrev}>←</button>
      <button onClick={calendar.goToNext}>→</button>
    </div>
  )
}
```

---

📁 Exemples stylisés

➡️ Les anciens exemples (packages/react-calendar/src/examples) seront déplacés dans un dossier /examples/ à la racine, comme dans TanStack Table.

Ce dossier pourra contenir :
- des apps Vite ou Next.js
- des tests de rendu visuel
- des démonstrateurs (mois, semaine, événement...)

--- 

## 🧭 Plan de migration feature-based (inspiré de TanStack)

| Étape | Feature à extraire      | Contenu                                                      |
|-------|--------------------------|-------------------------------------------------------------|
| 2     | `selection`              | Gestion de la date sélectionnée                             |
| 3     | `events`                 | `addEvent`, `updateEvent`, `deleteEvent`, `getEvents`       |
| 4     | `views`                  | `setView`, `getMonthGrid`, `getWeekGrid`                    |
| 5     | `formatting`             | `getDayNames`, `getMonthNames`                              |
| 6     | `composabilité avancée`  | Ajouter ou retirer dynamiquement des features               |
| 7     | `structure React`        | Refonte des composants en mode headless + hook `useCalendar`|
| 8     | `examples/`              | Déplacement des exemples à la racine                        |
| 9     | `tests`                  | Tests unitaires par feature et par instance                 |
