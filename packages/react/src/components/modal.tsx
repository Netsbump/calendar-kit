import React, { useRef, useEffect } from 'react';

export interface ModalProps {
  /**
   * Indique si le modal est visible
   */
  isOpen: boolean;
  
  /**
   * Titre du modal (optionnel)
   */
  title?: string;
  
  /**
   * Fonction appelée quand le modal est fermé
   */
  onClose: () => void;
  
  /**
   * Le contenu du modal
   */
  children: React.ReactNode;
  
  /**
   * Élément HTML dialog à utiliser (optionnel)
   * Permet de passer un élément dialog personnalisé
   */
  dialogElement?: React.ReactElement;
  
  /**
   * Fonction de rendu pour le header du modal
   */
  renderHeader?: (props: {
    title?: string;
    onClose: () => void;
  }) => React.ReactNode;
  
  /**
   * Fonction de rendu pour le contenu du modal
   */
  renderContent?: (props: {
    children: React.ReactNode;
  }) => React.ReactNode;
  
  /**
   * Fonction de rendu pour le footer du modal
   */
  renderFooter?: (props: {
    onClose: () => void;
  }) => React.ReactNode;
}

/**
 * Composant Modal headless utilisant l'élément HTML dialog natif
 * pour une meilleure accessibilité et comportement modal.
 */
export function Modal({
  isOpen,
  title,
  onClose,
  children,
  dialogElement,
  renderHeader,
  renderContent,
  renderFooter
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  // Ouvrir/fermer le modal
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    
    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);
  
  // Gérer les événements de fermeture
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    
    const handleClose = () => {
      if (onClose) onClose();
    };
    
    const handleCancel = (event: Event) => {
      event.preventDefault();
      if (onClose) onClose();
    };
    
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (onClose) onClose();
      }
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dialog && event.target === dialog) {
        if (onClose) onClose();
      }
    };
    
    dialog.addEventListener('close', handleClose);
    dialog.addEventListener('cancel', handleCancel);
    document.addEventListener('keydown', handleKeydown);
    dialog.addEventListener('click', handleClickOutside);
    
    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('cancel', handleCancel);
      document.removeEventListener('keydown', handleKeydown);
      dialog.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);
  
  // Rendu par défaut pour le header
  const defaultRenderHeader = ({ title, onClose }: { title?: string, onClose: () => void }) => (
    <div>
      {title && <h2>{title}</h2>}
      <button type="button" onClick={onClose} aria-label="Fermer">
        ×
      </button>
    </div>
  );
  
  // Rendu par défaut pour le contenu
  const defaultRenderContent = ({ children }: { children: React.ReactNode }) => (
    <div>
      {children}
    </div>
  );
  
  // Rendu par défaut pour le footer
  const defaultRenderFooter = ({ onClose }: { onClose: () => void }) => (
    <div>
      <button type="button" onClick={onClose}>
        Fermer
      </button>
    </div>
  );
  
  // Ne rien rendre si le modal n'est pas ouvert
  if (!isOpen) {
    return null;
  }
  
  // Si un élément dialog personnalisé est fourni, l'utiliser
  if (dialogElement) {
    return React.cloneElement(dialogElement, {
      ref: dialogRef,
      children: (
        <>
          {renderHeader 
            ? renderHeader({ title, onClose }) 
            : defaultRenderHeader({ title, onClose })}
          
          {renderContent 
            ? renderContent({ children }) 
            : defaultRenderContent({ children })}
          
          {renderFooter 
            ? renderFooter({ onClose }) 
            : defaultRenderFooter({ onClose })}
        </>
      )
    });
  }
  
  // Sinon, utiliser un dialog standard
  return (
    <dialog ref={dialogRef}>
      {renderHeader 
        ? renderHeader({ title, onClose }) 
        : defaultRenderHeader({ title, onClose })}
      
      {renderContent 
        ? renderContent({ children }) 
        : defaultRenderContent({ children })}
      
      {renderFooter 
        ? renderFooter({ onClose }) 
        : defaultRenderFooter({ onClose })}
    </dialog>
  );
} 