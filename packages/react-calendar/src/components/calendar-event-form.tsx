import React, { useState } from 'react';
import { useCalendarContext } from './calendar-provider';
import type { CalendarDay } from '@calendar/calendar-core';

export interface CalendarEventFormProps {
  /**
   * Jour sélectionné pour créer l'événement
   */
  selectedDay?: CalendarDay;
  
  /**
   * Fonction appelée lors de la soumission du formulaire
   */
  onSubmit?: () => void;
  
  /**
   * Fonction appelée lors de l'annulation
   */
  onCancel?: () => void;
  
  /**
   * Fonction de rendu pour le champ de titre
   */
  renderTitleField?: (props: {
    title: string;
    setTitle: (title: string) => void;
    placeholder: string;
  }) => React.ReactNode;
  
  /**
   * Fonction de rendu pour l'affichage de la date
   */
  renderDateDisplay?: (props: {
    formattedDate: string;
  }) => React.ReactNode;
  
  /**
   * Fonction de rendu pour les champs d'heure
   */
  renderTimeFields?: (props: {
    startTime: string;
    endTime: string;
    setStartTime: (time: string) => void;
    setEndTime: (time: string) => void;
  }) => React.ReactNode;
  
  /**
   * Fonction de rendu pour le champ "toute la journée"
   */
  renderAllDayField?: (props: {
    allDay: boolean;
    setAllDay: (allDay: boolean) => void;
    label: string;
  }) => React.ReactNode;
  
  /**
   * Fonction de rendu pour les boutons d'action
   */
  renderActionButtons?: (props: {
    onCancel: () => void;
    cancelLabel: string;
    saveLabel: string;
  }) => React.ReactNode;
}

/**
 * Composant headless pour le formulaire de création d'événement
 * Gère la logique sans imposer de style
 */
export function CalendarEventForm({
  selectedDay,
  onSubmit,
  onCancel,
  renderTitleField,
  renderDateDisplay,
  renderTimeFields,
  renderAllDayField,
  renderActionButtons
}: CalendarEventFormProps) {
  const { addEvent, i18n } = useCalendarContext();
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00'); 
  const [allDay, setAllDay] = useState(false);
  
  if (!selectedDay) {
    return null;
  }
  
  // Formatage de la date pour l'affichage
  const formattedDate = i18n.formatDate(selectedDay.date, { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long',
    year: 'numeric'
  });
  
  // Fonction pour créer un événement
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Création des dates de début et fin
    const date = selectedDay.date;
    
    // Si c'est un événement toute la journée
    if (allDay) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      // Pour un événement toute la journée, on fixe les heures à 0 et 23:59
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      
      addEvent({
        title: title || i18n.t('newEvent'),
        start: startDate,
        end: endDate,
        allDay: true
      });
    } else {
      // Pour un événement avec horaire spécifique
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);
      
      const startDate = new Date(date);
      const endDate = new Date(date);
      
      startDate.setHours(startHour, startMinute, 0, 0);
      endDate.setHours(endHour, endMinute, 0, 0);
      
      addEvent({
        title: title || i18n.t('newEvent'),
        start: startDate,
        end: endDate,
        allDay: false
      });
    }
    
    // Réinitialiser le formulaire
    setTitle('');
    if (onSubmit) {
      onSubmit();
    }
  };
  
  // Fonctions de rendu par défaut
  const defaultRenderTitleField = ({ 
    title, 
    setTitle, 
    placeholder 
  }: { 
    title: string; 
    setTitle: (title: string) => void; 
    placeholder: string; 
  }) => (
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder={placeholder}
    />
  );
  
  const defaultRenderDateDisplay = ({ formattedDate }: { formattedDate: string }) => (
    <div>{formattedDate}</div>
  );
  
  const defaultRenderTimeFields = ({ 
    startTime, 
    endTime, 
    setStartTime, 
    setEndTime 
  }: { 
    startTime: string; 
    endTime: string; 
    setStartTime: (time: string) => void; 
    setEndTime: (time: string) => void; 
  }) => (
    <div>
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <span>-</span>
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
    </div>
  );
  
  const defaultRenderAllDayField = ({ 
    allDay, 
    setAllDay, 
    label 
  }: { 
    allDay: boolean; 
    setAllDay: (allDay: boolean) => void; 
    label: string; 
  }) => (
    <label>
      <input
        type="checkbox"
        checked={allDay}
        onChange={(e) => setAllDay(e.target.checked)}
      />
      {label}
    </label>
  );
  
  const defaultRenderActionButtons = ({ 
    onCancel, 
    cancelLabel, 
    saveLabel 
  }: { 
    onCancel: () => void; 
    cancelLabel: string; 
    saveLabel: string; 
  }) => (
    <div>
      <button type="button" onClick={onCancel}>
        {cancelLabel}
      </button>
      <button type="submit">
        {saveLabel}
      </button>
    </div>
  );
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {renderTitleField ? renderTitleField({
          title,
          setTitle,
          placeholder: i18n.t('newEvent')
        }) : defaultRenderTitleField({
          title,
          setTitle,
          placeholder: i18n.t('newEvent')
        })}
      </div>
      
      <div>
        {renderDateDisplay ? renderDateDisplay({
          formattedDate
        }) : defaultRenderDateDisplay({
          formattedDate
        })}
      </div>
      
      {!allDay && (
        <div>
          {renderTimeFields ? renderTimeFields({
            startTime,
            endTime,
            setStartTime,
            setEndTime
          }) : defaultRenderTimeFields({
            startTime,
            endTime,
            setStartTime,
            setEndTime
          })}
        </div>
      )}
      
      <div>
        {renderAllDayField ? renderAllDayField({
          allDay,
          setAllDay,
          label: i18n.t('allDay')
        }) : defaultRenderAllDayField({
          allDay,
          setAllDay,
          label: i18n.t('allDay')
        })}
      </div>
      
      <div>
        {renderActionButtons ? renderActionButtons({
          onCancel: onCancel || (() => {}),
          cancelLabel: i18n.t('cancel'),
          saveLabel: i18n.t('save')
        }) : defaultRenderActionButtons({
          onCancel: onCancel || (() => {}),
          cancelLabel: i18n.t('cancel'),
          saveLabel: i18n.t('save')
        })}
      </div>
    </form>
  );
} 