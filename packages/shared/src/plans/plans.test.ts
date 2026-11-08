import { describe, expect, it } from 'vitest';
import {
  canListAnother,
  DEFAULT_PLAN_SETTINGS,
  GrantPlanSchema,
  grantedTier,
  headStartEnds,
  PlanSettingsSchema,
  priceOf,
} from './plans.js';

const DAY = 86_400_000;
const now = new Date('2026-11-08T12:00:00Z');

describe('factory plans', () => {
  it('ships valid defaults', () => {
    expect(PlanSettingsSchema.parse(DEFAULT_PLAN_SETTINGS)).toEqual(DEFAULT_PLAN_SETTINGS);
    expect(priceOf(DEFAULT_PLAN_SETTINGS.tiers.PRO, 'MONTH')).toBe(9_900);
    expect(priceOf(DEFAULT_PLAN_SETTINGS.tiers.PREMIUM, 'YEAR')).toBe(249_000);
  });

  it('limits listed products, unless unlimited', () => {
    expect(canListAnother(9, { maxProducts: 10 })).toBe(true);
    expect(canListAnother(10, { maxProducts: 10 })).toBe(false);
    expect(canListAnother(10_000, { maxProducts: null })).toBe(true);
  });

  it('caps the RFQ head start at half the quote window', () => {
    const published = new Date('2026-11-01T00:00:00Z');
    expect(headStartEnds(published, new Date(published.getTime() + 10 * DAY), 24)).toEqual(
      new Date(published.getTime() + DAY),
    );
    expect(headStartEnds(published, new Date(published.getTime() + 12 * 3_600_000), 24)).toEqual(
      new Date(published.getTime() + 6 * 3_600_000),
    );
    expect(headStartEnds(published, published, 24)).toEqual(published);
  });

  it('grants a tier while active, with grace after a missed renewal', () => {
    const s = { tier: 'PRO' as const, status: 'ACTIVE' as const };
    expect(grantedTier({ ...s, currentPeriodEnd: null }, now)).toBe('PRO');
    expect(grantedTier({ ...s, currentPeriodEnd: new Date(now.getTime() + DAY) }, now)).toBe('PRO');
    expect(grantedTier({ ...s, currentPeriodEnd: new Date(now.getTime() - 2 * DAY) }, now)).toBe(
      null,
    );
    expect(
      grantedTier(
        { ...s, status: 'PAST_DUE', currentPeriodEnd: new Date(now.getTime() - 3 * DAY) },
        now,
      ),
    ).toBe('PRO');
    expect(
      grantedTier(
        { ...s, status: 'PAST_DUE', currentPeriodEnd: new Date(now.getTime() - 8 * DAY) },
        now,
      ),
    ).toBe(null);
    expect(grantedTier({ ...s, status: 'CANCELED', currentPeriodEnd: null }, now)).toBe(null);
    expect(grantedTier({ ...s, status: 'INCOMPLETE', currentPeriodEnd: null }, now)).toBe(null);
  });

  it('needs a reference when a grant was paid', () => {
    expect(
      GrantPlanSchema.safeParse({ tier: 'PRO', note: 'Bank transfer', paidUsdMinor: 9_900 })
        .success,
    ).toBe(false);
    expect(
      GrantPlanSchema.parse({
        tier: 'PRO',
        note: 'Bank transfer',
        paidUsdMinor: 9_900,
        bankReference: 'TT-1',
        endsOn: '',
      }).endsOn,
    ).toBeUndefined();
  });
});

describe('GarmentGate Plus', () => {
  it('discounts sample fees, rounding to the minor unit', async () => {
    const { discountedFee, BuyerPlusSettingsSchema, DEFAULT_BUYER_PLUS_SETTINGS } =
      await import('./buyer-plus.js');
    expect(BuyerPlusSettingsSchema.parse(DEFAULT_BUYER_PLUS_SETTINGS)).toEqual(
      DEFAULT_BUYER_PLUS_SETTINGS,
    );
    expect(discountedFee(7_500n, 5_000)).toBe(3_750n);
    expect(discountedFee(7_501n, 5_000)).toBe(3_751n); // 3750.5 → 3751
    expect(discountedFee(7_500n, 0)).toBe(7_500n);
    expect(discountedFee(7_500n, 10_000)).toBe(0n);
  });
});
