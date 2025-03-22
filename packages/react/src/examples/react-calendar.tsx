import React, { useState } from 'react';
import { CalendarView, CalendarDay as CoreCalendarDay, CalendarEvent as CoreCalendarEvent } from '@calendar/core';
import { CalendarProvider, useCalendarContext } from '../components/calendar-provider';
import { CalendarMonthViewStyled } from './calendar-month-view-styled';
import { CalendarWeekViewStyled } from './calendar-week-view-styled';
import { CalendarNavigationStyled } from './calendar-navigation-styled';
import { CalendarEventListStyled } from './calendar-event-list-styled';
import { CalendarEventDetailModal } from './calendar-event-detail-modal';
import { CalendarEventFormModalStyled } from './calendar-event-form-modal-styled';
import { SupportedLocale, TranslationKey } from '../utils/i18n';

/**
 * Mode d'interaction avec le calendrier
 * - view-only: lecture seule
 * - selection: sélection des jours activée
 * - events: sélection des jours et gestion des événements activées
 */
export type InteractionMode = 'view-only' | 'selection' | 'events';

export interface ReactCalendarProps {
  /**
   * Format d'affichage des noms de jours
   * @default 'short'
   */
  dayNameFormat?: 'short' | 'long' | 'narrow';
  
  /**
   * Mode d'interaction avec le calendrier
   * - view-only: Affichage simple sans interactions
   * - selection: Permet de sélectionner des jours
   * - events: Permet de sélectionner des jours ET d'ajouter/éditer des événements
   */
  interactionMode?: InteractionMode;
  
  /**
   * Classes CSS additionnelles pour le calendrier
   */
  className?: string;
  
  /**
   * Locale pour le calendrier (fr-FR ou en-US)
   * @default 'en-US'
   */
  locale?: 'fr-FR' | 'en-US';
  
  /**
   * Liste d'événements initiale
   */
  initialEvents?: CoreCalendarEvent[];
  
  /**
   * Fonction appelée lorsqu'un événement est ajouté
   */
  onEventAdd?: (event: CoreCalendarEvent) => void;
  
  /**
   * Fonction appelée lorsqu'un événement est supprimé
   */
  onEventDelete?: (eventId: string) => void;
  
  /**
   * Fonction appelée lorsqu'un événement est modifié
   */
  onEventEdit?: (event: CoreCalendarEvent) => void;
  
  /**
   * Fonction appelée lorsqu'un jour est sélectionné
   */
  onDaySelect?: (day: CoreCalendarDay) => void;
  
  /**
   * Vue initiale du calendrier
   * @default 'month'
   */
  initialView?: CalendarView;
}

/**
 * Fonction interne qui récupère le composant de vue approprié selon la vue active
 */
function getViewComponent(
  view: CalendarView, 
  dayNameFormat: 'short' | 'long' | 'narrow', 
  onDayClick?: (day: CoreCalendarDay) => void
) {
  switch(view) {
    case 'month':
      return <CalendarMonthViewStyled dayNameFormat={dayNameFormat} onDayClick={onDayClick} />;
    case 'week':
      return <CalendarWeekViewStyled dayNameFormat={dayNameFormat} onDayClick={onDayClick} />;
    default:
      return <CalendarMonthViewStyled dayNameFormat={dayNameFormat} onDayClick={onDayClick} />;
  }
}

/**
 * Version finalisée du calendrier React avec tous les composants stylisés
 */
export function ReactCalendar({
  dayNameFormat = 'short',
  interactionMode = 'view-only',
  className = '',
  locale = 'en-US',
  initialEvents = [],
  onEventAdd,
  onEventDelete,
  onEventEdit,
  onDaySelect,
  initialView = 'month'
}: ReactCalendarProps) {
  // Dériver les comportements à partir du mode d'interaction
  const enableDaySelection = interactionMode === 'selection' || interactionMode === 'events';
  
  return (
    <CalendarProvider
      locale={locale}
      defaultView={initialView}
      defaultDate={new Date()}
      dayNameFormat={dayNameFormat}
      enableDaySelection={enableDaySelection}
      onEventAdd={onEventAdd}
    >
      <ReactCalendarContent
        interactionMode={interactionMode}
        className={className}
        dayNameFormat={dayNameFormat}
        onDaySelect={onDaySelect}
        onEventEdit={onEventEdit}
        onEventDelete={onEventDelete}
      />
    </CalendarProvider>
  );
}

/**
 * Composant interne qui utilise le contexte pour rendre le contenu du calendrier
 * Ce pattern permet de lire le contexte après que le Provider a été initialisé
 */
function ReactCalendarContent({ 
  interactionMode,
  className,
  dayNameFormat,
  onDaySelect,
  onEventEdit,
  onEventDelete
}: { 
  interactionMode: InteractionMode;
  className: string;
  dayNameFormat: 'short' | 'long' | 'narrow';
  onDaySelect?: (day: CoreCalendarDay) => void;
  onEventEdit?: (event: CoreCalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
}) {
  // États pour gérer les modales
  const [selectedDay, setSelectedDay] = useState<CoreCalendarDay | undefined>(undefined);
  const [isEventFormModalOpen, setIsEventFormModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CoreCalendarEvent | undefined>(undefined);
  const [isEventDetailModalOpen, setIsEventDetailModalOpen] = useState(false);
  
  // Accès au contexte pour le rendu conditionnel
  const { view, events, addEvent, deleteEvent, updateEvent, selectedDate } = useCalendarContext();
  
  // Filtrer les événements du jour sélectionné
  const selectedDateEvents = selectedDate 
    ? events.filter(event => event.start.toDateString() === selectedDate.toDateString())
    : [];
  
  // Indique si les événements sont activés
  const showEvents = interactionMode === 'events';
  const allowSelection = interactionMode === 'selection' || interactionMode === 'events';
  
  // Gestionnaire pour ouvrir la modal quand un jour est cliqué
  const handleDayClick = (day: CoreCalendarDay) => {
    setSelectedDay(day);
    
    if (allowSelection && onDaySelect) {
      onDaySelect(day);
    }
    
    if (showEvents) {
      setIsEventFormModalOpen(true);
    }
  };
  
  // Gestionnaire pour ouvrir le détail d'un événement
  const handleEventClick = (event: CoreCalendarEvent) => {
    if (showEvents) {
      setSelectedEvent(event);
      setIsEventDetailModalOpen(true);
    }
  };
  
  // Gestionnaire pour éditer un événement
  const handleEventEdit = (event: CoreCalendarEvent) => {
    setSelectedEvent(event);
    setIsEventFormModalOpen(true);
    
    if (onEventEdit) {
      onEventEdit(event);
    }
  };

  // Gestionnaire pour supprimer un événement
  const handleEventDelete = (eventId: string) => {
    deleteEvent(eventId);
    if (onEventDelete) {
      onEventDelete(eventId);
    }
    // Fermer la modale de détail si elle est ouverte
    setIsEventDetailModalOpen(false);
  };
  
  return (
    <>
      {/* Modal de création d'événement */}
      {showEvents && (
        <CalendarEventFormModalStyled
          isOpen={isEventFormModalOpen}
          onClose={() => setIsEventFormModalOpen(false)}
          selectedDay={selectedDay}
        />
      )}
      
      {/* Modal de détail d'événement */}
      {showEvents && selectedEvent && (
        <CalendarEventDetailModal
          isOpen={isEventDetailModalOpen}
          onClose={() => setIsEventDetailModalOpen(false)}
          event={selectedEvent}
          onEdit={handleEventEdit}
        />
      )}
      
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
            {view === 'month' && (
              <CalendarMonthViewStyled 
                dayNameFormat={dayNameFormat}
                onDayClick={allowSelection ? handleDayClick : undefined}
              />
            )}
            {view === 'week' && (
              <CalendarWeekViewStyled 
                dayNameFormat={dayNameFormat}
                onDayClick={allowSelection ? handleDayClick : undefined}
              />
            )}
          </div>
          
          {/* Affichage des événements pour le jour sélectionné */}
          {showEvents && selectedDate && (
            <div className="calendar-sidebar" style={{ 
              width: '300px', 
              borderLeft: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc'
            }}>
              <CalendarEventListStyled
                events={selectedDateEvents}
                date={selectedDate}
                onEventClick={handleEventClick}
                onEventEdit={handleEventEdit}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}