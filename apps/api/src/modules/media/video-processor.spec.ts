import { describe, expect, it } from 'vitest';
import { InvalidVideoError, sanitizeVideo } from './video-processor.js';

const box = (type: string, ...children: Buffer[]): Buffer => {
  const body = Buffer.concat(children);
  const header = Buffer.alloc(8);
  header.writeUInt32BE(8 + body.length, 0);
  header.write(type, 4, 'latin1');
  return Buffer.concat([header, body]);
};
const u32 = (...values: number[]) => {
  const b = Buffer.alloc(values.length * 4);
  values.forEach((v, i) => b.writeUInt32BE(v, i * 4));
  return b;
};
const fullBox = (type: string, ...children: Buffer[]) => box(type, u32(0), ...children);

/** A minimal file: one video track, one GPS (camm) metadata track, location + XMP metadata. */
function video(): { file: Buffer; videoSample: string } {
  const videoSample = 'VIDEOFRAMEDATA01';
  const gps = 'GPS:+40.7128-074.0060';
  const track = (handler: string, format: string, offset: number, size: number) =>
    box(
      'trak',
      box(
        'mdia',
        box('hdlr', u32(0, 0), Buffer.from(handler, 'latin1'), u32(0, 0, 0), Buffer.from('h\0')),
        box(
          'minf',
          box(
            'stbl',
            fullBox('stsd', u32(1), box(format, Buffer.alloc(8))),
            fullBox('stsz', u32(size, 1)),
            fullBox('stsc', u32(1, 1, 1, 1)),
            fullBox('stco', u32(1, offset)),
          ),
        ),
      ),
      box('udta', box('©nam', Buffer.from('Rafiq iPhone'))),
    );

  const ftyp = box('ftyp', Buffer.from('isom'), u32(0), Buffer.from('isommp41'));
  const mdatPayload = Buffer.from(videoSample + gps, 'latin1');
  const mdatStart = ftyp.length + 8;
  const moovFor = (vOffset: number, gOffset: number) =>
    box(
      'moov',
      fullBox('mvhd', Buffer.alloc(96)),
      track('vide', 'avc1', vOffset, videoSample.length),
      track('meta', 'camm', gOffset, gps.length),
      box(
        'udta',
        box('©xyz', Buffer.from('+40.7128-074.0060/')),
        box('©mak', Buffer.from('Apple')),
      ),
      box(
        'meta',
        u32(0),
        box('ilst', Buffer.from('com.apple.quicktime.location.ISO6709 +40.7128')),
      ),
    );
  const mdat = box('mdat', mdatPayload);
  const xmp = box(
    'uuid',
    Buffer.from('BE7ACFCB97A942E89C71999491E3AFAC', 'hex'),
    Buffer.from('<x:xmpmeta>Meghna Knit</x:xmpmeta>'),
  );
  const file = Buffer.concat([ftyp, mdat, moovFor(mdatStart, mdatStart + videoSample.length), xmp]);
  return { file, videoSample };
}

describe('sanitizeVideo', () => {
  it('starts from a file that really leaks (control)', () => {
    const text = video().file.toString('latin1');
    for (const s of ['+40.7128', 'Rafiq iPhone', 'Apple', 'Meghna Knit', 'GPS:'])
      expect(text).toContain(s);
  });

  it('removes location, device, owner and XMP metadata and zeroes the GPS track', () => {
    const { file, videoSample } = video();
    const out = sanitizeVideo(file);
    const text = out.toString('latin1');
    for (const s of [
      '+40.7128',
      '074.0060',
      'Rafiq iPhone',
      'Apple',
      'Meghna Knit',
      'GPS:',
      'ISO6709',
    ]) {
      expect(text).not.toContain(s);
    }
    expect(text).toContain(videoSample); // video samples untouched
    expect(out.length).toBe(file.length); // nothing moved
    expect(text).toContain('free');
  });

  it('does not modify its input', () => {
    const { file } = video();
    const copy = Buffer.from(file);
    sanitizeVideo(file);
    expect(file.equals(copy)).toBe(true);
  });

  it('refuses things that are not MP4/MOV', () => {
    expect(() => sanitizeVideo(Buffer.from('not a video at all'))).toThrow(InvalidVideoError);
    expect(() => sanitizeVideo(box('ftyp', Buffer.from('isom')))).toThrow(InvalidVideoError);
    const truncated = Buffer.concat([
      box('ftyp', Buffer.from('isom')),
      u32(9999),
      Buffer.from('moov'),
    ]);
    expect(() => sanitizeVideo(truncated)).toThrow(InvalidVideoError);
  });
});
