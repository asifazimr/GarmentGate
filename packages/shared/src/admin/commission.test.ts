import { describe, expect, it } from 'vitest';
import { commissionAmount, commissionRate } from './commission.js';

describe('commissionRate', () => {
  const rule = { commissionBps: 500, repeatCommissionBps: 300 };

  it('charges nothing without a rule', () => {
    expect(commissionRate(null, false)).toBe(0);
  });

  it('uses the normal rate for a first order and the repeat rate after that', () => {
    expect(commissionRate(rule, false)).toBe(500);
    expect(commissionRate(rule, true)).toBe(300);
  });

  it('keeps the normal rate for repeats when no repeat rate is set', () => {
    expect(commissionRate({ commissionBps: 500, repeatCommissionBps: null }, true)).toBe(500);
  });

  it('never lets a repeat rate exceed the normal one', () => {
    expect(commissionRate({ commissionBps: 200, repeatCommissionBps: 400 }, true)).toBe(200);
  });
});

describe('commissionAmount', () => {
  it('takes basis points of the factory total, rounding half up', () => {
    expect(commissionAmount(1_000_000n, 500)).toBe(50_000n);
    expect(commissionAmount(999n, 150)).toBe(15n); // 14.985
    expect(commissionAmount(1_001n, 50)).toBe(5n); // 5.005
  });

  it('is zero for a zero rate or total', () => {
    expect(commissionAmount(1_000n, 0)).toBe(0n);
    expect(commissionAmount(0n, 500)).toBe(0n);
  });

  it('never exceeds the factory total', () => {
    expect(commissionAmount(7n, 10_000)).toBe(7n);
  });
});
