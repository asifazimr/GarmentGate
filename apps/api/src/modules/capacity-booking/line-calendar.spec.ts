import { dateOnly } from '@garmentgate/shared';
import { describe, expect, it } from 'vitest';
import { lineCalendarDays, spread } from './line-calendar.js';

describe('spread', () => {
  it('splits minutes into integers that add back up exactly', () => {
    expect(spread(10, 3)).toEqual([4, 3, 3]);
    expect(spread(9, 3)).toEqual([3, 3, 3]);
    expect(spread(0, 2)).toEqual([0, 0]);
    expect(spread(5, 0)).toEqual([]);
  });
});

describe('lineCalendarDays', () => {
  const line = { dailySamMinutes: 1000, workingDays: [1, 2, 3, 4, 5] };

  it('shows capacity on working days, and open and booked minutes inside open slots', () => {
    // Mon 2 – Sun 8 Nov 2026; slot Tue–Thu with 2,700 of 3,000 minutes open, 900 booked.
    const days = lineCalendarDays(
      line,
      [
        {
          id: 's1',
          startDate: dateOnly('2026-11-03'),
          endDate: dateOnly('2026-11-05'),
          totalMinutes: 2700,
          bookedMinutes: 900,
          status: 'OPEN',
        },
      ],
      '2026-11-02',
      7,
    );
    expect(
      days.map((d) => [d.date.slice(8), d.capacityMinutes, d.openMinutes, d.bookedMinutes]),
    ).toEqual([
      ['02', 1000, 0, 0],
      ['03', 1000, 900, 300],
      ['04', 1000, 900, 300],
      ['05', 1000, 900, 300],
      ['06', 1000, 0, 0],
      ['07', 0, 0, 0],
      ['08', 0, 0, 0],
    ]);
    expect(days[1]?.slotId).toBe('s1');
    expect(days.reduce((a, d) => a + d.openMinutes, 0)).toBe(2700);
  });

  it('ignores closed slots and slot days outside the window', () => {
    const days = lineCalendarDays(
      line,
      [
        {
          id: 'closed',
          startDate: dateOnly('2026-11-02'),
          endDate: dateOnly('2026-11-06'),
          totalMinutes: 5000,
          bookedMinutes: 0,
          status: 'CLOSED',
        },
        {
          id: 'later',
          startDate: dateOnly('2026-11-05'),
          endDate: dateOnly('2026-11-13'),
          totalMinutes: 7000,
          bookedMinutes: 0,
          status: 'OPEN',
        },
      ],
      '2026-11-02',
      5,
    );
    expect(days.map((d) => d.openMinutes)).toEqual([0, 0, 0, 1000, 1000]);
  });
});
