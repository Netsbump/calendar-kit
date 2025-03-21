import { useState } from 'react';
import type { CalendarView, CalendarDay as CoreCalendarDay, CalendarEvent } from '@calendar/core';
import { useCalendar } from '../hooks/useCalendar';
import { CalendarNavigationStyled } from './calendar-navigation-styled';
import { CalendarMonthViewStyled } from './calendar-month-view-styled';
import { CalendarWeekViewStyled } from './calendar-week-view-styled';
import { CalendarEventsStyled } from './calendar-events-styled';
import { CalendarProvider } from '../components/calendar-provider';


export interface ReactCalendarProps {
  /**
   * Format des noms de jours
   */
  dayNameFormat?: 'short' | 'long' | 'narrow';
  
  /**
   * Activer la gestion des événements
   */
  withEvents?: boolean;
  
  /**
   * Activer la sélection des jours
   */
  withDaySelection?: boolean;
  
  /**
   * Classes CSS personnalisées
   */
  className?: string;
  
  /**
   * Fonction appelée lorsqu'un jour est cliqué
   */
  onDayClick?: (day: CoreCalendarDay) => void;
  
  /**
   * Fonction appelée lorsqu'un événement est ajouté
   */
  onEventAdd?: (event: CalendarEvent) => void;
  
  /**
   * Fonction appelée lorsque la vue change
   */
  onViewChange?: (view: CalendarView) => void;
  
  /**
   * Fonction appelée lorsque la date courante change
   */
  onDateChange?: (date: Date) => void;
}

/**
 * Composant de calendrier React prêt à l'emploi mais personnalisable.
 * Ce composant est un assemblage de composants styled qui eux-mêmes
 * sont des implémentations de composants headless.
 */
export function ReactCalendar({ 
  dayNameFormat = 'short',
  withEvents = false,
  withDaySelection = false,
  className = '',
  onDayClick,
  onEventAdd,
  onViewChange,
  onDateChange
}: ReactCalendarProps) {
  const calendar = useCalendar({
    onViewChange,
    onDateChange,
    onSelectDate: (date) => {
      if (onDayClick) {
        // Créer un objet CalendarDay minimal pour l'appel
        const day: CoreCalendarDay = {
          date,
          dayOfMonth: date.getDate(),
          isCurrentMonth: true,
          isToday: false,
          isWeekend: false,
          isSelected: true,
          formattedDate: date.getDate().toString(),
          events: []
        };
        onDayClick(day);
      }
    }
  });
  
  const {
    view,
    currentDate,
    goToNext,
    goToPrev,
    goToToday,
    setView,
    getMonthGrid,
    getWeekGrid,
    getDayNames,
    addEvent,
    events,
    selectDate,
    selectedDate
  } = calendar;
  
  const monthGrid = getMonthGrid();
  const weekGrid = getWeekGrid();
  const dayNames = getDayNames(dayNameFormat);
  
  // État pour le formulaire d'ajout d'événement
  const [eventTitle, setEventTitle] = useState('Nouvel événement');
  
  // Fonction pour gérer le clic sur un jour
  const handleDayClick = (day: CoreCalendarDay) => {
    if (withDaySelection) {
      selectDate(day.date);
    }
    
    if (onDayClick) {
      onDayClick(day);
    }
  };
  
  // Fonction pour ajouter un événement
  const handleAddEvent = () => {
    if (selectedDate) {
      const start = new Date(selectedDate);
      const end = new Date(selectedDate);
      end.setHours(end.getHours() + 1);
      
      const newEvent = addEvent({
        title: eventTitle,
        start,
        end,
        allDay: false
      });
      
      setEventTitle('Nouvel événement');
      
      if (onEventAdd) {
        onEventAdd(newEvent);
      }
    }
  };
  
  return (
    <CalendarProvider
      defaultView={view}
      defaultDate={currentDate}
      onViewChange={onViewChange}
      onDateChange={onDateChange}
      onDayClick={handleDayClick}
      onEventAdd={onEventAdd}
    >
      <div className={`calendar-container ${className}`} style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        <CalendarNavigationStyled 
          onViewChange={onViewChange}
          onDateChange={onDateChange}
        />
        
        <div style={{ display: 'flex' }}>
          <div className="calendar-content" style={{ padding: '16px', flex: 1 }}>
            {view === 'month' && (
              <CalendarMonthViewStyled/>
            )}
            
            {view === 'week' && (
              <CalendarWeekViewStyled/> 
            )}
          </div>
          
          {withEvents && withDaySelection && (
            <CalendarEventsStyled/>
          )}
        </div>
      </div>
    </CalendarProvider>
  );
}