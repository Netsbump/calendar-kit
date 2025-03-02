import { 
  addDays, 
  addWeeks, 
  addMonths, 
  addYears, 
  startOfDay,
  isWithinInterval,
  isSameDay,
} from 'date-fns';

// Import types from dateGrid
import { 
  generateMonthGrid, 
  generateWeekGrid, 
  getDayNames as getGridDayNames, 
  getMonthNames as getGridMonthNames 
} from './utils/dateGrid';
import type { CalendarOptions, Calendar, CalendarEvent, CalendarView } from './calendar.types';

/**
 * Creates a new calendar instance
 */
export function createCalendar(options: CalendarOptions = {}): Calendar {
  const {
    defaultView = 'month',
    defaultDate = new Date(),
    firstDayOfWeek = 0,
    events: initialEvents = [],
    selectedDate: initialSelectedDate,
    onSelectDate,
  } = options;
  
  let currentView = defaultView;
  let currentDate = startOfDay(new Date(defaultDate));
  let selectedDate = initialSelectedDate ? startOfDay(new Date(initialSelectedDate)) : undefined;
  const events: CalendarEvent[] = [...initialEvents];
  
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
    get selectedDate() {
      return selectedDate ? new Date(selectedDate) : undefined;
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
    
    getMonthGrid() {
      const grid = generateMonthGrid(currentDate, firstDayOfWeek);
      
      // Add selected state and events to each day
      for (const week of grid.weeks) {
        for (const day of week.days) {
          // Add selected state
          day.isSelected = selectedDate ? isSameDay(day.date, selectedDate) : false;
          
          // Add events for this day
          day.events = events.filter(event => 
            isSameDay(day.date, event.start) || 
            isSameDay(day.date, event.end) ||
            (day.date >= event.start && day.date <= event.end)
          );
        }
      }
      
      return grid;
    },
    
    getWeekGrid() {
      const grid = generateWeekGrid(currentDate, firstDayOfWeek);
      
      // Add selected state and events to each day
      for (const day of grid.days) {
        // Add selected state
        day.isSelected = selectedDate ? isSameDay(day.date, selectedDate) : false;
        
        // Add events for this day
        day.events = events.filter(event => 
          isSameDay(day.date, event.start) || 
          isSameDay(day.date, event.end) ||
          (day.date >= event.start && day.date <= event.end)
        );
      }
      
      return grid;
    },
    
    getDayNames(format: 'long' | 'short' | 'narrow' = 'short') {
      return getGridDayNames(firstDayOfWeek, format);
    },
    
    getMonthNames(format: 'long' | 'short' | 'narrow' = 'long') {
      return getGridMonthNames(format);
    },
    
    selectDate(date: Date) {
      selectedDate = startOfDay(new Date(date));
      if (onSelectDate) {
        onSelectDate(selectedDate);
      }
    },
    
    getSelectedDate() {
      return selectedDate ? new Date(selectedDate) : undefined;
    }
  };
  
  return calendar;
}
