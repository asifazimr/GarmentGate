import { describe, expect, it } from 'vitest';
import { allocate, convertMinor, paymentPlan, releaseTranches } from './money.js';

/** Deterministic pseudo-random numbers, so failures reproduce. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1_103_515_245 + 12_345) % 2_147_483_648;
    return s / 2_147_483_648;
  };
}

describe('allocate', () => {
  it('always adds up to the total', () => {
    const random = rng(7);
    for (let i = 0; i < 2_000; i += 1) {
      const total = BigInt(Math.floor(random() * 1e9));
      const first = Math.floor(random() * 10_000);
      const second = Math.floor(random() * (10_000 - first));
      const parts = allocate(total, [first, second, 10_000 - first - second]);
      expect(parts.reduce((a, b) => a + b, 0n)).toBe(total);
      expect(parts.every((p) => p >= 0n)).toBe(true);
    }
  });

  it('refuses shares that are not 100%', () => {
    expect(() => allocate(100n, [3000, 6000])).toThrow(/100%/);
  });
});

describe('releaseTranches', () => {
  it('splits 30/70 and keeps every column exact', () => {
    const tranches = releaseTranches(3_900_000n, 3_480_000n, [3000, 7000]);
    expect(tranches).toEqual([
      { buyerMinor: 1_170_000n, manufacturerMinor: 1_044_000n, commissionMinor: 126_000n },
      { buyerMinor: 2_730_000n, manufacturerMinor: 2_436_000n, commissionMinor: 294_000n },
    ]);
  });

  it('never produces a negative commission or factory share, and always sums exactly', () => {
    const random = rng(42);
    for (let i = 0; i < 5_000; i += 1) {
      const manufacturer = BigInt(Math.floor(random() * 5e8));
      const buyer = manufacturer + BigInt(Math.floor(random() * 1e7));
      const a = Math.floor(random() * 10_000);
      const bps = [a, 10_000 - a];
      const t = releaseTranches(buyer, manufacturer, bps);
      expect(t.reduce((s, x) => s + x.buyerMinor, 0n)).toBe(buyer);
      expect(t.reduce((s, x) => s + x.manufacturerMinor, 0n)).toBe(manufacturer);
      for (const x of t) {
        expect(x.commissionMinor >= 0n && x.manufacturerMinor >= 0n).toBe(true);
        expect(x.buyerMinor).toBe(x.manufacturerMinor + x.commissionMinor);
      }
    }
  });

  it('refuses a factory total above the buyer total', () => {
    expect(() => releaseTranches(100n, 101n, [10_000])).toThrow();
  });
});

describe('convertMinor', () => {
  const rates = { USD: '1', EUR: '0.92', BDT: '119.5', VND: '25350', GBP: '0.7891' };

  it('converts with each currency’s exponent', () => {
    expect(convertMinor(10_000n, 'USD', 'EUR', rates)).toBe(9_200n); // $100 → €92
    expect(convertMinor(9_200n, 'EUR', 'USD', rates)).toBe(10_000n);
    expect(convertMinor(10_000n, 'USD', 'VND', rates)).toBe(2_535_000n); // no minor units
    expect(convertMinor(2_535_000n, 'VND', 'USD', rates)).toBe(10_000n);
    expect(convertMinor(347_000n, 'USD', 'BDT', rates)).toBe(41_466_500n);
  });

  it('rounds half away from zero, once', () => {
    expect(convertMinor(1n, 'USD', 'GBP', rates)).toBe(1n); // 0.7891 → 1
    expect(convertMinor(50n, 'USD', 'GBP', rates)).toBe(39n); // 39.455 → 39
  });

  it('needs both rates', () => {
    expect(() => convertMinor(1n, 'USD', 'TRY', rates)).toThrow(/rate/);
  });
});

describe('paymentPlan', () => {
  it('splits deposit and balance exactly', () => {
    expect(paymentPlan(3_900_001n, 3000)).toEqual({ deposit: 1_170_000n, balance: 2_730_001n });
  });
});
