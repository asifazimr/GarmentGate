import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type {
  AdminCertification,
  CertificationStatus,
  RejectCertificationDto,
} from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { SearchService } from '../search/search.service.js';
import { StorageService } from '../storage/storage.service.js';

/**
 * Certificates factories add after their KYC review (those submitted with KYC are decided with
 * it). Only verified certificates reach buyers, so each decision re-syncs the search index.
 */
@Injectable()
export class AdminCertificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
    private readonly search: SearchService,
    private readonly notifier: Notifier,
    private readonly audit: AuditService,
  ) {}

  async list(status: CertificationStatus | undefined): Promise<AdminCertification[]> {
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
    return Promise.all(
      rows.map(async (c) => ({
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
        fileUrl:
          c.file?.status === 'UPLOADED'
            ? await this.storage.presignDownload(c.file.storageKey, c.file.originalFilename)
            : null,
      })),
    );
  }

  async verify(adminId: string, id: string): Promise<void> {
    await this.decide(adminId, id, 'VERIFIED', null);
  }

  async reject(adminId: string, id: string, dto: RejectCertificationDto): Promise<void> {
    await this.decide(adminId, id, 'REJECTED', dto.reason);
  }

  private async decide(
    adminId: string,
    id: string,
    status: 'VERIFIED' | 'REJECTED',
    reason: string | null,
  ): Promise<void> {
    const cert = await this.prisma.certification.findUnique({
      where: { id },
      select: {
        type: true,
        customName: true,
        manufacturerProfileId: true,
        manufacturerProfile: { select: { companyId: true } },
      },
    });
    if (!cert) throw new NotFoundException('Certificate not found');
    const { count } = await this.prisma.certification.updateMany({
      where: { id, status: 'PENDING' },
      data:
        status === 'VERIFIED'
          ? { status, verifiedAt: new Date(), rejectionReason: null }
          : { status, rejectionReason: reason },
    });
    if (count !== 1) throw new ConflictException('This certificate has already been decided');
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
      body:
        status === 'VERIFIED'
          ? 'Buyers now see this certificate on your profile.'
          : `Reason: ${reason ?? ''}. Upload a new copy from your factory profile.`,
    });
    await this.search.syncManufacturer(cert.manufacturerProfileId);
  }
}
