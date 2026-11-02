import { GENERATED_DOCUMENT_TYPES } from '@garmentgate/shared';
import { describe, expect, it } from 'vitest';
import { pdfText } from '../chat/chat-scan.processor.js';
import { renderShippingDocument, type ShippingDocData } from './shipping-documents.js';

const base: Omit<ShippingDocData, 'type' | 'number'> = {
  orderCode: 'ORD-2026-00017',
  issuedAt: new Date('2026-11-02T00:00:00Z'),
  shipper: {
    role: 'Seller / Shipper',
    name: 'GarmentGate Trading Ltd.',
    lines: ['1 Sourcing Way, London'],
  },
  consignee: {
    role: 'Buyer / Consignee',
    name: 'Grünfeld Basics GmbH',
    lines: ['Torstraße 1', 'Berlin'],
  },
  originCountry: 'BD',
  destinationCountry: 'DE',
  shipment: {
    mode: 'SEA',
    incoterm: 'FOB Chattogram',
    forwarder: 'Kuehne+Nagel',
    carrier: 'Maersk',
    trackingNumber: 'MAEU123456',
    containerNumber: 'MSKU1234565',
    transportDocNo: 'MAEU-BL-778812',
    originPort: 'Chattogram',
    destinationPort: 'Hamburg',
    cartons: 250,
    grossWeightKg: 3100,
    etd: new Date('2026-11-10T00:00:00Z'),
    eta: new Date('2026-12-14T00:00:00Z'),
  },
  description: 'Organic cotton pullover hoodie, 340 GSM',
  quantity: 6000,
  unitPriceMinor: 1127,
  currency: 'EUR',
  items: [{ color: 'Oat', size: 'M', quantity: 2000 }],
  paymentTerms: '30% deposit, balance before shipment.',
  footer: 'Issued by GarmentGate Trading Ltd. for order ORD-2026-00017.',
};

const render = async (type: ShippingDocData['type']) =>
  pdfText(new Uint8Array(await renderShippingDocument({ ...base, type, number: `X-${type}` })));

describe('renderShippingDocument', () => {
  it('prices the commercial invoice at the given (buyer) price', async () => {
    const text = await render('COMMERCIAL_INVOICE');
    for (const s of [
      'COMMERCIAL INVOICE',
      'GarmentGate Trading Ltd.',
      'Grünfeld Basics GmbH',
      'EUR 11.27',
      'EUR 67,620.00',
      'Bangladesh',
      'Chattogram',
      'Hamburg',
      'MAEU-BL-778812',
      'Oat / M',
    ]) {
      expect(text).toContain(s);
    }
  });

  it('leaves prices off the packing list, B/L summary and certificate of origin', async () => {
    for (const type of ['PACKING_LIST', 'BILL_OF_LADING', 'CERTIFICATE_OF_ORIGIN'] as const) {
      const text = await render(type);
      expect(text).not.toContain('EUR');
      expect(text).toContain('GarmentGate Trading Ltd.');
    }
    expect(await render('PACKING_LIST')).toContain('3,100 kg');
    expect(await render('CERTIFICATE_OF_ORIGIN')).toContain('of Bangladesh origin');
  });

  it('renders every generated type', async () => {
    for (const type of GENERATED_DOCUMENT_TYPES) {
      expect((await render(type)).length).toBeGreaterThan(100);
    }
  });
});
