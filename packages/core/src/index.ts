export type CalendarView = 'day' | 'week' | 'month' | 'year';

import { 
  addDays, 
  addWeeks, 
  addMonths, 
  addYears, 
  startOfDay,
  isWithinInterval,
  isSameDay,
  isSameMonth,
  isSameYear
} from 'date-fns';

export interface CalendarOptions {
  defaultView?: CalendarView;
  defaultDate?: Date;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday, etc.
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  [key: string]: any; // Allow for custom properties
}

export interface Calendar {
  view: CalendarView;
  currentDate: Date;
  firstDayOfWeek: number;
  events: CalendarEvent[];
  
  // Navigation methods
  goToDate: (date: Date) => void;
  goToNext: () => void;
  goToPrev: () => void;
  goToToday: () => void;
  
  // View methods
  setView: (view: CalendarView) => void;
  
  // Event methods
  addEvent: (event: Omit<CalendarEvent, 'id'>) => CalendarEvent;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => CalendarEvent | null;
  deleteEvent: (id: string) => boolean;
  getEvents: (start?: Date, end?: Date) => CalendarEvent[];
}

/**
 * Creates a new calendar instance
 */
export function createCalendar(options: CalendarOptions = {}): Calendar {
  const {
    defaultView = 'month',
    defaultDate = new Date(),
    firstDayOfWeek = 0,
  } = options;
  
  let currentView = defaultView;
  let currentDate = startOfDay(new Date(defaultDate));
  const events: CalendarEvent[] = [];
  
  const calendar: Calendar = {
    get view() {
      return currentView;
    },
    get currentDate() {
      return new Date(currentDate);
    },
    get firstDayOfWeek() {
      return firstDayOfWeek;
    },
    get events() {
      return [...events];
    },
    
    goToDate(date: Date) {
      currentDate = startOfDay(new Date(date));
    },
    
    goToNext() {
      switch (currentView) {
        case 'day':
          currentDate = addDays(currentDate, 1);
          break;
        case 'week':
          currentDate = addWeeks(currentDate, 1);
          break;
        case 'month':
          currentDate = addMonths(currentDate, 1);
          break;
        case 'year':
          currentDate = addYears(currentDate, 1);
          break;
      }
    },
    
    goToPrev() {
      switch (currentView) {
        case 'day':
          currentDate = addDays(currentDate, -1);
          break;
        case 'week':
          currentDate = addWeeks(currentDate, -1);
          break;
        case 'month':
          currentDate = addMonths(currentDate, -1);
          break;
        case 'year':
          currentDate = addYears(currentDate, -1);
          break;
      }
    },
    
    goToToday() {
      currentDate = startOfDay(new Date());
    },
    
    setView(view: CalendarView) {
      currentView = view;
    },
    
    addEvent(eventData) {
      // Generate a simple ID if crypto is not available
      const id = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : `event-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      const newEvent: CalendarEvent = { 
        id, 
        title: eventData.title,
        start: eventData.start,
        end: eventData.end,
        allDay: eventData.allDay,
        ...eventData 
      };
      
      events.push(newEvent);
      return newEvent;
    },
    
    updateEvent(id, eventData) {
      const index = events.findIndex(event => event.id === id);
      if (index === -1) return null;
      
      events[index] = { ...events[index], ...eventData };
      return events[index];
    },
    
    deleteEvent(id) {
      const index = events.findIndex(event => event.id === id);
      if (index === -1) return false;
      
      events.splice(index, 1);
      return true;
    },
    
    getEvents(start, end) {
      if (!start && !end) return [...events];
      
      return events.filter(event => {
        if (start && end) {
          return isWithinInterval(event.start, { start, end }) || 
                 isWithinInterval(event.end, { start, end }) ||
                 (event.start <= start && event.end >= end);
        }
        if (start) {
          return event.start >= start || event.end >= start;
        }
        if (end) {
          return event.start <= end || event.end <= end;
        }
        return true;
      });
    },
  };
  
  return calendar;
} 