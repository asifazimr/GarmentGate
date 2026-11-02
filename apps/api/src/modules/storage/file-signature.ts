/**
 * Checks an upload's first bytes against the type it was declared as. The browser's declared
 * Content-Type is only a claim: an executable renamed to .pdf must not be stored as a PDF.
 */
const SIGNATURES: Record<string, (b: Buffer) => boolean> = {
  'application/pdf': (b) => b.subarray(0, 5).toString('latin1') === '%PDF-',
  'image/jpeg': (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  'image/png': (b) =>
    b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  'image/webp': (b) =>
    b.subarray(0, 4).toString('latin1') === 'RIFF' &&
    b.subarray(8, 12).toString('latin1') === 'WEBP',
  // ISO base media (MP4 / QuickTime): a box whose type is "ftyp" (or a QuickTime atom).
  'video/mp4': (b) => b.subarray(4, 8).toString('latin1') === 'ftyp',
  'video/quicktime': (b) =>
    ['ftyp', 'moov', 'mdat', 'wide', 'free'].includes(b.subarray(4, 8).toString('latin1')),
};

/** Bytes to read from the start of an object to decide. */
export const SIGNATURE_BYTES = 16;

export function matchesSignature(contentType: string, head: Buffer): boolean {
  const check = SIGNATURES[contentType];
  return check !== undefined && head.length >= 4 && check(head);
}
