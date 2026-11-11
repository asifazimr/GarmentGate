var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ConversationsService_1;
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CHAT_FILE_MAX_BYTES, filterContactDetails, } from '@garmentgate/shared';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import { identityForScrubbing } from '../catalog/catalog.queries.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import { MediaService } from '../media/media.service.js';
import { FilesService } from '../storage/files.service.js';
import { StorageService } from '../storage/storage.service.js';
import { ChatActorService } from './chat-actor.service.js';
import { ChatModerationService } from './chat-moderation.service.js';
import { ChatRealtime } from './chat-realtime.service.js';
import { CHAT_SCAN_QUEUE } from './chat.constants.js';
import { messageInclude, messageView, } from './chat-views.js';
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
};
const companyCode = (c) => c.company.buyerProfile?.publicCode ?? c.company.manufacturerProfile?.publicCode ?? 'GG';
const PAGE = 50;
let ConversationsService = ConversationsService_1 = class ConversationsService {
    prisma;
    notifier;
    actors;
    files;
    storage;
    media;
    moderation;
    realtime;
    audit;
    scans;
    logger = new Logger(ConversationsService_1.name);
    constructor(prisma, notifier, actors, files, storage, media, moderation, realtime, audit, scans) {
        this.prisma = prisma;
        this.notifier = notifier;
        this.actors = actors;
        this.files = files;
        this.storage = storage;
        this.media = media;
        this.moderation = moderation;
        this.realtime = realtime;
        this.audit = audit;
        this.scans = scans;
    }
    async open(actor, dto) {
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
                            create: [...members.map((m) => m.id), ...(actor.isAdmin ? [actor.userId] : [])].map((userId) => ({ userId })),
                        },
                    },
                });
            }
            catch (error) {
                if (!(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'))
                    throw error;
                conversation = await this.prisma.conversation.findFirstOrThrow({ where });
            }
        }
        const [summary] = await this.summaries(actor, [conversation.id]);
        if (!summary)
            throw new NotFoundException('Conversation not found');
        return summary;
    }
    async resolveThread(actor, dto) {
        const notFound = () => new NotFoundException(dto.rfqCode ? 'RFQ not found' : dto.disputeId ? 'Dispute not found' : 'Order not found');
        const factoryFor = async (code) => {
            if (actor.isAdmin && code) {
                const p = await this.prisma.manufacturerProfile.findUnique({
                    where: { publicCode: code },
                    select: { id: true, companyId: true },
                });
                if (!p)
                    throw new NotFoundException('Factory not found');
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
            if (!rfq || rfq.status === 'DRAFT')
                throw notFound();
            const factory = await factoryFor(dto.factoryCode);
            if (factory) {
                const involved = [...rfq.invitations, ...rfq.quotes].some((x) => x.manufacturerProfileId === factory.id);
                if (!involved)
                    throw notFound();
                const title = scrubText(rfq.titleFiltered ?? rfq.title, identityPatterns(identityOf(rfq.buyerCompany))) ?? '';
                return {
                    type: 'MANUFACTURER_PLATFORM',
                    companyId: factory.companyId,
                    rfqId: rfq.id,
                    orderId: null,
                    disputeId: null,
                    subject: `${rfq.code} · ${title}`,
                };
            }
            if (!actor.isAdmin && rfq.buyerCompanyId !== actor.companyId)
                throw notFound();
            return {
                type: 'BUYER_PLATFORM',
                companyId: rfq.buyerCompanyId,
                rfqId: rfq.id,
                orderId: null,
                disputeId: null,
                subject: `${rfq.code} · ${rfq.title}`,
            };
        }
        if (dto.disputeId) {
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
            if (!dispute)
                throw notFound();
            const factory = await factoryFor(dto.factoryCode);
            if (factory) {
                if (dispute.order.manufacturerProfileId !== factory.id)
                    throw notFound();
                return {
                    type: 'MANUFACTURER_PLATFORM',
                    companyId: factory.companyId,
                    rfqId: null,
                    orderId: null,
                    disputeId: dispute.id,
                    subject: `${dispute.order.code} · Dispute`,
                };
            }
            if (!actor.isAdmin && dispute.order.buyerCompanyId !== actor.companyId)
                throw notFound();
            return {
                type: 'BUYER_PLATFORM',
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
        if (!order)
            throw notFound();
        const factory = await factoryFor(dto.factoryCode);
        if (factory) {
            if (order.manufacturerProfileId !== factory.id)
                throw notFound();
            const title = scrubText(order.rfq?.titleFiltered ?? order.title, identityPatterns(identityOf(order.buyerCompany))) ?? '';
            return {
                type: 'MANUFACTURER_PLATFORM',
                companyId: factory.companyId,
                rfqId: null,
                orderId: order.id,
                disputeId: null,
                subject: `${order.code} · ${title}`,
            };
        }
        if (!actor.isAdmin && order.buyerCompanyId !== actor.companyId)
            throw notFound();
        return {
            type: 'BUYER_PLATFORM',
            companyId: order.buyerCompanyId,
            rfqId: null,
            orderId: order.id,
            disputeId: null,
            subject: `${order.code} · ${order.title}`,
        };
    }
    async list(actor) {
        const rows = await this.prisma.conversation.findMany({
            where: actor.isAdmin ? {} : { companyId: actor.companyId ?? '' },
            orderBy: [{ lastMessageAt: { sort: 'desc', nulls: 'last' } }, { createdAt: 'desc' }],
            take: 200,
            select: { id: true },
        });
        return this.summaries(actor, rows.map((r) => r.id));
    }
    async summaries(actor, ids) {
        if (ids.length === 0)
            return [];
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
            if (!c)
                return [];
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
    summaryBase(actor, c) {
        const [code = '', ...rest] = c.subject.split(' · ');
        return {
            id: c.id,
            type: c.type === 'MANUFACTURER_PLATFORM'
                ? 'MANUFACTURER_PLATFORM'
                : 'BUYER_PLATFORM',
            subject: c.subject,
            context: c.rfq
                ? { kind: 'RFQ', code: c.rfq.code, title: rest.join(' · ') || code }
                : c.order
                    ? { kind: 'ORDER', code: c.order.code, title: rest.join(' · ') || code }
                    : c.dispute
                        ? { kind: 'DISPUTE', code: c.dispute.order.code, title: rest.join(' · ') }
                        : null,
            counterpart: actor.isAdmin
                ? { code: companyCode(c), name: c.company.legalName }
                : { code: 'GarmentGate', name: null },
        };
    }
    async detail(actor, id) {
        const conversation = await this.actors.conversation(actor, id);
        const [summary] = await this.summaries(actor, [conversation.id]);
        if (!summary)
            throw new NotFoundException('Conversation not found');
        const { messages, hasMore } = await this.messages(actor, id, undefined, PAGE);
        const participants = await this.prisma.conversationParticipant.findMany({
            where: { conversationId: id, lastReadAt: { not: null } },
            select: { lastReadAt: true, user: { select: { role: true } } },
        });
        const otherSide = participants
            .filter((p) => (p.user.role === 'ADMIN') !== actor.isAdmin)
            .map((p) => p.lastReadAt?.getTime() ?? 0);
        const otherSideReadAt = otherSide.length > 0 ? new Date(Math.max(...otherSide)).toISOString() : null;
        let relayTargets = [];
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
    async messages(actor, id, before, limit) {
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
    async presign(actor, id, file) {
        const conversation = await this.actors.conversation(actor, id);
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
    async send(actor, id, dto) {
        const conversation = await this.actors.conversation(actor, id);
        const files = [];
        for (const fileId of dto.attachments) {
            files.push(await this.files.confirmUpload(fileId, conversation.companyId, 'MESSAGE_ATTACHMENT', CHAT_FILE_MAX_BYTES));
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
            await tx.conversationParticipant.upsert({
                where: { conversationId_userId: { conversationId: id, userId: actor.userId } },
                create: { conversationId: id, userId: actor.userId, lastReadAt: created.createdAt },
                update: { lastReadAt: created.createdAt },
            });
            return created;
        });
        for (const file of files) {
            await this.media.enqueue(file.id);
            if (file.mimeType === 'application/pdf') {
                const attachment = message.attachments.find((a) => a.fileId === file.id);
                if (attachment) {
                    await this.scans
                        .add('scan', { attachmentId: attachment.id }, {
                        attempts: 3,
                        backoff: { type: 'exponential', delay: 2_000 },
                        removeOnComplete: 500,
                        removeOnFail: 1_000,
                    })
                        .catch((error) => {
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
        if (actor.isAdmin)
            await this.notifyCompany(conversation);
        await this.broadcast('message', message);
        const [view] = await this.views([message], actor.isAdmin ? 'staff' : 'company', await this.companyCodeOf(conversation.companyId), actor.userId);
        if (!view)
            throw new NotFoundException('Message not found');
        return view;
    }
    async relay(actor, messageId, toConversationId) {
        const source = await this.prisma.message.findUnique({
            where: { id: messageId },
            include: { conversation: { include: { company: identityForScrubbing } } },
        });
        const target = await this.prisma.conversation.findUnique({ where: { id: toConversationId } });
        const sameDeal = source &&
            target &&
            target.id !== source.conversationId &&
            ((source.conversation.rfqId !== null && source.conversation.rfqId === target.rfqId) ||
                (source.conversation.orderId !== null && source.conversation.orderId === target.orderId));
        if (!source || !target || !sameDeal)
            throw new NotFoundException('Nothing to relay there');
        const body = scrubText(source.filteredContent, identityPatterns(identityOf(source.conversation.company))) ?? '';
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
        const [view] = await this.views([message], 'staff', await this.companyCodeOf(target.companyId), actor.userId);
        if (!view)
            throw new NotFoundException('Message not found');
        return view;
    }
    async markRead(actor, id) {
        const conversation = await this.actors.conversation(actor, id);
        const now = new Date();
        await this.prisma.conversationParticipant.upsert({
            where: { conversationId_userId: { conversationId: id, userId: actor.userId } },
            create: { conversationId: id, userId: actor.userId, lastReadAt: now },
            update: { lastReadAt: now },
        });
        this.realtime.read(conversation, {
            conversationId: id,
            side: actor.isAdmin ? 'GARMENTGATE' : 'COMPANY',
            readAt: now.toISOString(),
        }, actor.userId);
    }
    async unreadTotal(actor) {
        const counts = await this.unreadByConversation(actor, null);
        let total = 0;
        for (const n of counts.values())
            total += n;
        return total;
    }
    async unreadByConversation(actor, ids) {
        const scope = actor.isAdmin
            ? Prisma.sql `TRUE`
            : Prisma.sql `c."companyId" = ${actor.companyId ?? ''}::uuid`;
        const only = ids === null ? Prisma.sql `TRUE` : Prisma.sql `c."id" = ANY(${ids}::uuid[])`;
        const fromCompanies = actor.isAdmin ? Prisma.sql `s."role" <> 'ADMIN'` : Prisma.sql `TRUE`;
        const rows = await this.prisma.$queryRaw `
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
    async views(rows, kind, code, viewerId) {
        const links = await this.links(rows);
        const relayed = await this.relayLabels(rows);
        return rows.map((m) => messageView(m, kind === 'staff'
            ? { kind: 'staff', viewerId, companyCode: code }
            : { kind: 'company', viewerId }, links, relayed));
    }
    async broadcast(event, message) {
        const conversation = await this.prisma.conversation.findUniqueOrThrow({
            where: { id: message.conversationId },
        });
        const code = await this.companyCodeOf(conversation.companyId);
        const [company] = await this.views([message], 'company', code, null);
        const [staff] = await this.views([message], 'staff', code, null);
        if (company && staff)
            this.realtime.message(event, conversation, { company, staff });
    }
    async messageRow(id) {
        return this.prisma.message.findUniqueOrThrow({ where: { id }, include: messageInclude });
    }
    async links(rows) {
        const entries = await Promise.all(rows.flatMap((m) => m.attachments.map(async (a) => {
            if (a.file.processingStatus !== 'READY')
                return [a.id, { url: null, thumbUrl: null }];
            if (a.file.mimeType === 'application/pdf') {
                const url = a.file.sanitizedKey
                    ? await this.storage.presignDownload(a.file.sanitizedKey, a.displayName)
                    : null;
                return [a.id, { url, thumbUrl: null }];
            }
            const urls = await this.media.urls(a.file);
            return [a.id, { url: urls?.large ?? null, thumbUrl: urls?.thumb ?? null }];
        })));
        return new Map(entries);
    }
    async relayLabels(rows) {
        const ids = rows.flatMap((m) => (m.relayedFromId ? [m.relayedFromId] : []));
        if (ids.length === 0)
            return new Map();
        const sources = await this.prisma.message.findMany({
            where: { id: { in: ids } },
            select: { id: true, conversation: { select: { companyId: true } } },
        });
        const codes = new Map();
        for (const s of sources)
            codes.set(s.id, await this.companyCodeOf(s.conversation.companyId));
        return codes;
    }
    async companyCodeOf(companyId) {
        const company = await this.prisma.company.findUnique({
            where: { id: companyId },
            select: {
                buyerProfile: { select: { publicCode: true } },
                manufacturerProfile: { select: { publicCode: true } },
            },
        });
        return company?.buyerProfile?.publicCode ?? company?.manufacturerProfile?.publicCode ?? 'GG';
    }
    async notifyCompany(conversation) {
        await this.notifier.notify({
            to: { companyId: conversation.companyId },
            type: 'MESSAGE_RECEIVED',
            title: 'New message from GarmentGate',
            body: conversation.subject,
            link: { conversationId: conversation.id },
        });
    }
};
ConversationsService = ConversationsService_1 = __decorate([
    Injectable(),
    __param(9, InjectQueue(CHAT_SCAN_QUEUE)),
    __metadata("design:paramtypes", [PrismaService,
        Notifier,
        ChatActorService,
        FilesService,
        StorageService,
        MediaService,
        ChatModerationService,
        ChatRealtime,
        AuditService, Function])
], ConversationsService);
export { ConversationsService };
//# sourceMappingURL=conversations.service.js.map