import React from 'react';
import type { CalendarDay as CoreCalendarDay } from '@calendar/calendar-core';
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

  /**
   * Mode d'affichage du jour (mois ou semaine)
   * - month: Affichage compact pour une vue mensuelle
   * - week: Affichage étendu avec les événements détaillés pour une vue hebdomadaire
   */
  displayMode?: 'month' | 'week';
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
  selectionStyle = 'outline',
  displayMode = 'month'
}: CalendarDayStyledProps) {
  // Définir les styles en fonction de la taille et du mode d'affichage
  const sizeStyles = {
    small: {
      minHeight: displayMode === 'week' ? '80px' : '28px',
      fontSize: '0.75rem',
      padding: '2px'
    },
    medium: {
      minHeight: displayMode === 'week' ? '100px' : '36px',
      fontSize: '0.875rem',
      padding: '4px'
    },
    large: {
      minHeight: displayMode === 'week' ? '120px' : '48px',
      fontSize: '1rem',
      padding: '8px'
    }
  }[size];

  // Styles pour l'affichage en mode semaine
  if (displayMode === 'week') {
    return (
      <div
        className={`calendar-day-styled calendar-day-week ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: day.isSelected 
            ? '2px solid #3b82f6' 
            : '1px solid #e2e8f0',
          borderRadius: '4px',
          overflow: 'hidden',
          cursor: isSelectable ? 'pointer' : 'default',
          backgroundColor: day.isCurrentMonth ? '#fff' : '#f8fafc',
          ...sizeStyles
        }}
        onClick={() => isSelectable && onDayClick && onDayClick(day)}
      >
        <div style={{
          padding: '4px',
          backgroundColor: day.isToday ? '#eff6ff' : day.isSelected ? '#e0f2fe' : 'transparent',
          borderBottom: '1px solid #e2e8f0',
          textAlign: 'center',
          fontWeight: day.isToday ? 'bold' : 'normal'
        }}>
          {day.dayOfMonth}
        </div>

        {withEvents && (
          <div style={{ 
            flex: 1, 
            padding: '4px',
            overflowY: 'auto'
          }}>
            {day.events && day.events.map((event) => (
              <div 
                key={event.id} 
                style={{
                  backgroundColor: '#eff6ff',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  marginBottom: '4px',
                  fontSize: '0.8rem',
                  border: '1px solid #dbeafe',
                }}
              >
                <div style={{
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {event.title}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: '#4b5563'
                }}>
                  {event.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                  {event.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Styles standard pour l'affichage en mode mois
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
      className={`calendar-day-styled calendar-day-month ${className}`}
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