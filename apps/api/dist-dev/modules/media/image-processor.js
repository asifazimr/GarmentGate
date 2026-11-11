import { IMAGE_RENDITION_WIDTHS } from '@garmentgate/shared';
import sharp from 'sharp';
const MAX_INPUT_PIXELS = 50_000_000;
const ACCEPTED_FORMATS = new Set(['jpeg', 'png', 'webp']);
export class InvalidImageError extends Error {
}
export async function processImage(input) {
    let meta;
    try {
        meta = await sharp(input, { limitInputPixels: MAX_INPUT_PIXELS }).metadata();
    }
    catch {
        throw new InvalidImageError('File is not a readable image');
    }
    if (!ACCEPTED_FORMATS.has(meta.format)) {
        throw new InvalidImageError(`Unsupported image format: ${meta.format}`);
    }
    const rotated = (meta.orientation ?? 1) >= 5;
    const width = rotated ? meta.height : meta.width;
    const height = rotated ? meta.width : meta.height;
    const base = sharp(input, { limitInputPixels: MAX_INPUT_PIXELS, failOn: 'error' })
        .rotate()
        .toColourspace('srgb');
    const renditions = [];
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
//# sourceMappingURL=image-processor.js.map