import type { Locale } from 'date-fns';

export interface CalendarDay {
    date: Date;
    dayOfMonth: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    isWeekend: boolean;
    isSelected?: boolean;
    formattedDate: string;
    events?: CalendarEvent[];
  }
  
  export interface CalendarWeek {
    days: CalendarDay[];
    weekNumber: number;
  }
  
  export interface CalendarMonth {
    weeks: CalendarWeek[];
    monthName: string;
    year: number;
  }

  export type CalendarView = 'day' | 'week' | 'month' | 'year';
  
  export interface CalendarOptions {
    defaultView?: CalendarView;
    defaultDate?: Date;
    firstDayOfWeek?: number; // 0 = Sunday, 1 = Monday, etc.
    locale?: Locale;
    events?: CalendarEvent[];
    selectedDate?: Date;
    onSelectDate?: (date: Date) => void;
  }
  
  export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    [key: string]: any; // Allow additional properties
  }
  
  export interface Calendar {
    view: CalendarView;
    currentDate: Date;
    firstDayOfWeek: number;
    events: CalendarEvent[];
    selectedDate?: Date;
    
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
    
    // Grid methods
    getMonthGrid: () => CalendarMonth;
    getWeekGrid: () => CalendarWeek;
    getDayNames: (format?: 'long' | 'short' | 'narrow') => string[];
    getMonthNames: (format?: 'long' | 'short' | 'narrow') => string[];
    
    // Selection
    selectDate: (date: Date) => void;
    getSelectedDate: () => Date | undefined;
  }