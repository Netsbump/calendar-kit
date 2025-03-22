import type { CalendarView } from '@calendar/core';
import { CalendarNavigation } from '../components/calendar-navigation';
import { useCalendarContext } from '../components/calendar-provider';

export interface CalendarNavigationStyledProps {
  /**
   * Classes CSS personnalisées
   */
  className?: string;

  /**
   * Fonction appelée lorsque la vue change
   */
  onViewChange?: (view: CalendarView) => void;

  /**
   * Fonction appelée lorsque la date change
   */
  onDateChange?: (date: Date) => void;
}

/**
 * Composant d'exemple qui implémente CalendarNavigation avec un style prédéfini
 */
export function CalendarNavigationStyled({ 
  className = '',
  onViewChange,
  onDateChange
}: CalendarNavigationStyledProps) {
  const { i18n } = useCalendarContext();

  return (
    <CalendarNavigation
      className={`calendar-header ${className}`} // Pour les classes CSS (Tailwind ou autres)
      style={{                                   // Pour les styles inline spécifiques
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
      }}
      renderTitle={(currentDate) => (
        <div className="calendar-title">
          <h2 style={{
            margin: 0,
            fontSize: '1.25rem',
            textTransform: 'capitalize',
          }}>
            {i18n.formatDate(currentDate, { month: 'long', year: 'numeric' })}
          </h2>
        </div>
      )}
      renderNavigation={({ goToPrev, goToToday, goToNext }) => (
        <div className="calendar-navigation" style={{
          display: 'flex',
          gap: '8px',
        }}>
          <button 
            type="button"
            onClick={goToPrev}
            style={{
              padding: '8px 12px',
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {i18n.t('prevMonth')}
          </button>
          <button 
            type="button"
            onClick={goToToday}
            style={{
              padding: '8px 12px',
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {i18n.t('today')}
          </button>
          <button 
            type="button"
            onClick={goToNext}
            style={{
              padding: '8px 12px',
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {i18n.t('nextMonth')}
          </button>
        </div>
      )}
      renderViewSelector={({ view, onViewChange }) => (
        <div className="calendar-view-selector">
          <select 
            value={view} 
            onChange={(e) => onViewChange(e.target.value as CalendarView)}
            style={{
              padding: '8px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
            }}
          >
            {/* <option value="day">Jour</option> */}
            <option value="week">{i18n.t('weekView')}</option>
            <option value="month">{i18n.t('monthView')}</option>
            {/* <option value="year">Année</option> */}
          </select>
        </div>
      )}
      onViewChange={onViewChange}
      onDateChange={onDateChange}
    />
  );
} 