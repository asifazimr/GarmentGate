import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {
  filterContactDetails,
  type ManufacturerQuote,
  type ManufacturerRfqDetail,
  type ManufacturerRfqSummary,
  type PlanTerms,
  type QuoteDto,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { identityForScrubbing } from '../catalog/catalog.queries.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import type { ManufacturerContext } from '../manufacturer/manufacturer-context.service.js';
import { BuyerPlusService } from '../plans/buyer-plus.service.js';
import { PlansService } from '../plans/plans.service.js';
import { applyMarkup, pickQuoteRule } from '../pricing/margin.js';
import { matchRfq, type MatchableFactory } from './rfq-matching.js';
import { attachmentInclude, RfqFilesService } from './rfq-files.service.js';
import { RfqNotifier } from './rfq-notifier.service.js';

/** Quotes a factory may still change. */
const EDITABLE = ['SUBMITTED', 'UNDER_REVIEW', 'OFFERED'] as const;

/** The factory's matching data plus the plan terms in force. */
type PlannedFactory = MatchableFactory & { terms: PlanTerms };

const rfqInclude = (profileId: string) =>
  ({
    category: { select: { id: true, name: true, parentId: true } },
    // Identity is loaded only to scrub it out of the buyer's free text.
    buyerCompany: {
      select: {
        ...identityForScrubbing.select,
        buyerProfile: { select: { publicCode: true, plusActive: true } },
      },
    },
    invitations: { where: { manufacturerProfileId: profileId } },
    // The factory's own quote only, and never the buyer price.
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
  }) satisfies Prisma.RfqInclude;
type RfqRow = Prisma.RfqGetPayload<{ include: ReturnType<typeof rfqInclude> }>;

/**
 * RFQs as factories see them. The buyer is only ever a BYR- code; buyer prices, the buyer's
 * target price and other factories' quotes are never loaded.
 */
@Injectable()
export class ManufacturerRfqsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rfqFiles: RfqFilesService,
    private readonly audit: AuditService,
    private readonly notifier: RfqNotifier,
    private readonly plans: PlansService,
    private readonly buyerPlus: BuyerPlusService,
  ) {}

  async inbox(ctx: ManufacturerContext): Promise<ManufacturerRfqSummary[]> {
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
    // Priority (GarmentGate Plus) requests first, then by deadline.
    return rfqs
      .flatMap((r) => {
        const access = this.access(factory, r);
        return access.visible ? [this.summary(r, access.reasons, priorityRfqs)] : [];
      })
      .sort((a, b) => Number(b.priority) - Number(a.priority));
  }

  async detail(ctx: ManufacturerContext, code: string): Promise<ManufacturerRfqDetail> {
    const factory = await this.factory(ctx);
    const rfq = await this.find(ctx, code);
    const access = this.access(factory, rfq);
    if (!access.visible) throw new NotFoundException('RFQ not found');

    // First look: mark the invitation viewed (or record that a matched factory looked).
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
    } else if (invitation.status === 'INVITED') {
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

  /**
   * Creates or updates the factory's quote. The buyer price is GarmentGate's markup on top
   * (buyer-specific rule > category > parent > default) and goes straight to the buyer.
   */
  async submitQuote(
    ctx: ManufacturerContext,
    code: string,
    dto: QuoteDto,
  ): Promise<ManufacturerQuote> {
    const factory = await this.factory(ctx);
    const rfq = await this.find(ctx, code);
    if (!this.access(factory, rfq).visible) throw new NotFoundException('RFQ not found');
    if (!this.canQuote(rfq)) throw new ConflictException('This RFQ no longer accepts quotes');

    const rules = await this.prisma.marginRule.findMany({ where: { active: true } });
    const rule = pickQuoteRule(rules, rfq.category, rfq.buyerCompanyId);
    // A paid plan takes part of GarmentGate's markup off (never below the rule's floor).
    const buyerUnitPriceMinor = applyMarkup(
      dto.unitPriceMinor,
      rule,
      factory.terms.markupDiscountBps,
    );
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
      status: 'OFFERED' as const,
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
    await this.notifier.send(
      await this.notifier.companyUsers({ companyId: rfq.buyerCompanyId }),
      'QUOTE_OFFERED',
      `${isUpdate ? 'Updated offer' : 'New offer'} on ${rfq.code}`,
      `${profile.publicCode} quoted ${String(dto.leadTimeDays)} days lead time. Compare offers on the RFQ page.`,
      { rfqCode: rfq.code },
    );
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
    return this.ownQuote(
      {
        manufacturerUnitPriceMinor: quote.manufacturerUnitPriceMinor,
        leadTimeDays: quote.leadTimeDays,
        moqPcs: quote.moqPcs,
        validUntil: quote.validUntil,
        notes: quote.notes,
        status: quote.status,
        updatedAt: quote.updatedAt,
      },
      rfq.quantity,
    );
  }

  // ── helpers ───────────────────────────────────────────────────────────────

  private async factory(ctx: ManufacturerContext): Promise<PlannedFactory> {
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

  private async find(ctx: ManufacturerContext, code: string): Promise<RfqRow> {
    const rfq = await this.prisma.rfq.findUnique({
      where: { code },
      include: rfqInclude(ctx.profileId),
    });
    if (!rfq || rfq.status === 'DRAFT') throw new NotFoundException('RFQ not found');
    return rfq;
  }

  /**
   * A factory sees an RFQ it was invited to or quoted on, or an open one it currently matches.
   * Catalog requests (with a product) and capacity-booking conversions only ever go to that
   * one factory.
   */
  private access(factory: PlannedFactory, rfq: RfqRow) {
    const now = Date.now();
    const invitation = rfq.invitations[0];
    // A matched factory without a plan head start is invited with a later visibleAt.
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
    // A factory with a head start matched: the others wait for it to end.
    const waiting =
      !factory.terms.rfqHeadStart &&
      rfq.headStartEndsAt !== null &&
      rfq.headStartEndsAt.getTime() > now;
    const visible = invited || rfq.quotes.length > 0 || (open && matched && !waiting);
    return { visible, reasons };
  }

  private canQuote(rfq: RfqRow): boolean {
    const mine = rfq.quotes[0];
    return (
      rfq.status === 'OPEN' &&
      rfq.deadline.getTime() > Date.now() &&
      (mine === undefined || (EDITABLE as readonly string[]).includes(mine.status))
    );
  }

  private scrub(rfq: RfqRow, text: string | null): string | null {
    return scrubText(text, identityPatterns(identityOf(rfq.buyerCompany)));
  }

  private summary(
    rfq: RfqRow,
    reasons: ManufacturerRfqSummary['reasons'],
    priorityOn: boolean,
  ): ManufacturerRfqSummary {
    const mine = rfq.quotes[0];
    return {
      // A GarmentGate Plus buyer: flagged, never named.
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

  private ownQuote(q: RfqRow['quotes'][number], quantity: number): ManufacturerQuote {
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
}
