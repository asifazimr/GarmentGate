var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { fileWithRenditions, MediaService } from '../media/media.service.js';
import { StorageService } from '../storage/storage.service.js';
export const attachmentInclude = {
    file: fileWithRenditions,
};
const KIND_SLUG = {
    TECH_PACK: 'tech-pack',
    REFERENCE_IMAGE: 'reference',
    SIZE_CHART: 'size-chart',
    OTHER: 'file',
};
export const visibleToFactories = (a) => a.reviewStatus === 'APPROVED' && a.file.processingStatus === 'READY';
let RfqFilesService = class RfqFilesService {
    storage;
    media;
    constructor(storage, media) {
        this.storage = storage;
        this.media = media;
    }
    async views(rows, audience) {
        const shown = audience.kind === 'factory' ? rows.filter(visibleToFactories) : rows;
        const sorted = [...shown].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        return Promise.all(sorted.map(async (a, index) => {
            const ext = a.file.mimeType === 'application/pdf' ? 'pdf' : 'webp';
            const fileName = audience.kind === 'owner'
                ? a.file.originalFilename
                : `${audience.rfqCode}-${KIND_SLUG[a.kind]}-${String(index + 1)}.${ext}`;
            const links = await this.links(a, fileName);
            return {
                id: a.id,
                kind: a.kind,
                fileName,
                contentType: a.file.mimeType,
                sizeBytes: a.file.sizeBytes,
                processing: a.file.processingStatus ?? 'PENDING',
                review: a.reviewStatus,
                ...links,
            };
        }));
    }
    async links(a, downloadName) {
        if (a.file.processingStatus !== 'READY')
            return { url: null, thumbUrl: null };
        if (a.file.mimeType === 'application/pdf') {
            return {
                url: a.file.sanitizedKey
                    ? await this.storage.presignDownload(a.file.sanitizedKey, downloadName)
                    : null,
                thumbUrl: null,
            };
        }
        const urls = await this.media.urls(a.file);
        return { url: urls?.large ?? null, thumbUrl: urls?.thumb ?? null };
    }
};
RfqFilesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [StorageService,
        MediaService])
], RfqFilesService);
export { RfqFilesService };
//# sourceMappingURL=rfq-files.service.js.map