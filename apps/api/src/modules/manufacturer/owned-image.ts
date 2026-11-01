import type { ImageUrls, OwnedImage } from '@garmentgate/shared';

interface OwnedImageSource {
  id: string;
  fileId: string;
  sortOrder: number;
  reviewStatus: OwnedImage['review'];
  reviewNote: string | null;
  caption: string | null;
  file: { processingStatus: OwnedImage['processing'] | null };
}

/** An image as its owner sees it: pipeline progress and review outcome included. */
export function toOwnedImage(
  source: OwnedImageSource,
  urls: ReadonlyMap<string, ImageUrls>,
): OwnedImage {
  return {
    id: source.id,
    processing: source.file.processingStatus ?? 'PENDING',
    review: source.reviewStatus,
    reviewNote: source.reviewNote,
    urls: urls.get(source.fileId) ?? null,
    caption: source.caption,
    sortOrder: source.sortOrder,
  };
}
