import { describe, expect, it } from 'vitest';
import {
  DEFAULT_GIG_SETTINGS,
  distanceMeters,
  pickedForAudit,
  ReviewApplicationSchema,
  rotationAllows,
  shouldSuspend,
} from './gig.js';

describe('gig inspectors', () => {
  it('measures distance on the globe', () => {
    // Gazipur Chowrasta to Tongi, roughly 11 km.
    const d = distanceMeters(
      { latitude: 23.9999, longitude: 90.4203 },
      { latitude: 23.8985, longitude: 90.4058 },
    );
    expect(d).toBeGreaterThan(11_000);
    expect(d).toBeLessThan(11_600);
    expect(distanceMeters({ latitude: 1, longitude: 1 }, { latitude: 1, longitude: 1 })).toBe(0);
  });

  it('rotates inspectors, samples audits and suspends after repeated low scores', () => {
    expect(rotationAllows(1, DEFAULT_GIG_SETTINGS)).toBe(true);
    expect(rotationAllows(2, DEFAULT_GIG_SETTINGS)).toBe(false);
    expect(pickedForAudit(999, DEFAULT_GIG_SETTINGS)).toBe(true);
    expect(pickedForAudit(1_000, DEFAULT_GIG_SETTINGS)).toBe(false);
    expect(shouldSuspend({ sum: 12, count: 5 }, DEFAULT_GIG_SETTINGS)).toBe(true);
    expect(shouldSuspend({ sum: 8, count: 4 }, DEFAULT_GIG_SETTINGS)).toBe(false); // too few
    expect(shouldSuspend({ sum: 16, count: 5 }, DEFAULT_GIG_SETTINGS)).toBe(false);
  });

  it('approves only certified inspectors and rejects with a reason', () => {
    expect(ReviewApplicationSchema.safeParse({ decision: 'APPROVE' }).success).toBe(false);
    expect(
      ReviewApplicationSchema.safeParse({ decision: 'APPROVE', certified: true }).success,
    ).toBe(true);
    expect(ReviewApplicationSchema.safeParse({ decision: 'REJECT' }).success).toBe(false);
  });
});
