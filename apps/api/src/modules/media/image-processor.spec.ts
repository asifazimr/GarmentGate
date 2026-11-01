import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { InvalidImageError, processImage } from './image-processor.js';

/** A JPEG carrying the kind of metadata that identifies a factory: GPS, camera, owner. */
async function jpegWithMetadata(width: number, height: number, orientation = 1): Promise<Buffer> {
  return (
    sharp({ create: { width, height, channels: 3, background: { r: 30, g: 120, b: 110 } } })
      .jpeg()
      .withExif({
        IFD0: {
          Make: 'SENTINEL-CAMERA',
          Model: 'SENTINEL-MODEL',
          Copyright: 'SENTINEL Factory Ltd',
          Artist: 'SENTINEL Owner',
        },
        IFD3: {
          GPSLatitudeRef: 'N',
          GPSLatitude: '23/1 48/1 0/1',
          GPSLongitudeRef: 'E',
          GPSLongitude: '90/1 24/1 0/1',
        },
      })
      .withIccProfile('p3')
      // Sharp only writes the orientation tag through withMetadata.
      .withMetadata({ orientation })
      .toBuffer()
  );
}

describe('processImage', () => {
  it('fixture really carries metadata (sanity check)', async () => {
    const meta = await sharp(await jpegWithMetadata(1200, 800)).metadata();
    expect(meta.exif?.toString('latin1')).toContain('SENTINEL');
    expect(meta.icc).toBeDefined();
  });

  it('strips ALL metadata from every rendition and outputs WebP', async () => {
    const result = await processImage(await jpegWithMetadata(2400, 1600));
    expect(result.renditions.map((r) => r.width)).toEqual([320, 800, 1600]);
    for (const r of result.renditions) {
      const meta = await sharp(r.data).metadata();
      expect(meta.format).toBe('webp');
      expect(meta.exif).toBeUndefined();
      expect(meta.xmp).toBeUndefined();
      expect(meta.iptc).toBeUndefined();
      expect(meta.icc).toBeUndefined();
      expect(r.data.toString('latin1')).not.toContain('SENTINEL');
    }
  });

  it('bakes EXIF orientation into the pixels before dropping it', async () => {
    // Orientation 6 = rotate 90°: a 1200×800 sensor image is upright 800×1200.
    const result = await processImage(await jpegWithMetadata(1200, 800, 6));
    expect(result).toMatchObject({ width: 800, height: 1200 });
    const largest = result.renditions.at(-1);
    expect(largest && largest.height > largest.width).toBe(true);
  });

  it('never upscales small images', async () => {
    const result = await processImage(await jpegWithMetadata(500, 300));
    expect(Math.max(...result.renditions.map((r) => r.width))).toBe(500);
  });

  it('rejects files that are not images, even with an image extension', async () => {
    await expect(processImage(Buffer.from('%PDF-1.4 not an image'))).rejects.toBeInstanceOf(
      InvalidImageError,
    );
    const gif = await sharp({ create: { width: 10, height: 10, channels: 3, background: 'red' } })
      .gif()
      .toBuffer();
    await expect(processImage(gif)).rejects.toBeInstanceOf(InvalidImageError);
  });
});
