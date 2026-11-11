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
import { filterContactDetails, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { identityForScrubbing } from '../catalog/catalog.queries.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import { BuyerPlusService } from '../plans/buyer-plus.service.js';
import { PlansService } from '../plans/plans.service.js';
import { applyMarkup, pickQuoteRule } from '../pricing/margin.js';
import { matchRfq } from './rfq-matching.js';
import { attachmentInclude, RfqFilesService } from './rfq-files.service.js';
import { RfqNotifier } from './rfq-notifier.service.js';
const EDITABLE = ['SUBMITTED', 'UNDER_REVIEW', 'OFFERED'];
const rfqInclude = (profileId) => ({
    category: { select: { id: true, name: true, parentId: true } },
    buyerCompany: {
        select: {
            ...identityForScrubbing.select,
            buyerProfile: { select: { publicCode: true, plusActive: true } },
        },
    },
    invitations: { where: { manufacturerProfileId: profileId } },
    quotes: {
        where: { manufacturerProfileId: profileId },
        select: {
            manufacturerUnitPriceMinor: true,
            leadTimeDays: true,
            moqPcs: true,
            validUntil: true,
            notes: true,
            status: true,
            updatedAt: true,
        },
    },
});
let ManufacturerRfqsService = class ManufacturerRfqsService {
    prisma;
    rfqFiles;
    audit;
    notifier;
    plans;
    buyerPlus;
    constructor(prisma, rfqFiles, audit, notifier, plans, buyerPlus) {
        this.prisma = prisma;
        this.rfqFiles = rfqFiles;
        this.audit = audit;
        this.notifier = notifier;
        this.plans = plans;
        this.buyerPlus = buyerPlus;
    }
    async inbox(ctx) {
        const factory = await this.factory(ctx);
        const rfqs = await this.prisma.rfq.findMany({
            where: {
                OR: [
                    {
                        status: 'OPEN',
                        deadline: { gt: new Date() },
                        productId: null,
                        capacityBookingId: null,
                    },
                    { invitations: { some: { manufacturerProfileId: ctx.profileId } } },
                    { quotes: { some: { manufacturerProfileId: ctx.profileId } } },
                ],
                status: { not: 'DRAFT' },
            },
            include: rfqInclude(ctx.profileId),
            orderBy: { deadline: 'asc' },
            take: 200,
        });
        const { priorityRfqs } = await this.buyerPlus.settings();
        return rfqs
            .flatMap((r) => {
            const access = this.access(factory, r);
            return access.visible ? [this.summary(r, access.reasons, priorityRfqs)] : [];
        })
            .sort((a, b) => Number(b.priority) - Number(a.priority));
    }
    async detail(ctx, code) {
        const factory = await this.factory(ctx);
        const rfq = await this.find(ctx, code);
        const access = this.access(factory, rfq);
        if (!access.visible)
            throw new NotFoundException('RFQ not found');
        const invitation = rfq.invitations[0];
        if (!invitation) {
            await this.prisma.rfqInvitation.create({
                data: {
                    rfqId: rfq.id,
                    manufacturerProfileId: ctx.profileId,
                    status: 'VIEWED',
                    respondedAt: new Date(),
                },
            });
        }
        else if (invitation.status === 'INVITED') {
            await this.prisma.rfqInvitation.update({
                where: { id: invitation.id },
                data: { status: 'VIEWED' },
            });
        }
        const attachments = await this.prisma.rfqAttachment.findMany({
            where: { rfqId: rfq.id },
            include: attachmentInclude,
        });
        return {
            ...this.summary(rfq, access.reasons, (await this.buyerPlus.settings()).priorityRfqs),
            description: this.scrub(rfq, rfq.descriptionFiltered) ?? '',
            attachments: await this.rfqFiles.views(attachments, { kind: 'factory', rfqCode: rfq.code }),
            status: rfq.status,
            canQuote: this.canQuote(rfq),
        };
    }
    async submitQuote(ctx, code, dto) {
        const factory = await this.factory(ctx);
        const rfq = await this.find(ctx, code);
        if (!this.access(factory, rfq).visible)
            throw new NotFoundException('RFQ not found');
        if (!this.canQuote(rfq))
            throw new ConflictException('This RFQ no longer accepts quotes');
        const rules = await this.prisma.marginRule.findMany({ where: { active: true } });
        const rule = pickQuoteRule(rules, rfq.category, rfq.buyerCompanyId);
        const buyerUnitPriceMinor = applyMarkup(dto.unitPriceMinor, rule, factory.terms.markupDiscountBps);
        const notes = dto.notes === undefined ? null : filterContactDetails(dto.notes);
        const now = new Date();
        const data = {
            manufacturerUnitPriceMinor: dto.unitPriceMinor,
            buyerUnitPriceMinor,
            currency: rfq.currency,
            leadTimeDays: dto.leadTimeDays,
            moqPcs: dto.moqPcs ?? null,
            validUntil: dto.validUntil ?? null,
            notes: dto.notes ?? null,
            notesFiltered: notes?.filtered ?? null,
            status: 'OFFERED',
            marginRuleId: rule?.id ?? null,
            pricedById: null,
            pricedAt: now,
            offeredAt: now,
        };
        const isUpdate = rfq.quotes.length > 0;
        const quote = await this.prisma.$transaction(async (tx) => {
            const saved = await tx.quote.upsert({
                where: {
                    rfqId_manufacturerProfileId: { rfqId: rfq.id, manufacturerProfileId: ctx.profileId },
                },
                create: { rfqId: rfq.id, manufacturerProfileId: ctx.profileId, ...data },
                update: data,
            });
            await tx.rfqInvitation.upsert({
                where: {
                    rfqId_manufacturerProfileId: { rfqId: rfq.id, manufacturerProfileId: ctx.profileId },
                },
                create: {
                    rfqId: rfq.id,
                    manufacturerProfileId: ctx.profileId,
                    status: 'QUOTED',
                    respondedAt: now,
                },
                update: { status: 'QUOTED', respondedAt: now },
            });
            return saved;
        });
        const profile = await this.prisma.manufacturerProfile.findUniqueOrThrow({
            where: { id: ctx.profileId },
            select: { publicCode: true },
        });
        await this.notifier.send(await this.notifier.companyUsers({ companyId: rfq.buyerCompanyId }), 'QUOTE_OFFERED', `${isUpdate ? 'Updated offer' : 'New offer'} on ${rfq.code}`, `${profile.publicCode} quoted ${String(dto.leadTimeDays)} days lead time. Compare offers on the RFQ page.`, { rfqCode: rfq.code });
        await this.audit.log({
            actorUserId: ctx.userId,
            action: notes?.flagged
                ? 'moderation.contact_filtered'
                : isUpdate
                    ? 'quote.updated'
                    : 'quote.offered',
            entityType: 'Quote',
            entityId: quote.id,
            metadata: {
                rfqCode: rfq.code,
                marginRuleId: rule?.id ?? null,
                ...(notes?.flagged && { reasons: notes.reasons }),
            },
        });
        return this.ownQuote({
            manufacturerUnitPriceMinor: quote.manufacturerUnitPriceMinor,
            leadTimeDays: quote.leadTimeDays,
            moqPcs: quote.moqPcs,
            validUntil: quote.validUntil,
            notes: quote.notes,
            status: quote.status,
            updatedAt: quote.updatedAt,
        }, rfq.quantity);
    }
    async factory(ctx) {
        const [profile, settings] = await Promise.all([
            this.prisma.manufacturerProfile.findUniqueOrThrow({
                where: { id: ctx.profileId },
                select: {
                    moqPcs: true,
                    monthlyCapacityPcs: true,
                    planTier: true,
                    categories: { select: { id: true, parentId: true } },
                },
            }),
            this.plans.settings(),
        ]);
        return { ...profile, terms: settings.tiers[profile.planTier] };
    }
    async find(ctx, code) {
        const rfq = await this.prisma.rfq.findUnique({
            where: { code },
            include: rfqInclude(ctx.profileId),
        });
        if (!rfq || rfq.status === 'DRAFT')
            throw new NotFoundException('RFQ not found');
        return rfq;
    }
    access(factory, rfq) {
        const now = Date.now();
        const invitation = rfq.invitations[0];
        const invited = invitation !== undefined && invitation.visibleAt.getTime() <= now;
        const inviteOnly = rfq.productId !== null || rfq.capacityBookingId !== null;
        const { matched, reasons } = matchRfq(factory, {
            category: rfq.category,
            quantity: rfq.quantity,
            deadline: rfq.deadline,
            requiredDeliveryDate: rfq.requiredDeliveryDate,
            invited: inviteOnly && invited,
            inviteOnly,
        });
        const open = rfq.status === 'OPEN' && rfq.deadline.getTime() > now;
        const waiting = !factory.terms.rfqHeadStart &&
            rfq.headStartEndsAt !== null &&
            rfq.headStartEndsAt.getTime() > now;
        const visible = invited || rfq.quotes.length > 0 || (open && matched && !waiting);
        return { visible, reasons };
    }
    canQuote(rfq) {
        const mine = rfq.quotes[0];
        return (rfq.status === 'OPEN' &&
            rfq.deadline.getTime() > Date.now() &&
            (mine === undefined || EDITABLE.includes(mine.status)));
    }
    scrub(rfq, text) {
        return scrubText(text, identityPatterns(identityOf(rfq.buyerCompany)));
    }
    summary(rfq, reasons, priorityOn) {
        const mine = rfq.quotes[0];
        return {
            priority: priorityOn && (rfq.buyerCompany.buyerProfile?.plusActive ?? false),
            code: rfq.code,
            title: this.scrub(rfq, rfq.titleFiltered ?? rfq.title) ?? rfq.code,
            categoryName: rfq.category.name,
            buyerCode: rfq.buyerCompany.buyerProfile?.publicCode ?? 'BYR',
            quantity: rfq.quantity,
            currency: rfq.currency,
            deadline: rfq.deadline.toISOString(),
            requiredDeliveryDate: rfq.requiredDeliveryDate?.toISOString() ?? null,
            incoterm: rfq.incoterm,
            destinationCountry: rfq.destinationCountry,
            publishedAt: rfq.publishedAt?.toISOString() ?? null,
            reasons,
            myQuote: mine ? this.ownQuote(mine, rfq.quantity) : null,
        };
    }
    ownQuote(q, quantity) {
        return {
            unitPriceMinor: q.manufacturerUnitPriceMinor,
            totalMinor: q.manufacturerUnitPriceMinor * quantity,
            leadTimeDays: q.leadTimeDays,
            moqPcs: q.moqPcs,
            validUntil: q.validUntil?.toISOString() ?? null,
            notes: q.notes,
            status: q.status,
            updatedAt: q.updatedAt.toISOString(),
        };
    }
};
ManufacturerRfqsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        RfqFilesService,
        AuditService,
        RfqNotifier,
        PlansService,
        BuyerPlusService])
], ManufacturerRfqsService);
export { ManufacturerRfqsService };
//# sourceMappingURL=manufacturer-rfqs.service.js.map