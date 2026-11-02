import { describe, expect, it } from 'vitest';
import { matchesSignature } from './file-signature.js';

const hex = (s: string) => Buffer.from(s.replaceAll(' ', ''), 'hex');

describe('matchesSignature', () => {
  it('recognises each accepted type', () => {
    expect(matchesSignature('application/pdf', Buffer.from('%PDF-1.7\n'))).toBe(true);
    expect(matchesSignature('image/jpeg', hex('ffd8ffe000104a464946'))).toBe(true);
    expect(matchesSignature('image/png', hex('89504e470d0a1a0a0000'))).toBe(true);
    expect(
      matchesSignature('image/webp', Buffer.from('RIFF\x24\x00\x00\x00WEBPVP8 ', 'latin1')),
    ).toBe(true);
    expect(matchesSignature('video/mp4', Buffer.from('\x00\x00\x00\x18ftypmp42', 'latin1'))).toBe(
      true,
    );
    expect(
      matchesSignature('video/quicktime', Buffer.from('\x00\x00\x00\x14ftypqt  ', 'latin1')),
    ).toBe(true);
  });

  it('rejects content that does not match its declared type', () => {
    const exe = Buffer.from('MZ\x90\x00\x03\x00\x00\x00', 'latin1');
    expect(matchesSignature('application/pdf', exe)).toBe(false);
    expect(matchesSignature('image/png', Buffer.from('%PDF-1.7'))).toBe(false);
    expect(matchesSignature('image/jpeg', Buffer.from('<svg xmlns'))).toBe(false);
  });

  it('rejects unknown types and empty files', () => {
    expect(matchesSignature('image/svg+xml', Buffer.from('<svg'))).toBe(false);
    expect(matchesSignature('application/pdf', Buffer.alloc(0))).toBe(false);
  });
});
