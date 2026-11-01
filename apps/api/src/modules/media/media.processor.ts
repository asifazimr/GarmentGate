import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { type Job, UnrecoverableError } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service.js';
import { StorageService } from '../storage/storage.service.js';
import { InvalidDocumentError, sanitizePdf } from './document-processor.js';
import { InvalidImageError, processImage } from './image-processor.js';
import { MEDIA_QUEUE, type MediaJob } from './media.constants.js';

/**
 * Makes uploads safe to show the other side, next to the private original: images become
 * metadata-free WebP renditions, PDFs a sanitized copy (see document-processor.ts).
 */
@Processor(MEDIA_QUEUE, { concurrency: 2 })
export class MediaProcessor extends WorkerHost {
  private readonly logger = new Logger(MediaProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {
    super();
  }

  async process(job: Job<MediaJob>): Promise<void> {
    const file = await this.prisma.fileAsset.findUnique({ where: { id: job.data.fileId } });
    if (file?.status !== 'UPLOADED') return; // deleted or not uploaded: nothing to do

    await this.prisma.fileAsset.update({
      where: { id: file.id },
      data: { processingStatus: 'PROCESSING' },
    });

    try {
      const original = await this.storage.getObject(file.storageKey);
      if (file.mimeType === 'application/pdf') {
        const { data } = await sanitizePdf(original);
        const sanitizedKey = `sanitized/${file.id}.pdf`;
        await this.storage.putObject(sanitizedKey, data, 'application/pdf');
        await this.prisma.fileAsset.update({
          where: { id: file.id },
          data: {
            processingStatus: 'READY',
            processingError: null,
            processedAt: new Date(),
            sanitizedKey,
            scanStatus: 'CLEAN',
          },
        });
        this.logger.log(`Sanitized document ${file.id}`);
        return;
      }
      const result = await processImage(original);
      const renditions = [];
      for (const r of result.renditions) {
        const storageKey = `renditions/${file.id}/${r.width}.webp`;
        await this.storage.putObject(storageKey, r.data, 'image/webp');
        renditions.push({
          fileId: file.id,
          width: r.width,
          height: r.height,
          storageKey,
          sizeBytes: r.data.length,
        });
      }
      await this.prisma.$transaction([
        this.prisma.imageRendition.deleteMany({ where: { fileId: file.id } }),
        // Two target widths can collapse to the same size for small originals.
        this.prisma.imageRendition.createMany({ data: renditions, skipDuplicates: true }),
        this.prisma.fileAsset.update({
          where: { id: file.id },
          data: {
            processingStatus: 'READY',
            processingError: null,
            processedAt: new Date(),
            width: result.width,
            height: result.height,
            sanitizedKey: renditions.at(-1)?.storageKey ?? null,
            scanStatus: 'CLEAN',
          },
        }),
      ]);
      this.logger.log(`Processed image ${file.id} into ${renditions.length} renditions`);
    } catch (error) {
      const finalAttempt = job.attemptsMade + 1 >= (job.opts.attempts ?? 1);
      const invalid = error instanceof InvalidImageError || error instanceof InvalidDocumentError;
      if (invalid || finalAttempt) {
        await this.prisma.fileAsset.update({
          where: { id: file.id },
          data: {
            processingStatus: 'FAILED',
            processingError: error instanceof Error ? error.message.slice(0, 300) : 'Unknown error',
          },
        });
      }
      // Bad input never gets better: don't retry it.
      if (invalid)
        throw new UnrecoverableError(error instanceof Error ? error.message : 'Invalid file');
      throw error;
    }
  }
}
