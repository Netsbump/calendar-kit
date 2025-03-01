import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addDays,
  format,
  isSameMonth,
  isToday,
  isWeekend
} from 'date-fns';
import { CalendarDay, CalendarWeek, CalendarMonth } from '../calendar.types';

/**
 * Generates a calendar grid for a specific month
 * @param date Any date within the month to generate
 * @param firstDayOfWeek First day of the week (0 = Sunday, 1 = Monday, etc.)
 * @param formatOptions Options for formatting the date
 * @returns A calendar month object with weeks and days
 */
export function generateMonthGrid(
  date: Date,
  firstDayOfWeek: number = 0,
  formatOptions: Intl.DateTimeFormatOptions = { day: 'numeric' }
): CalendarMonth {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const startDate = startOfWeek(monthStart, { weekStartsOn: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  
  const weeks: CalendarWeek[] = [];
  let currentDate = startDate;
  let weekNumber = 1;
  
  // Generate weeks until we reach the end date
  while (currentDate <= endDate) {
    const week: CalendarWeek = {
      days: [],
      weekNumber
    };
    
    // Generate 7 days for the week
    for (let i = 0; i < 7; i++) {
      const day: CalendarDay = {
        date: currentDate,
        dayOfMonth: currentDate.getDate(),
        isCurrentMonth: isSameMonth(currentDate, date),
        isToday: isToday(currentDate),
        isWeekend: isWeekend(currentDate),
        formattedDate: format(currentDate, 'd')
      };
      
      week.days.push(day);
      currentDate = addDays(currentDate, 1);
    }
    
    weeks.push(week);
    weekNumber++;
  }
  
  return {
    weeks,
    monthName: format(date, 'MMMM'),
    year: date.getFullYear()
  };
}

/**
 * Generates a calendar grid for a specific week
 * @param date Any date within the week to generate
 * @param firstDayOfWeek First day of the week (0 = Sunday, 1 = Monday, etc.)
 * @returns A calendar week object with days
 */
export function generateWeekGrid(
  date: Date,
  firstDayOfWeek: number = 0
): CalendarWeek {
  const weekStart = startOfWeek(date, { weekStartsOn: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  const weekEnd = endOfWeek(date, { weekStartsOn: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd }).map(day => ({
    date: day,
    dayOfMonth: day.getDate(),
    isCurrentMonth: isSameMonth(day, date),
    isToday: isToday(day),
    isWeekend: isWeekend(day),
    formattedDate: format(day, 'd')
  }));
  
  return {
    days,
    weekNumber: Math.ceil(date.getDate() / 7)
  };
}

/**
 * Gets the day names for a week based on the first day of the week
 * @param firstDayOfWeek First day of the week (0 = Sunday, 1 = Monday, etc.)
 * @param format Format of the day names ('long', 'short', or 'narrow')
 * @returns Array of day names
 */
export function getDayNames(
  firstDayOfWeek: number = 0,
  formatType: 'long' | 'short' | 'narrow' = 'short'
): string[] {
  const weekStart = new Date(2021, 0, 3 + firstDayOfWeek); // Jan 3, 2021 is a Sunday
  const dayNames: string[] = [];
  
  for (let i = 0; i < 7; i++) {
    const day = addDays(weekStart, i);
    dayNames.push(format(day, formatType === 'long' ? 'EEEE' : formatType === 'short' ? 'EEE' : 'EEEEE'));
  }
  
  return dayNames;
}

/**
 * Gets the month names
 * @param format Format of the month names ('long', 'short', or 'narrow')
 * @returns Array of month names
 */
export function getMonthNames(
  formatType: 'long' | 'short' | 'narrow' = 'long'
): string[] {
  const monthNames: string[] = [];
  
  for (let i = 0; i < 12; i++) {
    const month = new Date(2021, i, 1);
    monthNames.push(format(month, formatType === 'long' ? 'MMMM' : formatType === 'short' ? 'MMM' : 'MMMMM'));
  }
  
  return monthNames;
} 