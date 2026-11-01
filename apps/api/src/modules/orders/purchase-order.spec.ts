import { describe, expect, it } from 'vitest';
import { pdfText } from '../chat/chat-scan.processor.js';
import { money, pdfSafe, type PurchaseOrderData, renderPurchaseOrder } from './purchase-order.js';

const base: PurchaseOrderData = {
  number: 'PO-ORD-2026-00017-B',
  orderCode: 'ORD-2026-00017',
  issuedAt: new Date('2026-09-20T00:00:00Z'),
  draft: false,
  buyer: {
    role: 'Buyer',
    name: 'Grünfeld Basics GmbH',
    lines: ['Torstraße 1', '10119 Berlin', 'DE'],
  },
  supplier: {
    role: 'Supplier',
    name: 'GarmentGate Trading Ltd.',
    lines: ['1 Sourcing Way, London'],
  },
  shipTo: ['Grünfeld Basics GmbH', 'Hamburg'],
  description: 'Organic cotton pullover hoodie, 340 GSM',
  specification: 'Kangaroo pocket, ribbed cuffs.',
  quantity: 6000,
  unitPriceMinor: 1127,
  currency: 'EUR',
  incoterm: 'DDP Hamburg',
  requestedShipDate: new Date('2027-02-01T00:00:00Z'),
  depositBps: 3000,
  paymentTerms: '30% deposit on confirmation.',
  items: [{ color: 'Oat', size: 'M', quantity: 2000 }],
  footer: 'Between Grünfeld Basics GmbH and GarmentGate Trading Ltd.',
};

describe('renderPurchaseOrder', () => {
  it('prints parties, line, totals, deposit and terms', async () => {
    const text = await pdfText(new Uint8Array(await renderPurchaseOrder(base)));
    for (const s of [
      'PURCHASE ORDER',
      'PO-ORD-2026-00017-B',
      'Grünfeld Basics GmbH',
      'GarmentGate Trading Ltd.',
      'EUR 11.27',
      'EUR 67,620.00',
      'EUR 20,286.00',
      'DDP Hamburg',
      '2027-02-01',
      'Oat / M',
    ]) {
      expect(text).toContain(s);
    }
    expect(text).not.toContain('DRAFT');
  });

  it('marks drafts', async () => {
    expect(
      await pdfText(new Uint8Array(await renderPurchaseOrder({ ...base, draft: true }))),
    ).toContain('DRAFT');
  });

  it('copes with names Helvetica can’t print', async () => {
    const pdf = await renderPurchaseOrder({
      ...base,
      supplier: { ...base.supplier, name: 'Bosphorus Dış Giyim A.Ş. 工厂' },
    });
    expect(await pdfText(new Uint8Array(pdf))).toContain('Bosphorus Dis Giyim A.S.');
  });
});

describe('helpers', () => {
  it('formats money with the currency code and its own exponent', () => {
    expect(money(1127, 'EUR')).toBe('EUR 11.27');
    expect(money(1500, 'JPY')).toBe('JPY 1,500');
  });
  it('keeps Latin-1 and €, simplifies the rest', () => {
    expect(pdfSafe('Grünfeld € ı ş 工')).toBe('Grünfeld € i s ?');
  });
});
