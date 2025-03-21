import React from 'react';
import { useCalendarContext } from './calendar-provider';
import type { CalendarDay } from '@calendar/core';

export interface CalendarGridProps {
  className?: string;
  renderDay?: (day: CalendarDay) => React.ReactNode;
}

export function CalendarGrid({ className = '', renderDay }: CalendarGridProps) {
  const { view, currentDate, selectDate, onDayClick } = useCalendarContext();

  const grid = view === 'month' 
    ? getMonthGrid(currentDate)
    : getWeekGrid(currentDate);

  return (
    <div className={`grid grid-cols-7 gap-1 ${className}`}>
      {grid.map((day, index) => (
        <div
          key={`${day.date.toISOString()}-${index}`}
          className={`
            aspect-square p-2 text-sm
            ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
            ${day.isToday ? 'font-bold' : ''}
            ${day.isSelected ? 'ring-2 ring-blue-500' : ''}
            cursor-pointer hover:bg-gray-100
          `}
          onClick={() => {
            selectDate(day.date);
            onDayClick?.(day);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              selectDate(day.date);
              onDayClick?.(day);
            }
          }}
        >
          {renderDay ? renderDay(day) : (
            <>
              <div className="font-medium">{day.dayOfMonth}</div>
              {day.events && day.events.length > 0 && (
                <div className="mt-1 text-xs text-blue-600">
                  {day.events.length} événement{day.events.length > 1 ? 's' : ''}
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function getMonthGrid(date: Date): CalendarDay[] {
  // TODO: Implement month grid generation
  return [];
}

function getWeekGrid(date: Date): CalendarDay[] {
  // TODO: Implement week grid generation
  return [];
} 