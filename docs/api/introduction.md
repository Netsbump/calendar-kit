# 📅 calendar-core

**calendar-core** est une bibliothèque headless pour gérer la logique d’un agenda/calendrier dans n’importe quel environnement JavaScript.  
Elle fournit uniquement la logique, l’état et les APIs — **pas de rendu, pas de styles, pas de dépendance à un framework**.

---

## 🧠 Qu’est-ce qu’un calendrier headless ?

Un calendrier headless fournit toute la **logique métier** (navigation, affichage des jours, gestion des événements…) **sans imposer de rendu ni de design**.  
Il est conçu pour être utilisé dans **React, Vue, Svelte, Solid, ou même Node.js**.

### Objectifs du headless UI

- **Découpler la logique de l’interface** : vous gérez entièrement le rendu (HTML, composants, styles…)
- **Rendre le calendrier totalement extensible** : vous ajoutez uniquement les features dont vous avez besoin
- **Permettre une portabilité totale** : aucun style, aucun markup = utilisable partout
- **Maximiser la modularité et la testabilité** : chaque feature est isolée et activable à la demande

---

## 🔧 Comportement

`calendar-core` fournit une **API d’instance** :

```ts
const calendar = createCalendar({ defaultDate: new Date(), events: [...] })

calendar.goToNext()
calendar.selectDate(new Date())
calendar.getMonthGrid() // → données pour l’affichage
calendar.addEvent({ ... })

---

✨ Caractéristiques principales 

- ✅ Framework-agnostique (React, Vue, Svelte, Node…)
- 🧱 Architecture modulaire par features
- 🧠 Instance-based : chaque calendrier est indépendant
- 🔍 Headless : vous contrôlez le rendu et les styles
- 🔌 Extensible : ajoutez ou supprimez des features selon vos besoins

---

📦 Fonctionnalités disponibles (en cours)

- navigation → changer la date courante
- selection → gérer une date sélectionnée
- events → ajouter, modifier, supprimer des événements
- views → afficher jour, semaine, mois
- formatting → noms des jours/mois, gestion des locales
- custom features → ajoutez vos propres plugins

---

🛣️ Roadmap

- [] Base de l’instance (createBaseCalendar)
- [] Feature navigation
- [] Feature selection
- [] Feature events
- [] Feature views (mois, semaine)
- [] Feature formatting (locales, noms des jours)
- [] Composition dynamique des features
- [] Support des plugins custom
- [] Documentation API complète
- [] Publication npm + adaptateurs React/Vue

--- 

