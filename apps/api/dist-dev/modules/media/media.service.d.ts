import { type ImageUrls } from '@garmentgate/shared';
import type { Queue } from 'bullmq';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { StorageService } from '../storage/storage.service.js';
import { type MediaJob } from './media.constants.js';
export declare const fileWithRenditions: {
    include: {
        renditions: {
            orderBy: {
                width: "asc";
            };
        };
    };
};
export type FileWithRenditions = Prisma.FileAssetGetPayload<typeof fileWithRenditions>;
export declare class MediaService {
    private readonly prisma;
    private readonly storage;
    private readonly queue;
    private readonly logger;
    constructor(prisma: PrismaService, storage: StorageService, queue: Queue<MediaJob>);
    enqueue(fileId: string): Promise<void>;
    urls(file: FileWithRenditions): Promise<ImageUrls | null>;
    videoUrl(file: {
        processingStatus: string | null;
        sanitizedKey: string | null;
    }): Promise<string | null>;
    urlMap(files: FileWithRenditions[]): Promise<Map<string, ImageUrls>>;
}
