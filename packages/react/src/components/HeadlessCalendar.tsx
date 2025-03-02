import { type ReactNode, createContext, useContext } from 'react';
import type { CalendarView, CalendarEvent } from '@calendar/core';
import { useCalendar, type UseCalendarOptions, type UseCalendarReturn } from '../hooks/useCalendar';

// Création du contexte avec une valeur par défaut
const CalendarContext = createContext<UseCalendarReturn | null>(null);

// Hook pour accéder au contexte du calendrier
export function useCalendarContext(): UseCalendarReturn {
  const context = useContext(CalendarContext);
  
  if (!context) {
    throw new Error('useCalendarContext doit être utilisé à l\'intérieur d\'un HeadlessCalendar');
  }
  
  return context;
}

export interface HeadlessCalendarProps extends UseCalendarOptions {
  children: ReactNode | ((calendarProps: UseCalendarReturn) => ReactNode);
}

/**
 * Composant sans rendu qui fournit le contexte du calendrier à ses enfants
 */
export function HeadlessCalendar({ children, ...options }: HeadlessCalendarProps) {
  const calendar = useCalendar(options);
  
  return (
    <CalendarContext.Provider value={calendar}>
      {typeof children === 'function' ? children(calendar) : children}
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
    createEventOnDate: (date: Date, eventData?: Partial<Omit<CalendarEvent, 'id' | 'start' | 'end'>>) => CalendarEvent;
  }) => ReactNode);
  start?: Date;
  end?: Date;
}) {
  const { events: allEvents, addEvent, updateEvent, deleteEvent, getEvents, createEventOnDate } = useCalendarContext();
  const events = start || end ? getEvents(start, end) : allEvents;
  const eventProps = { events, addEvent, updateEvent, deleteEvent, createEventOnDate };
  
  return (
    <div className="calendar-events">
      {typeof children === 'function' ? children(eventProps) : children}
    </div>
  );
};

HeadlessCalendar.Selection = function Selection({ 
  children 
}: { 
  children: ReactNode | ((props: {
    selectedDate?: Date;
    selectDate: (date: Date) => void;
    getSelectedDate: () => Date | undefined;
  }) => ReactNode);
}) {
  const { selectedDate, selectDate, getSelectedDate } = useCalendarContext();
  const selectionProps = { selectedDate, selectDate, getSelectedDate };
  
  return (
    <div className="calendar-selection">
      {typeof children === 'function' ? children(selectionProps) : children}
    </div>
  );
}; 