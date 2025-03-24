import React from 'react';
import { CalendarEvent as CoreCalendarEvent } from '@calendar/calendar-core';
import { useCalendarContext } from './calendar-provider';

export interface CalendarEventDetailProps {
  /**
   * L'événement à afficher en détail
   */
  event: CoreCalendarEvent;
  
  /**
   * Fonction appelée lorsque l'utilisateur clique sur "Modifier"
   */
  onEdit?: (event: CoreCalendarEvent) => void;
  
  /**
   * Fonction appelée lorsque l'événement est supprimé
   */
  onDelete?: (eventId: string) => void;
  
  /**
   * Fonction appelée pour fermer la vue détaillée
   */
  onClose?: () => void;
  
  /**
   * Classes CSS additionnelles
   */
  className?: string;
  
  /**
   * Fonction de rendu pour l'en-tête
   */
  renderHeader?: (props: {
    event: CoreCalendarEvent;
    onClose?: () => void;
  }) => React.ReactNode;
  
  /**
   * Fonction de rendu pour le contenu principal
   */
  renderContent?: (props: {
    event: CoreCalendarEvent;
    formatDate: (date: Date) => string;
    formatTime: (date: Date) => string;
    formatDuration: (start: Date, end: Date, allDay: boolean) => string;
  }) => React.ReactNode;
  
  /**
   * Fonction de rendu pour les actions (boutons)
   */
  renderActions?: (props: {
    event: CoreCalendarEvent;
    onEdit?: (event: CoreCalendarEvent) => void;
    onDelete?: (eventId: string) => void;
  }) => React.ReactNode;
}

/**
 * Composant headless qui affiche les détails d'un événement
 */
export function CalendarEventDetail({
  event,
  onEdit,
  onDelete,
  onClose,
  className = '',
  renderHeader,
  renderContent,
  renderActions
}: CalendarEventDetailProps) {
  const { deleteEvent, i18n } = useCalendarContext();
  
  // Gérer la suppression d'un événement
  const handleDelete = () => {
    deleteEvent(event.id);
    if (onDelete) {
      onDelete(event.id);
    }
    if (onClose) {
      onClose();
    }
  };
  
  // Gérer la modification d'un événement
  const handleEdit = () => {
    if (onEdit) {
      onEdit(event);
    }
  };
  
  // Formatage de la date
  const formatDate = (date: Date) => {
    return i18n.formatDate(date, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Formatage de l'heure
  const formatTime = (date: Date) => {
    if (event.allDay) {
      return '';
    }
    return i18n.formatDate(date, {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Formatage de la durée
  const formatDuration = (start: Date, end: Date, allDay: boolean) => {
    if (allDay) {
      return i18n.t('allDay');
    }
    
    const startTime = formatTime(start);
    const endTime = formatTime(end);
    
    // Si même jour
    if (start.toDateString() === end.toDateString()) {
      return `${startTime} - ${endTime}`;
    }
    
    // Si jours différents
    return `${formatDate(start)} ${startTime} - ${formatDate(end)} ${endTime}`;
  };
  
  // Rendu par défaut pour l'en-tête
  const defaultRenderHeader = ({ event, onClose }: { event: CoreCalendarEvent; onClose?: () => void }) => (
    <div>
      <h2>{event.title}</h2>
      {onClose && (
        <button 
          onClick={onClose}
          aria-label="Fermer"
        >
          ×
        </button>
      )}
    </div>
  );
  
  // Rendu par défaut pour le contenu
  const defaultRenderContent = ({ 
    event,
    formatDate,
    formatTime,
    formatDuration
  }: { 
    event: CoreCalendarEvent;
    formatDate: (date: Date) => string;
    formatTime: (date: Date) => string;
    formatDuration: (start: Date, end: Date, allDay: boolean) => string;
  }) => (
    <div>
      <div>
        <span>Quand:</span>
        <span>{formatDuration(event.start, event.end, event.allDay)}</span>
      </div>
      
      {event.location && (
        <div>
          <span>Où:</span>
          <span>{event.location}</span>
        </div>
      )}
      
      {event.description && (
        <div>
          <span>Description:</span>
          <div>{event.description}</div>
        </div>
      )}
    </div>
  );
  
  // Rendu par défaut pour les actions
  const defaultRenderActions = ({ 
    event,
    onEdit,
    onDelete
  }: { 
    event: CoreCalendarEvent;
    onEdit?: (event: CoreCalendarEvent) => void;
    onDelete?: (eventId: string) => void;
  }) => (
    <div>
      {onEdit && (
        <button
          onClick={handleEdit}
          aria-label="Modifier l'événement"
        >
          Modifier
        </button>
      )}
      <button
        onClick={handleDelete}
        aria-label="Supprimer l'événement"
      >
        Supprimer
      </button>
    </div>
  );
  
  return (
    <div className={className}>
      {/* En-tête */}
      {renderHeader 
        ? renderHeader({ event, onClose }) 
        : defaultRenderHeader({ event, onClose })
      }
      
      {/* Contenu */}
      {renderContent 
        ? renderContent({ event, formatDate, formatTime, formatDuration }) 
        : defaultRenderContent({ event, formatDate, formatTime, formatDuration })
      }
      
      {/* Actions */}
      {renderActions 
        ? renderActions({ event, onEdit, onDelete: handleDelete }) 
        : defaultRenderActions({ event, onEdit, onDelete: handleDelete })
      }
    </div>
  );
} 