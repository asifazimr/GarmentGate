var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { filterContactDetails, IMAGE_MAX_BYTES, UPLOAD_MAX_BYTES, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import { toPublicManufacturer } from '../catalog/public.serializer.js';
import { publicManufacturerInclude } from '../catalog/catalog.queries.js';
import { fileWithRenditions, MediaService } from '../media/media.service.js';
import { capabilitiesView, capabilitiesWrite } from '../onboarding/capabilities.mapper.js';
import { SearchService } from '../search/search.service.js';
import { FilesService } from '../storage/files.service.js';
import { toOwnedImage } from './owned-image.js';
const MAX_PHOTOS = 20;
let ManufacturerProfileService = class ManufacturerProfileService {
    prisma;
    notifier;
    media;
    files;
    audit;
    search;
    constructor(prisma, notifier, media, files, audit, search) {
        this.prisma = prisma;
        this.notifier = notifier;
        this.media = media;
        this.files = files;
        this.audit = audit;
        this.search = search;
    }
    async view(ctx) {
        const profile = await this.prisma.manufacturerProfile.findUniqueOrThrow({
            where: { id: ctx.profileId },
            include: {
                categories: { select: { id: true } },
                photos: { include: { file: fileWithRenditions }, orderBy: { sortOrder: 'asc' } },
            },
        });
        const urls = await this.media.urlMap(profile.photos.map((p) => p.file));
        return {
            publicCode: profile.publicCode,
            capabilities: capabilitiesView(profile),
            photos: profile.photos.map((p) => toOwnedImage({ ...p, file: p.file }, urls)),
        };
    }
    async updateCapabilities(ctx, dto) {
        const count = await this.prisma.category.count({ where: { id: { in: dto.categoryIds } } });
        if (count !== new Set(dto.categoryIds).size)
            throw new BadRequestException('Unknown category selected');
        const write = capabilitiesWrite(dto);
        await this.prisma.manufacturerProfile.update({
            where: { id: ctx.profileId },
            data: write.data,
        });
        await this.search.syncManufacturer(ctx.profileId);
        await this.audit.log({
            actorUserId: ctx.userId,
            action: write.flagged.length > 0 ? 'moderation.contact_filtered' : 'manufacturer.profile_updated',
            entityType: 'ManufacturerProfile',
            entityId: ctx.profileId,
            ...(write.flagged.length > 0 && { metadata: { reasons: write.flagged } }),
        });
    }
    async preview(ctx) {
        const profile = await this.prisma.manufacturerProfile.findUniqueOrThrow({
            where: { id: ctx.profileId },
            include: publicManufacturerInclude,
        });
        const urls = await this.media.urlMap(profile.photos.map((p) => p.file));
        return toPublicManufacturer(profile, urls);
    }
    async addPhoto(ctx, dto) {
        const count = await this.prisma.factoryPhoto.count({
            where: { manufacturerProfileId: ctx.profileId },
        });
        if (count >= MAX_PHOTOS)
            throw new BadRequestException(`You can add up to ${MAX_PHOTOS} photos`);
        const file = await this.files.confirmUpload(dto.fileId, ctx.companyId, 'FACTORY_PHOTO', IMAGE_MAX_BYTES);
        await this.prisma.factoryPhoto.create({
            data: {
                manufacturerProfileId: ctx.profileId,
                fileId: file.id,
                caption: dto.caption ? filterContactDetails(dto.caption).filtered : null,
                sortOrder: count,
            },
        });
        await this.media.enqueue(file.id);
    }
    async removePhoto(ctx, photoId) {
        const photo = await this.prisma.factoryPhoto.findFirst({
            where: { id: photoId, manufacturerProfileId: ctx.profileId },
        });
        if (!photo)
            throw new NotFoundException('Photo not found');
        await this.files.remove(photo.fileId);
    }
    async reorderPhotos(ctx, dto) {
        const photos = await this.prisma.factoryPhoto.findMany({
            where: { manufacturerProfileId: ctx.profileId },
            select: { id: true },
        });
        const owned = new Set(photos.map((p) => p.id));
        if (dto.ids.length !== owned.size || dto.ids.some((id) => !owned.has(id))) {
            throw new BadRequestException('Send every photo id exactly once');
        }
        await this.prisma.$transaction(dto.ids.map((id, sortOrder) => this.prisma.factoryPhoto.update({ where: { id }, data: { sortOrder } })));
    }
    async certifications(ctx) {
        const certs = await this.prisma.certification.findMany({
            where: { manufacturerProfileId: ctx.profileId },
            include: { file: true },
            orderBy: { createdAt: 'asc' },
        });
        return certs.map((c) => ({
            id: c.id,
            type: c.type,
            customName: c.customName,
            certificateNumber: c.certificateNumber,
            issuedAt: c.issuedAt?.toISOString() ?? null,
            expiresAt: c.expiresAt?.toISOString() ?? null,
            status: c.status,
            file: c.file
                ? {
                    fileName: c.file.originalFilename,
                    contentType: c.file.mimeType,
                    sizeBytes: c.file.sizeBytes,
                }
                : null,
        }));
    }
    async addCertification(ctx, dto) {
        const file = await this.files.confirmUpload(dto.fileId, ctx.companyId, 'CERTIFICATION', UPLOAD_MAX_BYTES);
        const cert = await this.prisma.certification.create({
            data: {
                manufacturerProfileId: ctx.profileId,
                type: dto.type,
                customName: dto.customName ? filterContactDetails(dto.customName).filtered : null,
                certificateNumber: dto.certificateNumber ?? null,
                issuedAt: dto.issuedAt ?? null,
                expiresAt: dto.expiresAt ?? null,
                fileId: file.id,
            },
        });
        await this.notifyAdmins('New certification to verify', `A verified factory added a ${dto.type} certificate.`, { certificationId: cert.id });
    }
    async removeCertification(ctx, id) {
        const cert = await this.prisma.certification.findFirst({
            where: { id, manufacturerProfileId: ctx.profileId },
        });
        if (!cert)
            throw new NotFoundException('Certification not found');
        await this.prisma.certification.delete({ where: { id: cert.id } });
        await this.search.syncManufacturer(ctx.profileId);
        if (cert.fileId)
            await this.files.remove(cert.fileId);
    }
    async notifyAdmins(title, body, data) {
        await this.notifier.notify({ to: 'ADMINS', type: 'SYSTEM', title, body, link: data });
    }
};
ManufacturerProfileService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        Notifier,
        MediaService,
        FilesService,
        AuditService,
        SearchService])
], ManufacturerProfileService);
export { ManufacturerProfileService };
//# sourceMappingURL=profile.service.js.map