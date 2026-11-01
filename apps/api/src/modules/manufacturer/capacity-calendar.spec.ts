import { describe, expect, it } from 'vitest';
import { addMonths, buildCalendar, monthStart } from './capacity-calendar.js';

describe('buildCalendar', () => {
  it('fills every month with the default capacity and zero bookings', () => {
    const months = buildCalendar({
      from: '2026-11',
      count: 3,
      defaultCapacity: 450_000,
      overrides: [],
      orders: [],
    });
    expect(months.map((m) => m.month)).toEqual(['2026-11', '2026-12', '2027-01']);
    expect(months.every((m) => m.availablePcs === 450_000 && !m.isOverride)).toBe(true);
  });

  it('applies overrides and external bookings per month', () => {
    const [nov, dec] = buildCalendar({
      from: '2026-11',
      count: 2,
      defaultCapacity: 450_000,
      overrides: [
        {
          month: monthStart('2026-12'),
          availablePcs: 300_000,
          externalBookedPcs: 120_000,
          note: 'Eid holidays',
        },
        { month: monthStart('2026-11'), availablePcs: null, externalBookedPcs: 50_000, note: null },
      ],
      orders: [],
    });
    expect(nov).toMatchObject({
      availablePcs: 450_000,
      isOverride: false,
      externalBookedPcs: 50_000,
    });
    expect(dec).toMatchObject({
      availablePcs: 300_000,
      isOverride: true,
      externalBookedPcs: 120_000,
      note: 'Eid holidays',
    });
  });

  it('counts platform orders in the month they ship and ignores undated ones', () => {
    const [nov, dec] = buildCalendar({
      from: '2026-11',
      count: 2,
      defaultCapacity: 100_000,
      overrides: [],
      orders: [
        { quantity: 12_000, requestedShipDate: new Date('2026-11-22T00:00:00Z') },
        { quantity: 3_000, requestedShipDate: new Date('2026-11-30T23:00:00Z') },
        { quantity: 8_000, requestedShipDate: new Date('2026-12-01T00:00:00Z') },
        { quantity: 99_999, requestedShipDate: null },
      ],
    });
    expect(nov?.platformBookedPcs).toBe(15_000);
    expect(dec?.platformBookedPcs).toBe(8_000);
  });

  it('crosses year boundaries correctly', () => {
    expect(addMonths('2026-12', 1)).toBe('2027-01');
    expect(addMonths('2026-01', 11)).toBe('2026-12');
  });
});
