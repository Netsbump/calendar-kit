import type React from 'react';
import type { CalendarDay as CoreCalendarDay } from '@calendar/calendar-core';

export interface CalendarDayProps {
  /**
   * Jour du calendrier
   */
  day: CoreCalendarDay;
  
  /**
   * Indique si le jour est sélectionnable
   */
  isSelectable?: boolean;
  
  /**
   * Fonction appelée lorsqu'un jour est cliqué
   */
  onDayClick?: (day: CoreCalendarDay) => void;
  
  /**
   * Indique si les événements doivent être affichés
   */
  withEvents?: boolean;
  
  /**
   * Classes CSS personnalisées
   */
  className?: string;
  
  /**
   * Style CSS personnalisé
   */
  style?: React.CSSProperties;
  
  /**
   * Fonction de rendu personnalisée pour le contenu du jour
   */
  renderDayContent?: (props: {
    day: CoreCalendarDay;
    hasEvents: boolean;
  }) => React.ReactNode;
}

/**
 * Composant headless représentant un jour dans le calendrier
 * Ce composant gère uniquement la logique (clic, accessibilité) et 
 * délègue le rendu visuel à la fonction renderDayContent
 */
export function CalendarDay({ 
  day, 
  isSelectable = true, 
  onDayClick = () => {},
  withEvents = false,
  className = '',
  style,
  renderDayContent = ({ day, hasEvents }) => (
    <>
      <div>{day.dayOfMonth}</div>
      {hasEvents && (
        <div className="day-event-indicator" />
      )}
    </>
  )
}: CalendarDayProps) {
  const handleClick = () => {
    if (isSelectable) {
      onDayClick(day);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isSelectable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onDayClick(day);
    }
  };

  const hasEvents = withEvents && !!day.events && day.events.length > 0;

  const classNames = [
    'calendar-day',
    className,
    day.isCurrentMonth ? 'current-month' : 'other-month',
    day.isToday ? 'today' : '',
    day.isSelected ? 'selected' : '',
    isSelectable ? 'selectable' : ''
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={classNames}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isSelectable ? "button" : undefined}
      tabIndex={isSelectable ? 0 : undefined}
    >
      {renderDayContent({ day, hasEvents })}
    </div>
  );
} 