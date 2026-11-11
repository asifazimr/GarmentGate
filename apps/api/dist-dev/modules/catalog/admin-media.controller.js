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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MediaReviewDecisionSchema, MediaReviewItemSchema, MediaReviewKindSchema, } from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { fileWithRenditions, MediaService } from '../media/media.service.js';
import { RfqFilesService } from '../rfq/rfq-files.service.js';
import { StorageService } from '../storage/storage.service.js';
let AdminMediaController = class AdminMediaController {
    prisma;
    media;
    rfqFiles;
    audit;
    storage;
    constructor(prisma, media, rfqFiles, audit, storage) {
        this.prisma = prisma;
        this.media = media;
        this.rfqFiles = rfqFiles;
        this.audit = audit;
        this.storage = storage;
    }
    async pending() {
        const ready = { file: { processingStatus: 'READY' } };
        const [photos, images, attachments, samplePhotos, milestoneMedia, inspectionPhotos, evidence] = await Promise.all([
            this.prisma.factoryPhoto.findMany({
                where: { reviewStatus: 'PENDING', ...ready },
                include: {
                    file: fileWithRenditions,
                    manufacturerProfile: { select: { publicCode: true } },
                },
                orderBy: { createdAt: 'asc' },
                take: 100,
            }),
            this.prisma.productImage.findMany({
                where: { reviewStatus: 'PENDING', ...ready },
                include: {
                    file: fileWithRenditions,
                    product: {
                        select: { title: true, manufacturerProfile: { select: { publicCode: true } } },
                    },
                },
                take: 100,
            }),
            this.prisma.rfqAttachment.findMany({
                where: { reviewStatus: 'PENDING', ...ready },
                include: {
                    file: fileWithRenditions,
                    rfq: {
                        select: {
                            code: true,
                            buyerCompany: { select: { buyerProfile: { select: { publicCode: true } } } },
                        },
                    },
                },
                orderBy: { createdAt: 'asc' },
                take: 100,
            }),
            this.prisma.samplePhoto.findMany({
                where: { reviewStatus: 'PENDING', ...ready },
                include: {
                    file: fileWithRenditions,
                    sample: {
                        select: {
                            round: true,
                            order: {
                                select: {
                                    code: true,
                                    buyerCompany: { select: { buyerProfile: { select: { publicCode: true } } } },
                                },
                            },
                        },
                    },
                },
                orderBy: { createdAt: 'asc' },
                take: 100,
            }),
            this.prisma.milestonePhoto.findMany({
                where: { reviewStatus: 'PENDING', ...ready },
                include: {
                    file: fileWithRenditions,
                    milestone: {
                        select: {
                            stage: true,
                            order: {
                                select: { code: true, manufacturerProfile: { select: { publicCode: true } } },
                            },
                        },
                    },
                },
                orderBy: { createdAt: 'asc' },
                take: 100,
            }),
            this.prisma.inspectionPhoto.findMany({
                where: { reviewStatus: 'PENDING', ...ready },
                include: {
                    file: fileWithRenditions,
                    inspection: {
                        select: {
                            type: true,
                            order: {
                                select: { code: true, manufacturerProfile: { select: { publicCode: true } } },
                            },
                        },
                    },
                },
                orderBy: { createdAt: 'asc' },
                take: 100,
            }),
            this.prisma.disputeEvidence.findMany({
                where: { reviewStatus: 'PENDING', submittedBy: { not: 'STAFF' }, ...ready },
                include: {
                    file: fileWithRenditions,
                    dispute: {
                        select: {
                            order: {
                                select: {
                                    code: true,
                                    buyerCompany: { select: { buyerProfile: { select: { publicCode: true } } } },
                                    manufacturerProfile: { select: { publicCode: true } },
                                },
                            },
                        },
                    },
                },
                orderBy: { createdAt: 'asc' },
                take: 100,
            }),
        ]);
        const urls = await this.media.urlMap([
            ...photos.map((p) => p.file),
            ...images.map((i) => i.file),
            ...attachments.map((a) => a.file),
            ...samplePhotos.map((p) => p.file),
            ...milestoneMedia.filter((m) => !m.file.mimeType.startsWith('video/')).map((m) => m.file),
            ...inspectionPhotos.map((p) => p.file),
            ...evidence.filter((e) => e.file.mimeType !== 'application/pdf').map((e) => e.file),
        ]);
        const rfqItems = await Promise.all(attachments.map(async (a) => {
            const [view] = await this.rfqFiles.views([a], { kind: 'admin', rfqCode: a.rfq.code });
            return {
                kind: 'rfq-attachments',
                id: a.id,
                ownerCode: a.rfq.buyerCompany.buyerProfile?.publicCode ?? 'BYR',
                context: `${a.rfq.code} · ${view?.fileName ?? ''}`,
                contentType: a.file.mimeType,
                urls: urls.get(a.fileId) ?? null,
                documentUrl: a.file.mimeType === 'application/pdf' ? (view?.url ?? null) : null,
                videoUrl: null,
            };
        }));
        return [
            ...photos.map((p) => ({
                kind: 'factory-photos',
                id: p.id,
                ownerCode: p.manufacturerProfile.publicCode,
                context: p.caption,
                contentType: p.file.mimeType,
                urls: urls.get(p.fileId) ?? null,
                documentUrl: null,
                videoUrl: null,
            })),
            ...images.map((i) => ({
                kind: 'product-images',
                id: i.id,
                ownerCode: i.product.manufacturerProfile.publicCode,
                context: i.product.title,
                contentType: i.file.mimeType,
                urls: urls.get(i.fileId) ?? null,
                documentUrl: null,
                videoUrl: null,
            })),
            ...rfqItems,
            ...samplePhotos.map((p) => ({
                kind: 'sample-photos',
                id: p.id,
                ownerCode: p.sample.order?.buyerCompany.buyerProfile?.publicCode ?? 'BYR',
                context: `${p.sample.order?.code ?? ''} · sample round ${String(p.sample.round)}`,
                contentType: p.file.mimeType,
                urls: urls.get(p.fileId) ?? null,
                documentUrl: null,
                videoUrl: null,
            })),
            ...(await Promise.all(milestoneMedia.map(async (m) => ({
                kind: 'milestone-media',
                id: m.id,
                ownerCode: m.milestone.order.manufacturerProfile.publicCode,
                context: `${m.milestone.order.code} · ${m.milestone.stage.toLowerCase().replace('_', ' ')}${m.caption ? ` · ${m.caption}` : ''}`,
                contentType: m.file.mimeType,
                urls: urls.get(m.fileId) ?? null,
                documentUrl: null,
                videoUrl: m.file.mimeType.startsWith('video/') ? await this.media.videoUrl(m.file) : null,
            })))),
            ...inspectionPhotos.map((p) => ({
                kind: 'inspection-photos',
                id: p.id,
                ownerCode: p.inspection.order.manufacturerProfile.publicCode,
                context: `${p.inspection.order.code} · ${p.inspection.type === 'PRE_SHIPMENT' ? 'final' : 'inline'} inspection${p.caption ? ` · ${p.caption}` : ''}`,
                contentType: p.file.mimeType,
                urls: urls.get(p.fileId) ?? null,
                documentUrl: null,
                videoUrl: null,
            })),
            ...(await Promise.all(evidence.map(async (e) => {
                const order = e.dispute.order;
                const pdf = e.file.mimeType === 'application/pdf';
                return {
                    kind: 'dispute-evidence',
                    id: e.id,
                    ownerCode: e.submittedBy === 'BUYER'
                        ? (order.buyerCompany.buyerProfile?.publicCode ?? 'BYR')
                        : order.manufacturerProfile.publicCode,
                    context: `${order.code} · dispute evidence${e.note ? ` · ${e.note}` : ''}`,
                    contentType: e.file.mimeType,
                    urls: urls.get(e.fileId) ?? null,
                    documentUrl: pdf && e.file.sanitizedKey
                        ? await this.storage.presignDownload(e.file.sanitizedKey, `${order.code}-evidence.pdf`)
                        : null,
                    videoUrl: null,
                };
            }))),
        ];
    }
    approve(admin, kind, id) {
        return this.decide(admin.id, kind, id, 'APPROVED', undefined);
    }
    reject(admin, kind, id, body) {
        return this.decide(admin.id, kind, id, 'REJECTED', body.note);
    }
    async decide(adminId, kind, id, status, note) {
        const data = { reviewStatus: status, reviewNote: note ?? null, reviewedAt: new Date() };
        if (kind === 'factory-photos')
            await this.prisma.factoryPhoto.update({ where: { id }, data });
        else if (kind === 'product-images')
            await this.prisma.productImage.update({ where: { id }, data });
        else if (kind === 'rfq-attachments')
            await this.prisma.rfqAttachment.update({ where: { id }, data });
        else if (kind === 'sample-photos')
            await this.prisma.samplePhoto.update({ where: { id }, data });
        else if (kind === 'milestone-media')
            await this.prisma.milestonePhoto.update({ where: { id }, data });
        else if (kind === 'inspection-photos')
            await this.prisma.inspectionPhoto.update({ where: { id }, data });
        else
            await this.prisma.disputeEvidence.update({ where: { id }, data });
        await this.audit.log({
            actorUserId: adminId,
            action: `media.${status.toLowerCase()}`,
            entityType: kind,
            entityId: id,
            metadata: note ? { note } : {},
        });
    }
};
__decorate([
    Get('pending'),
    ApiOperation({ summary: 'Sanitized files waiting for review' }),
    ApiOkResponse({ standardSchema: MediaReviewItemSchema.array() }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminMediaController.prototype, "pending", null);
__decorate([
    Post(':kind/:id/approve'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('kind', new ZodValidationPipe(MediaReviewKindSchema))),
    __param(2, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AdminMediaController.prototype, "approve", null);
__decorate([
    Post(':kind/:id/reject'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('kind', new ZodValidationPipe(MediaReviewKindSchema))),
    __param(2, Param('id', ParseUUIDPipe)),
    __param(3, Body(new ZodValidationPipe(MediaReviewDecisionSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminMediaController.prototype, "reject", null);
AdminMediaController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Roles('ADMIN'),
    Controller('admin/media'),
    __metadata("design:paramtypes", [PrismaService,
        MediaService,
        RfqFilesService,
        AuditService,
        StorageService])
], AdminMediaController);
export { AdminMediaController };
//# sourceMappingURL=admin-media.controller.js.map