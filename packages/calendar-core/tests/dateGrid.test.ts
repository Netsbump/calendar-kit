import { describe, it, expect } from 'vitest';
import { 
  generateMonthGrid, 
  generateWeekGrid, 
  getDayNames, 
  getMonthNames 
} from '../src/utils/dateGrid';
import { createCalendar } from '../src';

describe('Date Grid Utilities', () => {
  it('should generate a month grid', () => {
    const date = new Date(2023, 0, 15); // January 15, 2023
    const grid = generateMonthGrid(date);
    
    expect(grid).toBeDefined();
    expect(grid.monthName).toBe('January');
    expect(grid.year).toBe(2023);
    expect(grid.weeks.length).toBeGreaterThan(0);
    
    // Check if the grid contains the correct number of days
    const totalDays = grid.weeks.reduce((count, week) => count + week.days.length, 0);
    expect(totalDays).toBe(grid.weeks.length * 7); // Each week should have 7 days
    
    // Check if January 15 is in the grid and marked as current month
    const jan15 = grid.weeks
      .flatMap(week => week.days)
      .find(day => day.date.getDate() === 15 && day.date.getMonth() === 0);
    
    expect(jan15).toBeDefined();
    expect(jan15?.isCurrentMonth).toBe(true);
  });
  
  it('should generate a week grid', () => {
    const date = new Date(2023, 0, 15); // January 15, 2023
    const grid = generateWeekGrid(date);
    
    expect(grid).toBeDefined();
    expect(grid.days.length).toBe(7); // A week should have 7 days
    
    // Check if January 15 is in the grid
    const jan15 = grid.days.find(day => day.date.getDate() === 15 && day.date.getMonth() === 0);
    expect(jan15).toBeDefined();
  });
  
  it('should get day names', () => {
    const dayNames = getDayNames();
    
    expect(dayNames).toBeDefined();
    expect(dayNames.length).toBe(7);
    
    // Default format is 'short'
    expect(dayNames).toContain('Sun');
    expect(dayNames).toContain('Mon');
    
    // Test with 'long' format
    const longDayNames = getDayNames(0, 'long');
    expect(longDayNames).toContain('Sunday');
    expect(longDayNames).toContain('Monday');
    
    // Test with 'narrow' format
    const narrowDayNames = getDayNames(0, 'narrow');
    expect(narrowDayNames.every(name => name.length === 1)).toBe(true);
  });
  
  it('should get month names', () => {
    const monthNames = getMonthNames();
    
    expect(monthNames).toBeDefined();
    expect(monthNames.length).toBe(12);
    
    // Default format is 'long'
    expect(monthNames).toContain('January');
    expect(monthNames).toContain('December');
    
    // Test with 'short' format
    const shortMonthNames = getMonthNames('short');
    expect(shortMonthNames).toContain('Jan');
    expect(shortMonthNames).toContain('Dec');
  });
  
  it('should integrate with calendar instance', () => {
    const calendar = createCalendar({
      defaultDate: new Date(2023, 0, 15), // January 15, 2023
      firstDayOfWeek: 1 // Monday
    });
    
    // Test month grid
    const monthGrid = calendar.getMonthGrid();
    expect(monthGrid).toBeDefined();
    expect(monthGrid.monthName).toBe('January');
    
    // Test week grid
    const weekGrid = calendar.getWeekGrid();
    expect(weekGrid).toBeDefined();
    expect(weekGrid.days.length).toBe(7);
    
    // Test day names with Monday as first day
    const dayNames = calendar.getDayNames();
    expect(dayNames[0]).toBe('Mon');
    expect(dayNames[6]).toBe('Sun');
    
    // Test month names
    const monthNames = calendar.getMonthNames();
    expect(monthNames).toContain('January');
  });
}); 