import type { Meta, StoryObj } from '@storybook/react';
import { HeadlessCalendar, MonthGrid } from '@calendar/react';
import type { CalendarDay } from '@calendar/core';
import React from 'react';

const meta: Meta<typeof MonthGrid> = {
  title: 'Components/MonthGrid',
  component: MonthGrid,
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
type Story = StoryObj<typeof MonthGrid>;

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
              : day.isCurrentMonth 
                ? 'white' 
                : '#f1f5f9',
          color: day.isToday ? 'white' : day.isCurrentMonth ? 'black' : '#94a3b8',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div 
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: day.isToday ? 'bold' : 'normal',
          }}
        >
          {day.dayOfMonth}
        </div>
        {day.isToday && (
          <div style={{ marginTop: '4px', fontSize: '10px' }}>
            Aujourd'hui
          </div>
        )}
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
        backgroundColor: '#3b82f6',
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