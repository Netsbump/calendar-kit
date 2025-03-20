# Exemples

Cette section contient des exemples d'utilisation des composants headless de @calendar/react. Chaque exemple montre une approche différente pour créer des calendriers personnalisés.

## Exemples disponibles

### [Calendrier simple](./simple-calendar.md)
Un exemple de base montrant comment créer un calendrier simple avec :
- Navigation entre les mois
- Affichage de la grille du calendrier
- Mise en évidence du jour actuel
- Design responsive

### [Calendrier avec événements](./calendar-with-events.md)
Un exemple complet montrant comment gérer des événements avec :
- Ajout et suppression d'événements
- Affichage des événements dans la grille
- Formulaire d'ajout d'événement
- Gestion de l'état des événements

### [Calendrier personnalisé](./custom-calendar.md)
Un exemple avancé montrant comment créer un calendrier hautement personnalisé avec :
- Sélection de plage de dates
- Thème sombre/clair
- Barre latérale personnalisée
- Statistiques et informations supplémentaires
- Animations et transitions

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

1. **Composants réutilisables**
   - Créez des composants réutilisables pour les éléments communs
   - Utilisez des props pour la personnalisation
   - Maintenez une séparation claire des responsabilités

2. **Gestion de l'état**
   - Utilisez des hooks React pour la gestion de l'état
   - Centralisez la logique de gestion des événements
   - Évitez les états redondants

3. **Performance**
   - Utilisez `useCallback` et `useMemo` pour les fonctions et valeurs coûteuses
   - Optimisez les rendus avec `React.memo`
   - Évitez les calculs inutiles dans les rendus

4. **Accessibilité**
   - Utilisez des rôles ARIA appropriés
   - Assurez-vous que la navigation au clavier fonctionne
   - Fournissez des alternatives textuelles

## Prochaines étapes

- Découvrez la documentation des [composants](../components/README.md)
- Apprenez à utiliser les [hooks](../hooks/README.md)
- Consultez la documentation de l'[introduction](../introduction.md) 