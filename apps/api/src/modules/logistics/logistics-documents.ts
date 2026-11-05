import { PDFDocument, type PDFFont, type PDFPage, rgb, StandardFonts } from 'pdf-lib';
import { pdfSafe, type PoParty } from '../orders/purchase-order.js';

/**
 * PDFs GarmentGate issues for logistics. Callers choose the parties: GarmentGate is the shipper,
 * partner-facing papers consign "to order of GarmentGate", and the factory's labels point to a
 * hub only, so no document names the other side.
 */

export interface DocumentTable {
  headers: string[];
  /** Relative column widths; the first column takes the rest of the line. */
  widths: number[];
  rows: string[][];
  totals?: string[];
}

export interface DocumentData {
  title: string;
  number: string;
  issuedAt: Date;
  references: string[];
  parties: PoParty[];
  details: [string, string][];
  table?: DocumentTable;
  notes: string[];
}

const INK = rgb(0.09, 0.13, 0.18);
const MUTED = rgb(0.42, 0.47, 0.53);
const LINE = rgb(0.85, 0.87, 0.9);
const BRAND = rgb(0.04, 0.37, 0.35);
const W = 595;
const H = 842;
const M = 48;

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

async function start(title: string) {
  const doc = await PDFDocument.create();
  doc.setTitle(title);
  doc.setCreator('GarmentGate');
  doc.setProducer('GarmentGate');
  // No author, subject or keywords: nothing identifying in the metadata.
  return {
    doc,
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };
}

export async function renderLogisticsDocument(d: DocumentData): Promise<Buffer> {
  const { doc, regular, bold } = await start(`${d.title} ${d.number}`);
  let page: PDFPage = doc.addPage([W, H]);
  let y = H - M;
  const text = (s: string, x: number, size = 10, font = regular, color = INK) => {
    page.drawText(pdfSafe(s), { x, y, size, font, color });
  };
  const right = (s: string, size = 10, font = regular, color = INK, edge = W - M) => {
    page.drawText(pdfSafe(s), {
      x: edge - font.widthOfTextAtSize(pdfSafe(s), size),
      y,
      size,
      font,
      color,
    });
  };
  const ensure = (needed: number) => {
    if (y - needed < M + 30) {
      page = doc.addPage([W, H]);
      y = H - M;
    }
  };
  const rule = () => {
    page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.6, color: LINE });
  };

  text('GarmentGate', M, 16, bold, BRAND);
  right(d.title, 14, bold);
  y -= 22;
  for (const line of [
    `No. ${d.number}`,
    ...d.references,
    `Date ${d.issuedAt.toISOString().slice(0, 10)}`,
  ]) {
    right(line, 9, regular, MUTED);
    y -= 12;
  }
  y -= 6;
  rule();
  y -= 18;

  // Parties, two per row.
  const colW = (W - M * 2 - 20) / 2;
  for (let i = 0; i < d.parties.length; i += 2) {
    const row = d.parties.slice(i, i + 2);
    const heights = row.map(
      (p) => 14 + 12 + p.lines.flatMap((l) => wrap(l, regular, 9, colW)).length * 11,
    );
    ensure(Math.max(...heights));
    const top = y;
    row.forEach((p, c) => {
      y = top;
      const x = M + c * (colW + 20);
      text(p.role.toUpperCase(), x, 8, bold, MUTED);
      y -= 14;
      text(p.name, x, 10, bold);
      y -= 12;
      for (const l of p.lines.flatMap((line) => wrap(line, regular, 9, colW))) {
        text(l, x, 9);
        y -= 11;
      }
    });
    y = top - Math.max(...heights) - 8;
  }
  rule();
  y -= 16;

  // Details: label / value pairs in two columns.
  for (let i = 0; i < d.details.length; i += 2) {
    ensure(14);
    d.details.slice(i, i + 2).forEach(([label, value], c) => {
      const x = M + c * (colW + 20);
      text(label, x, 8, bold, MUTED);
      text(value, x + 110, 9);
    });
    y -= 14;
  }

  if (d.table) {
    const t = d.table;
    y -= 8;
    const total = t.widths.reduce((a, b) => a + b, 0);
    const xs: number[] = [];
    let x = M;
    for (const w of t.widths) {
      xs.push(x);
      x += ((W - M * 2) * w) / total;
    }
    const edge = (i: number) => (i + 1 < xs.length ? (xs[i + 1] ?? W - M) - 6 : W - M);
    const row = (cells: string[], font: PDFFont, size: number, color = INK) => {
      ensure(14);
      cells.forEach((cell, i) => {
        if (i === 0) text(cell, xs[0] ?? M, size, font, color);
        else right(cell, size, font, color, edge(i));
      });
      y -= 14;
    };
    rule();
    y -= 12;
    row(t.headers, bold, 8, MUTED);
    for (const r of t.rows) row(r, regular, 9);
    if (t.totals) {
      rule();
      y -= 12;
      row(t.totals, bold, 9);
    }
  }

  y -= 10;
  for (const note of d.notes)
    for (const line of wrap(note, regular, 8, W - M * 2)) {
      ensure(11);
      text(line, M, 8, regular, MUTED);
      y -= 11;
    }
  return Buffer.from(await doc.save());
}

export interface CartonMarkingData {
  /** The order (factory labels) or the shipment (relabelled at the hub). */
  reference: string;
  referenceLabel?: 'ORDER' | 'SHIPMENT';
  /** "DELIVER TO" a hub (factory labels) or "DESTINATION" (shipment labels). */
  heading?: string;
  /** Where the factory delivers: always a GarmentGate hub. */
  hub: { code: string; name: string; lines: string[] };
  cartons: number;
  piecesPerCarton: number | null;
  grossWeightGramsPerCarton: number | null;
  originCountry: string;
}

/** One label per carton, four to an A4 page: GarmentGate, the hub, the order and the count. */
export async function renderCartonMarkings(d: CartonMarkingData): Promise<Buffer> {
  const { doc, regular, bold } = await start(`Carton markings ${d.reference}`);
  const cellW = (W - M * 2) / 2;
  const cellH = (H - M * 2) / 2;
  let page: PDFPage | null = null;
  for (let i = 0; i < d.cartons; i += 1) {
    const slot = i % 4;
    if (slot === 0) page = doc.addPage([W, H]);
    if (!page) continue;
    const p = page;
    const x0 = M + (slot % 2) * cellW;
    const top = H - M - Math.floor(slot / 2) * cellH;
    p.drawRectangle({
      x: x0 + 6,
      y: top - cellH + 6,
      width: cellW - 12,
      height: cellH - 12,
      borderColor: INK,
      borderWidth: 1,
    });
    let y = top - 34;
    const line = (s: string, size: number, font = regular, color = INK) => {
      p.drawText(pdfSafe(s), { x: x0 + 20, y, size, font, color });
      y -= size + 8;
    };
    line('GarmentGate', 18, bold, BRAND);
    line(d.heading ?? 'DELIVER TO', 8, bold, MUTED);
    line(`${d.hub.code} ${d.hub.name}`, 11, bold);
    for (const l of d.hub.lines) line(l, 9);
    y -= 6;
    line(`${d.referenceLabel ?? 'ORDER'} ${d.reference}`, 13, bold);
    line(`CARTON ${String(i + 1)} OF ${String(d.cartons)}`, 16, bold);
    if (d.piecesPerCarton) line(`PCS ${String(d.piecesPerCarton)}`, 11);
    if (d.grossWeightGramsPerCarton)
      line(`G.W. ${(d.grossWeightGramsPerCarton / 1000).toFixed(1)} KG`, 11);
    line(`MADE IN ${countryName(d.originCountry).toUpperCase()}`, 10, bold);
  }
  return Buffer.from(await doc.save());
}

export interface ShippingLabelData {
  shipmentCode: string;
  shipper: PoParty;
  /** Partner-facing: "to order of GarmentGate", never the buyer. */
  consignee: PoParty;
  destination: string;
  mode: string;
  cartons: number;
  grossWeightGrams: number;
  originHub: string | null;
}

export async function renderShippingLabel(d: ShippingLabelData): Promise<Buffer> {
  const { doc, regular, bold } = await start(`Shipping label ${d.shipmentCode}`);
  const page = doc.addPage([W, H / 2]);
  let y = H / 2 - M;
  const line = (s: string, size: number, font = regular, color = INK) => {
    page.drawText(pdfSafe(s), { x: M, y, size, font, color });
    y -= size + 8;
  };
  line('GarmentGate', 20, bold, BRAND);
  line(d.shipmentCode, 28, bold);
  line(
    `${d.mode} · ${String(d.cartons)} CARTONS · ${(d.grossWeightGrams / 1000).toFixed(1)} KG`,
    11,
  );
  if (d.originHub) line(`FROM ${d.originHub}`, 11);
  line(`TO ${d.destination}`, 14, bold);
  for (const party of [d.shipper, d.consignee]) {
    y -= 4;
    line(party.role.toUpperCase(), 8, bold, MUTED);
    line(party.name, 10, bold);
    for (const l of party.lines) line(l, 9);
  }
  return Buffer.from(await doc.save());
}

export const countryName = (code: string): string =>
  new Intl.DisplayNames('en', { type: 'region' }).of(code) ?? code;
