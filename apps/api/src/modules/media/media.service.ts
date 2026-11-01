import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { IMAGE_RENDITION_WIDTHS, type ImageUrls } from '@garmentgate/shared';
import type { Queue } from 'bullmq';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { IMAGE_URL_EXPIRES_SECONDS, StorageService } from '../storage/storage.service.js';
import { MEDIA_QUEUE, type MediaJob } from './media.constants.js';

export const fileWithRenditions = {
  include: { renditions: { orderBy: { width: 'asc' } } },
} satisfies Prisma.FileAssetDefaultArgs;
export type FileWithRenditions = Prisma.FileAssetGetPayload<typeof fileWithRenditions>;

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
    @InjectQueue(MEDIA_QUEUE) private readonly queue: Queue<MediaJob>,
  ) {}

  /** Marks an uploaded image or PDF for processing and queues it (idempotent per file). */
  async enqueue(fileId: string): Promise<void> {
    await this.prisma.fileAsset.update({
      where: { id: fileId },
      data: { processingStatus: 'PENDING', processingError: null },
    });
    try {
      await this.queue.add(
        'process-file',
        { fileId },
        {
          jobId: `image-${fileId}`,
          attempts: 3,
          backoff: { type: 'exponential', delay: 2_000 },
          removeOnComplete: 500,
          removeOnFail: 1_000,
        },
      );
    } catch (error) {
      this.logger.error({ err: error, fileId }, 'Failed to enqueue image processing');
    }
  }

  /**
   * Signed links to the processed renditions. Never the original: only metadata-free
   * renditions are ever handed to a browser. Null until processing has finished.
   */
  async urls(file: FileWithRenditions): Promise<ImageUrls | null> {
    if (file.processingStatus !== 'READY' || file.renditions.length === 0) return null;
    const byWidth = (target: number) => {
      const exact = file.renditions.find((r) => r.width === target);
      // Small originals are never upscaled, so fall back to the largest available.
      return exact ?? file.renditions[file.renditions.length - 1];
    };
    const [thumb, medium, large] = IMAGE_RENDITION_WIDTHS.map(byWidth);
    if (!thumb || !medium || !large) return null;
    const sign = (key: string) =>
      this.storage.presignDownload(key, undefined, IMAGE_URL_EXPIRES_SECONDS);
    const [t, m, l] = await Promise.all([
      sign(thumb.storageKey),
      sign(medium.storageKey),
      sign(large.storageKey),
    ]);
    return {
      thumb: t,
      medium: m,
      large: l,
      width: file.width ?? large.width,
      height: file.height ?? large.height,
    };
  }

  /** Signed link to a sanitized video (metadata stripped); null until processed. */
  async videoUrl(file: {
    processingStatus: string | null;
    sanitizedKey: string | null;
  }): Promise<string | null> {
    if (file.processingStatus !== 'READY' || !file.sanitizedKey) return null;
    return this.storage.presignDownload(file.sanitizedKey, undefined, IMAGE_URL_EXPIRES_SECONDS);
  }

  /** Resolves URLs for many files at once, keyed by file id. */
  async urlMap(files: FileWithRenditions[]): Promise<Map<string, ImageUrls>> {
    const entries = await Promise.all(files.map(async (f) => [f.id, await this.urls(f)] as const));
    return new Map(entries.filter((e): e is [string, ImageUrls] => e[1] !== null));
  }
}
