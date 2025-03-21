import React from 'react';
import { CalendarMonthView, CalendarMonthViewProps } from '../components/calendar-month-view';
import { CalendarDayStyled } from './calendar-day-styled';
import type { CalendarDay } from '@calendar/core';

export interface CalendarMonthViewStyledProps extends Omit<CalendarMonthViewProps, 'renderDay' | 'renderWeekday' | 'renderWeekdays'> {
  /**
   * Classe CSS pour le conteneur des jours de la semaine
   */
  weekdaysClassName?: string;
  
  /**
   * Classe CSS pour le conteneur de la grille
   */
  gridClassName?: string;
  
  /**
   * Taille des cellules de jours
   */
  daySize?: 'small' | 'medium' | 'large';
  
  /**
   * Style de mise en évidence pour le jour sélectionné
   */
  selectionStyle?: 'fill' | 'outline';
}

/**
 * Composant stylisé pour la vue mensuelle du calendrier
 * Ce composant utilise CalendarMonthView (headless) et ajoute des styles
 */
export function CalendarMonthViewStyled({
  className = '',
  style,
  dayNameFormat,
  weekdaysClassName = '',
  gridClassName = '',
  daySize = 'medium',
  selectionStyle = 'outline',
  enableDaySelection = true,
  ...props
}: CalendarMonthViewStyledProps) {
  // Fonction de rendu pour les jours de la semaine
  const renderWeekday = ({ day }: { day: string }) => {
    return (
      <div className="weekday-name" style={{
        textAlign: 'center',
        fontWeight: 500, 
        color: '#64748b',
        padding: '8px 0',
        fontSize: '0.875rem'
      }}>
        {day}
      </div>
    );
  };

  // Fonction de rendu pour un jour
  const renderStyledDay = ({ day, onDayClick, withEvents }: { 
    day: CalendarDay; 
    onDayClick: (day: CalendarDay) => void;
    withEvents: boolean;
  }) => (
    <CalendarDayStyled
      key={day.date.toISOString()}
      day={day}
      isSelectable={enableDaySelection}
      onDayClick={onDayClick}
      withEvents={withEvents}
      size={daySize}
      selectionStyle={selectionStyle}
    />
  );

  return (
    <CalendarMonthView
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        ...style
      }}
      dayNameFormat={dayNameFormat}
      enableDaySelection={enableDaySelection}
      renderWeekday={renderWeekday}
      renderWeekdays={({ dayNames }) => (
        <div className={`weekdays ${weekdaysClassName}`} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px'
        }}>
          {dayNames.map((day) => (
            <div key={day} style={{ textAlign: 'center' }}>
              {renderWeekday({ day })}
            </div>
          ))}
        </div>
      )}
      renderDay={renderStyledDay}
      renderWeek={({ week, weekIndex, onDayClick, withEvents }) => (
        <div 
          key={`week-${weekIndex}`} 
          className="week"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px'
          }}
        >
          {week.days.map((day) => renderStyledDay({ day, onDayClick, withEvents }))}
        </div>
      )}
      renderGrid={({ weeks, renderWeek, onDayClick, withEvents }) => (
        <div className={`month-grid ${gridClassName}`} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {weeks.map((week, weekIndex) => renderWeek({ week, weekIndex, onDayClick, withEvents }))}
        </div>
      )}
      {...props}
    />
  );
}