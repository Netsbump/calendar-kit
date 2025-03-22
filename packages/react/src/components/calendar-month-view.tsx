import React from 'react';
import type { CalendarDay } from '@calendar/core';
import { useCalendarContext } from './calendar-provider';

export interface CalendarMonthViewProps {
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
   * Ce composant headless est responsable de récupérer les noms de jours correctement formatés.
   * Si cette prop n'est pas fournie, il utilisera la valeur du contexte.
   */
  dayNameFormat?: 'short' | 'long' | 'narrow';

  /**
   * Fonction de rendu personnalisée pour un jour de la semaine
   */
  renderWeekday?: (props: { day: string }) => React.ReactNode;

  /**
   * Fonction de rendu personnalisée pour la ligne des jours de la semaine
   */
  renderWeekdays?: (props: { dayNames: string[] }) => React.ReactNode;

  /**
   * Fonction de rendu personnalisée pour une semaine
   */
  renderWeek?: (props: { 
    week: { days: CalendarDay[] };
    weekIndex: number;
    onDayClick: (day: CalendarDay) => void;
    withEvents: boolean;
  }) => React.ReactNode;

  /**
   * Fonction de rendu personnalisée pour la grille du mois
   */
  renderGrid?: (props: {
    weeks: Array<{ days: CalendarDay[] }>;
    renderWeek: (props: { 
      week: { days: CalendarDay[] };
      weekIndex: number;
      onDayClick: (day: CalendarDay) => void;
      withEvents: boolean;
    }) => React.ReactNode;
    onDayClick: (day: CalendarDay) => void;
    withEvents: boolean;
  }) => React.ReactNode;

  /**
   * Fonction de rendu personnalisée pour un jour
   */
  renderDay?: (props: { 
    day: CalendarDay;
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
 * Composant headless pour afficher la vue mensuelle du calendrier
 * Ce composant gère la logique et les données, sans se préoccuper de la présentation
 */
export function CalendarMonthView({
  className = '',
  style,
  dayNameFormat,
  renderWeekday = ({ day }) => <div className="weekday">{day}</div>,
  renderWeekdays = ({ dayNames }) => (
    <div className="weekdays">
      {dayNames.map((day, index) => (
        <div key={`weekday-${index}`}>
          {renderWeekday({ day })}
        </div>
      ))}
    </div>
  ),
  renderDay = ({ day, onDayClick, withEvents }) => (
    <div 
      key={day.date.toISOString()}
      className="calendar-day"
      onClick={() => onDayClick(day)}
    >
      <div className="day-number">{day.dayOfMonth}</div>
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
  renderWeek = ({ week, weekIndex, onDayClick, withEvents }) => (
    <div key={`week-${weekIndex}`} className="week">
      {week.days.map((day) => renderDay({ day, onDayClick, withEvents }))}
    </div>
  ),
  renderGrid = ({ weeks, renderWeek, onDayClick, withEvents }) => (
    <div className="month-grid">
      {weeks.map((week, weekIndex) => renderWeek({ week, weekIndex, onDayClick, withEvents }))}
    </div>
  ),
  enableDaySelection = true
}: CalendarMonthViewProps) {
  const { 
    currentDate,
    view,
    events,
    selectDate,
    dayNames: contextDayNames,
    monthGrid
  } = useCalendarContext();

  const onDayClick = (day: CalendarDay) => {
    if (enableDaySelection) {
      selectDate(day.date);
    }
  };

  const withEvents = events.length > 0;

  // Priorité :
  // 1. Utiliser le format spécifié dans les props du composant (si fourni)
  // 2. Sinon, utiliser les noms de jours déjà formatés dans le contexte
  // 3. En dernier recours, générer les noms avec le format par défaut ('short')
  const formattedDayNames = dayNameFormat ? 
    getDayNames(dayNameFormat) : 
    contextDayNames;

  return (
    <div className={`calendar-month-view ${className}`} style={style}>
      {renderWeekdays({ dayNames: formattedDayNames })}
      {renderGrid({ weeks: monthGrid.weeks, renderWeek, onDayClick, withEvents })}
    </div>
  );
}

// Fonction utilitaire pour obtenir les noms des jours selon le format spécifié
function getDayNames(format: 'long' | 'short' | 'narrow' = 'short'): string[] {
  const formatter = new Intl.DateTimeFormat('fr-FR', { weekday: format });
  const days = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(2021, 0, 4 + i); // 4 Janvier 2021 était un lundi
    days.push(formatter.format(date));
  }
  
  return days;
} 