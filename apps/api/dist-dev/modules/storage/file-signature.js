const SIGNATURES = {
    'application/pdf': (b) => b.subarray(0, 5).toString('latin1') === '%PDF-',
    'image/jpeg': (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
    'image/png': (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
    'image/webp': (b) => b.subarray(0, 4).toString('latin1') === 'RIFF' &&
        b.subarray(8, 12).toString('latin1') === 'WEBP',
    'video/mp4': (b) => b.subarray(4, 8).toString('latin1') === 'ftyp',
    'video/quicktime': (b) => ['ftyp', 'moov', 'mdat', 'wide', 'free'].includes(b.subarray(4, 8).toString('latin1')),
};
export const SIGNATURE_BYTES = 16;
export function matchesSignature(contentType, head) {
    const check = SIGNATURES[contentType];
    return check !== undefined && head.length >= 4 && check(head);
}
//# sourceMappingURL=file-signature.js.map