import { describe, expect, it } from 'vitest';
import { matchRfq, type MatchableFactory, type MatchableRfq } from './rfq-matching.js';

const DAY = 86_400_000;
const deadline = new Date('2027-01-10T00:00:00Z');
const TOPS = { id: 'tops', parentId: null };
const TEES = { id: 'tees', parentId: 'tops' };
const HOODIES = { id: 'hoodies', parentId: 'tops' };
const DENIM = { id: 'denim', parentId: null };

const factory = (over: Partial<MatchableFactory> = {}): MatchableFactory => ({
  categories: [TEES],
  moqPcs: 500,
  monthlyCapacityPcs: 10_000,
  ...over,
});
const rfq = (over: Partial<MatchableRfq> = {}): MatchableRfq => ({
  category: TEES,
  quantity: 5_000,
  deadline,
  requiredDeliveryDate: new Date(deadline.getTime() + 60 * DAY),
  invited: false,
  inviteOnly: false,
  ...over,
});

describe('matchRfq', () => {
  it('matches on category, MOQ and capacity', () => {
    expect(matchRfq(factory(), rfq())).toEqual({
      matched: true,
      reasons: ['CATEGORY', 'MOQ', 'CAPACITY'],
    });
  });

  it('understands parent and child categories', () => {
    expect(matchRfq(factory({ categories: [TOPS] }), rfq()).matched).toBe(true); // generalist
    expect(matchRfq(factory(), rfq({ category: TOPS })).matched).toBe(true); // buyer asked broadly
    expect(matchRfq(factory(), rfq({ category: HOODIES })).matched).toBe(false); // sibling
    expect(matchRfq(factory(), rfq({ category: DENIM })).matched).toBe(false);
  });

  it('skips factories whose MOQ is above the quantity', () => {
    const result = matchRfq(factory({ moqPcs: 10_000 }), rfq());
    expect(result.matched).toBe(false);
    expect(result.reasons).not.toContain('MOQ');
  });

  it('checks capacity over the production window', () => {
    // 2 months × 2,000/month = 4,000 < 5,000
    expect(matchRfq(factory({ monthlyCapacityPcs: 2_000 }), rfq()).matched).toBe(false);
    // 3 months × 2,000 = 6,000
    expect(
      matchRfq(
        factory({ monthlyCapacityPcs: 2_000 }),
        rfq({ requiredDeliveryDate: new Date(deadline.getTime() + 95 * DAY) }),
      ).matched,
    ).toBe(true);
    // No delivery date: a 90-day window
    expect(
      matchRfq(factory({ monthlyCapacityPcs: 2_000 }), rfq({ requiredDeliveryDate: null })).matched,
    ).toBe(true);
  });

  it('does not rule factories out on unknown MOQ or capacity', () => {
    expect(matchRfq(factory({ moqPcs: null, monthlyCapacityPcs: null }), rfq()).matched).toBe(true);
  });

  it('always shows invited factories, and only them for invite-only requests', () => {
    expect(matchRfq(factory({ categories: [DENIM] }), rfq({ invited: true })).matched).toBe(true);
    expect(matchRfq(factory(), rfq({ inviteOnly: true })).matched).toBe(false);
    expect(matchRfq(factory(), rfq({ inviteOnly: true, invited: true })).reasons[0]).toBe(
      'INVITED',
    );
  });
});
