import React from 'react';
import { CalendarEvent as CoreCalendarEvent } from '@calendar/calendar-core';
import { ModalStyled } from './modal-styled';
import { CalendarEventDetail } from '../components/calendar-event-detail';

// Styles pour le détail d'événement
const styles = `
.event-detail-container {
  padding: 0;
}

.event-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.event-detail-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.event-detail-content {
  margin-bottom: 24px;
}

.event-detail-field {
  display: flex;
  margin-bottom: 12px;
}

.event-detail-field-label {
  width: 100px;
  font-weight: 500;
  color: #666;
}

.event-detail-field-value {
  flex: 1;
}

.event-detail-description {
  margin-top: 8px;
  white-space: pre-wrap;
}

.event-detail-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.event-detail-button {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.event-detail-button-edit {
  background-color: transparent;
  border: 1px solid #ddd;
  color: #555;
}

.event-detail-button-edit:hover {
  background-color: #f5f5f5;
}

.event-detail-button-delete {
  background-color: #f44336;
  border: 1px solid #f44336;
  color: white;
}

.event-detail-button-delete:hover {
  background-color: #e53935;
}
`;

export interface CalendarEventDetailModalProps {
  /**
   * L'événement à afficher
   */
  event?: CoreCalendarEvent;
  
  /**
   * Indique si le modal est ouvert
   */
  isOpen: boolean;
  
  /**
   * Fonction appelée à la fermeture du modal
   */
  onClose: () => void;
  
  /**
   * Fonction appelée pour éditer un événement
   */
  onEdit?: (event: CoreCalendarEvent) => void;
}

/**
 * Modal qui affiche les détails d'un événement
 */
export function CalendarEventDetailModal({
  event,
  isOpen,
  onClose,
  onEdit
}: CalendarEventDetailModalProps) {
  if (!event) {
    return null;
  }
  
  // Gérer l'édition
  const handleEdit = (event: CoreCalendarEvent) => {
    if (onEdit) {
      onEdit(event);
      onClose();
    }
  };
  
  return (
    <>
      <style>{styles}</style>
      <ModalStyled
        isOpen={isOpen}
        onClose={onClose}
        title={event.title}
        size="default"
      >
        <CalendarEventDetail
          event={event}
          onClose={onClose}
          onEdit={handleEdit}
          className="event-detail-container"
          renderHeader={({ event, onClose }) => (
            <div className="event-detail-header">
              <h2>{event.title}</h2>
              {onClose && (
                <button 
                  onClick={onClose}
                  aria-label="Fermer"
                  className="modal-close-btn"
                >
                  ×
                </button>
              )}
            </div>
          )}
          
          renderContent={({ event, formatDate, formatTime, formatDuration }) => (
            <div className="event-detail-content">
              <div className="event-detail-field">
                <div className="event-detail-field-label">Quand:</div>
                <div className="event-detail-field-value">
                  {formatDuration(event.start, event.end, event.allDay)}
                </div>
              </div>
              
              {event.location && (
                <div className="event-detail-field">
                  <div className="event-detail-field-label">Où:</div>
                  <div className="event-detail-field-value">{event.location}</div>
                </div>
              )}
              
              {event.description && (
                <div className="event-detail-field">
                  <div className="event-detail-field-label">Description:</div>
                  <div className="event-detail-field-value">
                    <div className="event-detail-description">
                      {event.description}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          renderActions={({ event, onEdit, onDelete }) => (
            <div className="event-detail-actions">
              {onEdit && (
                <button
                  onClick={() => onEdit(event)}
                  className="event-detail-button event-detail-button-edit"
                >
                  Modifier
                </button>
              )}
              <button
                onClick={() => onDelete && onDelete(event.id)}
                className="event-detail-button event-detail-button-delete"
              >
                Supprimer
              </button>
            </div>
          )}
        />
      </ModalStyled>
    </>
  );
} 