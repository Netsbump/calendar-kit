import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HeadlessCalendar } from '@calendar/react';

const meta: Meta<typeof HeadlessCalendar> = {
  title: 'Calendar/HeadlessCalendar',
  component: HeadlessCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultView: {
      control: 'select',
      options: ['day', 'week', 'month', 'year'],
      defaultValue: 'month',
    },
    defaultDate: {
      control: 'date',
    },
    firstDayOfWeek: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
      defaultValue: 0,
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeadlessCalendar>;

// Simple example with render props
export const Basic: Story = {
  args: {
    defaultView: 'month',
    defaultDate: new Date(),
    firstDayOfWeek: 0,
  },
  render: (args) => (
    <HeadlessCalendar {...args}>
      {({ view, currentDate, goToNext, goToPrev, goToToday, setView }) => (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <button onClick={goToPrev}>Previous</button>
              <button onClick={goToToday} style={{ margin: '0 10px' }}>Today</button>
              <button onClick={goToNext}>Next</button>
            </div>
            <div>
              <select 
                value={view} 
                onChange={(e) => setView(e.target.value as any)}
                style={{ padding: '5px' }}
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2>
              {currentDate.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric',
                ...(view === 'day' && { day: 'numeric' })
              })}
            </h2>
          </div>
          
          <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            padding: '20px',
            minHeight: '400px',
            backgroundColor: '#f9f9f9'
          }}>
            <p>Current View: <strong>{view}</strong></p>
            <p>Current Date: <strong>{currentDate.toDateString()}</strong></p>
            <p>This is a headless component - you control the UI!</p>
          </div>
        </div>
      )}
    </HeadlessCalendar>
  ),
};

// Example with sub-components
export const WithSubComponents: Story = {
  args: {
    defaultView: 'month',
    defaultDate: new Date(),
  },
  render: (args) => (
    <HeadlessCalendar {...args}>
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <HeadlessCalendar.Navigation>
            {({ goToPrev, goToToday, goToNext, currentDate }) => (
              <div>
                <button onClick={goToPrev}>Previous</button>
                <button onClick={goToToday} style={{ margin: '0 10px' }}>Today</button>
                <button onClick={goToNext}>Next</button>
                <span style={{ marginLeft: '15px' }}>
                  {currentDate.toLocaleDateString()}
                </span>
              </div>
            )}
          </HeadlessCalendar.Navigation>
          
          <HeadlessCalendar.ViewSelector>
            {({ view, setView }) => (
              <select 
                value={view} 
                onChange={(e) => setView(e.target.value as any)}
                style={{ padding: '5px' }}
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            )}
          </HeadlessCalendar.ViewSelector>
        </div>
        
        <HeadlessCalendar.Events>
          {({ events, addEvent }) => (
            <div style={{ 
              border: '1px solid #ddd', 
              borderRadius: '4px',
              padding: '20px',
              minHeight: '400px',
              backgroundColor: '#f9f9f9'
            }}>
              <h3>Events ({events.length})</h3>
              <button 
                onClick={() => {
                  const start = new Date();
                  const end = new Date();
                  end.setHours(end.getHours() + 1);
                  
                  addEvent({
                    title: `New Event ${events.length + 1}`,
                    start,
                    end,
                    allDay: false,
                  });
                }}
              >
                Add Event
              </button>
              
              <div style={{ marginTop: '20px' }}>
                {events.length === 0 ? (
                  <p>No events. Click "Add Event" to create one.</p>
                ) : (
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
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
                          {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </HeadlessCalendar.Events>
      </div>
    </HeadlessCalendar>
  ),
}; 