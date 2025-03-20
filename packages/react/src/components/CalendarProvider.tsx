import React, { createContext, useContext, ReactNode } from 'react';
import { useCalendar } from '../hooks/useCalendar';
import type { CalendarView, CalendarDay, CalendarEvent } from '@calendar/core';

interface CalendarContextValue {
  view: CalendarView;
  currentDate: Date;
  selectedDate: Date | undefined;
  events: CalendarEvent[];
  goToNext: () => void;
  goToPrev: () => void;
  goToToday: () => void;
  setView: (view: CalendarView) => void;
  selectDate: (date: Date) => void;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => CalendarEvent | null;
  deleteEvent: (id: string) => boolean;
  onDayClick?: (day: CalendarDay) => void;
  onEventAdd?: (event: CalendarEvent) => void;
}

const CalendarContext = createContext<CalendarContextValue | null>(null);

export interface CalendarProviderProps {
  children: ReactNode;
  defaultView?: CalendarView;
  defaultDate?: Date;
  onViewChange?: (view: CalendarView) => void;
  onDateChange?: (date: Date) => void;
  onDayClick?: (day: CalendarDay) => void;
  onEventAdd?: (event: CalendarEvent) => void;
}

export function CalendarProvider({
  children,
  defaultView = 'month',
  defaultDate = new Date(),
  onViewChange,
  onDateChange,
  onDayClick,
  onEventAdd,
}: CalendarProviderProps) {
  const calendar = useCalendar({
    defaultView,
    defaultDate,
    onViewChange,
    onDateChange,
  });

  const value = {
    view: calendar.view,
    currentDate: calendar.currentDate,
    selectedDate: calendar.selectedDate,
    events: calendar.events,
    goToNext: calendar.goToNext,
    goToPrev: calendar.goToPrev,
    goToToday: calendar.goToToday,
    setView: calendar.setView,
    selectDate: calendar.selectDate,
    addEvent: calendar.addEvent,
    updateEvent: calendar.updateEvent,
    deleteEvent: calendar.deleteEvent,
    onDayClick,
    onEventAdd,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
} 