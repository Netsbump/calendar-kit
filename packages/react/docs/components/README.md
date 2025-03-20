# Composants Headless

Les composants headless sont les blocs de construction de base de @calendar/react. Ils fournissent la logique et la structure sans imposer de style ou d'apparence.

## Liste des composants

### [CalendarProvider](./CalendarProvider.md)
Le composant racine qui fournit le contexte et l'état global du calendrier.

### [CalendarGrid](./CalendarGrid.md)
Affiche la grille du calendrier (vue mois ou semaine).

### [CalendarNavigation](./CalendarNavigation.md)
Gère la navigation entre les mois/semaines et le changement de vue.

### [CalendarEvents](./CalendarEvents.md)
Gère l'affichage et la gestion des événements.

## Utilisation de base

```tsx
import { 
  CalendarProvider, 
  CalendarGrid, 
  CalendarNavigation, 
  CalendarEvents 
} from '@calendar/react';

function MyCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar">
        <CalendarNavigation />
        <CalendarGrid />
        <CalendarEvents />
      </div>
    </CalendarProvider>
  );
}
```

## Personnalisation

Chaque composant peut être personnalisé de plusieurs façons :

1. **Via les props** : Chaque composant accepte des props pour modifier son comportement
2. **Via le rendu personnalisé** : Les composants acceptent des fonctions de rendu pour personnaliser leur contenu
3. **Via le style** : Les composants acceptent des classes CSS pour personnaliser leur apparence

## Exemple de personnalisation

```tsx
function MyCalendar() {
  return (
    <CalendarProvider>
      <div className="calendar">
        <CalendarNavigation 
          className="my-navigation"
          renderPrevButton={() => <button>Précédent</button>}
          renderNextButton={() => <button>Suivant</button>}
        />
        <CalendarGrid 
          className="my-grid"
          renderDay={(day) => (
            <div className={`my-day ${day.isToday ? 'today' : ''}`}>
              {day.dayOfMonth}
            </div>
          )}
        />
        <CalendarEvents 
          className="my-events"
          renderEvent={(event) => (
            <div className="my-event">
              <h4>{event.title}</h4>
              <p>{event.start.toLocaleTimeString()}</p>
            </div>
          )}
        />
      </div>
    </CalendarProvider>
  );
}
```

## Accessibilité

Les composants headless suivent les bonnes pratiques d'accessibilité :

- Utilisation appropriée des rôles ARIA
- Support de la navigation au clavier
- Gestion des états focusables
- Messages d'erreur et d'aide

## Prochaines étapes

- Découvrez les détails de chaque composant dans les pages suivantes
- Apprenez à utiliser les [hooks](./hooks/README.md) pour plus de contrôle
- Consultez les [exemples](./examples/README.md) pour des cas d'utilisation concrets 