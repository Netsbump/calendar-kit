import React from 'react';
import type { CalendarDay } from '@calendar/core';
import { useCalendarContext } from './calendar-provider';

export interface CalendarWeekViewProps {
  /**
   * Classes CSS personnalisées
   */
  className?: string;

  /**
   * Styles CSS personnalisés pour le conteneur
   */
  style?: React.CSSProperties;

  /**
   * Format des noms de jours
   * Ce composant headless est responsable d'ajouter les noms de jours correctement formatés 
   * à chaque jour de la semaine. Si cette prop n'est pas fournie, il utilisera la valeur du contexte.
   */
  dayNameFormat?: 'short' | 'long' | 'narrow';

  /**
   * Fonction de rendu personnalisée pour un jour
   */
  renderDay?: (props: { 
    day: CalendarDay; 
    onDayClick: (day: CalendarDay) => void;
    withEvents: boolean;
  }) => React.ReactNode;

  /**
   * Fonction de rendu personnalisée pour la grille de la semaine
   */
  renderGrid?: (props: {
    days: CalendarDay[];
    renderDay: (props: { 
      day: CalendarDay; 
      onDayClick: (day: CalendarDay) => void;
      withEvents: boolean;
    }) => React.ReactNode;
    onDayClick: (day: CalendarDay) => void;
    withEvents: boolean;
  }) => React.ReactNode;

  /**
   * Fonction de rendu personnalisée pour la sélection d'un jour
   */
  onDayClick?: (day: CalendarDay) => void;

  /**
   * Indique si les événements sont présents
   */
  withEvents?: boolean;
  
  /**
   * Indique si la sélection des jours est activée
   */
  enableDaySelection?: boolean;
}

/**
 * Composant headless pour afficher la vue hebdomadaire du calendrier
 * Ce composant gère la logique et les données, sans se préoccuper de la présentation
 */
export function CalendarWeekView({
  className = '',
  style,
  dayNameFormat,
  renderDay = ({ day, onDayClick, withEvents }) => (
    <div 
      key={day.date.toISOString()}
      className="calendar-day"
      onClick={() => onDayClick(day)}
    >
      <div className="day-header">
        {day.dayOfWeek && <div className="day-name">{day.dayOfWeek}</div>}
        <div className="day-number">{day.dayOfMonth}</div>
      </div>
      {withEvents && day.events && day.events.length > 0 && (
        <div className="events">
          {day.events.map((event) => (
            <div key={event.id} className="event">
              {event.title}
            </div>
          ))}
        </div>
      )}
    </div>
  ),
  renderGrid = ({ days, renderDay, onDayClick, withEvents }) => (
    <div className="week-grid">
      {days.map((day) => renderDay({ day, onDayClick, withEvents }))}
    </div>
  ),
  onDayClick: customOnDayClick,
  enableDaySelection = true
}: CalendarWeekViewProps) {
  const { 
    currentDate,
    view,
    events,
    selectDate,
    dayNames: contextDayNames,
    weekGrid,
    locale
  } = useCalendarContext();

  const onDayClick = (day: CalendarDay) => {
    if (enableDaySelection) {
      selectDate(day.date);
    }
    
    if (customOnDayClick) {
      customOnDayClick(day);
    }
  };

  const withEvents = events.length > 0;

  // Ajouter le nom du jour à chaque jour de la semaine
  // en utilisant le format spécifié dans les props ou celui du contexte
  const daysWithDayNames = weekGrid.days.map(day => {
    // Formatter le nom du jour en utilisant la locale du contexte
    const formatter = new Intl.DateTimeFormat(locale, { 
      weekday: dayNameFormat || 'short' 
    });
    
    return {
      ...day,
      dayOfWeek: formatter.format(day.date)
    };
  });

  return (
    <div className={`calendar-week-view ${className}`} style={style}>
      {renderGrid({ days: daysWithDayNames, renderDay, onDayClick, withEvents })}
    </div>
  );
} 