import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {
  type AcceptQuoteResult,
  type BuyerQuote,
  type BuyerRfqDetail,
  type BuyerRfqSummary,
  filterContactDetails,
  quoteBadges,
  RFQ_FILE_MAX_BYTES,
  type RfqCreated,
  type RfqDto,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { BuyerContext } from '../buyer/buyer-context.service.js';
import { identityForScrubbing, listedManufacturer } from '../catalog/catalog.queries.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import { MediaService } from '../media/media.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { FilesService } from '../storage/files.service.js';
import { matchRfq } from './rfq-matching.js';
import { attachmentInclude, RfqFilesService } from './rfq-files.service.js';
import { RfqNotifier } from './rfq-notifier.service.js';

/** Quotes the buyer has been shown (never SUBMITTED / UNDER_REVIEW ones). */
const SHOWN_TO_BUYER = ['OFFERED', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'WITHDRAWN'] as const;

const quoteInclude = {
  manufacturerProfile: {
    select: {
      publicCode: true,
      performanceScore: true,
      onTimeDeliveryBps: true,
      certifications: { where: { status: 'VERIFIED' }, select: { type: true } },
      company: identityForScrubbing,
    },
  },
} satisfies Prisma.QuoteInclude;
type QuoteRow = Prisma.QuoteGetPayload<{ include: typeof quoteInclude }>;

const isExpired = (q: { validUntil: Date | null }, now: number) =>
  q.validUntil !== null && q.validUntil.getTime() < now;

@Injectable()
export class BuyerRfqsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly files: FilesService,
    private readonly rfqFiles: RfqFilesService,
    private readonly media: MediaService,
    private readonly codes: PublicCodeService,
    private readonly audit: AuditService,
    private readonly notifier: RfqNotifier,
  ) {}

  async create(ctx: BuyerContext, dto: RfqDto): Promise<RfqCreated> {
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
      select: { id: true, parentId: true },
    });
    if (!category) throw new NotFoundException('Category not found');

    // Files went straight to storage: check each landed as declared before attaching it.
    for (const a of dto.attachments) {
      await this.files.confirmUpload(a.fileId, ctx.companyId, 'TECH_PACK', RFQ_FILE_MAX_BYTES);
    }

    const title = filterContactDetails(dto.title);
    const description = filterContactDetails(dto.description);
    const year = new Date().getUTCFullYear();
    const rfq = await this.prisma.$transaction(async (tx) => {
      const code = await this.codes.sequential(`RFQ-${String(year)}`, 5, tx);
      return tx.rfq.create({
        data: {
          code,
          buyerCompanyId: ctx.companyId,
          createdById: ctx.userId,
          categoryId: category.id,
          title: dto.title,
          titleFiltered: title.filtered,
          description: dto.description,
          descriptionFiltered: description.filtered,
          quantity: dto.quantity,
          targetUnitPriceMinor: dto.targetUnitPriceMinor ?? null,
          currency: dto.currency,
          deadline: dto.deadline,
          requiredDeliveryDate: dto.requiredDeliveryDate ?? null,
          incoterm: dto.incoterm,
          destinationCountry: dto.destinationCountry,
          status: 'OPEN',
          publishedAt: new Date(),
          attachments: { create: dto.attachments.map((a) => ({ fileId: a.fileId, kind: a.kind })) },
        },
      });
    });
    // Sanitize every file (images → renditions, PDFs → metadata-free copy).
    for (const a of dto.attachments) await this.media.enqueue(a.fileId);

    const reached = await this.inviteMatchedFactories(rfq.id, rfq.code, {
      category,
      quantity: dto.quantity,
      deadline: dto.deadline,
      requiredDeliveryDate: dto.requiredDeliveryDate ?? null,
    });
    await this.notifier.send(
      await this.notifier.admins(),
      'SYSTEM',
      `New RFQ ${rfq.code}`,
      `${ctx.publicCode} · ${String(reached)} factories matched`,
      {
        rfqCode: rfq.code,
      },
    );
    const flagged = title.flagged || description.flagged;
    await this.audit.log({
      actorUserId: ctx.userId,
      action: flagged ? 'moderation.contact_filtered' : 'rfq.published',
      entityType: 'Rfq',
      entityId: rfq.id,
      ...(flagged && { metadata: { reasons: [...title.reasons, ...description.reasons] } }),
    });
    return { code: rfq.code };
  }

  /** Records which factories the RFQ reached when published, and tells them. */
  private async inviteMatchedFactories(
    rfqId: string,
    code: string,
    rfq: {
      category: { id: string; parentId: string | null };
      quantity: number;
      deadline: Date;
      requiredDeliveryDate: Date | null;
    },
  ): Promise<number> {
    const factories = await this.prisma.manufacturerProfile.findMany({
      where: listedManufacturer,
      select: {
        id: true,
        moqPcs: true,
        monthlyCapacityPcs: true,
        categories: { select: { id: true, parentId: true } },
        company: { select: { users: { where: { status: 'ACTIVE' }, select: { id: true } } } },
      },
    });
    const matched = factories.filter(
      (f) => matchRfq(f, { ...rfq, invited: false, inviteOnly: false }).matched,
    );
    if (matched.length === 0) return 0;
    await this.prisma.rfqInvitation.createMany({
      data: matched.map((f) => ({ rfqId, manufacturerProfileId: f.id })),
      skipDuplicates: true,
    });
    await this.notifier.send(
      matched.flatMap((f) => f.company.users.map((u) => u.id)),
      'RFQ_INVITATION',
      `New RFQ ${code}`,
      `${rfq.quantity.toLocaleString('en')} pcs · quotes due ${rfq.deadline.toISOString().slice(0, 10)}`,
      { rfqCode: code },
    );
    return matched.length;
  }

  async list(ctx: BuyerContext): Promise<BuyerRfqSummary[]> {
    const rfqs = await this.prisma.rfq.findMany({
      where: { buyerCompanyId: ctx.companyId },
      orderBy: { createdAt: 'desc' },
      take: 200,
      select: {
        code: true,
        title: true,
        status: true,
        quantity: true,
        currency: true,
        deadline: true,
        createdAt: true,
        category: { select: { name: true } },
        quotes: {
          where: { status: { in: ['OFFERED', 'ACCEPTED'] } },
          select: { buyerUnitPriceMinor: true, validUntil: true, status: true },
        },
        orders: { select: { code: true }, take: 1 },
      },
    });
    const now = Date.now();
    return rfqs.map((r) => {
      const live = r.quotes.filter((q) => q.status === 'ACCEPTED' || !isExpired(q, now));
      const prices = live.flatMap((q) =>
        q.buyerUnitPriceMinor === null ? [] : [q.buyerUnitPriceMinor],
      );
      return {
        code: r.code,
        title: r.title,
        status: r.status,
        categoryName: r.category.name,
        quantity: r.quantity,
        currency: r.currency,
        deadline: r.deadline.toISOString(),
        createdAt: r.createdAt.toISOString(),
        offers: live.length,
        bestUnitPriceMinor: prices.length > 0 ? Math.min(...prices) : null,
        orderCode: r.orders[0]?.code ?? null,
      };
    });
  }

  async detail(ctx: BuyerContext, code: string): Promise<BuyerRfqDetail> {
    const rfq = await this.prisma.rfq.findFirst({
      where: { code, buyerCompanyId: ctx.companyId },
      include: {
        category: { select: { id: true, name: true } },
        attachments: { include: attachmentInclude },
        quotes: {
          where: { status: { in: [...SHOWN_TO_BUYER] }, buyerUnitPriceMinor: { not: null } },
          include: quoteInclude,
          orderBy: { buyerUnitPriceMinor: 'asc' },
        },
        orders: { select: { code: true }, take: 1 },
        _count: { select: { invitations: true } },
      },
    });
    if (!rfq) throw new NotFoundException('RFQ not found');

    const now = Date.now();
    const quotes = rfq.quotes.map((q) => this.buyerQuote(q, rfq.quantity, now));
    // Only live offers compete for badges.
    const badges = quoteBadges(
      quotes
        .filter((q) => q.status === 'OFFERED')
        .map((q) => ({
          id: q.id,
          unitPriceMinor: q.unitPriceMinor,
          leadTimeDays: q.leadTimeDays,
          performanceScore: q.manufacturer.performanceScore,
        })),
    );
    return {
      code: rfq.code,
      title: rfq.title,
      description: rfq.description,
      status: rfq.status,
      category: rfq.category,
      quantity: rfq.quantity,
      targetUnitPriceMinor: rfq.targetUnitPriceMinor,
      currency: rfq.currency,
      deadline: rfq.deadline.toISOString(),
      requiredDeliveryDate: rfq.requiredDeliveryDate?.toISOString() ?? null,
      incoterm: rfq.incoterm,
      destinationCountry: rfq.destinationCountry,
      createdAt: rfq.createdAt.toISOString(),
      factoriesReached: rfq._count.invitations,
      attachments: await this.rfqFiles.views(rfq.attachments, { kind: 'owner' }),
      quotes: quotes.map((q) => ({ ...q, badges: badges.get(q.id) ?? [] })),
      orderCode: rfq.orders[0]?.code ?? null,
    };
  }

  /** GarmentGate's price and the factory's code; notes scrubbed of the factory's identity. */
  private buyerQuote(q: QuoteRow, quantity: number, now: number): BuyerQuote {
    const unit = q.buyerUnitPriceMinor ?? 0;
    const m = q.manufacturerProfile;
    return {
      id: q.id,
      manufacturer: {
        code: m.publicCode,
        country: m.company.country,
        performanceScore: m.performanceScore,
        onTimeDeliveryBps: m.onTimeDeliveryBps,
        certifications: [...new Set(m.certifications.map((c) => c.type))],
      },
      unitPriceMinor: unit,
      totalMinor: unit * quantity,
      currency: q.currency,
      leadTimeDays: q.leadTimeDays,
      moqPcs: q.moqPcs,
      validUntil: q.validUntil?.toISOString() ?? null,
      notes: scrubText(q.notesFiltered, identityPatterns(identityOf(m.company))),
      status: q.status === 'OFFERED' && isExpired(q, now) ? 'EXPIRED' : q.status,
      offeredAt: q.offeredAt?.toISOString() ?? null,
      badges: [],
    };
  }

  /** Accepting a quote awards the RFQ and drafts the order; every other quote is declined. */
  async accept(ctx: BuyerContext, code: string, quoteId: string): Promise<AcceptQuoteResult> {
    const rfq = await this.prisma.rfq.findFirst({
      where: { code, buyerCompanyId: ctx.companyId },
      include: { buyerCompany: { select: { country: true } } },
    });
    if (!rfq) throw new NotFoundException('RFQ not found');
    const quote = await this.prisma.quote.findFirst({
      where: { id: quoteId, rfqId: rfq.id },
      include: { manufacturerProfile: { select: { id: true, publicCode: true } } },
    });
    const buyerUnit = quote?.buyerUnitPriceMinor ?? null;
    if (!quote || buyerUnit === null) throw new NotFoundException('Quote not found');
    if (quote.status !== 'OFFERED')
      throw new ConflictException('This quote can no longer be accepted');
    if (isExpired(quote, Date.now())) throw new ConflictException('This quote has expired');

    const year = new Date().getUTCFullYear();
    const order = await this.prisma.$transaction(async (tx) => {
      // Conditional updates: two accepts racing can't both win.
      const awarded = await tx.rfq.updateMany({
        where: { id: rfq.id, status: { in: ['OPEN', 'CLOSED'] } },
        data: { status: 'AWARDED' },
      });
      const accepted = await tx.quote.updateMany({
        where: { id: quote.id, status: 'OFFERED' },
        data: { status: 'ACCEPTED', decidedAt: new Date() },
      });
      if (awarded.count !== 1 || accepted.count !== 1) {
        throw new ConflictException('This RFQ has already been awarded');
      }
      await tx.quote.updateMany({
        where: {
          rfqId: rfq.id,
          id: { not: quote.id },
          status: { in: ['SUBMITTED', 'UNDER_REVIEW', 'OFFERED'] },
        },
        data: { status: 'REJECTED', decidedAt: new Date() },
      });
      const orderCode = await this.codes.sequential(`ORD-${String(year)}`, 5, tx);
      return tx.order.create({
        data: {
          code: orderCode,
          buyerCompanyId: ctx.companyId,
          manufacturerProfileId: quote.manufacturerProfileId,
          rfqId: rfq.id,
          quoteId: quote.id,
          title: rfq.title,
          specification: rfq.description,
          quantity: rfq.quantity,
          buyerUnitPriceMinor: buyerUnit,
          manufacturerUnitPriceMinor: quote.manufacturerUnitPriceMinor,
          buyerTotalMinor: BigInt(buyerUnit) * BigInt(rfq.quantity),
          manufacturerTotalMinor: BigInt(quote.manufacturerUnitPriceMinor) * BigInt(rfq.quantity),
          currency: quote.currency,
          incoterm: rfq.incoterm ?? 'FOB',
          destinationCountry: rfq.destinationCountry ?? rfq.buyerCompany.country,
          requestedShipDate: rfq.requiredDeliveryDate,
          status: 'DRAFT',
          events: {
            create: [
              { toStatus: 'DRAFT', actorUserId: ctx.userId, note: `Quote accepted on ${rfq.code}` },
            ],
          },
        },
      });
    });

    const others = await this.prisma.quote.findMany({
      where: { rfqId: rfq.id, id: { not: quote.id }, status: 'REJECTED' },
      select: {
        manufacturerProfile: {
          select: { company: { select: { users: { select: { id: true } } } } },
        },
      },
    });
    await this.notifier.send(
      await this.notifier.companyUsers({ manufacturerProfileId: quote.manufacturerProfileId }),
      'ORDER_UPDATE',
      `Quote accepted: ${rfq.code}`,
      `Draft order ${order.code} for ${rfq.quantity.toLocaleString('en')} pcs. GarmentGate will confirm the terms with you.`,
      { rfqCode: rfq.code, orderCode: order.code },
    );
    await this.notifier.send(
      others.flatMap((o) => o.manufacturerProfile.company.users.map((u) => u.id)),
      'SYSTEM',
      `${rfq.code} was awarded`,
      'Another offer was selected this time. Thank you for quoting.',
      { rfqCode: rfq.code },
    );
    await this.notifier.send(
      await this.notifier.admins(),
      'ORDER_UPDATE',
      `Draft order ${order.code}`,
      `${ctx.publicCode} accepted ${quote.manufacturerProfile.publicCode} on ${rfq.code}`,
      { rfqCode: rfq.code, orderCode: order.code },
    );
    await this.audit.log({
      actorUserId: ctx.userId,
      action: 'quote.accepted',
      entityType: 'Quote',
      entityId: quote.id,
      metadata: { rfqCode: rfq.code, orderCode: order.code },
    });
    return { orderCode: order.code };
  }
}
