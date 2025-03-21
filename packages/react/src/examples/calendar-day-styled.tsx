import React from 'react';
import type { CalendarDay as CoreCalendarDay } from '@calendar/core';
import { CalendarDay, CalendarDayProps } from '../components/calendar-day';

export interface CalendarDayStyledProps extends Omit<CalendarDayProps, 'style' | 'renderDayContent'> {
  /**
   * Taille personnalisée du jour
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Style de mise en évidence pour le jour sélectionné
   */
  selectionStyle?: 'fill' | 'outline';
}

/**
 * Composant stylisé pour l'affichage d'un jour dans le calendrier
 * Ce composant se concentre uniquement sur la présentation visuelle
 */
export function CalendarDayStyled({
  day,
  isSelectable = true,
  onDayClick,
  withEvents = false,
  className = '',
  size = 'medium',
  selectionStyle = 'outline'
}: CalendarDayStyledProps) {
  // Définir les styles en fonction de la taille
  const sizeStyles = {
    small: {
      minHeight: '28px',
      fontSize: '0.75rem',
      padding: '2px'
    },
    medium: {
      minHeight: '36px',
      fontSize: '0.875rem',
      padding: '4px'
    },
    large: {
      minHeight: '48px',
      fontSize: '1rem',
      padding: '8px'
    }
  }[size];

  // Styles pour le composant
  const style: React.CSSProperties = {
    aspectRatio: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    backgroundColor: day.isToday 
      ? '#eff6ff' 
      : day.isSelected && selectionStyle === 'fill'
        ? '#e0f2fe'
        : day.isCurrentMonth 
          ? '#fff' 
          : '#f8fafc',
    border: day.isSelected && selectionStyle === 'outline'
      ? '2px solid #3b82f6'
      : day.isToday 
        ? '1px solid #3b82f6' 
        : '1px solid #e2e8f0',
    color: day.isCurrentMonth ? '#000' : '#94a3b8',
    fontWeight: day.isToday ? 'bold' : day.isCurrentMonth ? 500 : 'normal',
    cursor: isSelectable ? 'pointer' : 'default',
    ...sizeStyles
  };

  return (
    <CalendarDay
      day={day}
      isSelectable={isSelectable}
      onDayClick={onDayClick}
      withEvents={withEvents}
      className={`calendar-day-styled ${className}`}
      style={style}
      renderDayContent={({ day, hasEvents }) => (
        <>
          <div className="day-number">{day.dayOfMonth}</div>
          {hasEvents && (
            <div className="day-event-indicator" style={{ 
              marginTop: '4px', 
              width: '6px', 
              height: '6px', 
              borderRadius: '50%', 
              backgroundColor: '#3b82f6' 
            }} />
          )}
        </>
      )}
    />
  );
} 