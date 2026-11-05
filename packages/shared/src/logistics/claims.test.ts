import { describe, expect, it } from 'vitest';
import { canMoveClaim, claimNetMinor, SettleClaimSchema, settlementError } from './claims.js';
import { logisticsRevenue } from './reports.js';

describe('logistics claims', () => {
  const claim = { claimedMinor: 50_000n, insuredValueMinor: 40_000n, legCostMinor: 10_000n };
  const settle = (c: number, r: number, p: number) => ({
    compensationMinor: c,
    insurerRecoveryMinor: r,
    partnerChargebackMinor: p,
  });

  it('moves forward only', () => {
    expect(canMoveClaim('OPEN', 'SUBMITTED')).toBe(true);
    expect(canMoveClaim('SUBMITTED', 'SETTLED')).toBe(true);
    expect(canMoveClaim('SETTLED', 'OPEN')).toBe(false);
    expect(canMoveClaim('REJECTED', 'SETTLED')).toBe(false);
    expect(canMoveClaim('SUBMITTED', 'OPEN')).toBe(false);
  });

  it('caps compensation, recovery and chargeback', () => {
    expect(settlementError(claim, settle(50_000, 40_000, 10_000))).toBeNull();
    expect(settlementError(claim, settle(50_001, 0, 0))).toMatch(/exceed what was claimed/);
    expect(settlementError(claim, settle(0, 40_001, 0))).toMatch(/insured value/);
    expect(settlementError(claim, settle(0, 0, 10_001))).toMatch(/leg cost/);
    expect(settlementError({ ...claim, legCostMinor: null }, settle(0, 0, 1))).toMatch(
      /Pick the leg/,
    );
    expect(settlementError({ ...claim, insuredValueMinor: 0n }, settle(0, 1, 0))).toMatch(
      /wasn’t insured/,
    );
  });

  it('a rejected claim moves no money', () => {
    const base = { resolution: 'Not in our care', ...settle(0, 0, 0) };
    expect(SettleClaimSchema.safeParse({ outcome: 'REJECTED', ...base }).success).toBe(true);
    expect(
      SettleClaimSchema.safeParse({ outcome: 'REJECTED', ...base, compensationMinor: 1 }).success,
    ).toBe(false);
  });

  it('nets compensation against recoveries', () => {
    expect(
      claimNetMinor({
        compensationMinor: 50_000n,
        insurerRecoveryMinor: 40_000n,
        partnerChargebackMinor: 5_000n,
      }),
    ).toBe(5_000n);
  });
});

describe('logistics revenue report', () => {
  it('groups by currency, month and mode and takes claims off the margin', () => {
    const r = logisticsRevenue(
      [
        {
          departedAt: new Date('2026-10-03T00:00:00Z'),
          currency: 'USD',
          mode: 'SEA_LCL',
          buyerPriceMinor: 100_000n,
          partnerCostMinor: 70_000n,
          insuranceMinor: 2_000n,
        },
        {
          departedAt: new Date('2026-11-01T00:00:00Z'),
          currency: 'USD',
          mode: 'AIR',
          buyerPriceMinor: 50_000n,
          partnerCostMinor: 40_000n,
          insuranceMinor: 0n,
        },
        {
          departedAt: new Date('2026-11-02T00:00:00Z'),
          currency: 'EUR',
          mode: 'AIR',
          buyerPriceMinor: 10_000n,
          partnerCostMinor: 8_000n,
          insuranceMinor: 0n,
        },
      ],
      [
        {
          settledAt: new Date('2026-11-04T00:00:00Z'),
          currency: 'USD',
          mode: 'AIR',
          netMinor: 3_000n,
        },
      ],
    );
    expect(r.totals).toEqual([
      expect.objectContaining({
        currency: 'EUR',
        shipments: 1,
        marginMinor: 2_000,
        marginBps: 2000,
      }),
      expect.objectContaining({
        currency: 'USD',
        shipments: 2,
        revenueMinor: 150_000,
        partnerCostMinor: 110_000,
        insuranceMinor: 2_000,
        claimsNetMinor: 3_000,
        marginMinor: 35_000,
        marginBps: 2333,
      }),
    ]);
    expect(r.months.map((m) => `${m.month} ${m.currency} ${String(m.marginMinor)}`)).toEqual([
      '2026-10 USD 28000',
      '2026-11 EUR 2000',
      '2026-11 USD 7000',
    ]);
    expect(r.modes.find((m) => m.mode === 'AIR' && m.currency === 'USD')?.marginMinor).toBe(7_000);
  });
});

describe('form output re-parses on the server', () => {
  it('accepts an empty pickup note in either form', async () => {
    const { BookPickupSchema } = await import('./shipments.schema.js');
    const input = {
      hubId: '0198a000-0000-7000-8000-000000000001',
      pickupDate: '2026-11-06',
      note: '',
    };
    const once = BookPickupSchema.parse(input);
    expect(once.note).toBeNull();
    expect(BookPickupSchema.parse(once)).toEqual(once);
  });
});

describe('documents per shipment', () => {
  it('gives a hand-over no transport document or insurance, and uninsured cargo no certificate', async () => {
    const { documentTypesFor } = await import('./shipments.schema.js');
    expect(documentTypesFor('SWITCH_BL', { mode: 'HANDOVER', insured: true })).toEqual([
      'COMMERCIAL_INVOICE',
      'PACKING_LIST',
      'CERTIFICATE_OF_ORIGIN',
      'SHIPPING_LABEL',
      'CARTON_MARKING',
    ]);
    expect(documentTypesFor('SWITCH_BL', { mode: 'AIR', insured: false })).toContain(
      'ORIGINAL_BILL_OF_LADING',
    );
    expect(
      documentTypesFor('GARMENT_GATE_EXPORTER', { mode: 'AIR', insured: false }),
    ).not.toContain('INSURANCE_CERTIFICATE');
  });
});
