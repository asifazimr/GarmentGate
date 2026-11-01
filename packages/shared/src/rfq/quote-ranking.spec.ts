import { describe, expect, it } from 'vitest';
import { quoteBadges, valueScore } from './quote-ranking.js';

const q = (id: string, unitPriceMinor: number, leadTimeDays: number, performanceScore = 80) => ({
  id,
  unitPriceMinor,
  leadTimeDays,
  performanceScore,
});

describe('quoteBadges', () => {
  it('awards nothing without a comparison', () => {
    expect(quoteBadges([q('a', 1000, 40)]).get('a')).toEqual([]);
  });

  it('marks the lowest price, the fastest and the best value', () => {
    const quotes = [
      q('cheap-slow', 1000, 90),
      q('balanced', 1050, 45, 92),
      q('fast-dear', 1400, 30),
    ];
    const badges = quoteBadges(quotes);
    expect(badges.get('cheap-slow')).toEqual(['LOWEST_PRICE']);
    expect(badges.get('balanced')).toEqual(['BEST_VALUE']);
    expect(badges.get('fast-dear')).toEqual(['FASTEST']);
  });

  it('lets one quote win several badges', () => {
    const badges = quoteBadges([q('winner', 900, 30, 95), q('other', 1100, 60, 70)]);
    expect(badges.get('winner')).toEqual(['BEST_VALUE', 'LOWEST_PRICE', 'FASTEST']);
    expect(badges.get('other')).toEqual([]);
  });

  it('breaks ties on price, then lead time', () => {
    const badges = quoteBadges([q('a', 1000, 50, 80), q('b', 1000, 40, 80)]);
    expect(badges.get('b')).toContain('LOWEST_PRICE');
  });
});

describe('valueScore', () => {
  it('weights price most, then lead time, then factory score', () => {
    const best = q('a', 1000, 40, 100);
    const dear = q('b', 2000, 40, 100);
    expect(valueScore(best, [best, dear])).toBeCloseTo(1);
    expect(valueScore(dear, [best, dear])).toBeCloseTo(0.6 * 0.5 + 0.25 + 0.15);
  });
});
