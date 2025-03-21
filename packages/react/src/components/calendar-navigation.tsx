import React from 'react';
import { useCalendarContext } from './calendar-provider';
import type { CalendarView } from '@calendar/core';

export interface CalendarNavigationProps {
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

export function CalendarNavigation({ 
  className = '',
  style,
  renderTitle,
  renderNavigation,
  renderViewSelector,
  onViewChange,
  onDateChange
}: CalendarNavigationProps) {
  const { view, currentDate, goToNext, goToPrev, goToToday, setView } = useCalendarContext();

  const handleViewChange = (newView: CalendarView) => {
    setView(newView);
    onViewChange?.(newView);
  };

  const handleNext = () => {
    goToNext();
    onDateChange?.(currentDate);
  };

  const handlePrev = () => {
    goToPrev();
    onDateChange?.(currentDate);
  };

  const handleToday = () => {
    goToToday();
    onDateChange?.(currentDate);
  };

  return (
    <div className={className} style={style}>
      {renderTitle ? (
        renderTitle(currentDate)
      ) : (
        <div>
          {new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(currentDate)}
        </div>
      )}
      
      {renderNavigation ? (
        renderNavigation({ goToPrev: handlePrev, goToToday: handleToday, goToNext: handleNext })
      ) : (
        <div>
          <button onClick={handlePrev}>Précédent</button>
          <button onClick={handleToday}>Aujourd'hui</button>
          <button onClick={handleNext}>Suivant</button>
        </div>
      )}
      
      {renderViewSelector ? (
        renderViewSelector({ view, onViewChange: handleViewChange })
      ) : (
        <div>
          <button onClick={() => handleViewChange('month')}>Mois</button>
          <button onClick={() => handleViewChange('week')}>Semaine</button>
        </div>
      )}
    </div>
  );
} 