import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  type AddEvidenceDto,
  type AdminDispute,
  type AdminDisputeSummary,
  type BuyerDispute,
  canTransition,
  type DisputeEvidence,
  EVIDENCE_MAX_BYTES,
  filterContactDetails,
  type ManufacturerDispute,
  type OpenDisputeDto,
  type PresignEvidenceDto,
  type PresignUploadResponse,
  type ResolveDisputeDto,
} from '@garmentgate/shared';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { identityForScrubbing } from '../catalog/catalog.queries.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import { type ChatActor, ChatActorService } from '../chat/chat-actor.service.js';
import { fileWithRenditions, MediaService } from '../media/media.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import type { OrderRow } from '../orders/order-views.js';
import { actorOf, OrdersService } from '../orders/orders.service.js';
import { LedgerService } from '../payments/ledger.service.js';
import { PaymentsService } from '../payments/payments.service.js';
import { FilesService } from '../storage/files.service.js';
import { StorageService } from '../storage/storage.service.js';

const OPEN = ['OPEN', 'UNDER_REVIEW'] as const;
const REASON_LABEL: Record<string, string> = {
  QUALITY: 'quality',
  QUANTITY: 'quantity',
  LATE_DELIVERY: 'late delivery',
  NOT_AS_DESCRIBED: 'not as described',
  PAYMENT: 'payment',
  OTHER: 'other',
};

const disputeInclude = {
  evidence: { orderBy: { createdAt: 'asc' }, include: { file: fileWithRenditions } },
  openedBy: { select: { firstName: true, lastName: true } },
  assignedTo: { select: { firstName: true, lastName: true } },
  logisticsClaim: { select: { code: true, status: true } },
} satisfies Prisma.DisputeInclude;
type DisputeRow = Prisma.DisputeGetPayload<{ include: typeof disputeInclude }>;
type Side = 'BUYER' | 'MANUFACTURER' | 'ADMIN';

/**
 * Disputes. The buyer opens one with a reason, a description and evidence; the order moves to
 * DISPUTED in the same transaction. GarmentGate mediates in a dedicated thread with each side
 * (relayed as everywhere else). Evidence reaches the other side only once sanitized and
 * approved. Staff resolve it: for the buyer, for the factory or settled, with an optional
 * refund from unreleased escrow through the ledger, and the order resumes where it was, is
 * completed or is cancelled. The factory never sees refund amounts (buyer prices).
 */
@Injectable()
export class DisputesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orders: OrdersService,
    private readonly payments: PaymentsService,
    private readonly ledger: LedgerService,
    private readonly actors: ChatActorService,
    private readonly files: FilesService,
    private readonly media: MediaService,
    private readonly storage: StorageService,
    private readonly notifier: Notifier,
    private readonly audit: AuditService,
  ) {}

  // ── Parties ───────────────────────────────────────────────────────────────

  async open(actor: ChatActor, code: string, dto: OpenDisputeDto): Promise<{ id: string }> {
    const order = await this.orders.load(actor, code);
    if (actorOf(actor) !== 'BUYER') throw new ForbiddenException('The buyer opens disputes');
    if (!canTransition(order.status, 'DISPUTED', 'BUYER'))
      throw new ConflictException('This order can’t be disputed at this stage');
    const files: { id: string }[] = [];
    for (const fileId of new Set(dto.evidence)) {
      files.push(
        await this.files.confirmUpload(
          fileId,
          order.buyerCompanyId,
          'DISPUTE_EVIDENCE',
          EVIDENCE_MAX_BYTES,
        ),
      );
    }
    const filtered = filterContactDetails(dto.description);
    let id = '';
    try {
      await this.orders.move(
        actor,
        order,
        'DISPUTED',
        `Dispute opened: ${REASON_LABEL[dto.reason] ?? dto.reason}`,
        async (tx) => {
          ({ id } = await tx.dispute.create({
            data: {
              orderId: order.id,
              openedById: actor.userId,
              reason: dto.reason,
              description: dto.description,
              descriptionFiltered: filtered.filtered,
              evidence: {
                create: files.map((f) => ({
                  fileId: f.id,
                  submittedBy: 'BUYER' as const,
                  uploadedById: actor.userId,
                })),
              },
            },
          }));
          return { disputedFrom: order.status };
        },
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
        throw new ConflictException('A dispute is already open on this order');
      throw error;
    }
    for (const f of files) await this.media.enqueue(f.id);
    await this.audit.log({
      actorUserId: actor.userId,
      action: filtered.flagged ? 'moderation.contact_filtered' : 'dispute.opened',
      entityType: 'Dispute',
      entityId: id,
      metadata: { orderCode: order.code, reason: dto.reason },
    });
    const reason = REASON_LABEL[dto.reason] ?? dto.reason;
    await this.notifier.notify({
      to: { companyId: order.manufacturerProfile.company.id },
      type: 'DISPUTE_UPDATE',
      title: `${order.code}: the buyer opened a dispute`,
      body: `Reason: ${reason}. GarmentGate will mediate: reply in the dispute thread on the order.`,
      link: { orderCode: order.code },
    });
    await this.notifier.notify({
      to: 'ADMINS',
      type: 'DISPUTE_UPDATE',
      title: `New dispute: ${order.code}`,
      body: `${order.buyerCompany.buyerProfile?.publicCode ?? ''} vs ${order.manufacturerProfile.publicCode}: ${reason}`,
      link: { orderCode: order.code },
    });
    return { id };
  }

  async presign(
    actor: ChatActor,
    code: string,
    dto: PresignEvidenceDto,
  ): Promise<PresignUploadResponse> {
    const order = await this.orders.load(actor, code);
    const side = actorOf(actor);
    return this.files.reserveUpload({
      userId: actor.userId,
      companyId:
        side === 'ADMIN'
          ? null
          : side === 'BUYER'
            ? order.buyerCompanyId
            : order.manufacturerProfile.company.id,
      purpose: 'DISPUTE_EVIDENCE',
      folder: 'originals',
      fileName: dto.fileName,
      contentType: dto.contentType,
      sizeBytes: dto.sizeBytes,
      maxBytes: EVIDENCE_MAX_BYTES,
    });
  }

  async addEvidence(actor: ChatActor, code: string, dto: AddEvidenceDto): Promise<void> {
    const order = await this.orders.load(actor, code);
    const dispute = await this.prisma.dispute.findFirst({
      where: { orderId: order.id, status: { in: [...OPEN] } },
    });
    if (!dispute) throw new ConflictException('There’s no open dispute on this order');
    const side = actorOf(actor);
    const file = await this.files.confirmUpload(
      dto.fileId,
      side === 'ADMIN'
        ? { userId: actor.userId }
        : side === 'BUYER'
          ? order.buyerCompanyId
          : order.manufacturerProfile.company.id,
      'DISPUTE_EVIDENCE',
      EVIDENCE_MAX_BYTES,
    );
    await this.prisma.disputeEvidence.create({
      data: {
        disputeId: dispute.id,
        fileId: file.id,
        note: dto.note ? filterContactDetails(dto.note).filtered : null,
        submittedBy: side === 'ADMIN' ? 'STAFF' : side,
        uploadedById: actor.userId,
        // Staff-added evidence is already checked.
        reviewStatus: side === 'ADMIN' ? 'APPROVED' : 'PENDING',
      },
    });
    await this.media.enqueue(file.id);
    if (side !== 'ADMIN') {
      await this.notifier.notify({
        to: 'ADMINS',
        type: 'DISPUTE_UPDATE',
        title: `${order.code}: new dispute evidence`,
        body: `From the ${side === 'BUYER' ? 'buyer' : 'factory'}: review it in Moderation.`,
        link: { orderCode: order.code },
      });
    }
  }

  /** The latest dispute on the order, as the caller may see it (null if there is none). */
  async forOrder(
    actor: ChatActor,
    code: string,
  ): Promise<{ dispute: BuyerDispute | ManufacturerDispute | AdminDispute | null }> {
    const order = await this.orders.load(actor, code);
    const row = await this.prisma.dispute.findFirst({
      where: { orderId: order.id },
      orderBy: { createdAt: 'desc' },
      include: disputeInclude,
    });
    if (!row) return { dispute: null };
    const side = actorOf(actor);
    return { dispute: await this.view(row, order, side) };
  }

  // ── Staff ─────────────────────────────────────────────────────────────────

  async list(): Promise<AdminDisputeSummary[]> {
    const rows = await this.prisma.dispute.findMany({
      orderBy: [{ createdAt: 'desc' }],
      take: 200,
      include: {
        assignedTo: { select: { firstName: true, lastName: true } },
        order: {
          select: {
            code: true,
            buyerCompany: { select: { buyerProfile: { select: { publicCode: true } } } },
            manufacturerProfile: { select: { publicCode: true } },
          },
        },
        _count: { select: { evidence: { where: { reviewStatus: 'PENDING' } } } },
      },
    });
    // Open ones first.
    const rank = (s: string) => ((OPEN as readonly string[]).includes(s) ? 0 : 1);
    return rows
      .sort((a, b) => rank(a.status) - rank(b.status))
      .map((d) => ({
        id: d.id,
        orderCode: d.order.code,
        reason: d.reason,
        status: d.status,
        buyerCode: d.order.buyerCompany.buyerProfile?.publicCode ?? 'BYR',
        manufacturerCode: d.order.manufacturerProfile.publicCode,
        openedAt: d.createdAt.toISOString(),
        assignedTo: d.assignedTo ? `${d.assignedTo.firstName} ${d.assignedTo.lastName}` : null,
        evidenceToReview: d._count.evidence,
      }));
  }

  /** A member of staff takes the dispute on: OPEN → UNDER_REVIEW. */
  async assign(adminId: string, id: string): Promise<void> {
    const { count } = await this.prisma.dispute.updateMany({
      where: { id, status: { in: [...OPEN] } },
      data: { assignedToId: adminId, status: 'UNDER_REVIEW' },
    });
    if (count !== 1) throw new ConflictException('This dispute is already resolved');
    await this.audit.log({
      actorUserId: adminId,
      action: 'dispute.assigned',
      entityType: 'Dispute',
      entityId: id,
    });
  }

  async resolve(adminId: string, id: string, dto: ResolveDisputeDto): Promise<void> {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id },
      include: { order: { select: { code: true, status: true, disputedFrom: true } } },
    });
    if (!dispute) throw new NotFoundException('Dispute not found');
    if (!(OPEN as readonly string[]).includes(dispute.status))
      throw new ConflictException('This dispute is already resolved');
    if (dispute.order.status !== 'DISPUTED')
      throw new ConflictException('The order isn’t in dispute');
    const allowed = [dispute.order.disputedFrom, 'COMPLETED', 'CANCELLED'];
    if (!allowed.includes(dto.resumeTo))
      throw new BadRequestException('Resume the order where it was, complete it or cancel it');

    // Claim it first, so two staff resolving at once can't both refund.
    const { count } = await this.prisma.dispute.updateMany({
      where: { id, status: { in: [...OPEN] } },
      data: {
        status: dto.outcome,
        resolution: dto.resolution,
        refundAmountMinor: dto.refundMinor > 0 ? BigInt(dto.refundMinor) : null,
        resolvedAt: new Date(),
        resolvedById: adminId,
      },
    });
    if (count !== 1) throw new ConflictException('This dispute is already resolved');
    if (dto.refundMinor > 0) {
      try {
        await this.payments.refund(adminId, dispute.order.code, {
          amountMinor: dto.refundMinor,
          reason: `Dispute: ${dto.resolution}`.slice(0, 300),
        });
      } catch (error) {
        // No refund, no resolution: put the dispute back as it was.
        await this.prisma.dispute.update({
          where: { id },
          data: {
            status: dispute.status,
            resolution: null,
            refundAmountMinor: null,
            resolvedAt: null,
            resolvedById: null,
          },
        });
        throw error;
      }
    }
    const admin = await this.actors.resolve(adminId);
    await this.orders.transition(
      admin,
      dispute.order.code,
      { to: dto.resumeTo, note: `Dispute resolved: ${dto.resolution}` },
      { resolvingDispute: true },
    );
    await this.audit.log({
      actorUserId: adminId,
      action: 'dispute.resolved',
      entityType: 'Dispute',
      entityId: id,
      metadata: { outcome: dto.outcome, refundMinor: dto.refundMinor, resumeTo: dto.resumeTo },
    });

    const order = await this.prisma.order.findUniqueOrThrow({
      where: { code: dispute.order.code },
      select: {
        code: true,
        currency: true,
        buyerCompanyId: true,
        buyerCompany: identityForScrubbing,
        manufacturerProfile: { select: { companyId: true } },
      },
    });
    const outcome =
      dto.outcome === 'RESOLVED_FOR_BUYER'
        ? 'in the buyer’s favour'
        : dto.outcome === 'RESOLVED_FOR_MANUFACTURER'
          ? 'in the factory’s favour'
          : 'by agreement';
    await this.notifier.notify({
      to: { companyId: order.buyerCompanyId },
      type: 'DISPUTE_UPDATE',
      title: `${order.code}: dispute resolved ${outcome}`,
      body: dto.refundMinor > 0 ? `${dto.resolution} A refund is on its way.` : dto.resolution,
      link: { orderCode: order.code },
    });
    await this.notifier.notify({
      to: { companyId: order.manufacturerProfile.companyId },
      type: 'DISPUTE_UPDATE',
      title: `${order.code}: dispute resolved ${outcome}`,
      body:
        scrubText(dto.resolution, identityPatterns(identityOf(order.buyerCompany))) ??
        dto.resolution,
      link: { orderCode: order.code },
    });
  }

  // ── Views ─────────────────────────────────────────────────────────────────

  private async view(
    d: DisputeRow,
    order: OrderRow,
    side: Side,
  ): Promise<BuyerDispute | ManufacturerDispute | AdminDispute> {
    const mine = side === 'ADMIN' ? 'STAFF' : side;
    const visible = d.evidence.filter(
      (e) =>
        side === 'ADMIN' ||
        e.submittedBy === mine ||
        (e.reviewStatus === 'APPROVED' && e.file.processingStatus === 'READY'),
    );
    const evidence = await Promise.all(
      visible.map(async (e, i): Promise<DisputeEvidence> => {
        const pdf = e.file.mimeType === 'application/pdf';
        const name = `${order.code}-evidence-${String(i + 1)}.${pdf ? 'pdf' : 'webp'}`;
        const urls = pdf ? null : await this.media.urls(e.file);
        const url = pdf
          ? e.file.processingStatus === 'READY' && e.file.sanitizedKey
            ? await this.storage.presignDownload(e.file.sanitizedKey, name)
            : null
          : (urls?.large ?? null);
        return {
          id: e.id,
          from:
            e.submittedBy === 'STAFF'
              ? 'GARMENTGATE'
              : e.submittedBy === mine
                ? 'YOU'
                : 'OTHER_SIDE',
          kind: pdf ? 'PDF' : 'IMAGE',
          name,
          url,
          thumbUrl: urls?.thumb ?? null,
          note:
            side === 'MANUFACTURER'
              ? scrubText(e.note, identityPatterns(identityOf(order.buyerCompany)))
              : e.note,
          processing: e.file.processingStatus ?? 'PENDING',
          review: e.reviewStatus,
          createdAt: e.createdAt.toISOString(),
        };
      }),
    );
    const base = {
      id: d.id,
      orderCode: order.code,
      reason: d.reason,
      description:
        side === 'MANUFACTURER'
          ? (scrubText(d.descriptionFiltered, identityPatterns(identityOf(order.buyerCompany))) ??
            '')
          : d.descriptionFiltered,
      status: d.status,
      openedAt: d.createdAt.toISOString(),
      resolvedAt: d.resolvedAt?.toISOString() ?? null,
      resolution:
        side === 'MANUFACTURER'
          ? scrubText(d.resolution, identityPatterns(identityOf(order.buyerCompany)))
          : d.resolution,
      evidence,
    };
    if (side === 'MANUFACTURER') return base;
    const refundMinor = d.refundAmountMinor === null ? null : Number(d.refundAmountMinor);
    if (side === 'BUYER') return { ...base, refundMinor, currency: order.currency };
    const position = await this.ledger.orderPosition(order.id);
    const onShipment = await this.prisma.logisticsShipmentOrder.findFirst({
      where: { orderId: order.id, active: true },
      select: { shipment: { select: { code: true, departedAt: true } } },
    });
    return {
      ...base,
      originalDescription: d.description,
      refundMinor,
      currency: order.currency,
      buyer: {
        code: order.buyerCompany.buyerProfile?.publicCode ?? 'BYR',
        name: order.buyerCompany.legalName,
      },
      manufacturer: {
        code: order.manufacturerProfile.publicCode,
        name: order.manufacturerProfile.company.legalName,
      },
      openedBy: `${d.openedBy.firstName} ${d.openedBy.lastName}`,
      assignedTo: d.assignedTo ? `${d.assignedTo.firstName} ${d.assignedTo.lastName}` : null,
      disputedFrom: order.disputedFrom,
      refundableMinor: Number(position.escrow),
      logistics: onShipment?.shipment.departedAt
        ? { shipmentCode: onShipment.shipment.code, claim: d.logisticsClaim }
        : null,
    };
  }
}
