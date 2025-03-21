// Hooks
export { useCalendar } from './hooks/useCalendar';
export type { UseCalendarOptions, UseCalendarReturn } from './hooks/useCalendar';

// Composants headless
export { CalendarProvider } from './components/calendar-provider';
export type { CalendarProviderProps } from './components/calendar-provider';

export { CalendarNavigation } from './components/calendar-navigation';
export type { CalendarNavigationProps } from './components/calendar-navigation';

export { CalendarEvents } from './components/calendar-events';
export type { CalendarEventsProps } from './components/calendar-events';

export { CalendarMonthView } from './components/calendar-month-view';
export type { CalendarMonthViewProps } from './components/calendar-month-view';

export { CalendarWeekView } from './components/calendar-week-view';
export type { CalendarWeekViewProps } from './components/calendar-week-view';

export { CalendarDay } from './components/calendar-day';
export type { CalendarDayProps } from './components/calendar-day';

// Composants styled
export { CalendarMonthViewStyled } from './examples/calendar-month-view-styled';
export type { CalendarMonthViewStyledProps } from './examples/calendar-month-view-styled';

export { CalendarWeekViewStyled } from './examples/calendar-week-view-styled';
export type { CalendarWeekViewStyledProps } from './examples/calendar-week-view-styled';

export { CalendarDayStyled } from './examples/calendar-day-styled';
export type { CalendarDayStyledProps } from './examples/calendar-day-styled';

export { CalendarNavigationStyled } from './examples/calendar-navigation-styled';
export { CalendarEventsStyled } from './examples/calendar-events-styled';

// Composant principal
export { ReactCalendar } from './examples/react-calendar';
export type { ReactCalendarProps } from './examples/react-calendar';

// Context
export { useCalendarContext } from './components/calendar-provider';

// Styles
import './styles/calendar-grid.css'; 
