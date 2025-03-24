import { describe, it, expect } from 'vitest';
import { createCalendar } from '../src';

describe('Core Calendar', () => {
  it('should create a calendar instance', () => {
    const calendar = createCalendar({
      defaultView: 'month',
      defaultDate: new Date(2023, 0, 1),
    });
    
    expect(calendar).toBeDefined();
    expect(calendar.view).toBe('month');
    expect(calendar.currentDate).toBeInstanceOf(Date);
  });
}); 