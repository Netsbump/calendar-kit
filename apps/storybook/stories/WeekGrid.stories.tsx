import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HeadlessCalendar, WeekGrid } from '@calendar/react';
import type { CalendarDay } from '@calendar/core';

const meta: Meta<typeof WeekGrid> = {
  title: 'Components/WeekGrid',
  component: WeekGrid,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '800px' }}>
        <HeadlessCalendar>
          <Story />
        </HeadlessCalendar>
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WeekGrid>;

// Story de base
export const Default: Story = {
  args: {},
};

// Story avec format de jour long
export const LongDayNames: Story = {
  args: {
    dayNameFormat: 'long',
  },
};

// Story avec rendu personnalisé pour les jours
export const CustomDayRender: Story = {
  args: {
    renderDay: (day: CalendarDay) => (
      <div 
        style={{
          padding: '8px',
          height: '100%',
          backgroundColor: day.isToday 
            ? '#3b82f6' 
            : day.isWeekend 
              ? '#f8fafc' 
              : 'white',
          color: day.isToday ? 'white' : 'black',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100px',
        }}
      >
        <div 
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: day.isToday ? 'bold' : 'normal',
            fontSize: '1.2rem',
          }}
        >
          {day.dayOfMonth}
        </div>
        <div style={{ marginTop: '8px', fontSize: '0.8rem' }}>
          {day.formattedDate}
        </div>
      </div>
    ),
  },
};

// Story avec rendu personnalisé pour l'en-tête
export const CustomHeaderRender: Story = {
  args: {
    renderHeader: (dayNames: string[]) => (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)',
        backgroundColor: '#10b981',
        color: 'white',
        fontWeight: 'bold',
      }}>
        {dayNames.map((name, index) => (
          <div 
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index} 
            style={{ 
              padding: '12px', 
              textAlign: 'center',
              borderRight: index < 6 ? '1px solid rgba(255,255,255,0.2)' : 'none',
            }}
          >
            {name.toUpperCase()}
          </div>
        ))}
      </div>
    ),
  },
}; 