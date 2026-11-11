var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { UPLOAD_MAX_BYTES, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { assertEditable } from '../onboarding/onboarding.service.js';
import { FilesService } from '../storage/files.service.js';
import { StorageService } from '../storage/storage.service.js';
let KycService = class KycService {
    prisma;
    storage;
    files;
    audit;
    constructor(prisma, storage, files, audit) {
        this.prisma = prisma;
        this.storage = storage;
        this.files = files;
        this.audit = audit;
    }
    async presignUpload(userId, dto) {
        const company = await this.editableCompany(userId);
        if (dto.purpose === 'CERTIFICATION' && company.type !== 'MANUFACTURER') {
            throw new ForbiddenException('Only manufacturers upload certifications');
        }
        return this.files.reserveUpload({
            userId,
            companyId: company.id,
            purpose: dto.purpose,
            folder: dto.purpose === 'CERTIFICATION' ? 'certifications' : 'kyc',
            fileName: dto.fileName,
            contentType: dto.contentType,
            sizeBytes: dto.sizeBytes,
            maxBytes: UPLOAD_MAX_BYTES,
        });
    }
    async addDocument(userId, dto) {
        const company = await this.editableCompany(userId);
        const file = await this.confirmUpload(dto.fileId, company.id, 'KYC_DOCUMENT');
        await this.prisma.companyDocument.create({
            data: {
                companyId: company.id,
                type: dto.type,
                fileId: file.id,
                documentNumber: dto.documentNumber ?? null,
                expiresAt: dto.expiresAt ?? null,
            },
        });
        await this.audit.log({
            actorUserId: userId,
            action: 'kyc.document_added',
            entityType: 'Company',
            entityId: company.id,
            metadata: { type: dto.type },
        });
    }
    async removeDocument(userId, documentId) {
        const company = await this.editableCompany(userId);
        const doc = await this.prisma.companyDocument.findFirst({
            where: { id: documentId, companyId: company.id },
            include: { file: true },
        });
        if (!doc)
            throw new NotFoundException('Document not found');
        await this.prisma.$transaction([
            this.prisma.companyDocument.delete({ where: { id: doc.id } }),
            this.prisma.fileAsset.delete({ where: { id: doc.fileId } }),
        ]);
        await this.storage.delete(doc.file.storageKey).catch(() => undefined);
    }
    async addCertification(userId, dto) {
        const company = await this.editableCompany(userId);
        if (company.type !== 'MANUFACTURER' || !company.manufacturerProfile) {
            throw new ForbiddenException('Only manufacturers add certifications');
        }
        const file = await this.confirmUpload(dto.fileId, company.id, 'CERTIFICATION');
        await this.prisma.certification.create({
            data: {
                manufacturerProfileId: company.manufacturerProfile.id,
                type: dto.type,
                customName: dto.customName ?? null,
                certificateNumber: dto.certificateNumber ?? null,
                issuedAt: dto.issuedAt ?? null,
                expiresAt: dto.expiresAt ?? null,
                fileId: file.id,
            },
        });
    }
    async removeCertification(userId, certificationId) {
        const company = await this.editableCompany(userId);
        const cert = await this.prisma.certification.findFirst({
            where: { id: certificationId, manufacturerProfile: { companyId: company.id } },
            include: { file: true },
        });
        if (!cert)
            throw new NotFoundException('Certification not found');
        await this.prisma.$transaction([
            this.prisma.certification.delete({ where: { id: cert.id } }),
            ...(cert.fileId ? [this.prisma.fileAsset.delete({ where: { id: cert.fileId } })] : []),
        ]);
        if (cert.file)
            await this.storage.delete(cert.file.storageKey).catch(() => undefined);
    }
    async downloadUrl(user, fileId) {
        const file = await this.prisma.fileAsset.findUnique({ where: { id: fileId } });
        if (file?.status !== 'UPLOADED')
            throw new NotFoundException('File not found');
        if (user.role !== 'ADMIN') {
            const me = await this.prisma.user.findUniqueOrThrow({
                where: { id: user.id },
                select: { companyId: true },
            });
            if (!me.companyId || me.companyId !== file.ownerCompanyId)
                throw new NotFoundException('File not found');
        }
        return { url: await this.storage.presignDownload(file.storageKey, file.originalFilename) };
    }
    async editableCompany(userId) {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
            include: { company: { include: { manufacturerProfile: { select: { id: true } } } } },
        });
        if (!user.company)
            throw new ConflictException('Save your company details first');
        assertEditable(user.company.kycStatus);
        return user.company;
    }
    confirmUpload(fileId, companyId, purpose) {
        return this.files.confirmUpload(fileId, companyId, purpose, UPLOAD_MAX_BYTES);
    }
};
KycService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        StorageService,
        FilesService,
        AuditService])
], KycService);
export { KycService };
//# sourceMappingURL=kyc.service.js.map