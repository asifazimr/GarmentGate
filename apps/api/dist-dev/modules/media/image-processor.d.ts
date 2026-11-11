export interface Rendition {
    width: number;
    height: number;
    data: Buffer;
}
export interface ProcessedImage {
    width: number;
    height: number;
    renditions: Rendition[];
}
export declare class InvalidImageError extends Error {
}
export declare function processImage(input: Buffer): Promise<ProcessedImage>;
