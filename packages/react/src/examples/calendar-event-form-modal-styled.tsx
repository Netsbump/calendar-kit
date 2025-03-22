import { CalendarDay } from '@calendar/core';
import { ModalStyled } from './modal-styled';
import { CalendarEventFormStyled } from './calendar-event-form-styled';

export interface CalendarEventFormModalStyledProps {
  /**
   * Détermine si le modal est visible
   */
  isOpen: boolean;
  
  /**
   * Fonction appelée lorsque le modal est fermé
   */
  onClose: () => void;
  
  /**
   * Jour sélectionné pour créer l'événement
   */
  selectedDay?: CalendarDay;
}

/**
 * Modal pour la création d'événements dans le calendrier
 * Utilise les composants headless avec leurs versions stylisées
 */
export function CalendarEventFormModalStyled({ 
  isOpen, 
  onClose, 
  selectedDay 
}: CalendarEventFormModalStyledProps) {
  const handleSubmit = () => {
    onClose();
  };
  
  return (
    <ModalStyled
      isOpen={isOpen}
      onClose={onClose}
      title="Nouvel événement"
      size="compact"
    >
      <CalendarEventFormStyled
        selectedDay={selectedDay}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </ModalStyled>
  );
} 