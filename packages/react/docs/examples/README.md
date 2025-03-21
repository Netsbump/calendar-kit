# Exemples

Cette section contient des exemples d'utilisation des composants de @calendar/react. Chaque exemple montre une approche différente pour créer des calendriers personnalisés, en utilisant soit les composants styled, soit les composants headless.

## Exemples disponibles

### [Calendrier simple](./simple-calendar.md)
Un exemple de base montrant comment créer un calendrier simple avec :
- Utilisation du composant `ReactCalendar` pour une solution clé en main
- Personnalisation simple via des props
- Design responsive par défaut
- Changement de vues (mois/semaine)

### [Calendrier avec événements](./calendar-with-events.md)
Un exemple complet montrant comment gérer des événements avec :
- Utilisation des composants styled individuels
- Ajout et suppression d'événements
- Affichage des événements dans la grille
- Formulaire d'ajout d'événement
- Gestion de l'état des événements

### [Calendrier personnalisé](./custom-calendar.md)
Un exemple avancé montrant comment créer un calendrier hautement personnalisé avec :
- Utilisation des composants headless pour un contrôle total
- Sélection de plage de dates personnalisée
- Thème sombre/clair
- Barre latérale personnalisée
- Statistiques et informations supplémentaires
- Animations et transitions

## Choix des composants

@calendar/react propose trois niveaux de personnalisation :

1. **Composant tout-en-un (`ReactCalendar`)** 
   - Solution la plus simple et rapide
   - Idéal pour les prototypes et les cas d'utilisation standards
   - Personnalisation via props
   
2. **Composants styled individuels**
   - Plus de flexibilité dans l'agencement et la composition
   - Styles prédéfinis mais personnalisables
   - Bon équilibre entre simplicité et personnalisation
   
3. **Composants headless**
   - Contrôle total sur le rendu et les styles
   - Apporte uniquement la logique, pas de styles par défaut
   - Idéal pour les designs très spécifiques ou l'intégration à un design system

## Structure des exemples

Chaque exemple suit la même structure :

1. **Description** : Vue d'ensemble des fonctionnalités
2. **Code** : Implémentation complète du composant
3. **Styles** : CSS pour le design et les animations
4. **Utilisation** : Guide étape par étape
5. **Personnalisation** : Options de personnalisation
6. **Prochaines étapes** : Liens vers d'autres exemples et documentation

## Bonnes pratiques

Lors de la création de votre propre calendrier, gardez à l'esprit ces bonnes pratiques :

1. **Choisissez le bon niveau d'abstraction**
   - Utilisez `ReactCalendar` pour les cas simples
   - Utilisez les composants styled pour plus de flexibilité
   - Utilisez les composants headless pour un contrôle total

2. **Gestion de l'état**
   - Laissez `CalendarProvider` gérer l'état du calendrier
   - Utilisez `useCalendarContext()` pour accéder à l'état partagé
   - Utilisez les callbacks pour synchroniser avec votre application

3. **Performance**
   - Utilisez `useCallback` et `useMemo` pour les fonctions et valeurs coûteuses
   - Mémorisez les composants avec `React.memo` si nécessaire
   - Évitez les calculs inutiles dans les rendus

4. **Accessibilité**
   - Préservez les attributs d'accessibilité des composants
   - Assurez-vous que la navigation au clavier fonctionne
   - Gardez les textes alternatifs et les rôles ARIA

## Prochaines étapes

- Découvrez l'[architecture](../architecture.md) du projet
- Explorez la documentation des [composants](../components/README.md)
- Apprenez à utiliser les [hooks](../hooks/README.md)
- Consultez la documentation d'[introduction](../introduction.md) 