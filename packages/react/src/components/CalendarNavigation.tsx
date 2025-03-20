import React from 'react';
import { useCalendarContext } from './CalendarProvider';

export interface CalendarNavigationProps {
  className?: string;
}

export function CalendarNavigation({ className = '' }: CalendarNavigationProps) {
  const { view, currentDate, goToNext, goToPrev, goToToday, setView } = useCalendarContext();

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-2">
        <button
          onClick={goToPrev}
          className="p-2 hover:bg-gray-100 rounded"
          aria-label="Mois précédent"
        >
          ←
        </button>
        <button
          onClick={goToToday}
          className="p-2 hover:bg-gray-100 rounded"
          aria-label="Aujourd'hui"
        >
          Aujourd'hui
        </button>
        <button
          onClick={goToNext}
          className="p-2 hover:bg-gray-100 rounded"
          aria-label="Mois suivant"
        >
          →
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setView('month')}
          className={`px-3 py-1 rounded ${
            view === 'month' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
          }`}
        >
          Mois
        </button>
        <button
          onClick={() => setView('week')}
          className={`px-3 py-1 rounded ${
            view === 'week' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
          }`}
        >
          Semaine
        </button>
      </div>
    </div>
  );
} 