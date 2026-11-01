import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  type AddCertificationDto,
  type AddCompanyDocumentDto,
  type PresignUploadDto,
  type PresignUploadResponse,
  UPLOAD_MAX_BYTES,
} from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { AuthenticatedUser } from '../auth/auth.decorators.js';
import { assertEditable } from '../onboarding/onboarding.service.js';
import { FilesService } from '../storage/files.service.js';
import { StorageService } from '../storage/storage.service.js';

@Injectable()
export class KycService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
    private readonly files: FilesService,
    private readonly audit: AuditService,
  ) {}

  /**
   * Reserves a FileAsset and returns a presigned POST. The storage key never contains the
   * original filename (it may include personal or company names).
   */
  async presignUpload(userId: string, dto: PresignUploadDto): Promise<PresignUploadResponse> {
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

  async addDocument(userId: string, dto: AddCompanyDocumentDto): Promise<void> {
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

  async removeDocument(userId: string, documentId: string): Promise<void> {
    const company = await this.editableCompany(userId);
    const doc = await this.prisma.companyDocument.findFirst({
      where: { id: documentId, companyId: company.id },
      include: { file: true },
    });
    if (!doc) throw new NotFoundException('Document not found');
    await this.prisma.$transaction([
      this.prisma.companyDocument.delete({ where: { id: doc.id } }),
      this.prisma.fileAsset.delete({ where: { id: doc.fileId } }),
    ]);
    await this.storage.delete(doc.file.storageKey).catch(() => undefined);
  }

  async addCertification(userId: string, dto: AddCertificationDto): Promise<void> {
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

  async removeCertification(userId: string, certificationId: string): Promise<void> {
    const company = await this.editableCompany(userId);
    const cert = await this.prisma.certification.findFirst({
      where: { id: certificationId, manufacturerProfile: { companyId: company.id } },
      include: { file: true },
    });
    if (!cert) throw new NotFoundException('Certification not found');
    await this.prisma.$transaction([
      this.prisma.certification.delete({ where: { id: cert.id } }),
      ...(cert.fileId ? [this.prisma.fileAsset.delete({ where: { id: cert.fileId } })] : []),
    ]);
    if (cert.file) await this.storage.delete(cert.file.storageKey).catch(() => undefined);
  }

  /** Short-lived download link for the owning company or an admin. */
  async downloadUrl(user: AuthenticatedUser, fileId: string): Promise<{ url: string }> {
    const file = await this.prisma.fileAsset.findUnique({ where: { id: fileId } });
    if (file?.status !== 'UPLOADED') throw new NotFoundException('File not found');
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

  // ── internals ─────────────────────────────────────────────────────────────

  private async editableCompany(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      include: { company: { include: { manufacturerProfile: { select: { id: true } } } } },
    });
    if (!user.company) throw new ConflictException('Save your company details first');
    assertEditable(user.company.kycStatus);
    return user.company;
  }

  /** Checks the object really landed in S3 with the declared type and an allowed size. */
  private confirmUpload(
    fileId: string,
    companyId: string,
    purpose: 'KYC_DOCUMENT' | 'CERTIFICATION',
  ) {
    return this.files.confirmUpload(fileId, companyId, purpose, UPLOAD_MAX_BYTES);
  }
}
