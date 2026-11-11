import { Readable } from 'node:stream';
import { ConfigService } from '@nestjs/config';
import type { Env } from '../../config/env.schema.js';
export interface PresignedUpload {
    url: string;
    fields: Record<string, string>;
    expiresAt: Date;
}
export declare const IMAGE_URL_EXPIRES_SECONDS: number;
export declare class StorageService {
    readonly bucket: string;
    private readonly client;
    constructor(config: ConfigService<Env, true>);
    presignUpload(key: string, contentType: string, maxBytes: number): Promise<PresignedUpload>;
    head(key: string): Promise<{
        sizeBytes: number;
        contentType: string | undefined;
    } | null>;
    getStart(key: string, bytes: number): Promise<Buffer>;
    getStream(key: string): Promise<Readable>;
    getObject(key: string): Promise<Buffer>;
    putObject(key: string, body: Buffer, contentType: string): Promise<void>;
    presignDownload(key: string, downloadName?: string, expiresIn?: number): Promise<string>;
    delete(key: string): Promise<void>;
}
