var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CLAIM_EVIDENCE_MAX_BYTES, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { SearchService } from '../search/search.service.js';
import { FilesService } from '../storage/files.service.js';
import { StorageService } from '../storage/storage.service.js';
let ClaimsService = class ClaimsService {
    prisma;
    files;
    storage;
    search;
    notifier;
    audit;
    constructor(prisma, files, storage, search, notifier, audit) {
        this.prisma = prisma;
        this.files = files;
        this.storage = storage;
        this.search = search;
        this.notifier = notifier;
        this.audit = audit;
    }
    async list(ctx) {
        const rows = await this.prisma.supplierClaim.findMany({
            where: { manufacturerProfileId: ctx.profileId },
            orderBy: { createdAt: 'desc' },
        });
        return rows.map((c) => this.view(c));
    }
    async create(ctx, dto) {
        const file = await this.files.confirmUpload(dto.evidenceFileId, ctx.companyId, 'SUPPLIER_CLAIM_EVIDENCE', CLAIM_EVIDENCE_MAX_BYTES);
        try {
            const claim = await this.prisma.supplierClaim.create({
                data: {
                    manufacturerProfileId: ctx.profileId,
                    region: dto.region,
                    tier: dto.tier,
                    brandNames: dto.brandNames,
                    evidenceFileId: file.id,
                    note: dto.note ?? null,
                },
            });
            await this.audit.log({
                actorUserId: ctx.userId,
                action: 'supplier_claim.submitted',
                entityType: 'SupplierClaim',
                entityId: claim.id,
            });
            return this.view(claim);
        }
        catch (error) {
            if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002')
                throw new ConflictException('That evidence is already attached to a claim');
            throw error;
        }
    }
    async remove(ctx, id) {
        const claim = await this.prisma.supplierClaim.findFirst({
            where: { id, manufacturerProfileId: ctx.profileId },
            select: { status: true },
        });
        if (!claim)
            throw new NotFoundException('Claim not found');
        await this.prisma.supplierClaim.delete({ where: { id } });
        if (claim.status === 'VERIFIED')
            await this.search.syncManufacturer(ctx.profileId);
    }
    async adminList(status) {
        const rows = await this.prisma.supplierClaim.findMany({
            where: status ? { status } : {},
            orderBy: { createdAt: status === 'PENDING' ? 'asc' : 'desc' },
            take: 1000,
            include: {
                evidenceFile: { select: { storageKey: true, originalFilename: true, status: true } },
                manufacturerProfile: {
                    select: { publicCode: true, company: { select: { legalName: true } } },
                },
            },
        });
        return Promise.all(rows.map(async (c) => ({
            ...this.view(c),
            manufacturer: {
                code: c.manufacturerProfile.publicCode,
                name: c.manufacturerProfile.company.legalName,
            },
            evidenceUrl: c.evidenceFile?.status === 'UPLOADED'
                ? await this.storage.presignDownload(c.evidenceFile.storageKey, c.evidenceFile.originalFilename)
                : null,
            reviewedAt: c.reviewedAt?.toISOString() ?? null,
        })));
    }
    verify(adminId, id, note) {
        return this.decide(adminId, id, 'VERIFIED', note ?? null);
    }
    reject(adminId, id, dto) {
        return this.decide(adminId, id, 'REJECTED', dto.note);
    }
    async decide(adminId, id, status, note) {
        const claim = await this.prisma.supplierClaim.findUnique({
            where: { id },
            select: {
                region: true,
                tier: true,
                manufacturerProfileId: true,
                manufacturerProfile: { select: { companyId: true } },
            },
        });
        if (!claim)
            throw new NotFoundException('Claim not found');
        const { count } = await this.prisma.supplierClaim.updateMany({
            where: { id, status: 'PENDING' },
            data: { status, reviewNote: note, reviewedAt: new Date(), reviewedById: adminId },
        });
        if (count !== 1)
            throw new ConflictException('This claim has already been decided');
        await this.audit.log({
            actorUserId: adminId,
            action: `supplier_claim.${status.toLowerCase()}`,
            entityType: 'SupplierClaim',
            entityId: id,
            metadata: { region: claim.region, tier: claim.tier, ...(note && { note }) },
        });
        await this.notifier.notify({
            to: { companyId: claim.manufacturerProfile.companyId },
            type: 'SYSTEM',
            title: status === 'VERIFIED' ? 'Supplier claim verified' : 'Supplier claim not accepted',
            body: status === 'VERIFIED'
                ? 'Buyers now see a verified badge on your profile (never the brand names).'
                : `Reason: ${note ?? ''}. You can submit it again with other evidence.`,
        });
        await this.search.syncManufacturer(claim.manufacturerProfileId);
    }
    view(c) {
        return {
            id: c.id,
            region: c.region,
            tier: c.tier,
            brandNames: c.brandNames,
            note: c.note,
            status: c.status,
            reviewNote: c.reviewNote,
            createdAt: c.createdAt.toISOString(),
        };
    }
};
ClaimsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        FilesService,
        StorageService,
        SearchService,
        Notifier,
        AuditService])
], ClaimsService);
export { ClaimsService };
//# sourceMappingURL=claims.service.js.map