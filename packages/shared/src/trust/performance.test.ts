import { describe, expect, it } from 'vitest';
import { performanceScore } from './performance.js';

const none = {
  ratingAverage: null,
  reviewCount: 0,
  shipped: 0,
  shippedOnTime: 0,
  finalInspections: 0,
  finalPassedFirstTime: 0,
};

describe('performanceScore', () => {
  it('starts every factory at the neutral prior', () => {
    expect(performanceScore(none)).toEqual({
      score: 73,
      onTimeBps: null,
      qcPassBps: null,
      confidence: 0,
    });
  });

  it('moves with the evidence, but one order can’t make or break a factory', () => {
    const perfectOnce = performanceScore({
      ratingAverage: 5,
      reviewCount: 1,
      shipped: 1,
      shippedOnTime: 1,
      finalInspections: 1,
      finalPassedFirstTime: 1,
    });
    const badOnce = performanceScore({
      ratingAverage: 1,
      reviewCount: 1,
      shipped: 1,
      shippedOnTime: 0,
      finalInspections: 1,
      finalPassedFirstTime: 0,
    });
    expect(perfectOnce.score).toBeGreaterThan(73);
    expect(perfectOnce.score).toBeLessThan(90);
    expect(badOnce.score).toBeLessThan(73);
    expect(badOnce.score).toBeGreaterThan(40);
  });

  it('reaches the extremes with a long record', () => {
    const great = performanceScore({
      ratingAverage: 5,
      reviewCount: 200,
      shipped: 200,
      shippedOnTime: 200,
      finalInspections: 200,
      finalPassedFirstTime: 200,
    });
    expect(great.score).toBeGreaterThanOrEqual(99);
    expect(great.confidence).toBeGreaterThan(0.95);
    expect(great).toMatchObject({ onTimeBps: 10_000, qcPassBps: 10_000 });
  });

  it('reports on-time and first-time QC rates in basis points', () => {
    const r = performanceScore({
      ...none,
      shipped: 8,
      shippedOnTime: 7,
      finalInspections: 4,
      finalPassedFirstTime: 3,
    });
    expect(r.onTimeBps).toBe(8750);
    expect(r.qcPassBps).toBe(7500);
  });
});
