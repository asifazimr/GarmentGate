import { PDFDocument, type PDFFont, type PDFPage, rgb, StandardFonts } from 'pdf-lib';

export interface PoParty {
  /** Heading for the block, e.g. "Buyer" or "Supplier". */
  role: string;
  name: string;
  lines: string[];
}

/**
 * Everything printed on one purchase order. Built per side by the caller, so the factory's PO
 * can't contain the buyer (or the buyer's price): it's simply never given them.
 */
export interface PurchaseOrderData {
  number: string;
  orderCode: string;
  issuedAt: Date;
  /** Before the order is confirmed the PO is a draft. */
  draft: boolean;
  buyer: PoParty;
  supplier: PoParty;
  shipTo: string[];
  description: string;
  specification: string | null;
  quantity: number;
  unitPriceMinor: number;
  currency: string;
  incoterm: string;
  requestedShipDate: Date | null;
  depositBps: number;
  paymentTerms: string;
  items: { color: string; size: string; quantity: number }[];
  footer: string;
}

const INK = rgb(0.09, 0.13, 0.18);
const MUTED = rgb(0.42, 0.47, 0.53);
const LINE = rgb(0.85, 0.87, 0.9);
const BRAND = rgb(0.04, 0.37, 0.35);

/** Helvetica speaks WinAnsi: keep Latin-1 (ü, é) and €, simplify the rest (ı → i), else "?". */
export function pdfSafe(text: string): string {
  return Array.from(text)
    .map((ch) => {
      const cp = ch.codePointAt(0) ?? 0;
      if (cp === 0x20ac || (cp >= 0x20 && cp <= 0x7e) || (cp >= 0xa0 && cp <= 0xff)) return ch;
      if (ch === '\n' || ch === '\t') return ' ';
      const base = ch.normalize('NFKD').replace(/\p{M}/gu, '');
      if (base === 'ı') return 'i';
      return /^[\x20-\x7e]+$/.test(base) ? base : '?';
    })
    .join('');
}

export function money(minor: number, currency: string): string {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'code',
  });
  const digits = format.resolvedOptions().maximumFractionDigits ?? 2;
  return format.format(minor / 10 ** digits).replace(/\u00a0/g, ' ');
}

/** A company's postal address as printed lines. */
export function postalAddress(c: {
  addressLine1: string | null;
  addressLine2: string | null;
  postalCode: string | null;
  city: string | null;
  country: string;
}): string[] {
  return [
    c.addressLine1,
    c.addressLine2,
    [c.postalCode, c.city].filter(Boolean).join(' '),
    c.country,
  ].filter((x): x is string => Boolean(x));
}

const date = (d: Date) => d.toISOString().slice(0, 10);

function wrap(text: string, font: PDFFont, size: number, width: number): string[] {
  const words = pdfSafe(text).split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > width && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

export async function renderPurchaseOrder(po: PurchaseOrderData): Promise<Buffer> {
  const doc = await PDFDocument.create();
  doc.setTitle(`Purchase order ${po.number}`);
  doc.setCreator('GarmentGate');
  doc.setProducer('GarmentGate');
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const width = 595;
  const height = 842;
  const margin = 48;
  let page: PDFPage = doc.addPage([width, height]);
  let y = height - margin;

  const text = (s: string, x: number, size = 10, font = regular, color = INK) => {
    page.drawText(pdfSafe(s), { x, y, size, font, color });
  };
  const ensure = (needed: number) => {
    if (y - needed < margin + 40) {
      page = doc.addPage([width, height]);
      y = height - margin;
    }
  };
  const rule = () => {
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.6,
      color: LINE,
    });
  };

  // Header
  text('GarmentGate', margin, 16, bold, BRAND);
  page.drawText('PURCHASE ORDER', {
    x: width - margin - bold.widthOfTextAtSize('PURCHASE ORDER', 16),
    y,
    size: 16,
    font: bold,
    color: INK,
  });
  y -= 22;
  const meta = [`PO ${po.number}`, `Order ${po.orderCode}`, `Issued ${date(po.issuedAt)}`];
  for (const line of meta) {
    page.drawText(pdfSafe(line), {
      x: width - margin - regular.widthOfTextAtSize(pdfSafe(line), 9),
      y,
      size: 9,
      font: regular,
      color: MUTED,
    });
    y -= 12;
  }
  if (po.draft) {
    page.drawText('DRAFT', {
      x: 160,
      y: 380,
      size: 120,
      font: bold,
      color: rgb(0.93, 0.93, 0.95),
      opacity: 0.7,
    });
  }
  y -= 10;

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
  const left = column(po.buyer, margin, top);
  const right = column(po.supplier, width / 2 + 8, top);
  y = Math.min(left, right) - 10;
  text('SHIP TO', margin, 8, bold, MUTED);
  y -= 14;
  for (const line of po.shipTo) {
    text(line, margin, 9);
    y -= 12;
  }
  y -= 8;
  rule();
  y -= 20;

  // Line item
  const cols = { desc: margin, qty: 330, unit: 400, amount: width - margin };
  text('DESCRIPTION', cols.desc, 8, bold, MUTED);
  text('QTY', cols.qty, 8, bold, MUTED);
  text('UNIT PRICE', cols.unit, 8, bold, MUTED);
  page.drawText('AMOUNT', {
    x: cols.amount - bold.widthOfTextAtSize('AMOUNT', 8),
    y,
    size: 8,
    font: bold,
    color: MUTED,
  });
  y -= 16;
  const total = po.unitPriceMinor * po.quantity;
  const descLines = wrap(po.description, bold, 10, 270);
  text(po.quantity.toLocaleString('en-US'), cols.qty, 10);
  text(money(po.unitPriceMinor, po.currency), cols.unit, 10);
  const amount = money(total, po.currency);
  page.drawText(amount, {
    x: cols.amount - regular.widthOfTextAtSize(amount, 10),
    y,
    size: 10,
    font: regular,
    color: INK,
  });
  for (const line of descLines) {
    page.drawText(line, { x: cols.desc, y, size: 10, font: bold, color: INK });
    y -= 13;
  }
  if (po.specification) {
    for (const line of wrap(po.specification, regular, 9, 270).slice(0, 8)) {
      page.drawText(line, { x: cols.desc, y, size: 9, font: regular, color: MUTED });
      y -= 12;
    }
  }
  y -= 8;
  rule();
  y -= 18;
  const totalLabel = `Total ${money(total, po.currency)}`;
  page.drawText(totalLabel, {
    x: width - margin - bold.widthOfTextAtSize(totalLabel, 12),
    y,
    size: 12,
    font: bold,
    color: INK,
  });
  y -= 14;
  const deposit = `Deposit ${String(po.depositBps / 100)}%: ${money(Math.round((total * po.depositBps) / 10_000), po.currency)}`;
  page.drawText(deposit, {
    x: width - margin - regular.widthOfTextAtSize(deposit, 9),
    y,
    size: 9,
    font: regular,
    color: MUTED,
  });
  y -= 26;

  // Breakdown
  if (po.items.length > 0) {
    ensure(40);
    text('SIZE / COLOUR BREAKDOWN', margin, 8, bold, MUTED);
    y -= 14;
    for (const item of po.items) {
      ensure(14);
      text(`${item.color} / ${item.size}`, margin, 9);
      text(item.quantity.toLocaleString('en-US'), cols.qty, 9);
      y -= 12;
    }
    y -= 12;
  }

  // Terms
  ensure(90);
  text('TERMS', margin, 8, bold, MUTED);
  y -= 14;
  const terms = [
    `Incoterm: ${po.incoterm}`,
    `Requested ship date: ${po.requestedShipDate ? date(po.requestedShipDate) : 'to be confirmed'}`,
    `Payment: ${po.paymentTerms}`,
    'Quality: per approved sample; inspection by GarmentGate before shipment.',
  ];
  for (const term of terms) {
    for (const line of wrap(term, regular, 9, width - margin * 2)) {
      ensure(12);
      text(line, margin, 9);
      y -= 12;
    }
  }

  for (const p of doc.getPages()) {
    for (const [i, line] of wrap(po.footer, regular, 7.5, width - margin * 2).entries()) {
      p.drawText(line, {
        x: margin,
        y: margin - 10 - i * 10,
        size: 7.5,
        font: regular,
        color: MUTED,
      });
    }
  }
  return Buffer.from(await doc.save());
}
