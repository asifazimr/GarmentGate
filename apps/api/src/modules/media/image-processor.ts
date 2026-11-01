import { IMAGE_RENDITION_WIDTHS } from '@garmentgate/shared';
import sharp, { type Metadata } from 'sharp';

/** Refuse decompression bombs: 50 megapixels is far beyond any phone photo. */
const MAX_INPUT_PIXELS = 50_000_000;
const ACCEPTED_FORMATS = new Set(['jpeg', 'png', 'webp']);

export interface Rendition {
  width: number;
  height: number;
  data: Buffer;
}

export interface ProcessedImage {
  /** Upright dimensions of the original. */
  width: number;
  height: number;
  renditions: Rendition[];
}

/** The input is not an image we accept; retrying will not help. */
export class InvalidImageError extends Error {}

/**
 * Turns an untrusted upload into buyer-safe WebP renditions.
 *
 * - Content is sniffed, not trusted: only real JPEG/PNG/WebP decode.
 * - EXIF orientation is applied to the pixels, then ALL metadata is dropped: EXIF (GPS, camera,
 *   owner, timestamps), XMP, IPTC and ICC profiles. Sharp writes no metadata unless asked to,
 *   and this function never asks (no withMetadata / keepExif / keepIccProfile).
 * - Never upscales; each width is capped at the original's.
 */
export async function processImage(input: Buffer): Promise<ProcessedImage> {
  let meta: Metadata;
  try {
    meta = await sharp(input, { limitInputPixels: MAX_INPUT_PIXELS }).metadata();
  } catch {
    throw new InvalidImageError('File is not a readable image');
  }
  if (!ACCEPTED_FORMATS.has(meta.format)) {
    throw new InvalidImageError(`Unsupported image format: ${meta.format}`);
  }
  // Orientations 5–8 rotate by 90°, swapping the upright width and height.
  const rotated = (meta.orientation ?? 1) >= 5;
  const width = rotated ? meta.height : meta.width;
  const height = rotated ? meta.width : meta.height;

  const base = sharp(input, { limitInputPixels: MAX_INPUT_PIXELS, failOn: 'error' })
    .rotate()
    .toColourspace('srgb');

  const renditions: Rendition[] = [];
  for (const target of IMAGE_RENDITION_WIDTHS) {
    const { data, info } = await base
      .clone()
      .resize({ width: Math.min(target, width), withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toBuffer({ resolveWithObject: true });
    renditions.push({ width: info.width, height: info.height, data });
  }
  return { width, height, renditions };
}
