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
var FilesService_1;
import { randomUUID } from 'node:crypto';
import { BadRequestException, ConflictException, Inject, Injectable, Logger, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { matchesSignature, SIGNATURE_BYTES } from './file-signature.js';
import { StorageService } from './storage.service.js';
export const MALWARE_SCANNER = Symbol('MALWARE_SCANNER');
const EXTENSIONS = {
    'application/pdf': 'pdf',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
};
let FilesService = FilesService_1 = class FilesService {
    prisma;
    storage;
    scanner;
    logger = new Logger(FilesService_1.name);
    constructor(prisma, storage, scanner) {
        this.prisma = prisma;
        this.storage = storage;
        this.scanner = scanner;
    }
    async reserveUpload(input) {
        const ext = EXTENSIONS[input.contentType] ?? 'bin';
        const storageKey = `${input.folder}/${input.companyId ?? 'staff'}/${randomUUID()}.${ext}`;
        const file = await this.prisma.fileAsset.create({
            data: {
                bucket: this.storage.bucket,
                storageKey,
                originalFilename: input.fileName,
                mimeType: input.contentType,
                sizeBytes: input.sizeBytes,
                purpose: input.purpose,
                uploadedById: input.userId,
                ownerCompanyId: input.companyId,
            },
        });
        const upload = await this.storage.presignUpload(storageKey, input.contentType, Math.min(input.sizeBytes, input.maxBytes));
        return {
            fileId: file.id,
            url: upload.url,
            fields: upload.fields,
            expiresAt: upload.expiresAt.toISOString(),
        };
    }
    async confirmUpload(fileId, owner, purpose, maxBytes) {
        const file = await this.prisma.fileAsset.findFirst({
            where: typeof owner === 'string'
                ? { id: fileId, ownerCompanyId: owner, purpose }
                : { id: fileId, ownerCompanyId: null, uploadedById: owner.userId, purpose },
        });
        if (!file)
            throw new NotFoundException('Upload not found');
        if (file.status !== 'PENDING_UPLOAD') {
            throw new ConflictException('This file is already attached');
        }
        const object = await this.storage.head(file.storageKey);
        if (!object)
            throw new BadRequestException('The file has not finished uploading');
        const reject = async (scanStatus) => {
            await this.storage.delete(file.storageKey).catch(() => undefined);
            await this.prisma.fileAsset.update({
                where: { id: file.id },
                data: { status: 'REJECTED', ...(scanStatus && { scanStatus }) },
            });
        };
        if (object.sizeBytes > maxBytes ||
            object.contentType !== file.mimeType ||
            !matchesSignature(file.mimeType, await this.storage.getStart(file.storageKey, SIGNATURE_BYTES))) {
            await reject();
            throw new BadRequestException('The uploaded file does not match what was declared');
        }
        if (this.scanner) {
            const result = await this.scanner.scan(await this.storage.getStream(file.storageKey));
            if (!result.clean) {
                await reject('INFECTED');
                this.logger.warn({ fileId: file.id, signature: result.signature }, 'Infected upload rejected');
                throw new BadRequestException('This file was flagged by our malware scan and removed');
            }
        }
        return this.prisma.fileAsset.update({
            where: { id: file.id },
            data: {
                status: 'UPLOADED',
                sizeBytes: object.sizeBytes,
                uploadedAt: new Date(),
                scanStatus: this.scanner ? 'CLEAN' : 'PENDING',
            },
        });
    }
    async remove(fileId) {
        const file = await this.prisma.fileAsset.findUnique({
            where: { id: fileId },
            include: { renditions: true },
        });
        if (!file)
            return;
        await this.prisma.fileAsset.delete({ where: { id: fileId } });
        const keys = [file.storageKey, ...file.renditions.map((r) => r.storageKey)];
        await Promise.all(keys.map((key) => this.storage.delete(key).catch(() => undefined)));
    }
};
FilesService = FilesService_1 = __decorate([
    Injectable(),
    __param(2, Inject(MALWARE_SCANNER)),
    __metadata("design:paramtypes", [PrismaService,
        StorageService, Object])
], FilesService);
export { FilesService };
//# sourceMappingURL=files.service.js.map