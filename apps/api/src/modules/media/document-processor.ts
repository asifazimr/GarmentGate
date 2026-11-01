import {
  EncryptedPDFError,
  PDFArray,
  PDFDict,
  PDFDocument,
  PDFName,
  type PDFObject,
  PDFRef,
  PDFStream,
} from 'pdf-lib';

/** The input is not a PDF we accept; retrying will not help. */
export class InvalidDocumentError extends Error {}

/** Catalog entries that carry identity or active content. */
const CATALOG_KEYS = [
  'Metadata', // XMP: author, company, software, edit history
  'PieceInfo', // application private data (e.g. Illustrator)
  'Names', // embedded files, JavaScript, named destinations
  'OpenAction', // scripts or links run on open
  'AA', // additional actions
  'AcroForm', // form fields and their values
  'SpiderInfo', // source URLs of web captures
  'Perms',
  'Threads',
  'AF', // associated (embedded) files, PDF 2.0
] as const;
/** Page and object entries removed everywhere. */
const OBJECT_KEYS = ['Metadata', 'PieceInfo', 'AA', 'Annots', 'AF'] as const;

export interface SanitizedDocument {
  data: Buffer;
  pages: number;
}

/**
 * Makes an uploaded PDF safe to hand to the other side.
 *
 * - Content is sniffed: it must start with `%PDF-` and parse; encrypted files are refused.
 * - Drops the document-info dictionary (Title, Author, Creator, Producer, dates…), XMP metadata
 *   on the catalog and on every object (pages, images, fonts), application data, embedded
 *   files, JavaScript and actions, form fields, and all annotations (comments carry author
 *   names; links carry URLs).
 * - Then garbage-collects: anything no longer reachable from the catalog is deleted, so old
 *   revisions and removed objects don't survive in the file.
 *
 * Visible page content is untouched: admins review it before the other side sees it.
 */
export async function sanitizePdf(input: Buffer): Promise<SanitizedDocument> {
  if (input.subarray(0, 5).toString('latin1') !== '%PDF-') {
    throw new InvalidDocumentError('File is not a PDF');
  }
  let doc: PDFDocument;
  try {
    doc = await PDFDocument.load(input, { updateMetadata: false, throwOnInvalidObject: false });
  } catch (error) {
    if (error instanceof EncryptedPDFError) {
      throw new InvalidDocumentError('Password-protected PDFs are not supported');
    }
    throw new InvalidDocumentError('File is not a readable PDF');
  }

  try {
    return await strip(doc);
  } catch (error) {
    if (error instanceof InvalidDocumentError) throw error;
    throw new InvalidDocumentError('File is not a readable PDF');
  }
}

async function strip(doc: PDFDocument): Promise<SanitizedDocument> {
  const { context } = doc;
  context.trailerInfo.Info = undefined;
  context.trailerInfo.Encrypt = undefined;
  for (const key of CATALOG_KEYS) doc.catalog.delete(PDFName.of(key));
  for (const [, object] of context.enumerateIndirectObjects()) {
    const dict =
      object instanceof PDFStream ? object.dict : object instanceof PDFDict ? object : null;
    if (!dict) continue;
    for (const key of OBJECT_KEYS) dict.delete(PDFName.of(key));
  }
  collectGarbage(doc);

  const pages = doc.getPageCount();
  if (pages === 0) throw new InvalidDocumentError('The PDF has no pages');
  // No object streams: keeps the output simple and inspectable.
  const data = await doc.save({
    useObjectStreams: false,
    addDefaultPage: false,
    updateFieldAppearances: false,
  });
  return { data: Buffer.from(data), pages };
}

/** Deletes every indirect object not reachable from the document catalog. */
function collectGarbage(doc: PDFDocument): void {
  const { context } = doc;
  const reachable = new Set<string>();
  const stack: PDFObject[] = context.trailerInfo.Root ? [context.trailerInfo.Root] : [];
  while (stack.length > 0) {
    const object = stack.pop();
    if (object instanceof PDFRef) {
      if (reachable.has(object.tag)) continue;
      reachable.add(object.tag);
      const target = context.lookup(object);
      if (target) stack.push(target);
    } else if (object instanceof PDFStream) {
      stack.push(object.dict);
    } else if (object instanceof PDFDict) {
      for (const [, value] of object.entries()) stack.push(value);
    } else if (object instanceof PDFArray) {
      stack.push(...object.asArray());
    }
  }
  for (const [ref] of context.enumerateIndirectObjects()) {
    if (!reachable.has(ref.tag)) context.delete(ref);
  }
}
