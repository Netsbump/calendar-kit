import React from 'react';
import { CalendarDay } from '@calendar/core';
import { useCalendarContext } from './HeadlessCalendar';

export interface WeekGridProps {
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
 * Composant de grille de semaine qui affiche un calendrier hebdomadaire
 */
export function WeekGrid({
  renderDay,
  renderHeader,
  dayNameFormat = 'short',
  className = '',
}: WeekGridProps) {
  const { getWeekGrid, getDayNames } = useCalendarContext();
  
  const week = getWeekGrid();
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
    <div className={`calendar-week-grid ${className}`}>
      {renderHeaderFn(dayNames)}
      
      <div className="calendar-week">
        {week.days.map((day) => (
          <div key={day.date.toISOString()} className="calendar-day-container">
            {renderDayFn(day)}
          </div>
        ))}
      </div>
    </div>
  );
} 