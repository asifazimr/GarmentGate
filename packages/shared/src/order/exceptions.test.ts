import { describe, expect, it } from 'vitest';
import { lateness, needsDelayAlert } from './exceptions.js';

const d = (iso: string) => new Date(`${iso}T00:00:00Z`);
const now = d('2026-11-20');

describe('order lateness', () => {
  it('takes the oldest unfinished stage or the ship date, whichever is further behind', () => {
    expect(
      lateness(
        {
          status: 'IN_PRODUCTION',
          requestedShipDate: d('2026-11-18'),
          atHub: false,
          milestones: [
            { stage: 'CUTTING', status: 'COMPLETED', plannedAt: d('2026-10-01') },
            { stage: 'SEWING', status: 'IN_PROGRESS', plannedAt: d('2026-11-10') },
            { stage: 'PACKING', status: 'PENDING', plannedAt: d('2026-11-25') },
          ],
        },
        now,
      ),
    ).toEqual({ daysLate: 10, stage: 'SEWING' });
  });

  it('counts the ship date until the goods reach the hub, and only while being made', () => {
    const base = { requestedShipDate: d('2026-11-05'), milestones: [] };
    expect(lateness({ ...base, status: 'READY_TO_SHIP', atHub: false }, now)).toEqual({
      daysLate: 15,
      stage: 'SHIP_DATE',
    });
    expect(lateness({ ...base, status: 'READY_TO_SHIP', atHub: true }, now)).toBeNull();
    expect(lateness({ ...base, status: 'SHIPPED', atHub: false }, now)).toBeNull();
  });

  it('alerts from a week late, then at most weekly', () => {
    const late = { daysLate: 8, stage: 'SEWING' };
    expect(needsDelayAlert({ daysLate: 6, stage: 'SEWING' }, null, now)).toBe(false);
    expect(needsDelayAlert(late, null, now)).toBe(true);
    expect(needsDelayAlert(late, d('2026-11-16'), now)).toBe(false);
    expect(needsDelayAlert(late, d('2026-11-13'), now)).toBe(true);
  });
});
