import React, { forwardRef } from 'react';
import { Modal, ModalProps } from '../components/modal';

// Types pour les variantes
export type ModalSize = 'default' | 'compact' | 'large';

// Props étendues pour le style
export interface ModalStyledProps extends Omit<ModalProps, 'renderHeader' | 'renderContent' | 'renderFooter' | 'dialogElement'> {
  /**
   * Taille du modal
   * @default 'default'
   */
  size?: ModalSize;
}

// Styles CSS intégrés
const styles = `
/* Styles pour le modal */
.modal {
  border: none;
  border-radius: 8px;
  padding: 0;
  max-width: 90vw;
  max-height: 85vh;
  background-color: white;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* Tailles de modal */
.modal-default {
  width: 600px;
}

.modal-compact {
  width: 400px;
}

.modal-large {
  width: 800px;
}

/* Backdrop et animation */
.modal::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.modal[open] {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Entête du modal */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eaeaea;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.modal-close-btn {
  background: transparent;
  border: none;
  color: #666;
  font-size: 24px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.modal-close-btn:hover {
  background-color: #f5f5f5;
}

.modal-close-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 145, 255, 0.2);
}

/* Contenu du modal */
.modal-content {
  padding: 20px;
  overflow-y: auto;
  max-height: calc(85vh - 120px);
}

/* Pied de page du modal */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #eaeaea;
}

/* Boutons du modal */
.modal-btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.modal-btn-close {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  color: #555;
}

.modal-btn-close:hover {
  background-color: #eaeaea;
}
`;

/**
 * Version stylisée du composant Modal
 */
export function ModalStyled({
  isOpen,
  title,
  onClose,
  children,
  size = 'default'
}: ModalStyledProps) {
  // Créer l'élément dialog avec la classe correspondant à la taille
  const DialogWithRef = forwardRef<HTMLDialogElement, { className?: string; children?: React.ReactNode }>(
    (props, ref) => <dialog ref={ref} {...props} />
  );
  
  const sizeClass = `modal-${size}`;
  
  return (
    <>
      <style>{styles}</style>
      <Modal
        isOpen={isOpen}
        title={title}
        onClose={onClose}
        dialogElement={<DialogWithRef className={`modal ${sizeClass}`} />}
        renderHeader={({ title, onClose }) => (
          <div className="modal-header">
            {title && <h2 className="modal-title">{title}</h2>}
            <button type="button" onClick={onClose} aria-label="Fermer" className="modal-close-btn">
              ×
            </button>
          </div>
        )}
        renderContent={({ children }) => (
          <div className="modal-content">
            {children}
          </div>
        )}
        renderFooter={({ onClose }) => (
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="modal-btn modal-btn-close">
              Fermer
            </button>
          </div>
        )}
      >
        {children}
      </Modal>
    </>
  );
} 