import { describe, expect, it } from 'vitest';
import {
  checkPosting,
  type LedgerLine,
  normalBalance,
  UnbalancedPostingError,
} from './ledger.service.js';

const line = (
  direction: 'DEBIT' | 'CREDIT',
  amountMinor: bigint,
  account: LedgerLine['account'] = 'PLATFORM_CASH',
): LedgerLine => ({
  account,
  companyId: null,
  direction,
  amountMinor,
});

describe('checkPosting', () => {
  it('accepts balanced postings, including split credits', () => {
    expect(() => {
      checkPosting([line('DEBIT', 100n), line('CREDIT', 100n)]);
    }).not.toThrow();
    expect(() => {
      checkPosting([line('DEBIT', 100n), line('CREDIT', 70n), line('CREDIT', 30n)]);
    }).not.toThrow();
  });

  it('refuses unbalanced, one-sided, zero and negative postings', () => {
    expect(() => {
      checkPosting([line('DEBIT', 100n), line('CREDIT', 99n)]);
    }).toThrow(UnbalancedPostingError);
    expect(() => {
      checkPosting([line('DEBIT', 100n)]);
    }).toThrow(UnbalancedPostingError);
    expect(() => {
      checkPosting([line('DEBIT', 0n), line('CREDIT', 0n)]);
    }).toThrow(UnbalancedPostingError);
    expect(() => {
      checkPosting([line('DEBIT', -5n), line('CREDIT', -5n)]);
    }).toThrow(UnbalancedPostingError);
  });
});

describe('normalBalance', () => {
  it('reads assets debit-normal and liabilities/revenue credit-normal', () => {
    expect(normalBalance('PLATFORM_CASH', 500n, 200n)).toBe(300n);
    expect(normalBalance('BUYER_ESCROW', 200n, 500n)).toBe(300n);
    expect(normalBalance('MANUFACTURER_PAYABLE', 100n, 100n)).toBe(0n);
    expect(normalBalance('PLATFORM_REVENUE', 0n, 42n)).toBe(42n);
  });
});
