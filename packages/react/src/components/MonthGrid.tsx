import React from 'react';
import { CalendarDay } from '@calendar/core';
import { useCalendarContext } from './HeadlessCalendar';

export interface MonthGridProps {
  /**
   * Fonction de rendu personnalisée pour chaque jour
   */
  renderDay?: (day: CalendarDay) => React.ReactNode;
  
  /**
   * Fonction de rendu personnalisée pour l'en-tête des jours de la semaine
   */
  renderHeader?: (dayNames: string[]) => React.ReactNode;
  
  /**
   * Format des noms de jours
   */
  dayNameFormat?: 'long' | 'short' | 'narrow';
  
  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

/**
 * Composant de grille de mois qui affiche un calendrier mensuel
 */
export function MonthGrid({
  renderDay,
  renderHeader,
  dayNameFormat = 'short',
  className = '',
}: MonthGridProps) {
  const { getMonthGrid, getDayNames } = useCalendarContext();
  
  const grid = getMonthGrid();
  const dayNames = getDayNames(dayNameFormat);
  
  // Rendu par défaut pour un jour
  const defaultRenderDay = (day: CalendarDay) => (
    <div 
      className={`calendar-day ${day.isCurrentMonth ? 'current-month' : 'other-month'} ${day.isToday ? 'today' : ''} ${day.isWeekend ? 'weekend' : ''}`}
    >
      {day.dayOfMonth}
    </div>
  );
  
  // Rendu par défaut pour l'en-tête
  const defaultRenderHeader = (names: string[]) => (
    <div className="calendar-weekdays">
      {names.map((name, index) => (
        <div key={index} className="calendar-weekday">
          {name}
        </div>
      ))}
    </div>
  );
  
  const renderDayFn = renderDay || defaultRenderDay;
  const renderHeaderFn = renderHeader || defaultRenderHeader;
  
  return (
    <div className={`calendar-month-grid ${className}`}>
      {renderHeaderFn(dayNames)}
      
      <div className="calendar-weeks">
        {grid.weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="calendar-week">
            {week.days.map((day) => (
              <div key={day.date.toISOString()} className="calendar-day-container">
                {renderDayFn(day)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
} 