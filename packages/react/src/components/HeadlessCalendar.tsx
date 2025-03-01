import React, { ReactNode, createContext, useContext } from 'react';
import { CalendarView, CalendarEvent } from '@calendar/core';
import { useCalendar, UseCalendarOptions, UseCalendarReturn } from '../hooks/useCalendar';

// Create a context for the calendar
const CalendarContext = createContext<UseCalendarReturn | null>(null);

// Hook to use the calendar context
export function useCalendarContext(): UseCalendarReturn {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendarContext must be used within a HeadlessCalendar');
  }
  return context;
}

export interface HeadlessCalendarProps extends UseCalendarOptions {
  children: ReactNode | ((calendarProps: UseCalendarReturn) => ReactNode);
}

export function HeadlessCalendar({ children, ...options }: HeadlessCalendarProps) {
  const calendarProps = useCalendar(options);
  
  return (
    <CalendarContext.Provider value={calendarProps}>
      {typeof children === 'function' ? children(calendarProps) : children}
    </CalendarContext.Provider>
  );
}

// Export sub-components for easier usage
HeadlessCalendar.Navigation = function Navigation({ 
  children 
}: { 
  children: ReactNode | ((props: {
    goToNext: () => void;
    goToPrev: () => void;
    goToToday: () => void;
    goToDate: (date: Date) => void;
    currentDate: Date;
  }) => ReactNode);
}) {
  const { goToNext, goToPrev, goToToday, goToDate, currentDate } = useCalendarContext();
  const navigationProps = { goToNext, goToPrev, goToToday, goToDate, currentDate };
  
  return (
    <div className="calendar-navigation">
      {typeof children === 'function' ? children(navigationProps) : children}
    </div>
  );
};

HeadlessCalendar.ViewSelector = function ViewSelector({ 
  children 
}: { 
  children: ReactNode | ((props: {
    setView: (view: CalendarView) => void;
    view: CalendarView;
  }) => ReactNode);
}) {
  const { setView, view } = useCalendarContext();
  const viewProps = { setView, view };
  
  return (
    <div className="calendar-view-selector">
      {typeof children === 'function' ? children(viewProps) : children}
    </div>
  );
};

HeadlessCalendar.Events = function Events({ 
  children,
  start,
  end
}: { 
  children: ReactNode | ((props: {
    events: CalendarEvent[];
    addEvent: (event: Omit<CalendarEvent, 'id'>) => CalendarEvent;
    updateEvent: (id: string, event: Partial<CalendarEvent>) => CalendarEvent | null;
    deleteEvent: (id: string) => boolean;
  }) => ReactNode);
  start?: Date;
  end?: Date;
}) {
  const { events: allEvents, addEvent, updateEvent, deleteEvent, getEvents } = useCalendarContext();
  const events = start || end ? getEvents(start, end) : allEvents;
  const eventProps = { events, addEvent, updateEvent, deleteEvent };
  
  return (
    <div className="calendar-events">
      {typeof children === 'function' ? children(eventProps) : children}
    </div>
  );
}; 