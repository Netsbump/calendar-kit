import React from 'react';
import { CalendarWeekView, CalendarWeekViewProps } from '../components/calendar-week-view';
import { CalendarDayStyled } from './calendar-day-styled';
import { useCalendarContext } from '../components/calendar-provider';
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
  dayNameFormat = 'short',
  gridClassName = '',
  daySize = 'large',
  selectionStyle = 'outline',
  enableDaySelection = true,
  ...props
}: CalendarWeekViewStyledProps & { containerClassName?: string }) {
  // Récupérer les noms des jours à partir du contexte
  const { getDayNames } = useCalendarContext();
  const dayNames = getDayNames ? getDayNames(dayNameFormat) : [];

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
      displayMode="week"
    />
  );

  // Rendu des en-têtes de jours
  const renderWeekdays = () => {
    if (!dayNames || dayNames.length === 0) return null;
    
    return (
      <div
        className="week-days-header"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
          marginBottom: '8px'
        }}
      >
        {dayNames.map((day: string, index: number) => (
          <div
            key={`weekday-${index}`}
            style={{
              textAlign: 'center',
              fontWeight: 500,
              padding: '8px 0',
              color: '#4b5563'
            }}
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`calendar-week-view-styled ${containerClassName}`}>
      {renderWeekdays()}
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