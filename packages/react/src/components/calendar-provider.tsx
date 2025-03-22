import React, { createContext, useContext, ReactNode } from 'react';
import { useCalendar } from '../hooks/useCalendar';
import type { CalendarView, CalendarDay, CalendarEvent } from '@calendar/core';
import { createI18n, type I18n, type SupportedLocale, type TranslationKey } from '../utils/i18n';

interface CalendarContextValue {
  view: CalendarView;
  currentDate: Date;
  selectedDate: Date | undefined;
  events: CalendarEvent[];
  dayNames: string[];
  monthGrid: {
    weeks: Array<{
      days: CalendarDay[];
    }>;
  };
  weekGrid: {
    days: CalendarDay[];
  };
  goToNext: () => void;
  goToPrev: () => void;
  goToToday: () => void;
  setView: (view: CalendarView) => void;
  selectDate: (date: Date) => void;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => CalendarEvent;
  updateEvent: (id: string, event: Partial<CalendarEvent>) => CalendarEvent | null;
  deleteEvent: (id: string) => boolean;
  onDayClick?: (day: CalendarDay) => void;
  onEventAdd?: (event: CalendarEvent) => void;
  getDayNames: (format?: 'long' | 'short' | 'narrow') => string[];
  locale: SupportedLocale;
  firstDayOfWeek: number;
  i18n: I18n;
}

const CalendarContext = createContext<CalendarContextValue | null>(null);

export interface CalendarProviderProps {
  children: ReactNode;
  defaultView?: CalendarView;
  defaultDate?: Date;
  dayNameFormat?: 'short' | 'long' | 'narrow';
  enableDaySelection?: boolean;
  onViewChange?: (view: CalendarView) => void;
  onDateChange?: (date: Date) => void;
  onDayClick?: (day: CalendarDay) => void;
  onEventAdd?: (event: CalendarEvent) => void;
  
  /**
   * Locale pour l'internationalisation (par défaut: 'fr-FR')
   * Valeurs possibles: 'fr-FR' ou 'en-US'
   */
  locale?: SupportedLocale;
  
  /**
   * Traductions personnalisées qui seront fusionnées avec les traductions par défaut
   */
  customTranslations?: Record<SupportedLocale, Record<TranslationKey, string>>;
}

/**
 * Obtenir le premier jour de la semaine selon la locale
 * Français: lundi (1)
 * Anglais: dimanche (0)
 */
function getFirstDayOfWeekFromLocale(locale: string): number {
  return locale === 'fr-FR' || locale.startsWith('fr') ? 1 : 0;
}

export function CalendarProvider({
  children,
  defaultView = 'month',
  defaultDate = new Date(),
  dayNameFormat = 'short',
  enableDaySelection = true,
  onViewChange,
  onDateChange,
  onDayClick,
  onEventAdd,
  locale = 'fr-FR',
  customTranslations,
}: CalendarProviderProps) {
  // Créer l'utilitaire d'internationalisation
  const i18n = createI18n({ 
    locale, 
    customTranslations 
  });
  
  // Utiliser le premier jour de la semaine déterminé par l'utilitaire i18n
  const firstDayOfWeek = i18n.getFirstDayOfWeek();

  const calendar = useCalendar({
    defaultView,
    defaultDate,
    onViewChange,
    onDateChange,
    firstDayOfWeek,
  });

  // Sélection de date seulement si enableDaySelection est true
  const handleSelectDate = (date: Date) => {
    if (enableDaySelection) {
      calendar.selectDate(date);
    }
  };

  const value = {
    view: calendar.view,
    currentDate: calendar.currentDate,
    selectedDate: calendar.selectedDate,
    events: calendar.events,
    dayNames: i18n.getDayNames(dayNameFormat),
    monthGrid: calendar.getMonthGrid(),
    weekGrid: calendar.getWeekGrid(),
    goToNext: calendar.goToNext,
    goToPrev: calendar.goToPrev,
    goToToday: calendar.goToToday,
    setView: calendar.setView,
    selectDate: handleSelectDate,
    addEvent: calendar.addEvent,
    updateEvent: calendar.updateEvent,
    deleteEvent: calendar.deleteEvent,
    onDayClick,
    onEventAdd,
    getDayNames: i18n.getDayNames,
    locale,
    firstDayOfWeek,
    i18n,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

/**
 * Hook pour accéder au contexte du calendrier
 * @throws {Error} Si utilisé en dehors d'un CalendarProvider
 */
export function useCalendarContext(): CalendarContextValue {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
} 