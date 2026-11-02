import type { GeneratedDocumentType } from '@garmentgate/shared';
import { PDFDocument, type PDFFont, type PDFPage, rgb, StandardFonts } from 'pdf-lib';
import { money, pdfSafe, type PoParty } from '../orders/purchase-order.js';

/**
 * Data for a shipping document GarmentGate issues under its own name. GarmentGate is the
 * seller, exporter and shipper; the factory is never named (origin is a country, port of
 * loading a port). The caller builds this for the buyer only, at the buyer's price.
 */
export interface ShippingDocData {
  type: GeneratedDocumentType;
  number: string;
  orderCode: string;
  issuedAt: Date;
  /** GarmentGate. */
  shipper: PoParty;
  /** The buyer. */
  consignee: PoParty;
  originCountry: string;
  destinationCountry: string;
  shipment: {
    mode: string;
    incoterm: string;
    forwarder: string | null;
    carrier: string | null;
    trackingNumber: string | null;
    containerNumber: string | null;
    transportDocNo: string | null;
    originPort: string | null;
    destinationPort: string | null;
    cartons: number | null;
    grossWeightKg: number | null;
    etd: Date | null;
    eta: Date | null;
  };
  description: string;
  quantity: number;
  unitPriceMinor: number;
  currency: string;
  items: { color: string; size: string; quantity: number }[];
  paymentTerms: string;
  footer: string;
}

const TITLES: Record<GeneratedDocumentType, string> = {
  COMMERCIAL_INVOICE: 'COMMERCIAL INVOICE',
  PACKING_LIST: 'PACKING LIST',
  BILL_OF_LADING: 'BILL OF LADING SUMMARY',
  CERTIFICATE_OF_ORIGIN: 'CERTIFICATE OF ORIGIN',
};
const PREFIX: Record<GeneratedDocumentType, string> = {
  COMMERCIAL_INVOICE: 'CI',
  PACKING_LIST: 'PL',
  BILL_OF_LADING: 'BL',
  CERTIFICATE_OF_ORIGIN: 'CO',
};
export const shippingDocNumber = (type: GeneratedDocumentType, orderCode: string): string =>
  `${PREFIX[type]}-${orderCode}`;

const INK = rgb(0.09, 0.13, 0.18);
const MUTED = rgb(0.42, 0.47, 0.53);
const LINE = rgb(0.85, 0.87, 0.9);
const BRAND = rgb(0.04, 0.37, 0.35);
const W = 595;
const H = 842;
const M = 48;

const day = (d: Date | null) => (d ? d.toISOString().slice(0, 10) : 'to be confirmed');
const countryName = (code: string) =>
  new Intl.DisplayNames('en', { type: 'region' }).of(code) ?? code;

function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of pdfSafe(text).split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > width && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

export async function renderShippingDocument(d: ShippingDocData): Promise<Buffer> {
  const doc = await PDFDocument.create();
  const title = TITLES[d.type];
  doc.setTitle(`${title} ${d.number}`);
  doc.setCreator('GarmentGate');
  doc.setProducer('GarmentGate');
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  let page: PDFPage = doc.addPage([W, H]);
  let y = H - M;

  const text = (s: string, x: number, size = 10, font = regular, color = INK) => {
    page.drawText(pdfSafe(s), { x, y, size, font, color });
  };
  const right = (s: string, size = 10, font = regular, color = INK) => {
    page.drawText(pdfSafe(s), {
      x: W - M - font.widthOfTextAtSize(pdfSafe(s), size),
      y,
      size,
      font,
      color,
    });
  };
  const ensure = (needed: number) => {
    if (y - needed < M + 40) {
      page = doc.addPage([W, H]);
      y = H - M;
    }
  };
  const rule = () => {
    page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.6, color: LINE });
  };
  const heading = (s: string) => {
    ensure(30);
    text(s, M, 8, bold, MUTED);
    y -= 14;
  };
  const paragraph = (s: string, size = 9, color = INK) => {
    for (const line of wrap(s, regular, size, W - M * 2)) {
      ensure(12);
      text(line, M, size, regular, color);
      y -= size + 3;
    }
  };

  // Header: GarmentGate's brand, the document and its references.
  text('GarmentGate', M, 16, bold, BRAND);
  right(title, 15, bold);
  y -= 22;
  for (const line of [`No. ${d.number}`, `Order ${d.orderCode}`, `Date ${day(d.issuedAt)}`]) {
    right(line, 9, regular, MUTED);
    y -= 12;
  }
  y -= 8;

  // Parties
  const column = (party: PoParty, x: number, top: number) => {
    let cy = top;
    page.drawText(pdfSafe(party.role.toUpperCase()), {
      x,
      y: cy,
      size: 8,
      font: bold,
      color: MUTED,
    });
    cy -= 14;
    page.drawText(pdfSafe(party.name), { x, y: cy, size: 11, font: bold, color: INK });
    cy -= 14;
    for (const line of party.lines) {
      for (const l of wrap(line, regular, 9, 220)) {
        page.drawText(l, { x, y: cy, size: 9, font: regular, color: INK });
        cy -= 12;
      }
    }
    return cy;
  };
  const top = y;
  y = Math.min(column(d.shipper, M, top), column(d.consignee, W / 2 + 8, top)) - 10;
  rule();
  y -= 18;

  // Shipment facts, two per row.
  const s = d.shipment;
  const facts: [string, string][] = [
    ['Country of origin', countryName(d.originCountry)],
    ['Destination', countryName(d.destinationCountry)],
    ['Port of loading', s.originPort ?? 'to be confirmed'],
    ['Port of discharge', s.destinationPort ?? 'to be confirmed'],
    ['Mode', s.mode.charAt(0) + s.mode.slice(1).toLowerCase()],
    ['Incoterm', s.incoterm],
  ];
  if (d.type !== 'CERTIFICATE_OF_ORIGIN') {
    facts.push(
      ['Carrier', s.carrier ?? 'to be confirmed'],
      ['Forwarder', s.forwarder ?? 'to be confirmed'],
      [s.mode === 'AIR' ? 'Air waybill' : 'Bill of lading', s.transportDocNo ?? 'to be confirmed'],
      ['Container', s.containerNumber ?? '-'],
      ['ETD', day(s.etd)],
      ['ETA', day(s.eta)],
    );
  }
  if (d.type === 'PACKING_LIST' || d.type === 'BILL_OF_LADING') {
    facts.push(
      ['Cartons', s.cartons?.toLocaleString('en-US') ?? 'to be confirmed'],
      [
        'Gross weight',
        s.grossWeightKg ? `${s.grossWeightKg.toLocaleString('en-US')} kg` : 'to be confirmed',
      ],
    );
  }
  for (let i = 0; i < facts.length; i += 2) {
    ensure(28);
    for (const [j, fact] of facts.slice(i, i + 2).entries()) {
      const x = j === 0 ? M : W / 2 + 8;
      page.drawText(pdfSafe(fact[0].toUpperCase()), { x, y, size: 7, font: bold, color: MUTED });
      page.drawText(pdfSafe(fact[1]), { x, y: y - 11, size: 9.5, font: regular, color: INK });
    }
    y -= 26;
  }
  y -= 4;
  rule();
  y -= 18;

  // Goods
  const priced = d.type === 'COMMERCIAL_INVOICE';
  const cols = { desc: M, qty: 330, unit: 400, amount: W - M };
  text('DESCRIPTION OF GOODS', cols.desc, 8, bold, MUTED);
  text('QTY (PCS)', cols.qty, 8, bold, MUTED);
  if (priced) {
    text('UNIT PRICE', cols.unit, 8, bold, MUTED);
    right('AMOUNT', 8, bold, MUTED);
  }
  y -= 16;
  text(d.quantity.toLocaleString('en-US'), cols.qty);
  const total = d.unitPriceMinor * d.quantity;
  if (priced) {
    text(money(d.unitPriceMinor, d.currency), cols.unit);
    right(money(total, d.currency));
  }
  for (const line of wrap(d.description, bold, 10, 270)) {
    text(line, cols.desc, 10, bold);
    y -= 13;
  }
  text(`Marks: ${d.orderCode}`, cols.desc, 9, regular, MUTED);
  y -= 12;

  if (d.type === 'PACKING_LIST' || d.items.length > 0) {
    y -= 6;
    heading('COLOUR / SIZE');
    for (const item of d.items) {
      ensure(14);
      text(`${item.color} / ${item.size}`, M, 9);
      text(item.quantity.toLocaleString('en-US'), cols.qty, 9);
      y -= 12;
    }
  }
  y -= 6;
  rule();
  y -= 18;

  // Type-specific closing block.
  switch (d.type) {
    case 'COMMERCIAL_INVOICE':
      right(`Total ${money(total, d.currency)}`, 12, bold);
      y -= 22;
      heading('PAYMENT');
      paragraph(d.paymentTerms);
      break;
    case 'PACKING_LIST':
      paragraph(
        `${d.quantity.toLocaleString('en-US')} pieces packed in ${s.cartons?.toLocaleString('en-US') ?? 'the stated'} cartons, marked ${d.orderCode}.`,
      );
      break;
    case 'BILL_OF_LADING':
      heading('NOTIFY PARTY');
      paragraph(`${d.consignee.name}, as consignee.`);
      y -= 6;
      paragraph(
        'This is a summary for the consignee and is not negotiable. The carrier’s original bill of lading is held by GarmentGate and released to the consignee under the payment terms of the order.',
        8.5,
        MUTED,
      );
      break;
    case 'CERTIFICATE_OF_ORIGIN':
      heading('DECLARATION');
      paragraph(
        `GarmentGate, as exporter, declares that the goods described above were manufactured in ${countryName(d.originCountry)} and are of ${countryName(d.originCountry)} origin.`,
      );
      y -= 6;
      paragraph(
        'Where the importing country requires a chamber-issued certificate, GarmentGate provides it separately.',
        8.5,
        MUTED,
      );
      break;
  }

  for (const p of doc.getPages()) {
    for (const [i, line] of wrap(d.footer, regular, 7.5, W - M * 2).entries()) {
      p.drawText(line, { x: M, y: M - 10 - i * 10, size: 7.5, font: regular, color: MUTED });
    }
  }
  return Buffer.from(await doc.save());
}
