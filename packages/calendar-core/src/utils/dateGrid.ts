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
  isWeekend,
  type Locale
} from 'date-fns';
import type { CalendarDay, CalendarWeek, CalendarMonth } from '../calendar.types';

/**
 * Génère une grille de calendrier pour un mois spécifique
 * @param date Une date quelconque dans le mois à générer
 * @param firstDayOfWeek Premier jour de la semaine (0 = Dimanche, 1 = Lundi, etc.)
 * @param locale Locale à utiliser pour le formatage (par défaut: undefined, utilise la locale du système)
 * @returns Un objet mois de calendrier avec des semaines et des jours
 */
export function generateMonthGrid(
  date: Date,
  firstDayOfWeek = 0,
  locale?: Locale
): CalendarMonth {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const startDate = startOfWeek(monthStart, { weekStartsOn: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  
  const weeks: CalendarWeek[] = [];
  let currentDate = startDate;
  let weekNumber = 1;
  
  // Générer des semaines jusqu'à ce qu'on atteigne la date de fin
  while (currentDate <= endDate) {
    const week: CalendarWeek = {
      days: [],
      weekNumber
    };
    
    // Générer 7 jours pour la semaine
    for (let i = 0; i < 7; i++) {
      const day: CalendarDay = {
        date: currentDate,
        dayOfMonth: currentDate.getDate(),
        isCurrentMonth: isSameMonth(currentDate, date),
        isToday: isToday(currentDate),
        isWeekend: isWeekend(currentDate),
        formattedDate: format(currentDate, 'd', { locale })
      };
      
      week.days.push(day);
      currentDate = addDays(currentDate, 1);
    }
    
    weeks.push(week);
    weekNumber++;
  }
  
  return {
    weeks,
    monthName: format(date, 'MMMM', { locale }),
    year: date.getFullYear()
  };
}

/**
 * Génère une grille de calendrier pour une semaine spécifique
 * @param date Une date quelconque dans la semaine à générer
 * @param firstDayOfWeek Premier jour de la semaine (0 = Dimanche, 1 = Lundi, etc.)
 * @param locale Locale à utiliser pour le formatage (par défaut: undefined, utilise la locale du système)
 * @returns Un objet semaine de calendrier avec des jours
 */
export function generateWeekGrid(
  date: Date,
  firstDayOfWeek = 0,
  locale?: Locale
): CalendarWeek {
  const weekStart = startOfWeek(date, { weekStartsOn: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  const weekEnd = endOfWeek(date, { weekStartsOn: firstDayOfWeek as 0 | 1 | 2 | 3 | 4 | 5 | 6 });
  
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd }).map(day => ({
    date: day,
    dayOfMonth: day.getDate(),
    isCurrentMonth: isSameMonth(day, date),
    isToday: isToday(day),
    isWeekend: isWeekend(day),
    formattedDate: format(day, 'd', { locale })
  }));
  
  return {
    days,
    weekNumber: Math.ceil(date.getDate() / 7)
  };
}

/**
 * Obtient les noms des jours d'une semaine en fonction du premier jour de la semaine
 * @param firstDayOfWeek Premier jour de la semaine (0 = Dimanche, 1 = Lundi, etc.)
 * @param formatType Format des noms de jours ('long', 'short', ou 'narrow')
 * @param locale Locale à utiliser pour le formatage (par défaut: undefined, utilise la locale du système)
 * @returns Tableau des noms de jours
 */
export function getDayNames(
  firstDayOfWeek = 0,
  formatType: 'long' | 'short' | 'narrow' = 'short',
  locale?: Locale
): string[] {
  const weekStart = new Date(2021, 0, 3 + firstDayOfWeek); // 3 Jan 2021 est un dimanche
  const dayNames: string[] = [];
  
  for (let i = 0; i < 7; i++) {
    const day = addDays(weekStart, i);
    dayNames.push(format(day, formatType === 'long' ? 'EEEE' : formatType === 'short' ? 'EEE' : 'EEEEE', { locale }));
  }
  
  return dayNames;
}

/**
 * Obtient les noms des mois
 * @param formatType Format des noms de mois ('long', 'short', ou 'narrow')
 * @param locale Locale à utiliser pour le formatage (par défaut: undefined, utilise la locale du système)
 * @returns Tableau des noms de mois
 */
export function getMonthNames(
  formatType: 'long' | 'short' | 'narrow' = 'long',
  locale?: Locale
): string[] {
  const monthNames: string[] = [];
  
  for (let i = 0; i < 12; i++) {
    const month = new Date(2021, i, 1);
    monthNames.push(format(month, formatType === 'long' ? 'MMMM' : formatType === 'short' ? 'MMM' : 'MMMMM', { locale }));
  }
  
  return monthNames;
} 