import { useState, useEffect, useCallback } from 'react';
import { 
  createCalendar, 
  Calendar, 
  CalendarOptions, 
  CalendarEvent, 
  CalendarView,
  CalendarMonth,
  CalendarWeek
} from '@calendar/core';

export interface UseCalendarOptions extends CalendarOptions {
  onViewChange?: (view: CalendarView) => void;
  onDateChange?: (date: Date) => void;
  onEventsChange?: (events: CalendarEvent[]) => void;
}

export interface UseCalendarReturn {
  calendar: Calendar;
  view: CalendarView;
  currentDate: Date;
  events: CalendarEvent[];
  goToDate: (date: Date) => void;
  goToNext: () => void;
  goToPrev: () => void;
  goToToday: () => void;
  setView: (view: CalendarView) => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => CalendarEvent;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => CalendarEvent | null;
  deleteEvent: (id: string) => boolean;
  getEvents: (start?: Date, end?: Date) => CalendarEvent[];
  getMonthGrid: () => CalendarMonth;
  getWeekGrid: () => CalendarWeek;
  getDayNames: (format?: 'long' | 'short' | 'narrow') => string[];
  getMonthNames: (format?: 'long' | 'short' | 'narrow') => string[];
}

export function useCalendar(options: UseCalendarOptions = {}): UseCalendarReturn {
  const [calendar] = useState(() => createCalendar(options));
  const [view, setViewState] = useState<CalendarView>(calendar.view);
  const [currentDate, setCurrentDateState] = useState<Date>(calendar.currentDate);
  const [events, setEventsState] = useState<CalendarEvent[]>(calendar.events);
  
  // Update internal state when calendar changes
  useEffect(() => {
    const updateState = () => {
      setViewState(calendar.view);
      setCurrentDateState(calendar.currentDate);
      setEventsState(calendar.events);
    };
    
    // Initial update
    updateState();
    
    // We would ideally subscribe to calendar changes here
    // This is a simplified version
  }, [calendar]);
  
  // Callback handlers that update internal state and call user callbacks
  const goToDate = useCallback((date: Date) => {
    calendar.goToDate(date);
    setCurrentDateState(calendar.currentDate);
    options.onDateChange?.(calendar.currentDate);
  }, [calendar, options.onDateChange]);
  
  const goToNext = useCallback(() => {
    calendar.goToNext();
    setCurrentDateState(calendar.currentDate);
    options.onDateChange?.(calendar.currentDate);
  }, [calendar, options.onDateChange]);
  
  const goToPrev = useCallback(() => {
    calendar.goToPrev();
    setCurrentDateState(calendar.currentDate);
    options.onDateChange?.(calendar.currentDate);
  }, [calendar, options.onDateChange]);
  
  const goToToday = useCallback(() => {
    calendar.goToToday();
    setCurrentDateState(calendar.currentDate);
    options.onDateChange?.(calendar.currentDate);
  }, [calendar, options.onDateChange]);
  
  const setView = useCallback((newView: CalendarView) => {
    calendar.setView(newView);
    setViewState(newView);
    options.onViewChange?.(newView);
  }, [calendar, options.onViewChange]);
  
  const addEvent = useCallback((event: Omit<CalendarEvent, 'id'>) => {
    const newEvent = calendar.addEvent(event);
    setEventsState(calendar.events);
    options.onEventsChange?.(calendar.events);
    return newEvent;
  }, [calendar, options.onEventsChange]);
  
  const updateEvent = useCallback((id: string, event: Partial<CalendarEvent>) => {
    const updatedEvent = calendar.updateEvent(id, event);
    setEventsState(calendar.events);
    options.onEventsChange?.(calendar.events);
    return updatedEvent;
  }, [calendar, options.onEventsChange]);
  
  const deleteEvent = useCallback((id: string) => {
    const result = calendar.deleteEvent(id);
    setEventsState(calendar.events);
    options.onEventsChange?.(calendar.events);
    return result;
  }, [calendar, options.onEventsChange]);
  
  const getEvents = useCallback((start?: Date, end?: Date) => {
    return calendar.getEvents(start, end);
  }, [calendar]);
  
  // Fonctions de grille
  const getMonthGrid = useCallback(() => {
    return calendar.getMonthGrid();
  }, [calendar]);
  
  const getWeekGrid = useCallback(() => {
    return calendar.getWeekGrid();
  }, [calendar]);
  
  const getDayNames = useCallback((format?: 'long' | 'short' | 'narrow') => {
    return calendar.getDayNames(format);
  }, [calendar]);
  
  const getMonthNames = useCallback((format?: 'long' | 'short' | 'narrow') => {
    return calendar.getMonthNames(format);
  }, [calendar]);
  
  return {
    calendar,
    view,
    currentDate,
    events,
    goToDate,
    goToNext,
    goToPrev,
    goToToday,
    setView,
    addEvent,
    updateEvent,
    deleteEvent,
    getEvents,
    getMonthGrid,
    getWeekGrid,
    getDayNames,
    getMonthNames,
  };
} 