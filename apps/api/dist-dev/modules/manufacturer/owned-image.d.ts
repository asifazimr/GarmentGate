import type { ImageUrls, OwnedImage } from '@garmentgate/shared';
interface OwnedImageSource {
    id: string;
    fileId: string;
    sortOrder: number;
    reviewStatus: OwnedImage['review'];
    reviewNote: string | null;
    caption: string | null;
    file: {
        processingStatus: OwnedImage['processing'] | null;
    };
}
export declare function toOwnedImage(source: OwnedImageSource, urls: ReadonlyMap<string, ImageUrls>): OwnedImage;
export {};
