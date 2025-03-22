import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useCalendar } from '@calendar/react';
import type { CalendarView } from '@calendar/core';

// Composant simple qui démontre l'utilisation du hook useCalendar
const UseCalendarDemo = () => {
  const {
    view,
    currentDate,
    goToNext,
    goToPrev,
    goToToday,
    setView,
    getDayNames,
    addEvent,
    events,
  } = useCalendar();
  
  // Récupération des données du calendrier
  const dayNames = getDayNames('short');
  
  // Fonction pour ajouter un événement de test
  const addTestEvent = () => {
    const start = new Date();
    const end = new Date();
    end.setHours(end.getHours() + 1);
    
    addEvent({
      title: `Événement test ${events.length + 1}`,
      start,
      end,
      allDay: false,
    });
  };
  
  return (
    <div style={{
      fontFamily: 'monospace',
      maxWidth: '800px',
      padding: '20px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      backgroundColor: '#f8fafc',
    }}>
      <h2>Démonstration du hook useCalendar</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>État actuel</h3>
        <pre style={{ 
          backgroundColor: '#1e293b', 
          color: '#e2e8f0', 
          padding: '12px', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
{`{
  view: "${view}",
  currentDate: "${currentDate.toISOString()}",
  events: ${events.length} événements
}`}
        </pre>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Actions</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <button 
            type="button"
            onClick={goToPrev}
            style={{
              padding: '8px 12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            goToPrev()
          </button>
          <button 
            type="button"
            onClick={goToToday}
            style={{
              padding: '8px 12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            goToToday()
          </button>
          <button 
            type="button"
            onClick={goToNext}
            style={{
              padding: '8px 12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            goToNext()
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
          <span>setView:</span>
          <select 
            value={view} 
            onChange={(e) => setView(e.target.value as CalendarView)}
            style={{
              padding: '8px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
            }}
          >
            <option value="day">day</option>
            <option value="week">week</option>
            <option value="month">month</option>
            <option value="year">year</option>
          </select>
        </div>
        
        <div>
          <button 
            type="button"
            onClick={addTestEvent}
            style={{
              padding: '8px 12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            addEvent()
          </button>
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Données du calendrier</h3>
        <div style={{ marginBottom: '12px' }}>
          <h4>Noms des jours</h4>
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            backgroundColor: 'white', 
            padding: '8px', 
            borderRadius: '4px',
            border: '1px solid #e2e8f0'
          }}>
            {dayNames.map((day, index) => (
              <div key={`day-${index}`} style={{ flex: 1, textAlign: 'center' }}>{day}</div>
            ))}
          </div>
        </div>
        
        <div>
          <h4>Événements ({events.length})</h4>
          {events.length === 0 ? (
            <p>Aucun événement. Cliquez sur "addEvent()" pour en ajouter un.</p>
          ) : (
            <ul style={{ 
              listStyleType: 'none', 
              padding: '0', 
              margin: '0',
              backgroundColor: 'white', 
              borderRadius: '4px',
              border: '1px solid #e2e8f0'
            }}>
              {events.map((event) => (
                <li 
                  key={event.id}
                  style={{ 
                    padding: '10px', 
                    borderBottom: '1px solid #e2e8f0'
                  }}
                >
                  <strong>{event.title}</strong>
                  <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div>
        <h3>Documentation des méthodes principales</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#e2e8f0' }}>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #cbd5e1' }}>Méthode</th>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #cbd5e1' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>goToDate(date)</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Navigue vers une date spécifique</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>goToNext()</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Navigue vers la période suivante (jour, semaine, mois, année)</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>goToPrev()</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Navigue vers la période précédente</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>goToToday()</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Navigue vers la date du jour</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>setView(view)</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Change la vue (day, week, month, year)</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>addEvent(event)</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Ajoute un événement au calendrier</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>getMonthGrid()</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Récupère les données de la grille du mois</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>getWeekGrid()</td>
              <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>Récupère les données de la grille de la semaine</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const meta: Meta<typeof UseCalendarDemo> = {
  title: 'Hooks/useCalendar',
  component: UseCalendarDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Le hook useCalendar est le cœur de la bibliothèque. Il fournit toutes les fonctionnalités nécessaires pour créer un calendrier personnalisé.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UseCalendarDemo>;

export const Demo: Story = {}; 