var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MediaProcessor_1;
import { Processor } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { UnrecoverableError } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service.js';
import { StorageService } from '../storage/storage.service.js';
import { InvalidDocumentError, sanitizePdf } from './document-processor.js';
import { InvalidImageError, processImage } from './image-processor.js';
import { InvalidVideoError, sanitizeVideo } from './video-processor.js';
import { MEDIA_QUEUE } from './media.constants.js';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
let MediaProcessor = MediaProcessor_1 = class MediaProcessor extends MonitoredWorker {
    prisma;
    storage;
    logger = new Logger(MediaProcessor_1.name);
    constructor(prisma, storage) {
        super();
        this.prisma = prisma;
        this.storage = storage;
    }
    async process(job) {
        const file = await this.prisma.fileAsset.findUnique({ where: { id: job.data.fileId } });
        if (file?.status !== 'UPLOADED')
            return;
        await this.prisma.fileAsset.update({
            where: { id: file.id },
            data: { processingStatus: 'PROCESSING' },
        });
        try {
            const original = await this.storage.getObject(file.storageKey);
            const video = file.mimeType.startsWith('video/');
            if (file.mimeType === 'application/pdf' || video) {
                const data = video ? sanitizeVideo(original) : (await sanitizePdf(original)).data;
                const sanitizedKey = `sanitized/${file.id}.${video ? (file.mimeType === 'video/quicktime' ? 'mov' : 'mp4') : 'pdf'}`;
                await this.storage.putObject(sanitizedKey, data, file.mimeType);
                await this.prisma.fileAsset.update({
                    where: { id: file.id },
                    data: {
                        processingStatus: 'READY',
                        processingError: null,
                        processedAt: new Date(),
                        sanitizedKey,
                    },
                });
                this.logger.log(`Sanitized ${video ? 'video' : 'document'} ${file.id}`);
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
                    },
                }),
            ]);
            this.logger.log(`Processed image ${file.id} into ${renditions.length} renditions`);
        }
        catch (error) {
            const finalAttempt = job.attemptsMade + 1 >= (job.opts.attempts ?? 1);
            const invalid = error instanceof InvalidImageError ||
                error instanceof InvalidDocumentError ||
                error instanceof InvalidVideoError;
            if (invalid || finalAttempt) {
                await this.prisma.fileAsset.update({
                    where: { id: file.id },
                    data: {
                        processingStatus: 'FAILED',
                        processingError: error instanceof Error ? error.message.slice(0, 300) : 'Unknown error',
                    },
                });
            }
            if (invalid)
                throw new UnrecoverableError(error instanceof Error ? error.message : 'Invalid file');
            throw error;
        }
    }
};
MediaProcessor = MediaProcessor_1 = __decorate([
    Processor(MEDIA_QUEUE, { concurrency: 2 }),
    __metadata("design:paramtypes", [PrismaService,
        StorageService])
], MediaProcessor);
export { MediaProcessor };
//# sourceMappingURL=media.processor.js.map