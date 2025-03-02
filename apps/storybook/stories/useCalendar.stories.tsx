import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ReactCalendar } from '@calendar/react';
import type { ReactCalendarProps } from '@calendar/react';

const meta: Meta<typeof ReactCalendar> = {
  title: 'Components/ReactCalendar',
  component: ReactCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    dayNameFormat: {
      control: 'select',
      options: ['short', 'long', 'narrow'],
      defaultValue: 'short',
      description: 'Format des noms de jours'
    },
    withEvents: {
      control: 'boolean',
      defaultValue: false,
      description: 'Activer la gestion des événements'
    },
    withDaySelection: {
      control: 'boolean',
      defaultValue: false,
      description: 'Activer la sélection des jours'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ReactCalendar>;

// Story par défaut
export const Default: Story = {
  args: {
    dayNameFormat: 'short',
    withEvents: false,
    withDaySelection: false
  }
};

// Story avec noms de jours longs
export const LongDayNames: Story = {
  args: {
    dayNameFormat: 'long',
    withEvents: false,
    withDaySelection: false
  }
};

// Story avec noms de jours courts (1 lettre)
export const NarrowDayNames: Story = {
  args: {
    dayNameFormat: 'narrow',
    withEvents: false,
    withDaySelection: false
  }
};

// Story avec sélection de jours et gestion d'événements
export const WithEventsAndSelection: Story = {
  args: {
    dayNameFormat: 'short',
    withEvents: true,
    withDaySelection: true
  }
}; 