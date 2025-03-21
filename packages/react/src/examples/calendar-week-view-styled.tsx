import React from 'react';
import { CalendarWeekView, CalendarWeekViewProps } from '../components/calendar-week-view';
import { CalendarDayStyled } from './calendar-day-styled';
import type { CalendarDay } from '@calendar/core';

export interface CalendarWeekViewStyledProps extends Omit<CalendarWeekViewProps, 'renderDay'> {
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
 * Composant stylisé pour la vue hebdomadaire du calendrier
 * Ce composant utilise CalendarWeekView (headless) et ajoute des styles
 */
export function CalendarWeekViewStyled({
  className = '',
  containerClassName = '',
  style,
  dayNameFormat,
  gridClassName = '',
  daySize = 'medium',
  selectionStyle = 'outline',
  enableDaySelection = true,
  ...props
}: CalendarWeekViewStyledProps & { containerClassName?: string }) {
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
    <div className={`calendar-week-view-styled ${containerClassName}`}>
      <CalendarWeekView
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          ...style
        }}
        dayNameFormat={dayNameFormat}
        enableDaySelection={enableDaySelection}
        renderDay={renderStyledDay}
        renderGrid={({ days, renderDay, onDayClick, withEvents }) => (
          <div className={`week-grid ${gridClassName}`} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px'
          }}>
            {days.map((day) => renderStyledDay({ day, onDayClick, withEvents }))}
          </div>
        )}
        {...props}
      />
    </div>
  );
} 