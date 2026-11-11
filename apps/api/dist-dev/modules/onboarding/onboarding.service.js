var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OnboardingService_1;
import { BadRequestException, ConflictException, ForbiddenException, Injectable, Logger, } from '@nestjs/common';
import { filterContactDetails, REQUIRED_KYC_DOCUMENTS, } from '@garmentgate/shared';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import { capabilitiesView, capabilitiesWrite } from './capabilities.mapper.js';
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
};
const EDITABLE_KYC = new Set(['NOT_SUBMITTED', 'REJECTED']);
const STEP_ORDER = ['COMPANY_INFO', 'PROFILE', 'DOCUMENTS', 'SUBMITTED'];
let OnboardingService = OnboardingService_1 = class OnboardingService {
    prisma;
    notifier;
    codes;
    audit;
    logger = new Logger(OnboardingService_1.name);
    emailVerificationRequired;
    constructor(prisma, notifier, codes, audit, config) {
        this.prisma = prisma;
        this.notifier = notifier;
        this.codes = codes;
        this.audit = audit;
        this.emailVerificationRequired = config.get('REQUIRE_EMAIL_VERIFICATION', { infer: true });
        if (!this.emailVerificationRequired)
            this.logger.warn('REQUIRE_EMAIL_VERIFICATION=false: companies can submit onboarding without a verified email');
    }
    async getState(userId) {
        return this.toState(await this.loadUser(userId));
    }
    async saveCompany(userId, dto) {
        const user = await this.loadUser(userId);
        const role = externalRole(user.role);
        const company = user.company;
        if (!company) {
            await this.prisma.$transaction(async (tx) => {
                const publicCode = await this.codes.next(role === 'MANUFACTURER' ? 'MFR' : 'BYR', dto.country, tx);
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
        }
        else {
            assertEditable(company.kycStatus);
            await this.prisma.$transaction(async (tx) => {
                await tx.company.update({
                    where: { id: company.id },
                    data: { ...companyData(dto), onboardingStep: advance(company.onboardingStep, 'PROFILE') },
                });
                if (company.country !== dto.country) {
                    const publicCode = await this.codes.next(role === 'MANUFACTURER' ? 'MFR' : 'BYR', dto.country, tx);
                    if (role === 'MANUFACTURER') {
                        await tx.manufacturerProfile.update({
                            where: { companyId: company.id },
                            data: { publicCode },
                        });
                    }
                    else {
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
    async saveManufacturerProfile(userId, dto) {
        const user = await this.loadUser(userId);
        const company = requireCompany(user, 'MANUFACTURER');
        assertEditable(company.kycStatus);
        await this.assertCategoriesExist(dto.categoryIds);
        const write = capabilitiesWrite(dto);
        await this.prisma.$transaction([
            this.prisma.manufacturerProfile.update({
                where: { companyId: company.id },
                data: write.data,
            }),
            this.prisma.company.update({
                where: { id: company.id },
                data: { onboardingStep: advance(company.onboardingStep, 'DOCUMENTS') },
            }),
        ]);
        if (write.flagged.length > 0) {
            await this.audit.log({
                actorUserId: userId,
                action: 'moderation.contact_filtered',
                entityType: 'ManufacturerProfile',
                entityId: company.id,
                metadata: { field: 'profile', reasons: write.flagged },
            });
        }
        return this.getState(userId);
    }
    async saveBuyerProfile(userId, dto) {
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
    async submit(userId) {
        const user = await this.loadUser(userId);
        const state = this.toState(user);
        const company = requireCompany(user, externalRole(user.role));
        assertEditable(company.kycStatus);
        if (state.emailVerificationRequired && !state.emailVerified) {
            throw new ForbiddenException('Verify your email address before submitting');
        }
        if (!state.canSubmit) {
            throw new BadRequestException({
                message: 'Complete every step before submitting',
                missingDocuments: state.missingDocuments,
            });
        }
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
        ]);
        await this.notifier.notify({
            to: 'ADMINS',
            type: 'KYC_SUBMITTED',
            title: `Verification pending: ${code}`,
            body: `A ${company.type.toLowerCase()} submitted documents for review.`,
        });
        await this.audit.log({
            actorUserId: userId,
            action: 'kyc.submitted',
            entityType: 'Company',
            entityId: company.id,
        });
        return this.getState(userId);
    }
    async loadUser(userId) {
        return this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
            include: onboardingInclude,
        });
    }
    async assertCategoriesExist(ids) {
        const count = await this.prisma.category.count({ where: { id: { in: ids } } });
        if (count !== new Set(ids).size)
            throw new BadRequestException('Unknown category selected');
    }
    toState(user) {
        const role = externalRole(user.role);
        const company = user.company;
        const mp = company?.manufacturerProfile ?? null;
        const bp = company?.buyerProfile ?? null;
        const documents = (company?.documents ?? []).map((doc) => ({
            id: doc.id,
            type: doc.type,
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
        const profileDone = company !== null &&
            STEP_ORDER.indexOf(company.onboardingStep) >= STEP_ORDER.indexOf('DOCUMENTS');
        return {
            role,
            step: company?.onboardingStep ?? 'COMPANY_INFO',
            kycStatus: company?.kycStatus ?? 'NOT_SUBMITTED',
            rejectionReason: company?.kycRejectionReason ?? null,
            emailVerified: user.emailVerifiedAt !== null,
            emailVerificationRequired: this.emailVerificationRequired,
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
            manufacturerProfile: capabilitiesView(mp),
            buyerProfile: bp && bp.businessType !== null
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
            canSubmit: company !== null &&
                profileDone &&
                missingDocuments.length === 0 &&
                EDITABLE_KYC.has(company.kycStatus),
        };
    }
};
OnboardingService = OnboardingService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        Notifier,
        PublicCodeService,
        AuditService,
        ConfigService])
], OnboardingService);
export { OnboardingService };
function externalRole(role) {
    if (role === 'BUYER' || role === 'MANUFACTURER')
        return role;
    throw new ForbiddenException('Onboarding is only for buyers and manufacturers');
}
function requireCompany(user, role) {
    if (externalRole(user.role) !== role)
        throw new ForbiddenException();
    if (!user.company)
        throw new ConflictException('Save your company details first');
    return user.company;
}
export function assertEditable(kycStatus) {
    if (!EDITABLE_KYC.has(kycStatus)) {
        throw new ConflictException(kycStatus === 'VERIFIED'
            ? 'Your company is already verified. Contact support to change details.'
            : 'Your company is under review and cannot be edited right now.');
    }
}
function advance(current, target) {
    return STEP_ORDER.indexOf(current) >= STEP_ORDER.indexOf(target) ? current : target;
}
function companyData(dto) {
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
//# sourceMappingURL=onboarding.service.js.map