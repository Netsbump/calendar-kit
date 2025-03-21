import React from 'react';
import { useCalendarContext } from './calendar-provider';
import type { CalendarDay } from '@calendar/core';

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
   * Fonction de rendu personnalisée pour un jour de la semaine
   */
  renderWeekday?: (props: { day: string }) => React.ReactNode;

  /**
   * Fonction de rendu personnalisée pour la ligne des jours de la semaine
   */
  renderWeekdays?: (props: { dayNames: string[] }) => React.ReactNode;

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

  onDayClick?: (day: CalendarDay) => void;
  withEvents?: boolean;
}

/**
 * Composant headless pour afficher la vue hebdomadaire du calendrier
 */
export function CalendarWeekView({
  className = '',
  style,
  renderWeekday = ({ day }) => <div className="weekday">{day}</div>,
  renderWeekdays = ({ dayNames }) => (
    <div className="weekdays">
      {dayNames.map((day) => (
        <div key={day}>
          {renderWeekday({ day })}
        </div>
      ))}
    </div>
  ),
  renderDay = ({ day, onDayClick, withEvents }) => (
    <div 
      key={`day-${day.date.toISOString()}`}
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
  renderGrid = ({ days, renderDay, onDayClick, withEvents }) => (
    <div className="week-grid">
      {days.map((day) => renderDay({ day, onDayClick, withEvents }))}
    </div>
  )
}: CalendarWeekViewProps) {
  const { 
    currentDate,
    view,
    events,
    selectDate,
    dayNames,
    weekGrid
  } = useCalendarContext();

  const onDayClick = (day: CalendarDay) => {
    selectDate(day.date);
  };

  const withEvents = events.length > 0;
  const withDaySelection = true;

  return (
    <div className={`calendar-week-view ${className}`} style={style}>
      {renderWeekdays({ dayNames })}
      {renderGrid({ days: weekGrid.days, renderDay, onDayClick, withEvents })}
    </div>
  );
} 