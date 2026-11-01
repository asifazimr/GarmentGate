import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  type BuyerSourcingNeedsDto,
  type CompanyInfoDto,
  filterContactDetails,
  type KycDocumentType,
  type ManufacturerCapabilitiesDto,
  type OnboardingState,
  REQUIRED_KYC_DOCUMENTS,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { PublicCodeService } from './public-code.service.js';

const onboardingInclude = {
  company: {
    include: {
      buyerProfile: { include: { categories: { select: { id: true } } } },
      manufacturerProfile: {
        include: {
          categories: { select: { id: true } },
          certifications: { include: { file: true }, orderBy: { createdAt: 'asc' } },
        },
      },
      documents: { include: { file: true }, orderBy: { createdAt: 'asc' } },
    },
  },
} satisfies Prisma.UserInclude;

type OnboardingUser = Prisma.UserGetPayload<{ include: typeof onboardingInclude }>;
type ExternalRole = 'BUYER' | 'MANUFACTURER';

const EDITABLE_KYC = new Set(['NOT_SUBMITTED', 'REJECTED']);
const STEP_ORDER = ['COMPANY_INFO', 'PROFILE', 'DOCUMENTS', 'SUBMITTED'] as const;

@Injectable()
export class OnboardingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly codes: PublicCodeService,
    private readonly audit: AuditService,
  ) {}

  async getState(userId: string): Promise<OnboardingState> {
    return this.toState(await this.loadUser(userId));
  }

  /** Step 1. Creates the company (and its public code) on first save. */
  async saveCompany(userId: string, dto: CompanyInfoDto): Promise<OnboardingState> {
    const user = await this.loadUser(userId);
    const role = externalRole(user.role);
    const company = user.company;

    if (!company) {
      await this.prisma.$transaction(async (tx) => {
        const publicCode = await this.codes.next(
          role === 'MANUFACTURER' ? 'MFR' : 'BYR',
          dto.country,
          tx,
        );
        await tx.company.create({
          data: {
            type: role,
            ...companyData(dto),
            onboardingStep: 'PROFILE',
            users: { connect: { id: userId } },
            ...(role === 'MANUFACTURER'
              ? { manufacturerProfile: { create: { publicCode } } }
              : { buyerProfile: { create: { publicCode } } }),
          },
        });
        await tx.user.update({ where: { id: userId }, data: { companyRole: 'OWNER' } });
      });
    } else {
      assertEditable(company.kycStatus);
      await this.prisma.$transaction(async (tx) => {
        await tx.company.update({
          where: { id: company.id },
          data: { ...companyData(dto), onboardingStep: advance(company.onboardingStep, 'PROFILE') },
        });
        // The code embeds the country. It has never been shown to anyone before verification,
        // so re-issue it if the country changes.
        if (company.country !== dto.country) {
          const publicCode = await this.codes.next(
            role === 'MANUFACTURER' ? 'MFR' : 'BYR',
            dto.country,
            tx,
          );
          if (role === 'MANUFACTURER') {
            await tx.manufacturerProfile.update({
              where: { companyId: company.id },
              data: { publicCode },
            });
          } else {
            await tx.buyerProfile.update({
              where: { companyId: company.id },
              data: { publicCode },
            });
          }
        }
      });
    }
    await this.audit.log({
      actorUserId: userId,
      action: 'onboarding.company_saved',
      entityType: 'User',
      entityId: userId,
    });
    return this.getState(userId);
  }

  /** Step 2 (manufacturers). */
  async saveManufacturerProfile(
    userId: string,
    dto: ManufacturerCapabilitiesDto,
  ): Promise<OnboardingState> {
    const user = await this.loadUser(userId);
    const company = requireCompany(user, 'MANUFACTURER');
    assertEditable(company.kycStatus);
    await this.assertCategoriesExist(dto.categoryIds);

    const about = dto.about ? filterContactDetails(dto.about) : null;
    await this.prisma.$transaction([
      this.prisma.manufacturerProfile.update({
        where: { companyId: company.id },
        data: {
          headline: dto.headline ? filterContactDetails(dto.headline).filtered : null,
          about: dto.about ?? null,
          aboutFiltered: about?.filtered ?? null,
          monthlyCapacityPcs: dto.monthlyCapacityPcs,
          moqPcs: dto.moqPcs,
          sampleLeadTimeDays: dto.sampleLeadTimeDays,
          productionLeadTimeMinDays: dto.productionLeadTimeMinDays,
          productionLeadTimeMaxDays: dto.productionLeadTimeMaxDays,
          workforceSize: dto.workforceSize,
          factorySizeSqm: dto.factorySizeSqm ?? null,
          machinery: dto.machinery,
          exportMarkets: dto.exportMarkets,
          categories: { set: dto.categoryIds.map((id) => ({ id })) },
        },
      }),
      this.prisma.company.update({
        where: { id: company.id },
        data: { onboardingStep: advance(company.onboardingStep, 'DOCUMENTS') },
      }),
    ]);
    if (about?.flagged) {
      await this.audit.log({
        actorUserId: userId,
        action: 'moderation.contact_filtered',
        entityType: 'ManufacturerProfile',
        entityId: company.id,
        metadata: { field: 'about', reasons: about.reasons },
      });
    }
    return this.getState(userId);
  }

  /** Step 2 (buyers). */
  async saveBuyerProfile(userId: string, dto: BuyerSourcingNeedsDto): Promise<OnboardingState> {
    const user = await this.loadUser(userId);
    const company = requireCompany(user, 'BUYER');
    assertEditable(company.kycStatus);
    await this.assertCategoriesExist(dto.categoryIds);

    const needs = dto.sourcingNeeds ? filterContactDetails(dto.sourcingNeeds) : null;
    await this.prisma.$transaction([
      this.prisma.buyerProfile.update({
        where: { companyId: company.id },
        data: {
          businessType: dto.businessType,
          annualVolumePcs: dto.annualVolumePcs ?? null,
          typicalOrderQuantityPcs: dto.typicalOrderQuantityPcs ?? null,
          targetMarkets: dto.targetMarkets,
          sourcingNeeds: dto.sourcingNeeds ?? null,
          sourcingNeedsFiltered: needs?.filtered ?? null,
          categories: { set: dto.categoryIds.map((id) => ({ id })) },
        },
      }),
      this.prisma.company.update({
        where: { id: company.id },
        data: { onboardingStep: advance(company.onboardingStep, 'DOCUMENTS') },
      }),
    ]);
    if (needs?.flagged) {
      await this.audit.log({
        actorUserId: userId,
        action: 'moderation.contact_filtered',
        entityType: 'BuyerProfile',
        entityId: company.id,
        metadata: { field: 'sourcingNeeds', reasons: needs.reasons },
      });
    }
    return this.getState(userId);
  }

  /** Step 3 → submit for admin review. */
  async submit(userId: string): Promise<OnboardingState> {
    const user = await this.loadUser(userId);
    const state = this.toState(user);
    const company = requireCompany(user, externalRole(user.role));
    assertEditable(company.kycStatus);

    if (!state.emailVerified) {
      throw new ForbiddenException('Verify your email address before submitting');
    }
    if (!state.canSubmit) {
      throw new BadRequestException({
        message: 'Complete every step before submitting',
        missingDocuments: state.missingDocuments,
      });
    }

    const admins = await this.prisma.user.findMany({
      where: { role: 'ADMIN', status: 'ACTIVE' },
      select: { id: true },
    });
    const code = state.publicCode ?? company.id;
    await this.prisma.$transaction([
      this.prisma.company.update({
        where: { id: company.id },
        data: {
          kycStatus: 'PENDING_REVIEW',
          onboardingStep: 'SUBMITTED',
          kycSubmittedAt: new Date(),
          kycRejectionReason: null,
        },
      }),
      this.prisma.notification.createMany({
        data: admins.map((admin) => ({
          userId: admin.id,
          type: 'KYC_SUBMITTED' as const,
          title: `Verification pending: ${code}`,
          body: `A ${company.type.toLowerCase()} submitted documents for review.`,
          data: { companyId: company.id },
        })),
      }),
    ]);
    await this.audit.log({
      actorUserId: userId,
      action: 'kyc.submitted',
      entityType: 'Company',
      entityId: company.id,
    });
    return this.getState(userId);
  }

  // ── internals ─────────────────────────────────────────────────────────────

  private async loadUser(userId: string): Promise<OnboardingUser> {
    return this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      include: onboardingInclude,
    });
  }

  private async assertCategoriesExist(ids: string[]): Promise<void> {
    const count = await this.prisma.category.count({ where: { id: { in: ids } } });
    if (count !== new Set(ids).size) throw new BadRequestException('Unknown category selected');
  }

  private toState(user: OnboardingUser): OnboardingState {
    const role = externalRole(user.role);
    const company = user.company;
    const mp = company?.manufacturerProfile ?? null;
    const bp = company?.buyerProfile ?? null;

    const documents = (company?.documents ?? []).map((doc) => ({
      id: doc.id,
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
    }));
    const certifications = (mp?.certifications ?? []).map((cert) => ({
      id: cert.id,
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
    }));

    const uploaded = new Set(documents.map((d) => d.type));
    const missingDocuments = REQUIRED_KYC_DOCUMENTS[role].filter((type) => !uploaded.has(type));
    const profileDone =
      company !== null &&
      STEP_ORDER.indexOf(company.onboardingStep) >= STEP_ORDER.indexOf('DOCUMENTS');

    return {
      role,
      step: company?.onboardingStep ?? 'COMPANY_INFO',
      kycStatus: company?.kycStatus ?? 'NOT_SUBMITTED',
      rejectionReason: company?.kycRejectionReason ?? null,
      emailVerified: user.emailVerifiedAt !== null,
      publicCode: mp?.publicCode ?? bp?.publicCode ?? null,
      submittedAt: company?.kycSubmittedAt?.toISOString() ?? null,
      company: company
        ? {
            legalName: company.legalName,
            tradeName: company.tradeName ?? undefined,
            country: company.country,
            city: company.city ?? '',
            addressLine1: company.addressLine1 ?? '',
            addressLine2: company.addressLine2 ?? undefined,
            postalCode: company.postalCode ?? undefined,
            registrationNumber: company.registrationNumber ?? '',
            website: company.website ?? undefined,
            phone: company.phone ?? undefined,
            yearEstablished: company.yearEstablished ?? undefined,
          }
        : null,
      manufacturerProfile:
        mp && mp.monthlyCapacityPcs !== null
          ? {
              categoryIds: mp.categories.map((c) => c.id),
              headline: mp.headline ?? undefined,
              about: mp.about ?? undefined,
              monthlyCapacityPcs: mp.monthlyCapacityPcs,
              moqPcs: mp.moqPcs ?? 1,
              sampleLeadTimeDays: mp.sampleLeadTimeDays ?? 1,
              productionLeadTimeMinDays: mp.productionLeadTimeMinDays ?? 1,
              productionLeadTimeMaxDays: mp.productionLeadTimeMaxDays ?? 1,
              workforceSize: mp.workforceSize ?? 1,
              factorySizeSqm: mp.factorySizeSqm ?? undefined,
              machinery: Array.isArray(mp.machinery)
                ? (mp.machinery as { type: string; count: number }[])
                : [],
              exportMarkets: mp.exportMarkets,
            }
          : null,
      buyerProfile:
        bp && bp.businessType !== null
          ? {
              businessType: bp.businessType,
              categoryIds: bp.categories.map((c) => c.id),
              annualVolumePcs: bp.annualVolumePcs ?? undefined,
              typicalOrderQuantityPcs: bp.typicalOrderQuantityPcs ?? undefined,
              targetMarkets: bp.targetMarkets,
              sourcingNeeds: bp.sourcingNeeds ?? undefined,
            }
          : null,
      documents,
      certifications,
      missingDocuments,
      canSubmit:
        company !== null &&
        profileDone &&
        missingDocuments.length === 0 &&
        EDITABLE_KYC.has(company.kycStatus),
    };
  }
}

function externalRole(role: string): ExternalRole {
  if (role === 'BUYER' || role === 'MANUFACTURER') return role;
  throw new ForbiddenException('Onboarding is only for buyers and manufacturers');
}

function requireCompany(user: OnboardingUser, role: ExternalRole) {
  if (externalRole(user.role) !== role) throw new ForbiddenException();
  if (!user.company) throw new ConflictException('Save your company details first');
  return user.company;
}

export function assertEditable(kycStatus: string): void {
  if (!EDITABLE_KYC.has(kycStatus)) {
    throw new ConflictException(
      kycStatus === 'VERIFIED'
        ? 'Your company is already verified. Contact support to change details.'
        : 'Your company is under review and cannot be edited right now.',
    );
  }
}

/** Never move the wizard backwards when a user re-saves an earlier step. */
function advance<T extends (typeof STEP_ORDER)[number]>(current: T, target: T): T {
  return STEP_ORDER.indexOf(current) >= STEP_ORDER.indexOf(target) ? current : target;
}

function companyData(dto: CompanyInfoDto) {
  return {
    legalName: dto.legalName,
    tradeName: dto.tradeName ?? null,
    country: dto.country,
    city: dto.city,
    addressLine1: dto.addressLine1,
    addressLine2: dto.addressLine2 ?? null,
    postalCode: dto.postalCode ?? null,
    registrationNumber: dto.registrationNumber,
    website: dto.website ?? null,
    phone: dto.phone ?? null,
    yearEstablished: dto.yearEstablished ?? null,
  };
}
