import { describe, expect, it } from 'vitest';
import { applyMarkup, type MarginRuleLike, pickCatalogRule, pickQuoteRule } from './margin.js';

const rule = (id: string, over: Partial<MarginRuleLike>): MarginRuleLike => ({
  id,
  markupBps: 1500,
  minMarginPerUnitMinor: null,
  categoryId: null,
  companyId: null,
  ...over,
});

describe('pickCatalogRule', () => {
  const rules = [
    rule('default', {}),
    rule('activewear', { categoryId: 'cat-activewear', markupBps: 1800 }),
    rule('leggings', { categoryId: 'cat-leggings', markupBps: 2000 }),
    rule('buyer-specific', { companyId: 'buyer-1', markupBps: 500 }),
  ];

  it('prefers the exact category, then the parent, then the default', () => {
    expect(pickCatalogRule(rules, { id: 'cat-leggings', parentId: 'cat-activewear' })?.id).toBe(
      'leggings',
    );
    expect(pickCatalogRule(rules, { id: 'cat-bras', parentId: 'cat-activewear' })?.id).toBe(
      'activewear',
    );
    expect(pickCatalogRule(rules, { id: 'cat-tees', parentId: 'cat-tops' })?.id).toBe('default');
  });

  it('never uses a buyer-specific rule for the public catalog', () => {
    expect(
      pickCatalogRule([rule('buyer-specific', { companyId: 'b' })], { id: 'x', parentId: null }),
    ).toBeNull();
  });
});

describe('applyMarkup', () => {
  it('takes a plan discount off the markup, never below zero or the floor', () => {
    expect(applyMarkup(1000, rule('r', { markupBps: 1200 }), 200)).toBe(1100);
    expect(applyMarkup(1000, rule('r', { markupBps: 100 }), 200)).toBe(1000);
    expect(applyMarkup(1000, rule('r', { markupBps: 1200, minMarginPerUnitMinor: 150 }), 200)).toBe(
      1150,
    );
  });

  it('adds the markup in basis points with integer rounding', () => {
    expect(applyMarkup(290, rule('r', { markupBps: 1200 }))).toBe(325); // 324.8 → 325
    expect(applyMarkup(1000, rule('r', { markupBps: 1500 }))).toBe(1150);
  });

  it('respects the minimum margin per unit', () => {
    expect(applyMarkup(100, rule('r', { markupBps: 1000, minMarginPerUnitMinor: 25 }))).toBe(125);
  });

  it('returns the manufacturer price when there is no rule', () => {
    expect(applyMarkup(500, null)).toBe(500);
  });
});

describe('pickQuoteRule', () => {
  const rules = [
    rule('default', {}),
    rule('activewear', { categoryId: 'cat-activewear', markupBps: 1800 }),
    rule('buyer-any', { companyId: 'buyer-1', markupBps: 1200 }),
    rule('buyer-leggings', { companyId: 'buyer-1', categoryId: 'cat-leggings', markupBps: 900 }),
    rule('other-buyer', { companyId: 'buyer-2', markupBps: 100 }),
  ];
  const leggings = { id: 'cat-leggings', parentId: 'cat-activewear' };
  const tees = { id: 'cat-tees', parentId: 'cat-tops' };

  it("prefers the buyer's negotiated rule, most specific category first", () => {
    expect(pickQuoteRule(rules, leggings, 'buyer-1')?.id).toBe('buyer-leggings');
    expect(pickQuoteRule(rules, tees, 'buyer-1')?.id).toBe('buyer-any');
  });

  it('falls back to the generic category rules for other buyers', () => {
    expect(pickQuoteRule(rules, leggings, 'buyer-3')?.id).toBe('activewear');
    expect(pickQuoteRule(rules, tees, 'buyer-3')?.id).toBe('default');
  });

  it("never applies another buyer's rate", () => {
    expect(pickQuoteRule(rules, tees, 'buyer-3')?.id).not.toBe('other-buyer');
  });
});
