export declare class InvalidDocumentError extends Error {
}
export interface SanitizedDocument {
    data: Buffer;
    pages: number;
}
export declare function sanitizePdf(input: Buffer): Promise<SanitizedDocument>;
