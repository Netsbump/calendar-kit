import type { CalendarDay as CoreCalendarDay } from '@calendar/core';
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
    week: { days: CoreCalendarDay[] };
    weekIndex: number;
    onDayClick: (day: CoreCalendarDay) => void;
    withEvents: boolean;
  }) => React.ReactNode;

  /**
   * Fonction de rendu personnalisée pour la grille du mois
   */
  renderGrid?: (props: {
    weeks: Array<{ days: CoreCalendarDay[] }>;
    renderWeek: (props: { 
      week: { days: CoreCalendarDay[] };
      weekIndex: number;
      onDayClick: (day: CoreCalendarDay) => void;
      withEvents: boolean;
    }) => React.ReactNode;
    onDayClick: (day: CoreCalendarDay) => void;
    withEvents: boolean;
  }) => React.ReactNode;

  /**
   * Fonction de rendu personnalisée pour un jour
   */
  renderDay?: (day: CoreCalendarDay) => React.ReactNode;

  /**
   * Fonction de rendu personnalisée pour la sélection d'un jour
   */
  onDayClick?: (day: CoreCalendarDay) => void;

  /**
   * Indique si les événements sont présents
   */
  withEvents?: boolean;
}

/**
 * Composant headless pour afficher la vue mensuelle du calendrier
 */
export function CalendarMonthView({
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
  renderWeek = ({ week, weekIndex, onDayClick, withEvents }) => (
    <div key={`week-${weekIndex}`} className="week">
      {week.days.map((day) => (
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
      ))}
    </div>
  ),
  renderGrid = ({ weeks, renderWeek, onDayClick, withEvents }) => (
    <div className="month-grid">
      {weeks.map((week, weekIndex) => renderWeek({ week, weekIndex, onDayClick, withEvents }))}
    </div>
  )
}: CalendarMonthViewProps) {
  const { 
    currentDate,
    view,
    events,
    selectDate,
    dayNames,
    monthGrid
  } = useCalendarContext();

  const onDayClick = (day: CoreCalendarDay) => {
    selectDate(day.date);
  };

  const withEvents = events.length > 0;

  return (
    <div className={`calendar-month-view ${className}`} style={style}>
      {renderWeekdays({ dayNames })}
      {renderGrid({ weeks: monthGrid.weeks, renderWeek, onDayClick, withEvents })}
    </div>
  );
} 