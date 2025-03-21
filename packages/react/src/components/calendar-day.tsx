import type React from 'react';
import type { CalendarDay as CoreCalendarDay } from '@calendar/core';

export interface CalendarDayProps {
  /**
   * Jour du calendrier
   */
  day: CoreCalendarDay;
  
  /**
   * Indique si le jour est sélectionnable
   */
  isSelectable: boolean;
  
  /**
   * Fonction appelée lorsqu'un jour est cliqué
   */
  onDayClick: (day: CoreCalendarDay) => void;
  
  /**
   * Indique si les événements doivent être affichés
   */
  withEvents: boolean;
  
  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

/**
 * Composant représentant un jour dans le calendrier
 */
export function CalendarDay({ 
  day, 
  isSelectable, 
  onDayClick,
  withEvents,
  className = ''
}: CalendarDayProps) {
  const handleClick = () => {
    onDayClick(day);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onDayClick(day);
    }
  };

  return (
    <div 
      className={`calendar-day ${className} ${day.isCurrentMonth ? 'current-month' : 'other-month'} ${day.isToday ? 'today' : ''} ${day.isSelected ? 'selected' : ''}`}
      style={{
        aspectRatio: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        backgroundColor: day.isToday 
          ? '#eff6ff' 
          : day.isSelected
            ? '#e0f2fe'
            : day.isCurrentMonth 
              ? '#fff' 
              : '#f8fafc',
        border: day.isSelected
          ? '2px solid #3b82f6'
          : day.isToday 
            ? '1px solid #3b82f6' 
            : '1px solid #e2e8f0',
        color: day.isCurrentMonth ? '#000' : '#94a3b8',
        fontWeight: day.isToday ? 'bold' : day.isCurrentMonth ? 500 : 'normal',
        cursor: isSelectable ? 'pointer' : 'default',
        padding: '4px',
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isSelectable ? "button" : undefined}
      tabIndex={isSelectable ? 0 : undefined}
    >
      <div>{day.dayOfMonth}</div>
      {withEvents && day.events && day.events.length > 0 && (
        <div style={{ 
          marginTop: '4px', 
          width: '6px', 
          height: '6px', 
          borderRadius: '50%', 
          backgroundColor: '#3b82f6' 
        }} />
      )}
    </div>
  );
} 