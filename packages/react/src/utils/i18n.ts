// Types
export type SupportedLocale = 'fr-FR' | 'en-US';

// Type pour les clés de traduction
export type TranslationKey = 
  | 'nextMonth' 
  | 'prevMonth' 
  | 'today' 
  | 'viewDay' 
  | 'viewWeek' 
  | 'viewMonth' 
  | 'viewYear' 
  | 'addEvent' 
  | 'newEvent' 
  | 'events' 
  | 'noEvents'
  | 'cancel'
  | 'confirm'
  | 'save'
  | 'delete'
  | 'weekView'
  | 'monthView';

interface I18nOptions {
  locale: SupportedLocale;
  // Éventuellement des traductions personnalisées
  customTranslations?: Partial<Record<SupportedLocale, Partial<Record<TranslationKey, string>>>>;
}

// Traductions par défaut pour les éléments UI (boutons, labels, etc.)
const defaultTranslations: Record<SupportedLocale, Record<TranslationKey, string>> = {
  'fr-FR': {
    nextMonth: 'Suivant',
    prevMonth: 'Précédent',
    today: 'Aujourd\'hui',
    viewDay: 'Jour',
    viewWeek: 'Semaine', 
    viewMonth: 'Mois',
    viewYear: 'Année',
    addEvent: 'Ajouter',
    newEvent: 'Nouvel événement',
    events: 'Événements du',
    noEvents: 'Aucun événement',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    save: 'Enregistrer',
    delete: 'Supprimer',
    weekView: 'Semaine',
    monthView: 'Mois'
  },
  'en-US': {
    nextMonth: 'Next',
    prevMonth: 'Previous',
    today: 'Today',
    viewDay: 'Day',
    viewWeek: 'Week',
    viewMonth: 'Month',
    viewYear: 'Year',
    addEvent: 'Add',
    newEvent: 'New event',
    events: 'Events for',
    noEvents: 'No events',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    weekView: 'Week',
    monthView: 'Month'
  }
};

/**
 * Crée un utilitaire d'internationalisation pour le calendrier
 * @param options Options de configuration
 * @returns Un objet avec des méthodes pour l'internationalisation
 */
export function createI18n(options: I18nOptions) {
  const { locale = 'fr-FR', customTranslations = {} } = options;
  
  // Fusionner les traductions par défaut avec les personnalisées
  const translations = {
    ...defaultTranslations,
    [locale]: {
      ...defaultTranslations[locale],
      ...(customTranslations[locale] || {})
    }
  };
  
  return {
    // Traduire une clé
    t: (key: TranslationKey): string => {
      return translations[locale][key] || key;
    },
    
    // Formater une date
    formatDate: (date: Date, options?: Intl.DateTimeFormatOptions): string => {
      return new Intl.DateTimeFormat(locale, options).format(date);
    },
    
    // Obtenir les noms des jours
    getDayNames: (format: 'long' | 'short' | 'narrow' = 'short'): string[] => {
      const days = [];
      // Déterminer le premier jour selon la locale
      const startDay = locale.startsWith('fr') ? 1 : 0; // 1 = lundi, 0 = dimanche
      
      for (let i = 0; i < 7; i++) {
        // Décaler pour commencer par le bon jour selon la locale
        const day = new Date(2021, 0, 3 + ((i + startDay) % 7)); // 3 janvier 2021 était un dimanche
        days.push(new Intl.DateTimeFormat(locale, { weekday: format }).format(day));
      }
      
      return days;
    },
    
    // Obtenir les noms des mois
    getMonthNames: (format: 'long' | 'short' | 'narrow' = 'long'): string[] => {
      const months = [];
      
      for (let i = 0; i < 12; i++) {
        const month = new Date(2021, i, 1);
        months.push(new Intl.DateTimeFormat(locale, { month: format }).format(month));
      }
      
      return months;
    },
    
    // Formater une date selon le format spécifié
    format: (date: Date, formatType: 'date' | 'time' | 'datetime' = 'date'): string => {
      const options: Intl.DateTimeFormatOptions = {};
      
      if (formatType === 'date' || formatType === 'datetime') {
        options.day = 'numeric';
        options.month = 'numeric'; 
        options.year = 'numeric';
      }
      
      if (formatType === 'time' || formatType === 'datetime') {
        options.hour = '2-digit';
        options.minute = '2-digit';
      }
      
      return new Intl.DateTimeFormat(locale, options).format(date);
    },
    
    // Accès à la locale courante
    getLocale: (): SupportedLocale => locale,
    
    // Obtenir le premier jour de la semaine (0 = dimanche, 1 = lundi)
    getFirstDayOfWeek: (): number => locale.startsWith('fr') ? 1 : 0
  };
}

// Type pour l'objet retourné
export type I18n = ReturnType<typeof createI18n>; 