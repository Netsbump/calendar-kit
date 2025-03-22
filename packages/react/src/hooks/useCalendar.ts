import { useState, useEffect, useCallback } from 'react';
import { 
  createCalendar, 
  type Calendar, 
  type CalendarOptions, 
  type CalendarEvent, 
  type CalendarView,
  type CalendarMonth,
  type CalendarWeek
} from '@calendar/core';

export interface UseCalendarOptions extends CalendarOptions {
  onViewChange?: (view: CalendarView) => void;
  onDateChange?: (date: Date) => void;
  onEventsChange?: (events: CalendarEvent[]) => void;
  onSelectDate?: (date: Date) => void;
}

export interface UseCalendarReturn {
  calendar: Calendar;
  view: CalendarView;
  currentDate: Date;
  events: CalendarEvent[];
  selectedDate?: Date;
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
  selectDate: (date: Date) => void;
  getSelectedDate: () => Date | undefined;
  createEventOnDate: (date: Date, eventData?: Partial<Omit<CalendarEvent, 'id' | 'start' | 'end'>>) => CalendarEvent;
}

export function useCalendar(options: UseCalendarOptions = {}): UseCalendarReturn {
  const [calendar] = useState(() => createCalendar(options));
  const [view, setViewState] = useState<CalendarView>(calendar.view);
  const [currentDate, setCurrentDateState] = useState<Date>(calendar.currentDate);
  const [events, setEventsState] = useState<CalendarEvent[]>(calendar.events);
  const [selectedDate, setSelectedDateState] = useState<Date | undefined>(calendar.selectedDate);
  
  // Update internal state when calendar changes
  useEffect(() => {
    const updateState = () => {
      setViewState(calendar.view);
      setCurrentDateState(calendar.currentDate);
      setEventsState(calendar.events);
      setSelectedDateState(calendar.selectedDate);
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
  
  // Fonctions de sélection
  const selectDate = useCallback((date: Date) => {
    calendar.selectDate(date);
    setSelectedDateState(calendar.selectedDate);
    options.onSelectDate?.(date);
  }, [calendar, options.onSelectDate]);
  
  const getSelectedDate = useCallback(() => {
    return calendar.getSelectedDate();
  }, [calendar]);
  
  // Fonction utilitaire pour créer un événement sur une date spécifique
  const createEventOnDate = useCallback((date: Date, eventData: Partial<Omit<CalendarEvent, 'id' | 'start' | 'end'>> = {}) => {
    const start = new Date(date);
    const end = new Date(date);
    end.setHours(end.getHours() + 1); // Par défaut, un événement dure 1 heure
    
    const newEvent = calendar.addEvent({
      title: eventData.title || 'Nouvel événement',
      start,
      end,
      allDay: eventData.allDay || false,
      ...eventData
    });
    
    setEventsState(calendar.events);
    options.onEventsChange?.(calendar.events);
    return newEvent;
  }, [calendar, options.onEventsChange]);
  
  return {
    calendar,
    view,
    currentDate,
    events,
    selectedDate,
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
    selectDate,
    getSelectedDate,
    createEventOnDate,
  };
} 