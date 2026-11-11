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
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { SearchService } from '../search/search.service.js';
import { StorageService } from '../storage/storage.service.js';
let AdminCertificationsService = class AdminCertificationsService {
    prisma;
    storage;
    search;
    notifier;
    audit;
    constructor(prisma, storage, search, notifier, audit) {
        this.prisma = prisma;
        this.storage = storage;
        this.search = search;
        this.notifier = notifier;
        this.audit = audit;
    }
    async list(status) {
        const rows = await this.prisma.certification.findMany({
            where: status ? { status } : {},
            orderBy: [{ createdAt: status === 'PENDING' ? 'asc' : 'desc' }],
            take: 1000,
            include: {
                file: { select: { storageKey: true, originalFilename: true, status: true } },
                manufacturerProfile: {
                    select: {
                        publicCode: true,
                        company: { select: { id: true, legalName: true, kycStatus: true } },
                    },
                },
            },
        });
        return Promise.all(rows.map(async (c) => ({
            id: c.id,
            type: c.type,
            customName: c.customName,
            certificateNumber: c.certificateNumber,
            issuedAt: c.issuedAt?.toISOString() ?? null,
            expiresAt: c.expiresAt?.toISOString() ?? null,
            status: c.status,
            rejectionReason: c.rejectionReason,
            verifiedAt: c.verifiedAt?.toISOString() ?? null,
            createdAt: c.createdAt.toISOString(),
            manufacturer: {
                companyId: c.manufacturerProfile.company.id,
                code: c.manufacturerProfile.publicCode,
                name: c.manufacturerProfile.company.legalName,
                kycStatus: c.manufacturerProfile.company.kycStatus,
            },
            fileUrl: c.file?.status === 'UPLOADED'
                ? await this.storage.presignDownload(c.file.storageKey, c.file.originalFilename)
                : null,
        })));
    }
    async verify(adminId, id) {
        await this.decide(adminId, id, 'VERIFIED', null);
    }
    async reject(adminId, id, dto) {
        await this.decide(adminId, id, 'REJECTED', dto.reason);
    }
    async decide(adminId, id, status, reason) {
        const cert = await this.prisma.certification.findUnique({
            where: { id },
            select: {
                type: true,
                customName: true,
                manufacturerProfileId: true,
                manufacturerProfile: { select: { companyId: true } },
            },
        });
        if (!cert)
            throw new NotFoundException('Certificate not found');
        const { count } = await this.prisma.certification.updateMany({
            where: { id, status: 'PENDING' },
            data: status === 'VERIFIED'
                ? { status, verifiedAt: new Date(), rejectionReason: null }
                : { status, rejectionReason: reason },
        });
        if (count !== 1)
            throw new ConflictException('This certificate has already been decided');
        await this.audit.log({
            actorUserId: adminId,
            action: `certification.${status.toLowerCase()}`,
            entityType: 'Certification',
            entityId: id,
            metadata: { type: cert.type, ...(reason && { reason }) },
        });
        const name = cert.customName ?? cert.type.replaceAll('_', ' ');
        await this.notifier.notify({
            to: { companyId: cert.manufacturerProfile.companyId },
            type: 'SYSTEM',
            title: status === 'VERIFIED' ? `${name} verified` : `${name} not accepted`,
            body: status === 'VERIFIED'
                ? 'Buyers now see this certificate on your profile.'
                : `Reason: ${reason ?? ''}. Upload a new copy from your factory profile.`,
        });
        await this.search.syncManufacturer(cert.manufacturerProfileId);
    }
};
AdminCertificationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        StorageService,
        SearchService,
        Notifier,
        AuditService])
], AdminCertificationsService);
export { AdminCertificationsService };
//# sourceMappingURL=admin-certifications.service.js.map