import React, { ChangeEvent } from 'react';
import { CalendarEventForm, CalendarEventFormProps } from '../components/calendar-event-form';

// Styles CSS intégrés
const styles = `
/* Styles pour le formulaire d'événement */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.form-label {
  font-weight: 500;
  font-size: 14px;
}

.form-input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-input:focus {
  outline: none;
  border-color: #0091ff;
  box-shadow: 0 0 0 2px rgba(0, 145, 255, 0.2);
}

.form-input-title {
  padding: 10px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

.form-date-display {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  padding: 8px 0;
}

.form-time-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-input-time {
  padding: 8px;
}

.form-all-day-container {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

.form-buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}

.form-button {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.form-button-cancel {
  background-color: transparent;
  border: 1px solid #ddd;
  color: #666;
}

.form-button-cancel:hover {
  background-color: #f5f5f5;
}

.form-button-save {
  background-color: #0091ff;
  border: 1px solid #0091ff;
  color: white;
}

.form-button-save:hover {
  background-color: #0082e6;
}
`;

/**
 * Version stylisée du formulaire d'événement de calendrier
 */
export function CalendarEventFormStyled(props: CalendarEventFormProps) {
  return (
    <>
      <style>{styles}</style>
      <CalendarEventForm
        {...props}
        renderTitleField={({ title, setTitle, placeholder }) => (
          <div className="form-group">
            <label className="form-label">Titre</label>
            <input
              className="form-input form-input-title"
              type="text"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              placeholder={placeholder}
            />
          </div>
        )}
        
        renderDateDisplay={({ formattedDate }) => (
          <div className="form-group">
            <label className="form-label">Date</label>
            <div className="form-date-display">{formattedDate}</div>
          </div>
        )}
        
        renderTimeFields={({ startTime, endTime, setStartTime, setEndTime }) => (
          <div className="form-group">
            <label className="form-label">Horaires</label>
            <div className="form-time-container">
              <input
                className="form-input form-input-time"
                type="time"
                value={startTime}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
              />
              <span>à</span>
              <input
                className="form-input form-input-time"
                type="time"
                value={endTime}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        )}
        
        renderAllDayField={({ allDay, setAllDay, label }) => (
          <div className="form-group">
            <label className="form-all-day-container">
              <input
                type="checkbox"
                checked={allDay}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setAllDay(e.target.checked)}
              />
              {label}
            </label>
          </div>
        )}
        
        renderActionButtons={({ onCancel, cancelLabel, saveLabel }) => (
          <div className="form-buttons-container">
            <button 
              className="form-button form-button-cancel" 
              type="button" 
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
            <button 
              className="form-button form-button-save" 
              type="submit"
            >
              {saveLabel}
            </button>
          </div>
        )}
      />
    </>
  );
} 