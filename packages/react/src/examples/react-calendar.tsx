import type { CalendarView, CalendarDay as CoreCalendarDay, CalendarEvent } from '@calendar/core';
import { CalendarNavigationStyled } from './calendar-navigation-styled';
import { CalendarMonthViewStyled } from './calendar-month-view-styled';
import { CalendarWeekViewStyled } from './calendar-week-view-styled';
import { CalendarEventsStyled } from './calendar-events-styled';
import { CalendarProvider, useCalendarContext } from '../components/calendar-provider';

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
 * Fonction interne qui récupère le composant de vue approprié selon la vue active
 */
function getViewComponent(view: CalendarView, dayNameFormat: 'short' | 'long' | 'narrow') {
  switch(view) {
    case 'month':
      return <CalendarMonthViewStyled dayNameFormat={dayNameFormat} />;
    case 'week':
      return <CalendarWeekViewStyled dayNameFormat={dayNameFormat} />;
    default:
      return <CalendarMonthViewStyled dayNameFormat={dayNameFormat} />;
  }
}

/**
 * Composant de calendrier React prêt à l'emploi mais personnalisable.
 * Ce composant est un assemblage de composants styled qui eux-mêmes
 * sont des implémentations de composants headless.
 * 
 * Le ReactCalendar a deux rôles principaux :
 * 1. Configurer le CalendarProvider qui fournit le contexte global
 * 2. Assembler les composants styled dans une interface cohérente
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
  return (
    <CalendarProvider
      defaultView="month"
      defaultDate={new Date()}
      onViewChange={onViewChange}
      onDateChange={onDateChange}
      onDayClick={(day) => {
        if (onDayClick) {
          onDayClick(day);
        }
      }}
      onEventAdd={onEventAdd}
      dayNameFormat={dayNameFormat}
      enableDaySelection={withDaySelection}
    >
      <ReactCalendarContent 
        withEvents={withEvents} 
        withDaySelection={withDaySelection} 
        className={className}
        dayNameFormat={dayNameFormat}
      />
    </CalendarProvider>
  );
}

/**
 * Composant interne qui utilise le contexte pour rendre le contenu du calendrier
 * Ce pattern permet de lire le contexte après que le Provider a été initialisé
 */
function ReactCalendarContent({ 
  withEvents, 
  withDaySelection, 
  className,
  dayNameFormat
}: { 
  withEvents: boolean; 
  withDaySelection: boolean; 
  className: string;
  dayNameFormat: 'short' | 'long' | 'narrow';
}) {
  // Accès au contexte pour le rendu conditionnel
  const { view } = useCalendarContext();
  
  return (
    <div className={`calendar-container ${className}`} style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      {/* Le composant de navigation accède au contexte via useCalendarContext */}
      <CalendarNavigationStyled />
      
      <div style={{ display: 'flex' }}>
        <div className="calendar-content" style={{ padding: '16px', flex: 1 }}>
          {/* Rendu conditionnel basé sur la vue active */}
          {getViewComponent(view, dayNameFormat)}
        </div>
        
        {withEvents && withDaySelection && (
          <CalendarEventsStyled />
        )}
      </div>
    </div>
  );
}