import { filterContactDetails } from '@garmentgate/shared';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { describe, expect, it } from 'vitest';
import { WARNING_THRESHOLDS, warningLevelFor } from './chat-moderation.service.js';
import { pdfText } from './chat-scan.processor.js';

describe('warningLevelFor', () => {
  it('escalates with repeated attempts', () => {
    expect(warningLevelFor(0)).toBeNull();
    expect(warningLevelFor(WARNING_THRESHOLDS.WARNING - 1)).toBeNull();
    expect(warningLevelFor(WARNING_THRESHOLDS.WARNING)).toBe('WARNING');
    expect(warningLevelFor(WARNING_THRESHOLDS.FINAL_WARNING - 1)).toBe('WARNING');
    expect(warningLevelFor(WARNING_THRESHOLDS.FINAL_WARNING)).toBe('FINAL_WARNING');
    expect(warningLevelFor(50)).toBe('FINAL_WARNING');
  });
});

describe('pdfText', () => {
  it('reads the text layer of every page, so contact details in a PDF are caught', async () => {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    doc.addPage().drawText('Hoodie spec sheet, 340 GSM', { x: 50, y: 700, size: 12, font });
    doc.addPage().drawText('Contact: sales at knitco dot com', { x: 50, y: 60, size: 9, font });
    const text = await pdfText(new Uint8Array(await doc.save()));
    expect(text).toContain('340 GSM');
    expect(filterContactDetails(text).flagged).toBe(true);
  });

  it('finds nothing to flag in a clean spec sheet', async () => {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    doc
      .addPage()
      .drawText('Rib cuffs 2x2, 6000 pcs, delivery 2027-02-15', { x: 50, y: 700, size: 12, font });
    expect(filterContactDetails(await pdfText(new Uint8Array(await doc.save()))).flagged).toBe(
      false,
    );
  });
});
