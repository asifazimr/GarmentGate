import { describe, expect, it } from 'vitest';
import { consolidationSplit } from './consolidation.js';
import {
  applyLogisticsMargin,
  chargeableGrams,
  chargeableMilliUnits,
  freightCost,
  insurancePremium,
  insuredValue,
  pickLogisticsMarginRule,
} from './freight.js';
import { dutyRateFor, landedCost } from './landed-cost.js';
import { HubInputSchema, RateCardInputSchema } from './logistics.schema.js';

const cargo = { weightGrams: 120_000, volumeLitres: 1_500 }; // 120 kg, 1.5 CBM

describe('chargeable units', () => {
  it('charges air on volumetric weight when the cargo is light', () => {
    expect(chargeableGrams('AIR', cargo)).toBe(250_500); // 1.5 CBM × 167 kg
    expect(chargeableGrams('AIR', { weightGrams: 400_000, volumeLitres: 1_500 })).toBe(400_000);
  });

  it('charges sea LCL by weight or measure, at least one CBM', () => {
    expect(chargeableMilliUnits('PER_CBM', 'SEA_LCL', cargo)).toBe(1_500);
    expect(
      chargeableMilliUnits('PER_CBM', 'SEA_LCL', { weightGrams: 2_400_000, volumeLitres: 900 }),
    ).toBe(2_400);
    expect(
      chargeableMilliUnits('PER_CBM', 'SEA_LCL', { weightGrams: 10_000, volumeLitres: 200 }),
    ).toBe(1_000);
  });

  it('counts whole containers and flat fees', () => {
    expect(
      chargeableMilliUnits(
        'PER_CONTAINER',
        'SEA_FCL',
        { weightGrams: 1, volumeLitres: 60_000 },
        'GP40',
      ),
    ).toBe(2_000);
    expect(
      chargeableMilliUnits(
        'PER_CONTAINER',
        'SEA_FCL',
        { weightGrams: 1, volumeLitres: 60_000 },
        'HC40',
      ),
    ).toBe(1_000);
    expect(chargeableMilliUnits('FLAT', 'DOMESTIC', cargo)).toBe(1_000);
  });
});

describe('freight cost and margin', () => {
  it('prices units, rounding up, never below the minimum charge', () => {
    const rate = {
      unit: 'PER_KG' as const,
      containerType: null,
      costMinor: 455,
      minChargeMinor: 10_000,
    };
    expect(freightCost(rate, 'AIR', cargo)).toBe(113_978n); // 250.5 kg × 4.55 = 1,139.775
    expect(freightCost(rate, 'AIR', { weightGrams: 1_000, volumeLitres: 1 })).toBe(10_000n);
  });

  it('applies the markup, or the minimum margin when larger', () => {
    expect(applyLogisticsMargin(100_000n, { markupBps: 1200, minMarginMinor: 0 })).toBe(112_000n);
    expect(applyLogisticsMargin(10_000n, { markupBps: 1200, minMarginMinor: 5_000 })).toBe(15_000n);
    expect(applyLogisticsMargin(10_001n, { markupBps: 1, minMarginMinor: 0 })).toBe(10_003n);
    expect(applyLogisticsMargin(10_000n, null)).toBe(10_000n);
  });

  it('picks the most specific matching rule', () => {
    const rule = (name: string, mode: 'AIR' | null, o: string | null, d: string | null) => ({
      name,
      mode,
      originCountry: o,
      destinationCountry: d,
      markupBps: 1000,
      minMarginMinor: 0,
      active: true,
    });
    const rules = [
      rule('default', null, null, null),
      rule('to DE', null, null, 'DE'),
      rule('air', 'AIR', null, null),
      rule('air BD→DE', 'AIR', 'BD', 'DE'),
      { ...rule('off', 'AIR', 'BD', 'DE'), active: false, markupBps: 1 },
    ];
    const pick = (mode: 'AIR' | 'SEA_LCL', o: string, d: string) =>
      pickLogisticsMarginRule(rules, { mode, originCountry: o, destinationCountry: d })?.name;
    expect(pick('AIR', 'BD', 'DE')).toBe('air BD→DE');
    expect(pick('AIR', 'VN', 'DE')).toBe('air');
    expect(pick('SEA_LCL', 'BD', 'DE')).toBe('to DE');
    expect(pick('SEA_LCL', 'BD', 'US')).toBe('default');
  });

  it('insures 110% of CIF with a minimum premium', () => {
    expect(insuredValue(1_000_000n)).toBe(1_100_000n);
    expect(insurancePremium(1_100_000n, 30, 2_500)).toBe(3_300n);
    expect(insurancePremium(100_000n, 30, 2_500)).toBe(2_500n);
  });
});

describe('landed cost', () => {
  const rates = [
    { hsPrefix: '61', destinationCountry: 'DE', rateBps: 1200 },
    { hsPrefix: '6109', destinationCountry: 'DE', rateBps: 1000 },
    { hsPrefix: '6109', destinationCountry: 'US', rateBps: 1650 },
  ];

  it('uses the longest HS prefix for the country', () => {
    expect(dutyRateFor(rates, '610910', 'DE')?.rateBps).toBe(1000);
    expect(dutyRateFor(rates, '611020', 'DE')?.rateBps).toBe(1200);
    expect(dutyRateFor(rates, '610910', 'GB')).toBeNull();
  });

  it('charges duty on CIF, or FOB where customs value it that way', () => {
    const base = { goodsMinor: 1_000_000n, freightMinor: 80_000n, insuranceMinor: 3_300n };
    const de = landedCost({ ...base, dutyRateBps: 1000, destinationCountry: 'DE' });
    expect(de).toMatchObject({
      valuation: 'CIF',
      customsValueMinor: 1_083_300n,
      dutyMinor: 108_330n,
    });
    expect(de.totalMinor).toBe(1_191_630n);
    const us = landedCost({ ...base, dutyRateBps: 1650, destinationCountry: 'US' });
    expect(us).toMatchObject({
      valuation: 'FOB',
      customsValueMinor: 1_000_000n,
      dutyMinor: 165_000n,
    });
    expect(landedCost({ ...base, dutyRateBps: null, destinationCountry: 'GB' }).dutyMinor).toBe(0n);
  });
});

describe('consolidation split', () => {
  it('shares the price by chargeable weight and adds up exactly', () => {
    const parts = [
      { key: 'a', weightGrams: 100_000, volumeLitres: 0 },
      { key: 'b', weightGrams: 200_000, volumeLitres: 0 },
      { key: 'c', weightGrams: 0, volumeLitres: 600 }, // 600 L × 167 = 100.2 kg volumetric (air)
    ];
    const split = consolidationSplit(100_001n, 'AIR', parts);
    expect(split.reduce((a, s) => a + s.amountMinor, 0n)).toBe(100_001n);
    expect(split.map((s) => s.key)).toEqual(['a', 'b', 'c']);
    expect(split[1]?.amountMinor).toBe(49_975n);
  });

  it('splits evenly when nothing is measured, remainders to the earliest', () => {
    const split = consolidationSplit(10n, 'SEA_LCL', [
      { key: 'a', weightGrams: 0, volumeLitres: 0 },
      { key: 'b', weightGrams: 0, volumeLitres: 0 },
      { key: 'c', weightGrams: 0, volumeLitres: 0 },
    ]);
    expect(split.map((s) => s.amountMinor)).toEqual([4n, 3n, 3n]);
  });
});

describe('schemas', () => {
  it('validates rate cards and hubs', () => {
    const card = {
      partnerId: '0198a000-0000-7000-8000-000000000001',
      mode: 'SEA_FCL',
      originCountry: 'BD',
      destinationCountry: 'DE',
      destinationPort: 'DEHAM',
      unit: 'PER_CONTAINER',
      costMinor: '180000',
      transitDaysMin: 28,
      transitDaysMax: 35,
      validFrom: '2026-11-01',
      validTo: '2027-01-31',
    };
    expect(RateCardInputSchema.safeParse(card).success).toBe(false); // container type missing
    expect(RateCardInputSchema.safeParse({ ...card, containerType: 'GP40' }).success).toBe(true);
    expect(
      RateCardInputSchema.safeParse({ ...card, containerType: 'GP40', destinationPort: 'NLRTM' })
        .success,
    ).toBe(false);
    const hub = {
      code: 'hub-bd-01',
      name: 'Chattogram hub',
      country: 'BD',
      city: 'Chattogram',
      addressLine1: 'Plot 4, EPZ',
    };
    expect(HubInputSchema.safeParse(hub).success).toBe(true);
    expect(HubInputSchema.safeParse({ ...hub, country: 'VN' }).success).toBe(false);
  });
});

describe('shipping step rules', () => {
  it('offers the modes an incoterm allows', async () => {
    const { modesFor, insuranceRequired, estimatedCargo } = await import('./shipping.js');
    expect(modesFor('CIF', 'BD', 'DE')).toEqual(['SEA_FCL', 'SEA_LCL']);
    expect(modesFor('DAP', 'BD', 'DE')).toEqual(['SEA_FCL', 'SEA_LCL', 'AIR']);
    expect(modesFor('DDP', 'BD', 'US')).toEqual(['DDP']);
    expect(modesFor('DAP', 'BD', 'BD')).toEqual(['DOMESTIC']);
    expect(insuranceRequired('CIF')).toBe(true);
    expect(insuranceRequired('CFR')).toBe(false);
    expect(estimatedCargo(5000, { pieceWeightGrams: 300, pieceVolumeMl: 1500 })).toEqual({
      weightGrams: 1_500_000,
      volumeLitres: 7_500,
    });
  });
});

describe('price and cost shares', () => {
  it('never puts an order’s price below its cost, and both add up', async () => {
    const { splitPriceAndCost } = await import('./consolidation.js');
    const shares = splitPriceAndCost(10_001n, 9_999n, [1n, 1n, 1n]);
    expect(shares.reduce((a, s) => a + s.priceMinor, 0n)).toBe(10_001n);
    expect(shares.reduce((a, s) => a + s.costMinor, 0n)).toBe(9_999n);
    for (const s of shares) expect(s.priceMinor).toBeGreaterThanOrEqual(s.costMinor);
  });
});

describe('tracking status flow', () => {
  it('only moves shipments forward, with exceptions in between', async () => {
    const { canAdvanceShipment } = await import('./tracking.schema.js');
    expect(canAdvanceShipment('BOOKED', 'IN_TRANSIT')).toBe(true);
    expect(canAdvanceShipment('PLANNED', 'IN_TRANSIT')).toBe(true);
    expect(canAdvanceShipment('CUSTOMS', 'AT_DESTINATION')).toBe(false);
    expect(canAdvanceShipment('IN_TRANSIT', 'EXCEPTION')).toBe(true);
    expect(canAdvanceShipment('EXCEPTION', 'CUSTOMS')).toBe(true);
    expect(canAdvanceShipment('PLANNED', 'EXCEPTION')).toBe(false);
    expect(canAdvanceShipment('DELIVERED', 'EXCEPTION')).toBe(false);
    expect(canAdvanceShipment('CANCELLED', 'IN_TRANSIT')).toBe(false);
  });
});
