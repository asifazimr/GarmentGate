import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  type AdminKycCompany,
  type AdminKycCompanyDetail,
  type KycDocumentType,
  type KycStatus,
  ROLE_HOME,
} from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { MailService } from '../mail/mail.service.js';

const listInclude = {
  users: { where: { companyRole: 'OWNER' }, take: 1 },
  buyerProfile: { select: { publicCode: true } },
  manufacturerProfile: {
    select: { publicCode: true, _count: { select: { certifications: true } } },
  },
  _count: { select: { documents: true } },
} satisfies Prisma.CompanyInclude;

const detailInclude = {
  ...listInclude,
  buyerProfile: { include: { categories: true } },
  manufacturerProfile: {
    include: {
      categories: true,
      certifications: { include: { file: true } },
      _count: { select: { certifications: true } },
    },
  },
  documents: { include: { file: true }, orderBy: { createdAt: 'asc' } },
} satisfies Prisma.CompanyInclude;

type ListCompany = Prisma.CompanyGetPayload<{ include: typeof listInclude }>;

@Injectable()
export class AdminKycService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
    private readonly audit: AuditService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async list(status: KycStatus): Promise<AdminKycCompany[]> {
    const companies = await this.prisma.company.findMany({
      where: { kycStatus: status, deletedAt: null },
      include: listInclude,
      orderBy: [{ kycSubmittedAt: 'asc' }, { createdAt: 'asc' }],
      take: 200,
    });
    return companies.map((c) => this.toListItem(c));
  }

  async detail(companyId: string): Promise<AdminKycCompanyDetail> {
    const c = await this.prisma.company.findUnique({
      where: { id: companyId },
      include: detailInclude,
    });
    if (!c) throw new NotFoundException('Company not found');
    const mp = c.manufacturerProfile;
    const bp = c.buyerProfile;
    return {
      ...this.toListItem(c),
      rejectionReason: c.kycRejectionReason,
      company: {
        legalName: c.legalName,
        tradeName: c.tradeName ?? undefined,
        country: c.country,
        city: c.city ?? '',
        addressLine1: c.addressLine1 ?? '',
        addressLine2: c.addressLine2 ?? undefined,
        postalCode: c.postalCode ?? undefined,
        registrationNumber: c.registrationNumber ?? '',
        website: c.website ?? undefined,
        phone: c.phone ?? undefined,
        yearEstablished: c.yearEstablished ?? undefined,
      },
      categories: (mp?.categories ?? bp?.categories ?? []).map((cat) => cat.name),
      profileSummary: mp
        ? {
            'Monthly capacity (pcs)': mp.monthlyCapacityPcs,
            'MOQ (pcs)': mp.moqPcs,
            'Sample lead time (days)': mp.sampleLeadTimeDays,
            'Production lead time (days)':
              mp.productionLeadTimeMinDays !== null
                ? `${mp.productionLeadTimeMinDays}–${mp.productionLeadTimeMaxDays ?? '?'}`
                : null,
            Workforce: mp.workforceSize,
            'Factory size (m²)': mp.factorySizeSqm,
            'Export markets': mp.exportMarkets.length > 0 ? mp.exportMarkets.join(', ') : null,
            About: mp.about,
          }
        : {
            'Business type': bp?.businessType ?? null,
            'Annual volume (pcs)': bp?.annualVolumePcs ?? null,
            'Typical order (pcs)': bp?.typicalOrderQuantityPcs ?? null,
            'Target markets':
              bp && bp.targetMarkets.length > 0 ? bp.targetMarkets.join(', ') : null,
            'Sourcing needs': bp?.sourcingNeeds ?? null,
          },
      documents: c.documents.map((doc) => ({
        id: doc.id,
        fileId: doc.fileId,
        type: doc.type as KycDocumentType,
        status: doc.status,
        documentNumber: doc.documentNumber,
        expiresAt: doc.expiresAt?.toISOString() ?? null,
        file: {
          fileName: doc.file.originalFilename,
          contentType: doc.file.mimeType,
          sizeBytes: doc.file.sizeBytes,
        },
        createdAt: doc.createdAt.toISOString(),
      })),
      certifications: (mp?.certifications ?? []).map((cert) => ({
        id: cert.id,
        fileId: cert.fileId,
        type: cert.type,
        customName: cert.customName,
        certificateNumber: cert.certificateNumber,
        issuedAt: cert.issuedAt?.toISOString() ?? null,
        expiresAt: cert.expiresAt?.toISOString() ?? null,
        status: cert.status,
        file: cert.file
          ? {
              fileName: cert.file.originalFilename,
              contentType: cert.file.mimeType,
              sizeBytes: cert.file.sizeBytes,
            }
          : null,
      })),
    };
  }

  async approve(adminId: string, companyId: string): Promise<void> {
    const company = await this.pending(companyId);
    const now = new Date();
    await this.prisma.$transaction([
      this.prisma.company.update({
        where: { id: company.id },
        data: {
          kycStatus: 'VERIFIED',
          kycReviewedAt: now,
          kycReviewedById: adminId,
          kycRejectionReason: null,
        },
      }),
      this.prisma.companyDocument.updateMany({
        where: { companyId: company.id, status: 'PENDING' },
        data: { status: 'VERIFIED', reviewedAt: now },
      }),
      this.prisma.certification.updateMany({
        where: { manufacturerProfile: { companyId: company.id }, status: 'PENDING' },
        data: { status: 'VERIFIED', verifiedAt: now },
      }),
      this.prisma.manufacturerProfile.updateMany({
        where: { companyId: company.id },
        data: { isListed: true },
      }),
      this.prisma.notification.createMany({
        data: company.users.map((u) => ({
          userId: u.id,
          type: 'KYC_APPROVED' as const,
          title: 'Your company is verified',
          body: 'Welcome aboard. Your dashboard is ready.',
        })),
      }),
    ]);
    await this.audit.log({
      actorUserId: adminId,
      action: 'kyc.approved',
      entityType: 'Company',
      entityId: company.id,
    });
    for (const user of company.users) {
      await this.mail.send('kyc-decision', user.email, {
        firstName: user.firstName,
        approved: true,
        actionUrl: this.webUrl(ROLE_HOME[company.type]),
      });
    }
  }

  async reject(adminId: string, companyId: string, reason: string): Promise<void> {
    const company = await this.pending(companyId);
    await this.prisma.$transaction([
      this.prisma.company.update({
        where: { id: company.id },
        data: {
          kycStatus: 'REJECTED',
          onboardingStep: 'DOCUMENTS',
          kycReviewedAt: new Date(),
          kycReviewedById: adminId,
          kycRejectionReason: reason,
        },
      }),
      this.prisma.notification.createMany({
        data: company.users.map((u) => ({
          userId: u.id,
          type: 'KYC_REJECTED' as const,
          title: 'A few changes needed',
          body: reason,
        })),
      }),
    ]);
    await this.audit.log({
      actorUserId: adminId,
      action: 'kyc.rejected',
      entityType: 'Company',
      entityId: company.id,
      metadata: { reason },
    });
    for (const user of company.users) {
      await this.mail.send('kyc-decision', user.email, {
        firstName: user.firstName,
        approved: false,
        reason,
        actionUrl: this.webUrl('/onboarding'),
      });
    }
  }

  private async pending(companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      include: { users: true },
    });
    if (!company) throw new NotFoundException('Company not found');
    if (company.kycStatus !== 'PENDING_REVIEW') {
      throw new ConflictException(
        `This company is ${company.kycStatus.toLowerCase().replace('_', ' ')}, not pending review`,
      );
    }
    return company;
  }

  private toListItem(c: ListCompany): AdminKycCompany {
    const owner = c.users[0];
    return {
      id: c.id,
      type: c.type,
      legalName: c.legalName,
      country: c.country,
      publicCode: c.manufacturerProfile?.publicCode ?? c.buyerProfile?.publicCode ?? null,
      kycStatus: c.kycStatus,
      submittedAt: c.kycSubmittedAt?.toISOString() ?? null,
      owner: owner
        ? {
            name: `${owner.firstName} ${owner.lastName}`,
            email: owner.email,
            emailVerified: owner.emailVerifiedAt !== null,
          }
        : null,
      documentCount: c._count.documents,
      certificationCount: c.manufacturerProfile?._count.certifications ?? 0,
    };
  }

  private webUrl(path: string): string {
    return new URL(path, this.config.get('WEB_APP_URL', { infer: true })).toString();
  }
}
