var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import { ChatRealtime } from './chat-realtime.service.js';
export const VIOLATION_ACTION = 'moderation.contact_filtered';
export const VIOLATION_WINDOW_DAYS = 30;
export const WARNING_THRESHOLDS = { WARNING: 3, FINAL_WARNING: 6 };
export function warningLevelFor(violations) {
    if (violations >= WARNING_THRESHOLDS.FINAL_WARNING)
        return 'FINAL_WARNING';
    if (violations >= WARNING_THRESHOLDS.WARNING)
        return 'WARNING';
    return null;
}
let ChatModerationService = class ChatModerationService {
    prisma;
    notifier;
    audit;
    realtime;
    constructor(prisma, notifier, audit, realtime) {
        this.prisma = prisma;
        this.notifier = notifier;
        this.audit = audit;
        this.realtime = realtime;
    }
    since() {
        return new Date(Date.now() - VIOLATION_WINDOW_DAYS * 86_400_000);
    }
    async violations(userId) {
        return this.prisma.auditLog.count({
            where: { actorUserId: userId, action: VIOLATION_ACTION, createdAt: { gte: this.since() } },
        });
    }
    async recordViolation(userId) {
        const count = await this.violations(userId);
        const level = warningLevelFor(count);
        if (!level)
            return;
        const already = await this.prisma.accountWarning.findFirst({
            where: { userId, level, createdAt: { gte: this.since() } },
        });
        if (already)
            return;
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
            select: { firstName: true, lastName: true, email: true },
        });
        await this.prisma.accountWarning.create({
            data: { userId, level, violations: count },
        });
        await this.notifier.notify({
            to: { userIds: [userId] },
            type: 'SYSTEM',
            title: level === 'FINAL_WARNING'
                ? 'Final warning: contact details'
                : 'Please keep contact details off GarmentGate',
            body: 'Messages with phone numbers, emails, links or messenger handles are hidden and reviewed. Repeated attempts can suspend your account.',
        });
        await this.notifier.notify({
            to: 'ADMINS',
            type: 'SYSTEM',
            title: `${level === 'FINAL_WARNING' ? 'Final warning' : 'Warning'} issued`,
            body: `${user.firstName} ${user.lastName} (${user.email}): ${String(count)} contact-detail attempts in ${String(VIOLATION_WINDOW_DAYS)} days`,
        });
        await this.audit.log({
            actorUserId: null,
            action: 'account.warning',
            entityType: 'User',
            entityId: userId,
            metadata: { level, violations: count },
        });
        this.realtime.warning(userId);
    }
    async activeWarnings(userId) {
        const rows = await this.prisma.accountWarning.findMany({
            where: { userId, acknowledgedAt: null },
            orderBy: { createdAt: 'desc' },
        });
        return rows.map((w) => ({
            id: w.id,
            level: w.level,
            violations: w.violations,
            createdAt: w.createdAt.toISOString(),
        }));
    }
    async acknowledge(userId, id) {
        const { count } = await this.prisma.accountWarning.updateMany({
            where: { id, userId, acknowledgedAt: null },
            data: { acknowledgedAt: new Date() },
        });
        if (count === 0)
            throw new NotFoundException('Warning not found');
    }
    async queue() {
        const rows = await this.prisma.message.findMany({
            where: { flagged: true, moderationStatus: 'FLAGGED' },
            orderBy: { createdAt: 'desc' },
            take: 200,
            include: {
                sender: {
                    select: { id: true, firstName: true, lastName: true, email: true, status: true },
                },
                attachments: {
                    where: { flagged: true },
                    select: {
                        displayName: true,
                        flagReasons: true,
                        file: { select: { originalFilename: true } },
                    },
                },
                conversation: {
                    select: {
                        subject: true,
                        company: {
                            select: {
                                legalName: true,
                                buyerProfile: { select: { publicCode: true } },
                                manufacturerProfile: { select: { publicCode: true } },
                            },
                        },
                    },
                },
            },
        });
        const senders = [...new Set(rows.map((r) => r.sender.id))];
        const stats = new Map(await Promise.all(senders.map(async (id) => [
            id,
            {
                violations: await this.violations(id),
                warnings: await this.prisma.accountWarning.count({ where: { userId: id } }),
            },
        ])));
        const context = new Map(await Promise.all(rows.map(async (m) => [m.id, await this.context(m)])));
        return rows.map((m) => {
            const company = m.conversation.company;
            return {
                id: m.id,
                conversationId: m.conversationId,
                thread: m.conversation.subject,
                company: {
                    code: company.buyerProfile?.publicCode ?? company.manufacturerProfile?.publicCode ?? '—',
                    name: company.legalName,
                },
                sender: {
                    id: m.sender.id,
                    name: `${m.sender.firstName} ${m.sender.lastName}`,
                    email: m.sender.email,
                    status: m.sender.status,
                },
                context: context.get(m.id) ?? [],
                original: m.originalContent,
                delivered: m.filteredContent,
                reasons: m.flagReasons,
                attachments: m.attachments.map((a) => ({
                    name: a.file.originalFilename,
                    reasons: a.flagReasons,
                })),
                createdAt: m.createdAt.toISOString(),
                senderViolations: stats.get(m.sender.id)?.violations ?? 0,
                senderWarnings: stats.get(m.sender.id)?.warnings ?? 0,
            };
        });
    }
    async context(message) {
        const before = await this.prisma.message.findMany({
            where: { conversationId: message.conversationId, createdAt: { lt: message.createdAt } },
            orderBy: { createdAt: 'desc' },
            take: 4,
            select: {
                senderId: true,
                filteredContent: true,
                createdAt: true,
                sender: { select: { firstName: true, lastName: true, role: true } },
            },
        });
        return before.reverse().map((b) => ({
            from: b.senderId === message.senderId
                ? 'SENDER'
                : b.sender.role === 'ADMIN'
                    ? 'GARMENTGATE'
                    : 'COMPANY',
            name: `${b.sender.firstName} ${b.sender.lastName}`,
            content: b.filteredContent,
            createdAt: b.createdAt.toISOString(),
        }));
    }
    async decide(adminId, id, action) {
        const message = await this.prisma.message.findUnique({
            where: { id },
            include: { attachments: { include: { file: { select: { originalFilename: true } } } } },
        });
        if (!message)
            throw new NotFoundException('Message not found');
        await this.prisma.$transaction(async (tx) => {
            await tx.message.update({
                where: { id },
                data: action === 'release'
                    ? { filteredContent: message.originalContent, moderationStatus: 'REVIEWED_OK' }
                    : { moderationStatus: 'REVIEWED_BLOCKED' },
            });
            if (action === 'release') {
                for (const a of message.attachments.filter((x) => x.flagged)) {
                    await tx.messageAttachment.update({
                        where: { id: a.id },
                        data: { displayName: a.file.originalFilename },
                    });
                }
            }
        });
        await this.audit.log({
            actorUserId: adminId,
            action: `moderation.${action}`,
            entityType: 'Message',
            entityId: id,
        });
    }
};
ChatModerationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        Notifier,
        AuditService,
        ChatRealtime])
], ChatModerationService);
export { ChatModerationService };
//# sourceMappingURL=chat-moderation.service.js.map