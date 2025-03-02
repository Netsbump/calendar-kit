import type React from 'react';
import { useState } from 'react';
import type { CalendarView, CalendarDay as CoreCalendarDay, CalendarEvent } from '@calendar/core';
import { useCalendar } from '../hooks/useCalendar';

export interface ReactCalendarProps {
  /**
   * Format des noms de jours
   */
  dayNameFormat?: 'short' | 'long' | 'narrow';
  
  /**
   * Activer la gestion des événements
   */
  withEvents?: boolean;
  
  /**
   * Activer la sélection des jours
   */
  withDaySelection?: boolean;
  
  /**
   * Classes CSS personnalisées
   */
  className?: string;
  
  /**
   * Fonction appelée lorsqu'un jour est cliqué
   */
  onDayClick?: (day: CoreCalendarDay) => void;
  
  /**
   * Fonction appelée lorsqu'un événement est ajouté
   */
  onEventAdd?: (event: CalendarEvent) => void;
  
  /**
   * Fonction appelée lorsque la vue change
   */
  onViewChange?: (view: CalendarView) => void;
  
  /**
   * Fonction appelée lorsque la date courante change
   */
  onDateChange?: (date: Date) => void;
}

// Sous-composants internes (non exportés)
interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  goToNext: () => void;
  goToPrev: () => void;
  goToToday: () => void;
  setView: (view: CalendarView) => void;
  onViewChange?: (view: CalendarView) => void;
  onDateChange?: (date: Date) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  goToNext,
  goToPrev,
  goToToday,
  setView,
  onViewChange,
  onDateChange
}) => {
  const handleViewChange = (newView: CalendarView) => {
    setView(newView);
    if (onViewChange) {
      onViewChange(newView);
    }
  };

  const handleNext = () => {
    goToNext();
    if (onDateChange) {
      onDateChange(currentDate);
    }
  };

  const handlePrev = () => {
    goToPrev();
    if (onDateChange) {
      onDateChange(currentDate);
    }
  };

  const handleToday = () => {
    goToToday();
    if (onDateChange) {
      onDateChange(currentDate);
    }
  };

  return (
    <div className="calendar-header" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      backgroundColor: '#f8fafc',
      borderBottom: '1px solid #e2e8f0',
    }}>
      <div className="calendar-title">
        <h2 style={{
          margin: 0,
          fontSize: '1.25rem',
          textTransform: 'capitalize',
        }}>{new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(currentDate)}</h2>
      </div>
      <div className="calendar-navigation" style={{
        display: 'flex',
        gap: '8px',
      }}>
        <button 
          type="button"
          onClick={handlePrev}
          style={{
            padding: '8px 12px',
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Précédent
        </button>
        <button 
          type="button"
          onClick={handleToday}
          style={{
            padding: '8px 12px',
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Aujourd'hui
        </button>
        <button 
          type="button"
          onClick={handleNext}
          style={{
            padding: '8px 12px',
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Suivant
        </button>
      </div>
      <div className="calendar-view-selector">
        <select 
          value={view} 
          onChange={(e) => handleViewChange(e.target.value as CalendarView)}
          style={{
            padding: '8px',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
          }}
        >
          <option value="day">Jour</option>
          <option value="week">Semaine</option>
          <option value="month">Mois</option>
          <option value="year">Année</option>
        </select>
      </div>
    </div>
  );
};

interface CalendarDayProps {
  day: CoreCalendarDay;
  isSelectable: boolean;
  onDayClick: (day: CoreCalendarDay) => void;
  withEvents: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ 
  day, 
  isSelectable, 
  onDayClick,
  withEvents
}) => {
  const handleClick = () => {
    onDayClick(day);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onDayClick(day);
    }
  };

  return (
    <div 
      className={`day ${day.isCurrentMonth ? 'current-month' : 'other-month'} ${day.isToday ? 'today' : ''} ${day.isSelected ? 'selected' : ''}`}
      style={{
        aspectRatio: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        backgroundColor: day.isToday 
          ? '#eff6ff' 
          : day.isSelected
            ? '#e0f2fe'
            : day.isCurrentMonth 
              ? '#fff' 
              : '#f8fafc',
        border: day.isSelected
          ? '2px solid #3b82f6'
          : day.isToday 
            ? '1px solid #3b82f6' 
            : '1px solid #e2e8f0',
        color: day.isCurrentMonth ? '#000' : '#94a3b8',
        fontWeight: day.isToday ? 'bold' : day.isCurrentMonth ? 500 : 'normal',
        cursor: isSelectable ? 'pointer' : 'default',
        padding: '4px',
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isSelectable ? "button" : undefined}
      tabIndex={isSelectable ? 0 : undefined}
    >
      <div>{day.dayOfMonth}</div>
      {withEvents && day.events && day.events.length > 0 && (
        <div style={{ 
          marginTop: '4px', 
          width: '6px', 
          height: '6px', 
          borderRadius: '50%', 
          backgroundColor: '#3b82f6' 
        }} />
      )}
    </div>
  );
};

interface CalendarMonthViewProps {
  monthGrid: ReturnType<ReturnType<typeof useCalendar>['getMonthGrid']>;
  dayNames: string[];
  withDaySelection: boolean;
  withEvents: boolean;
  onDayClick: (day: CoreCalendarDay) => void;
}

const CalendarMonthView: React.FC<CalendarMonthViewProps> = ({
  monthGrid,
  dayNames,
  withDaySelection,
  withEvents,
  onDayClick
}) => {
  return (
    <div className="month-view">
      <div className="weekdays" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
        marginBottom: '8px',
      }}>
        {dayNames.map((day) => (
          <div 
            key={day} 
            className="weekday"
            style={{
              textAlign: 'center',
              fontWeight: 600,
              color: '#64748b',
              padding: '8px',
            }}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="month-grid" style={{
        display: 'grid',
        gap: '4px',
        gridTemplateRows: 'repeat(6, 1fr)',
      }}>
        {monthGrid.weeks.map((week, weekIndex) => (
          <div 
            key={`week-${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
weekIndex}`} 
            className="week"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px',
            }}
          >
            {week.days.map((day) => (
              <CalendarDay 
                key={`day-${day.date.toISOString()}`}
                day={day}
                isSelectable={withDaySelection}
                onDayClick={onDayClick}
                withEvents={withEvents}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

interface CalendarWeekViewProps {
  weekGrid: ReturnType<ReturnType<typeof useCalendar>['getWeekGrid']>;
  dayNames: string[];
  withDaySelection: boolean;
  withEvents: boolean;
  onDayClick: (day: CoreCalendarDay) => void;
}

const CalendarWeekView: React.FC<CalendarWeekViewProps> = ({
  weekGrid,
  dayNames,
  withDaySelection,
  withEvents,
  onDayClick
}) => {
  return (
    <div className="week-view">
      <div className="weekdays" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
        marginBottom: '8px',
      }}>
        {dayNames.map((day) => (
          <div 
            key={day} 
            className="weekday"
            style={{
              textAlign: 'center',
              fontWeight: 600,
              color: '#64748b',
              padding: '8px',
            }}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="week-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
      }}>
        {weekGrid.days.map((day) => (
          <CalendarDay 
            key={`day-${day.date.toISOString()}`}
            day={day}
            isSelectable={withDaySelection}
            onDayClick={onDayClick}
            withEvents={withEvents}
          />
        ))}
      </div>
    </div>
  );
};

interface CalendarSidebarProps {
  selectedDate?: Date;
  events: CalendarEvent[];
  eventTitle: string;
  setEventTitle: (title: string) => void;
  handleAddEvent: () => void;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  selectedDate,
  events,
  eventTitle,
  setEventTitle,
  handleAddEvent
}) => {
  return (
    <div style={{ width: '300px', padding: '16px', borderLeft: '1px solid #e2e8f0' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Jour sélectionné</h3>
        {selectedDate ? (
          <p style={{ margin: '0' }}>{selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        ) : (
          <p style={{ margin: '0' }}>Cliquez sur un jour pour le sélectionner</p>
        )}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Ajouter un événement</h3>
        <input 
          type="text" 
          value={eventTitle} 
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Titre de l'événement"
          style={{ 
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #e2e8f0',
            width: '100%',
            marginBottom: '8px'
          }}
        />
        <button 
          type="button"
          onClick={handleAddEvent}
          disabled={!selectedDate}
          style={{
            padding: '8px 16px',
            backgroundColor: selectedDate ? '#3b82f6' : '#94a3b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedDate ? 'pointer' : 'not-allowed',
            width: '100%'
          }}
        >
          Ajouter un événement
        </button>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Événements ({events.length})</h3>
        {events.length === 0 ? (
          <p style={{ margin: '0' }}>Aucun événement. Ajoutez-en un pour le voir ici.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {events.map((event) => (
              <li 
                key={event.id}
                style={{ 
                  padding: '10px', 
                  margin: '5px 0', 
                  backgroundColor: '#fff',
                  border: '1px solid #eee',
                  borderRadius: '4px'
                }}
              >
                <strong>{event.title}</strong>
                <div>
                  {event.start.toLocaleDateString('fr-FR')} {event.start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

/**
 * Composant de calendrier React prêt à l'emploi mais personnalisable
 */
export function ReactCalendar({ 
  dayNameFormat = 'short',
  withEvents = false,
  withDaySelection = false,
  className = '',
  onDayClick,
  onEventAdd,
  onViewChange,
  onDateChange
}: ReactCalendarProps) {
  const calendar = useCalendar({
    onViewChange,
    onDateChange,
    onSelectDate: (date) => {
      if (onDayClick) {
        // Créer un objet CalendarDay minimal pour l'appel
        const day: CoreCalendarDay = {
          date,
          dayOfMonth: date.getDate(),
          isCurrentMonth: true,
          isToday: false,
          isWeekend: false,
          isSelected: true,
          formattedDate: date.getDate().toString(),
          events: []
        };
        onDayClick(day);
      }
    }
  });
  
  const {
    view,
    currentDate,
    goToNext,
    goToPrev,
    goToToday,
    setView,
    getMonthGrid,
    getWeekGrid,
    getDayNames,
    addEvent,
    events,
    selectDate,
    selectedDate
  } = calendar;
  
  const monthGrid = getMonthGrid();
  const weekGrid = getWeekGrid();
  const dayNames = getDayNames(dayNameFormat);
  
  // État pour le formulaire d'ajout d'événement
  const [eventTitle, setEventTitle] = useState('Nouvel événement');
  
  // Fonction pour gérer le clic sur un jour
  const handleDayClick = (day: CoreCalendarDay) => {
    if (withDaySelection) {
      selectDate(day.date);
    }
    
    if (onDayClick) {
      onDayClick(day);
    }
  };
  
  // Fonction pour ajouter un événement
  const handleAddEvent = () => {
    if (selectedDate) {
      const start = new Date(selectedDate);
      const end = new Date(selectedDate);
      end.setHours(end.getHours() + 1);
      
      const newEvent = addEvent({
        title: eventTitle,
        start,
        end,
        allDay: false
      });
      
      setEventTitle('Nouvel événement');
      
      if (onEventAdd) {
        onEventAdd(newEvent);
      }
    }
  };
  
  return (
    <div className={`calendar-container ${className}`} style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <CalendarHeader 
        currentDate={currentDate}
        view={view}
        goToNext={goToNext}
        goToPrev={goToPrev}
        goToToday={goToToday}
        setView={setView}
        onViewChange={onViewChange}
        onDateChange={onDateChange}
      />
      
      <div style={{ display: 'flex' }}>
        <div className="calendar-content" style={{ padding: '16px', flex: 1 }}>
          {view === 'month' && (
            <CalendarMonthView 
              monthGrid={monthGrid}
              dayNames={dayNames}
              withDaySelection={withDaySelection}
              withEvents={withEvents}
              onDayClick={handleDayClick}
            />
          )}
          
          {view === 'week' && (
            <CalendarWeekView 
              weekGrid={weekGrid}
              dayNames={dayNames}
              withDaySelection={withDaySelection}
              withEvents={withEvents}
              onDayClick={handleDayClick}
            />
          )}
        </div>
        
        {withEvents && withDaySelection && (
          <CalendarSidebar 
            selectedDate={selectedDate}
            events={events}
            eventTitle={eventTitle}
            setEventTitle={setEventTitle}
            handleAddEvent={handleAddEvent}
          />
        )}
      </div>
    </div>
  );
}