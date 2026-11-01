import {
  PDFArray,
  PDFDict,
  PDFDocument,
  PDFHexString,
  PDFName,
  type PDFObject,
  PDFRawStream,
  PDFStream,
  PDFString,
  StandardFonts,
} from 'pdf-lib';
import { describe, expect, it } from 'vitest';
import { InvalidDocumentError, sanitizePdf } from './document-processor.js';

const SECRETS = ['Zephyrine Apparel', 'Morwenna Stroud', 'zephyrine.example', 'Secret Brand Book'];

/** A tech pack the way design tools leave them: full of identity. */
async function leakyPdf(): Promise<Buffer> {
  const doc = await PDFDocument.create();
  doc.setTitle('Secret Brand Book');
  doc.setAuthor('Morwenna Stroud');
  doc.setCreator('Zephyrine Apparel design team');
  doc.setProducer('Zephyrine Apparel PDF');
  doc.setKeywords(['Zephyrine Apparel']);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([595, 842]);
  page.drawText('Hoodie spec: 340 GSM, rib cuffs', { x: 50, y: 780, size: 14, font });
  doc.addPage([595, 842]);

  const xmp = doc.context.stream(
    `<x:xmpmeta><dc:creator>Morwenna Stroud</dc:creator><xmp:CreatorTool>Zephyrine Apparel</xmp:CreatorTool></x:xmpmeta>`,
    { Type: 'Metadata', Subtype: 'XML' },
  );
  const xmpRef = doc.context.register(xmp);
  doc.catalog.set(PDFName.of('Metadata'), xmpRef);
  page.node.set(PDFName.of('Metadata'), xmpRef);

  const link = doc.context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [50, 700, 200, 720],
    A: { S: 'URI', URI: PDFString.of('https://zephyrine.example/contact') },
  });
  const comment = doc.context.obj({
    Type: 'Annot',
    Subtype: 'Text',
    Rect: [50, 600, 70, 620],
    T: PDFHexString.fromText('Morwenna Stroud'),
    Contents: PDFHexString.fromText('Ask Zephyrine Apparel about trims'),
  });
  page.node.set(
    PDFName.of('Annots'),
    doc.context.obj([doc.context.register(link), doc.context.register(comment)]),
  );
  doc.catalog.set(
    PDFName.of('OpenAction'),
    doc.context.obj({ S: 'JavaScript', JS: PDFString.of('app.alert("Zephyrine Apparel")') }),
  );
  await doc.attach(Buffer.from('Morwenna Stroud, Zephyrine Apparel'), 'contacts.txt', {
    mimeType: 'text/plain',
    description: 'Secret Brand Book contacts',
  });
  return Buffer.from(await doc.save({ useObjectStreams: false }));
}

/** Every string and stream body in the file, decoded. */
async function allText(data: Buffer): Promise<string> {
  const doc = await PDFDocument.load(data, { updateMetadata: false });
  const parts: string[] = [];
  const visit = (object: PDFObject | undefined): void => {
    if (object instanceof PDFHexString || object instanceof PDFString)
      parts.push(object.decodeText());
    else if (object instanceof PDFRawStream) {
      parts.push(Buffer.from(object.contents).toString('latin1'));
      visit(object.dict);
    } else if (object instanceof PDFStream) visit(object.dict);
    else if (object instanceof PDFDict) for (const [, v] of object.entries()) visit(v);
    else if (object instanceof PDFArray) for (const v of object.asArray()) visit(v);
  };
  for (const [, object] of doc.context.enumerateIndirectObjects()) visit(object);
  visit(doc.context.trailerInfo.Info);
  return parts.join('\n');
}

describe('sanitizePdf', () => {
  it('starts from a PDF that really leaks (control)', async () => {
    const text = await allText(await leakyPdf());
    for (const secret of SECRETS) expect(text).toContain(secret);
  });

  it('removes info, XMP, annotations, scripts and embedded files', async () => {
    const { data, pages } = await sanitizePdf(await leakyPdf());
    expect(pages).toBe(2);
    const text = await allText(data);
    for (const secret of SECRETS) expect(text).not.toContain(secret);
    expect(data.toString('latin1')).not.toMatch(/Zephyrine|Morwenna|JavaScript|EmbeddedFile/);

    const doc = await PDFDocument.load(data, { updateMetadata: false });
    expect(doc.getTitle()).toBeUndefined();
    expect(doc.getAuthor()).toBeUndefined();
    expect(doc.getProducer()).toBeUndefined();
    for (const key of ['Metadata', 'Names', 'OpenAction', 'AcroForm']) {
      expect(doc.catalog.get(PDFName.of(key))).toBeUndefined();
    }
    for (const page of doc.getPages()) {
      expect(page.node.get(PDFName.of('Annots'))).toBeUndefined();
      expect(page.node.get(PDFName.of('Metadata'))).toBeUndefined();
    }
  });

  it('keeps the visible page content', async () => {
    const { data } = await sanitizePdf(await leakyPdf());
    const doc = await PDFDocument.load(data);
    expect(doc.getPage(0).getSize()).toEqual({ width: 595, height: 842 });
  });

  it('refuses things that are not PDFs', async () => {
    await expect(sanitizePdf(Buffer.from('<html>%PDF-</html>'))).rejects.toBeInstanceOf(
      InvalidDocumentError,
    );
    await expect(sanitizePdf(Buffer.from('%PDF-1.7 garbage'))).rejects.toBeInstanceOf(
      InvalidDocumentError,
    );
  });
});
