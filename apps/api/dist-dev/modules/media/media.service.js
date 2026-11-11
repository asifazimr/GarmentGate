var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MediaService_1;
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { IMAGE_RENDITION_WIDTHS } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { IMAGE_URL_EXPIRES_SECONDS, StorageService } from '../storage/storage.service.js';
import { MEDIA_QUEUE } from './media.constants.js';
export const fileWithRenditions = {
    include: { renditions: { orderBy: { width: 'asc' } } },
};
let MediaService = MediaService_1 = class MediaService {
    prisma;
    storage;
    queue;
    logger = new Logger(MediaService_1.name);
    constructor(prisma, storage, queue) {
        this.prisma = prisma;
        this.storage = storage;
        this.queue = queue;
    }
    async enqueue(fileId) {
        await this.prisma.fileAsset.update({
            where: { id: fileId },
            data: { processingStatus: 'PENDING', processingError: null },
        });
        try {
            await this.queue.add('process-file', { fileId }, {
                jobId: `image-${fileId}`,
                attempts: 3,
                backoff: { type: 'exponential', delay: 2_000 },
                removeOnComplete: 500,
                removeOnFail: 1_000,
            });
        }
        catch (error) {
            this.logger.error({ err: error, fileId }, 'Failed to enqueue image processing');
        }
    }
    async urls(file) {
        if (file.processingStatus !== 'READY' || file.renditions.length === 0)
            return null;
        const byWidth = (target) => {
            const exact = file.renditions.find((r) => r.width === target);
            return exact ?? file.renditions[file.renditions.length - 1];
        };
        const [thumb, medium, large] = IMAGE_RENDITION_WIDTHS.map(byWidth);
        if (!thumb || !medium || !large)
            return null;
        const sign = (key) => this.storage.presignDownload(key, undefined, IMAGE_URL_EXPIRES_SECONDS);
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
    async videoUrl(file) {
        if (file.processingStatus !== 'READY' || !file.sanitizedKey)
            return null;
        return this.storage.presignDownload(file.sanitizedKey, undefined, IMAGE_URL_EXPIRES_SECONDS);
    }
    async urlMap(files) {
        const entries = await Promise.all(files.map(async (f) => [f.id, await this.urls(f)]));
        return new Map(entries.filter((e) => e[1] !== null));
    }
};
MediaService = MediaService_1 = __decorate([
    Injectable(),
    __param(2, InjectQueue(MEDIA_QUEUE)),
    __metadata("design:paramtypes", [PrismaService,
        StorageService, Function])
], MediaService);
export { MediaService };
//# sourceMappingURL=media.service.js.map