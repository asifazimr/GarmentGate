import { describe, expect, it } from 'vitest';
import { callOffError, CreateContractSchema } from './contracts.js';

const contract = {
  status: 'ACTIVE' as const,
  startsOn: '2026-01-01',
  endsOn: '2026-12-31',
  contractedQuantity: 10_000,
  calledOffQuantity: 9_000,
  minCallOffQuantity: 500,
};

describe('supply contract call-offs', () => {
  it('allows call-offs inside the period, above the minimum, within the volume', () => {
    expect(callOffError(contract, 1_000, '2026-06-01')).toBeNull();
    expect(callOffError(contract, 400, '2026-06-01')).toMatch(/at least 500/);
    expect(callOffError(contract, 1_001, '2026-06-01')).toMatch(/Only 1000 pieces/);
    expect(callOffError(contract, 600, '2027-01-01')).toMatch(/ended/);
    expect(callOffError({ ...contract, status: 'CANCELLED' }, 600, '2026-06-01')).toMatch(
      /isn’t active/,
    );
  });

  it('refuses a contract that sells below the factory price', () => {
    const r = CreateContractSchema.safeParse({
      buyerCode: 'BYR-US-0012',
      manufacturerCode: 'MFR-BD-0421',
      title: 'Security uniform shirt',
      specification: 'Poly-cotton, two chest pockets, epaulettes.',
      currency: 'USD',
      buyerUnitPriceMinor: 700,
      manufacturerUnitPriceMinor: 800,
      contractedQuantity: 10_000,
      minCallOffQuantity: 500,
      depositBps: 3000,
      incoterm: 'FOB',
      destinationCountry: 'BD',
      leadTimeDays: 45,
      startsOn: '2026-01-01',
      endsOn: '2026-12-31',
    });
    expect(r.success).toBe(false);
  });
});
