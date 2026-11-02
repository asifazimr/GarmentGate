import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  CHAT_FILE_MAX_BYTES,
  type ChatMessage,
  type ConversationDetail,
  type ConversationSummary,
  filterContactDetails,
  type OpenConversationDto,
  type SendMessageDto,
} from '@garmentgate/shared';
import type { Queue } from 'bullmq';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import { identityForScrubbing } from '../catalog/catalog.queries.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import { MediaService } from '../media/media.service.js';
import { FilesService } from '../storage/files.service.js';
import { StorageService } from '../storage/storage.service.js';
import { type ChatActor, ChatActorService } from './chat-actor.service.js';
import { ChatModerationService } from './chat-moderation.service.js';
import { ChatRealtime } from './chat-realtime.service.js';
import { CHAT_SCAN_QUEUE, type ChatScanJob } from './chat.constants.js';
import {
  type AttachmentLinks,
  messageInclude,
  type MessageRow,
  messageView,
} from './chat-views.js';

const conversationInclude = {
  company: {
    select: {
      legalName: true,
      type: true,
      buyerProfile: { select: { publicCode: true } },
      manufacturerProfile: { select: { publicCode: true } },
    },
  },
  rfq: { select: { code: true } },
  order: { select: { code: true } },
  dispute: { select: { order: { select: { code: true } } } },
} satisfies Prisma.ConversationInclude;
type ConversationRow = Prisma.ConversationGetPayload<{ include: typeof conversationInclude }>;

const companyCode = (c: ConversationRow) =>
  c.company.buyerProfile?.publicCode ?? c.company.manufacturerProfile?.publicCode ?? 'GG';

const PAGE = 50;

/**
 * Relayed chat. Every thread is one company ↔ GarmentGate, tied to an RFQ or an order; the
 * database refuses any participant outside that company (staff excepted).
 */
@Injectable()
export class ConversationsService {
  private readonly logger = new Logger(ConversationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notifier: Notifier,
    private readonly actors: ChatActorService,
    private readonly files: FilesService,
    private readonly storage: StorageService,
    private readonly media: MediaService,
    private readonly moderation: ChatModerationService,
    private readonly realtime: ChatRealtime,
    private readonly audit: AuditService,
    @InjectQueue(CHAT_SCAN_QUEUE) private readonly scans: Queue<ChatScanJob>,
  ) {}

  // ── Threads ───────────────────────────────────────────────────────────────

  /** Finds or creates the thread for an RFQ / order, on the actor's side (or a side staff pick). */
  async open(actor: ChatActor, dto: OpenConversationDto): Promise<ConversationSummary> {
    const target = await this.resolveThread(actor, dto);
    const where = {
      type: target.type,
      companyId: target.companyId,
      rfqId: target.rfqId,
      orderId: target.orderId,
      disputeId: target.disputeId,
    };
    let conversation = await this.prisma.conversation.findFirst({ where });
    if (!conversation) {
      const members = await this.prisma.user.findMany({
        where: { companyId: target.companyId, status: 'ACTIVE' },
        select: { id: true },
      });
      try {
        conversation = await this.prisma.conversation.create({
          data: {
            ...where,
            subject: target.subject,
            participants: {
              create: [...members.map((m) => m.id), ...(actor.isAdmin ? [actor.userId] : [])].map(
                (userId) => ({ userId }),
              ),
            },
          },
        });
      } catch (error) {
        // Opened concurrently: use the one that won.
        if (!(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'))
          throw error;
        conversation = await this.prisma.conversation.findFirstOrThrow({ where });
      }
    }
    const [summary] = await this.summaries(actor, [conversation.id]);
    if (!summary) throw new NotFoundException('Conversation not found');
    return summary;
  }

  private async resolveThread(actor: ChatActor, dto: OpenConversationDto) {
    const notFound = () =>
      new NotFoundException(
        dto.rfqCode ? 'RFQ not found' : dto.disputeId ? 'Dispute not found' : 'Order not found',
      );
    const factoryFor = async (code: string | undefined) => {
      if (actor.isAdmin && code) {
        const p = await this.prisma.manufacturerProfile.findUnique({
          where: { publicCode: code },
          select: { id: true, companyId: true },
        });
        if (!p) throw new NotFoundException('Factory not found');
        return p;
      }
      if (actor.companyType === 'MANUFACTURER' && actor.manufacturerProfileId && actor.companyId) {
        return { id: actor.manufacturerProfileId, companyId: actor.companyId };
      }
      return null;
    };

    if (dto.rfqCode) {
      const rfq = await this.prisma.rfq.findUnique({
        where: { code: dto.rfqCode },
        include: {
          buyerCompany: identityForScrubbing,
          invitations: { select: { manufacturerProfileId: true } },
          quotes: { select: { manufacturerProfileId: true } },
        },
      });
      if (!rfq || rfq.status === 'DRAFT') throw notFound();
      const factory = await factoryFor(dto.factoryCode);
      if (factory) {
        const involved = [...rfq.invitations, ...rfq.quotes].some(
          (x) => x.manufacturerProfileId === factory.id,
        );
        if (!involved) throw notFound();
        // Factories see the contact-filtered title, scrubbed of the buyer's names.
        const title =
          scrubText(
            rfq.titleFiltered ?? rfq.title,
            identityPatterns(identityOf(rfq.buyerCompany)),
          ) ?? '';
        return {
          type: 'MANUFACTURER_PLATFORM' as const,
          companyId: factory.companyId,
          rfqId: rfq.id,
          orderId: null,
          disputeId: null,
          subject: `${rfq.code} · ${title}`,
        };
      }
      if (!actor.isAdmin && rfq.buyerCompanyId !== actor.companyId) throw notFound();
      return {
        type: 'BUYER_PLATFORM' as const,
        companyId: rfq.buyerCompanyId,
        rfqId: rfq.id,
        orderId: null,
        disputeId: null,
        subject: `${rfq.code} · ${rfq.title}`,
      };
    }

    if (dto.disputeId) {
      // Mediation: each side talks to GarmentGate in its own thread, as for orders.
      const dispute = await this.prisma.dispute.findUnique({
        where: { id: dto.disputeId },
        select: {
          id: true,
          order: {
            select: {
              code: true,
              buyerCompanyId: true,
              manufacturerProfileId: true,
              manufacturerProfile: { select: { publicCode: true } },
            },
          },
        },
      });
      if (!dispute) throw notFound();
      const factory = await factoryFor(dto.factoryCode);
      if (factory) {
        if (dispute.order.manufacturerProfileId !== factory.id) throw notFound();
        return {
          type: 'MANUFACTURER_PLATFORM' as const,
          companyId: factory.companyId,
          rfqId: null,
          orderId: null,
          disputeId: dispute.id,
          subject: `${dispute.order.code} · Dispute`,
        };
      }
      if (!actor.isAdmin && dispute.order.buyerCompanyId !== actor.companyId) throw notFound();
      return {
        type: 'BUYER_PLATFORM' as const,
        companyId: dispute.order.buyerCompanyId,
        rfqId: null,
        orderId: null,
        disputeId: dispute.id,
        subject: `${dispute.order.code} · Dispute`,
      };
    }

    const order = await this.prisma.order.findUnique({
      where: { code: dto.orderCode ?? '' },
      include: {
        rfq: { select: { titleFiltered: true } },
        buyerCompany: identityForScrubbing,
      },
    });
    if (!order) throw notFound();
    const factory = await factoryFor(dto.factoryCode);
    if (factory) {
      if (order.manufacturerProfileId !== factory.id) throw notFound();
      const title =
        scrubText(
          order.rfq?.titleFiltered ?? order.title,
          identityPatterns(identityOf(order.buyerCompany)),
        ) ?? '';
      return {
        type: 'MANUFACTURER_PLATFORM' as const,
        companyId: factory.companyId,
        rfqId: null,
        orderId: order.id,
        disputeId: null,
        subject: `${order.code} · ${title}`,
      };
    }
    if (!actor.isAdmin && order.buyerCompanyId !== actor.companyId) throw notFound();
    return {
      type: 'BUYER_PLATFORM' as const,
      companyId: order.buyerCompanyId,
      rfqId: null,
      orderId: order.id,
      disputeId: null,
      subject: `${order.code} · ${order.title}`,
    };
  }

  async list(actor: ChatActor): Promise<ConversationSummary[]> {
    const rows = await this.prisma.conversation.findMany({
      where: actor.isAdmin ? {} : { companyId: actor.companyId ?? '' },
      orderBy: [{ lastMessageAt: { sort: 'desc', nulls: 'last' } }, { createdAt: 'desc' }],
      take: 200,
      select: { id: true },
    });
    return this.summaries(
      actor,
      rows.map((r) => r.id),
    );
  }

  private async summaries(actor: ChatActor, ids: string[]): Promise<ConversationSummary[]> {
    if (ids.length === 0) return [];
    const [rows, unread, flagged] = await Promise.all([
      this.prisma.conversation.findMany({
        where: { id: { in: ids } },
        include: {
          ...conversationInclude,
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
              filteredContent: true,
              createdAt: true,
              senderId: true,
              attachments: { select: { id: true } },
            },
          },
        },
      }),
      this.unreadByConversation(actor, ids),
      actor.isAdmin
        ? this.prisma.message.groupBy({
            by: ['conversationId'],
            where: { conversationId: { in: ids }, flagged: true, moderationStatus: 'FLAGGED' },
            _count: { _all: true },
          })
        : Promise.resolve([]),
    ]);
    const byId = new Map(rows.map((r) => [r.id, r]));
    const flaggedBy = new Map(flagged.map((f) => [f.conversationId, f._count._all]));
    return ids.flatMap((id) => {
      const c = byId.get(id);
      if (!c) return [];
      const last = c.messages[0];
      return [
        {
          ...this.summaryBase(actor, c),
          lastMessage: last
            ? {
                preview: last.filteredContent || (last.attachments.length > 0 ? '📎' : ''),
                at: last.createdAt.toISOString(),
                fromMe: last.senderId === actor.userId,
              }
            : null,
          unread: unread.get(id) ?? 0,
          flagged: flaggedBy.get(id) ?? 0,
        },
      ];
    });
  }

  private summaryBase(actor: ChatActor, c: ConversationRow) {
    const [code = '', ...rest] = c.subject.split(' · ');
    return {
      id: c.id,
      type:
        c.type === 'MANUFACTURER_PLATFORM'
          ? ('MANUFACTURER_PLATFORM' as const)
          : ('BUYER_PLATFORM' as const),
      subject: c.subject,
      context: c.rfq
        ? { kind: 'RFQ' as const, code: c.rfq.code, title: rest.join(' · ') || code }
        : c.order
          ? { kind: 'ORDER' as const, code: c.order.code, title: rest.join(' · ') || code }
          : c.dispute
            ? { kind: 'DISPUTE' as const, code: c.dispute.order.code, title: rest.join(' · ') }
            : null,
      counterpart: actor.isAdmin
        ? { code: companyCode(c), name: c.company.legalName }
        : { code: 'GarmentGate', name: null },
    };
  }

  async detail(actor: ChatActor, id: string): Promise<ConversationDetail> {
    const conversation = await this.actors.conversation(actor, id);
    const [summary] = await this.summaries(actor, [conversation.id]);
    if (!summary) throw new NotFoundException('Conversation not found');
    const { messages, hasMore } = await this.messages(actor, id, undefined, PAGE);

    // Read receipts: when the other side last read the thread.
    const participants = await this.prisma.conversationParticipant.findMany({
      where: { conversationId: id, lastReadAt: { not: null } },
      select: { lastReadAt: true, user: { select: { role: true } } },
    });
    const otherSide = participants
      .filter((p) => (p.user.role === 'ADMIN') !== actor.isAdmin)
      .map((p) => p.lastReadAt?.getTime() ?? 0);
    const otherSideReadAt =
      otherSide.length > 0 ? new Date(Math.max(...otherSide)).toISOString() : null;

    let relayTargets: ConversationDetail['relayTargets'] = [];
    if (actor.isAdmin && (conversation.rfqId ?? conversation.orderId)) {
      const siblings = await this.prisma.conversation.findMany({
        where: {
          id: { not: id },
          ...(conversation.rfqId
            ? { rfqId: conversation.rfqId }
            : { orderId: conversation.orderId }),
        },
        include: conversationInclude,
      });
      relayTargets = siblings.map((s) => ({
        id: s.id,
        label: `${s.type === 'BUYER_PLATFORM' ? 'Buyer' : 'Factory'} ${companyCode(s)}`,
      }));
    }
    return { ...summary, messages, hasMore, otherSideReadAt, relayTargets };
  }

  async messages(
    actor: ChatActor,
    id: string,
    before: Date | undefined,
    limit: number,
  ): Promise<{ messages: ChatMessage[]; hasMore: boolean }> {
    const conversation = await this.actors.conversation(actor, id);
    const rows = await this.prisma.message.findMany({
      where: { conversationId: id, ...(before && { createdAt: { lt: before } }) },
      orderBy: { createdAt: 'desc' },
      take: limit + 1,
      include: messageInclude,
    });
    const page = rows.slice(0, limit).reverse();
    const code = await this.companyCodeOf(conversation.companyId);
    const views = await this.views(page, actor.isAdmin ? 'staff' : 'company', code, actor.userId);
    return { messages: views, hasMore: rows.length > limit };
  }

  // ── Messages ──────────────────────────────────────────────────────────────

  async presign(
    actor: ChatActor,
    id: string,
    file: { fileName: string; contentType: string; sizeBytes: number },
  ) {
    const conversation = await this.actors.conversation(actor, id);
    // Files belong to the thread's company, whoever uploads them (staff included).
    return this.files.reserveUpload({
      userId: actor.userId,
      companyId: conversation.companyId,
      purpose: 'MESSAGE_ATTACHMENT',
      folder: 'originals',
      fileName: file.fileName,
      contentType: file.contentType,
      sizeBytes: file.sizeBytes,
      maxBytes: CHAT_FILE_MAX_BYTES,
    });
  }

  /**
   * Filters the text and file names, stores the original for staff, delivers the filtered
   * version, and flags/records the attempt when contact details were found.
   */
  async send(actor: ChatActor, id: string, dto: SendMessageDto): Promise<ChatMessage> {
    const conversation = await this.actors.conversation(actor, id);
    const files = [];
    for (const fileId of dto.attachments) {
      files.push(
        await this.files.confirmUpload(
          fileId,
          conversation.companyId,
          'MESSAGE_ATTACHMENT',
          CHAT_FILE_MAX_BYTES,
        ),
      );
    }
    const text = filterContactDetails(dto.body);
    const names = files.map((f) => ({ file: f, result: filterContactDetails(f.originalFilename) }));
    const flagged = text.flagged || names.some((n) => n.result.flagged);

    const message = await this.prisma.$transaction(async (tx) => {
      const created = await tx.message.create({
        data: {
          conversationId: id,
          senderId: actor.userId,
          originalContent: dto.body,
          filteredContent: text.filtered,
          flagged,
          flagReasons: text.reasons,
          moderationStatus: flagged ? 'FLAGGED' : 'CLEAN',
          attachments: {
            create: names.map(({ file, result }) => ({
              fileId: file.id,
              displayName: result.filtered,
              flagged: result.flagged,
              flagReasons: result.reasons,
            })),
          },
        },
        include: messageInclude,
      });
      await tx.conversation.update({ where: { id }, data: { lastMessageAt: created.createdAt } });
      // The sender has read everything up to their own message.
      await tx.conversationParticipant.upsert({
        where: { conversationId_userId: { conversationId: id, userId: actor.userId } },
        create: { conversationId: id, userId: actor.userId, lastReadAt: created.createdAt },
        update: { lastReadAt: created.createdAt },
      });
      return created;
    });

    for (const file of files) {
      await this.media.enqueue(file.id); // sanitize: metadata-free copy / renditions
      if (file.mimeType === 'application/pdf') {
        const attachment = message.attachments.find((a) => a.fileId === file.id);
        if (attachment) {
          await this.scans
            .add(
              'scan',
              { attachmentId: attachment.id },
              {
                attempts: 3,
                backoff: { type: 'exponential', delay: 2_000 },
                removeOnComplete: 500,
                removeOnFail: 1_000,
              },
            )
            .catch((error: unknown) => {
              this.logger.error({ err: error }, 'Failed to queue attachment scan');
            });
        }
      }
    }
    if (flagged) {
      await this.audit.log({
        actorUserId: actor.userId,
        action: 'moderation.contact_filtered',
        entityType: 'Message',
        entityId: message.id,
        metadata: {
          reasons: [...new Set([...text.reasons, ...names.flatMap((n) => n.result.reasons)])],
        },
      });
      await this.moderation.recordViolation(actor.userId);
    }
    if (actor.isAdmin) await this.notifyCompany(conversation);

    await this.broadcast('message', message);
    const [view] = await this.views(
      [message],
      actor.isAdmin ? 'staff' : 'company',
      await this.companyCodeOf(conversation.companyId),
      actor.userId,
    );
    if (!view) throw new NotFoundException('Message not found');
    return view;
  }

  /** Staff copy a message into the other side's thread, under the source's code only. */
  async relay(actor: ChatActor, messageId: string, toConversationId: string): Promise<ChatMessage> {
    const source = await this.prisma.message.findUnique({
      where: { id: messageId },
      include: { conversation: { include: { company: identityForScrubbing } } },
    });
    const target = await this.prisma.conversation.findUnique({ where: { id: toConversationId } });
    const sameDeal =
      source &&
      target &&
      target.id !== source.conversationId &&
      ((source.conversation.rfqId !== null && source.conversation.rfqId === target.rfqId) ||
        (source.conversation.orderId !== null && source.conversation.orderId === target.orderId));
    if (!source || !target || !sameDeal) throw new NotFoundException('Nothing to relay there');
    // Filtered text, scrubbed of the source company's names: the target company never learns who.
    const body =
      scrubText(
        source.filteredContent,
        identityPatterns(identityOf(source.conversation.company)),
      ) ?? '';
    const message = await this.prisma.message.create({
      data: {
        conversationId: target.id,
        senderId: actor.userId,
        originalContent: body,
        filteredContent: body,
        relayedFromId: source.id,
      },
      include: messageInclude,
    });
    await this.prisma.conversation.update({
      where: { id: target.id },
      data: { lastMessageAt: message.createdAt },
    });
    await this.audit.log({
      actorUserId: actor.userId,
      action: 'message.relayed',
      entityType: 'Message',
      entityId: message.id,
      metadata: { from: source.id },
    });
    await this.notifyCompany(target);
    await this.broadcast('message', message);
    const [view] = await this.views(
      [message],
      'staff',
      await this.companyCodeOf(target.companyId),
      actor.userId,
    );
    if (!view) throw new NotFoundException('Message not found');
    return view;
  }

  async markRead(actor: ChatActor, id: string): Promise<void> {
    const conversation = await this.actors.conversation(actor, id);
    const now = new Date();
    await this.prisma.conversationParticipant.upsert({
      where: { conversationId_userId: { conversationId: id, userId: actor.userId } },
      create: { conversationId: id, userId: actor.userId, lastReadAt: now },
      update: { lastReadAt: now },
    });
    this.realtime.read(
      conversation,
      {
        conversationId: id,
        side: actor.isAdmin ? 'GARMENTGATE' : 'COMPANY',
        readAt: now.toISOString(),
      },
      actor.userId,
    );
  }

  async unreadTotal(actor: ChatActor): Promise<number> {
    const counts = await this.unreadByConversation(actor, null);
    let total = 0;
    for (const n of counts.values()) total += n;
    return total;
  }

  /**
   * Unread = messages from others after the viewer's lastReadAt. Staff count only what
   * companies wrote (not each other's messages).
   */
  private async unreadByConversation(
    actor: ChatActor,
    ids: string[] | null,
  ): Promise<Map<string, number>> {
    const scope = actor.isAdmin
      ? Prisma.sql`TRUE`
      : Prisma.sql`c."companyId" = ${actor.companyId ?? ''}::uuid`;
    const only = ids === null ? Prisma.sql`TRUE` : Prisma.sql`c."id" = ANY(${ids}::uuid[])`;
    const fromCompanies = actor.isAdmin ? Prisma.sql`s."role" <> 'ADMIN'` : Prisma.sql`TRUE`;
    const rows = await this.prisma.$queryRaw<{ id: string; unread: number }[]>`
      SELECT c."id", count(m."id")::int AS "unread"
        FROM "conversations" c
        JOIN "messages" m ON m."conversationId" = c."id"
        JOIN "users" s ON s."id" = m."senderId"
        LEFT JOIN "conversation_participants" p ON p."conversationId" = c."id" AND p."userId" = ${actor.userId}::uuid
       WHERE ${scope} AND ${only} AND ${fromCompanies}
         AND m."senderId" <> ${actor.userId}::uuid
         AND m."createdAt" > COALESCE(p."lastReadAt", 'epoch'::timestamp)
       GROUP BY c."id"`;
    return new Map(rows.map((r) => [r.id, r.unread]));
  }

  // ── Views and delivery ───────────────────────────────────────────────────

  async views(
    rows: MessageRow[],
    kind: 'company' | 'staff',
    code: string,
    viewerId: string | null,
  ): Promise<ChatMessage[]> {
    const links = await this.links(rows);
    const relayed = await this.relayLabels(rows);
    return rows.map((m) =>
      messageView(
        m,
        kind === 'staff'
          ? { kind: 'staff', viewerId, companyCode: code }
          : { kind: 'company', viewerId },
        links,
        relayed,
      ),
    );
  }

  /** Pushes a new/changed message to the thread's company and to staff, each in its own view. */
  async broadcast(event: 'message' | 'messageUpdated', message: MessageRow): Promise<void> {
    const conversation = await this.prisma.conversation.findUniqueOrThrow({
      where: { id: message.conversationId },
    });
    const code = await this.companyCodeOf(conversation.companyId);
    const [company] = await this.views([message], 'company', code, null);
    const [staff] = await this.views([message], 'staff', code, null);
    if (company && staff) this.realtime.message(event, conversation, { company, staff });
  }

  async messageRow(id: string): Promise<MessageRow> {
    return this.prisma.message.findUniqueOrThrow({ where: { id }, include: messageInclude });
  }

  private async links(rows: MessageRow[]): Promise<AttachmentLinks> {
    const entries = await Promise.all(
      rows.flatMap((m) =>
        m.attachments.map(async (a) => {
          if (a.file.processingStatus !== 'READY')
            return [a.id, { url: null, thumbUrl: null }] as const;
          if (a.file.mimeType === 'application/pdf') {
            const url = a.file.sanitizedKey
              ? await this.storage.presignDownload(a.file.sanitizedKey, a.displayName)
              : null;
            return [a.id, { url, thumbUrl: null }] as const;
          }
          const urls = await this.media.urls(a.file);
          return [a.id, { url: urls?.large ?? null, thumbUrl: urls?.thumb ?? null }] as const;
        }),
      ),
    );
    return new Map(entries);
  }

  private async relayLabels(rows: MessageRow[]): Promise<Map<string, string>> {
    const ids = rows.flatMap((m) => (m.relayedFromId ? [m.relayedFromId] : []));
    if (ids.length === 0) return new Map();
    const sources = await this.prisma.message.findMany({
      where: { id: { in: ids } },
      select: { id: true, conversation: { select: { companyId: true } } },
    });
    const codes = new Map<string, string>();
    for (const s of sources) codes.set(s.id, await this.companyCodeOf(s.conversation.companyId));
    return codes;
  }

  private async companyCodeOf(companyId: string): Promise<string> {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      select: {
        buyerProfile: { select: { publicCode: true } },
        manufacturerProfile: { select: { publicCode: true } },
      },
    });
    return company?.buyerProfile?.publicCode ?? company?.manufacturerProfile?.publicCode ?? 'GG';
  }

  /** Staff replies also land in the notifications bell, for people not in the chat right now. */
  private async notifyCompany(conversation: {
    id: string;
    companyId: string;
    subject: string;
  }): Promise<void> {
    await this.notifier.notify({
      to: { companyId: conversation.companyId },
      type: 'MESSAGE_RECEIVED',
      title: 'New message from GarmentGate',
      body: conversation.subject,
      link: { conversationId: conversation.id },
    });
  }
}
