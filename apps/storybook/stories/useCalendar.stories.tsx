import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useCalendar } from '@calendar/react';
import type { CalendarView } from '@calendar/core';

// Composant de démonstration pour le hook useCalendar
const CalendarDemo = () => {
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
  } = useCalendar();
  
  const monthGrid = getMonthGrid();
  const weekGrid = getWeekGrid();
  const dayNames = getDayNames('short');
  
  return (
    <div className="calendar-demo" style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
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
            onClick={goToPrev}
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
            onClick={goToToday}
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
            onClick={goToNext}
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
            onChange={(e) => setView(e.target.value as CalendarView)}
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
      
      <div className="calendar-content" style={{ padding: '16px' }}>
        {view === 'month' && (
          <div className="month-view">
            <div className="weekdays" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px',
              marginBottom: '8px',
            }}>
              {dayNames.map((day, index) => (
                <div 
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index} 
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
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={weekIndex} 
                  className="week"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '4px',
                  }}
                >
                  {week.days.map((day, dayIndex) => (
                    <div 
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      key={dayIndex} 
                      className={`day ${day.isCurrentMonth ? 'current-month' : 'other-month'} ${day.isToday ? 'today' : ''}`}
                      style={{
                        aspectRatio: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        backgroundColor: day.isToday 
                          ? '#eff6ff' 
                          : day.isCurrentMonth 
                            ? '#fff' 
                            : '#f8fafc',
                        border: day.isToday 
                          ? '1px solid #3b82f6' 
                          : '1px solid #e2e8f0',
                        color: day.isCurrentMonth ? '#000' : '#94a3b8',
                        fontWeight: day.isToday ? 'bold' : day.isCurrentMonth ? 500 : 'normal',
                      }}
                    >
                      {day.dayOfMonth}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {view === 'week' && (
          <div className="week-view">
            <div className="weekdays" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px',
              marginBottom: '8px',
            }}>
              {dayNames.map((day, index) => (
                <div 
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index} 
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
              {weekGrid.days.map((day, dayIndex) => (
                <div 
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={dayIndex} 
                  className={`day ${day.isToday ? 'today' : ''}`}
                  style={{
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    backgroundColor: day.isToday ? '#eff6ff' : '#fff',
                    border: day.isToday ? '1px solid #3b82f6' : '1px solid #e2e8f0',
                    fontWeight: day.isToday ? 'bold' : 'normal',
                  }}
                >
                  {day.dayOfMonth}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const meta: Meta<typeof CalendarDemo> = {
  title: 'Hooks/useCalendar',
  component: CalendarDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CalendarDemo>;

export const Default: Story = {}; 