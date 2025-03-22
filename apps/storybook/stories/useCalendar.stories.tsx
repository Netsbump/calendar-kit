import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ReactCalendar } from '@calendar/react';
import type { ReactCalendarProps, InteractionMode } from '@calendar/react';

// Définition du meta avec les contrôles
const meta = {
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
    interactionMode: {
      control: 'select',
      options: ['view-only', 'selection', 'events'],
      defaultValue: 'view-only',
      description: 'Mode d\'interaction avec le calendrier'
    },
    locale: {
      control: 'select',
      options: ['fr-FR', 'en-US'],
      defaultValue: 'fr-FR',
      description: 'Locale pour l\'internationalisation'
    }
  }
} satisfies Meta<typeof ReactCalendar>;

export default meta;
type Story = StoryObj<typeof ReactCalendar>;

// Story par défaut (lecture seule, français)
export const Default: Story = {
  args: {
    dayNameFormat: 'short',
    interactionMode: 'view-only' as InteractionMode,
    locale: 'fr-FR'
  }
};

// Story avec locale américaine
export const EnglishLocale: Story = {
  args: {
    dayNameFormat: 'short',
    interactionMode: 'view-only' as InteractionMode,
    locale: 'en-US'
  }
};

// Story avec noms de jours longs
export const LongDayNames: Story = {
  args: {
    dayNameFormat: 'long',
    interactionMode: 'view-only' as InteractionMode,
    locale: 'fr-FR'
  }
};

// Story avec noms de jours courts (1 lettre)
export const NarrowDayNames: Story = {
  args: {
    dayNameFormat: 'narrow',
    interactionMode: 'view-only' as InteractionMode,
    locale: 'fr-FR'
  }
};

// Story avec sélection de jours uniquement
export const WithSelection: Story = {
  args: {
    dayNameFormat: 'short',
    interactionMode: 'selection' as InteractionMode,
    locale: 'fr-FR'
  }
};

// Story avec sélection de jours et gestion d'événements
export const WithEvents: Story = {
  args: {
    dayNameFormat: 'short',
    interactionMode: 'events' as InteractionMode,
    locale: 'fr-FR'
  }
}; 