import { describe, expect, it } from 'vitest';
import {
  DEFAULT_MONITORING_SETTINGS,
  MonitoringSettingsSchema,
  ReviewCameraSchema,
} from './monitoring.js';

const allChecked = { productionOnly: true, noSignage: true, noFaces: true, noOutsideView: true };

describe('camera review', () => {
  it('approves only when every privacy check is confirmed', () => {
    expect(
      ReviewCameraSchema.safeParse({ decision: 'APPROVE', checklist: allChecked }).success,
    ).toBe(true);
    expect(
      ReviewCameraSchema.safeParse({
        decision: 'APPROVE',
        checklist: { ...allChecked, noSignage: false },
      }).success,
    ).toBe(false);
  });

  it('needs a note to reject', () => {
    const reject = { decision: 'REJECT', checklist: { ...allChecked, noFaces: false } };
    expect(ReviewCameraSchema.safeParse(reject).success).toBe(false);
    expect(
      ReviewCameraSchema.safeParse({ ...reject, note: 'Workers’ faces are visible' }).success,
    ).toBe(true);
  });

  it('ships valid default settings', () => {
    expect(MonitoringSettingsSchema.parse(DEFAULT_MONITORING_SETTINGS)).toEqual(
      DEFAULT_MONITORING_SETTINGS,
    );
  });
});
