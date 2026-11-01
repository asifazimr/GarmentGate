import { Injectable, NotFoundException } from '@nestjs/common';
import type { AccountWarning, FlaggedMessage } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { ChatRealtime } from './chat-realtime.service.js';

/** Contact-filter hits per user, counted across the platform (chat, RFQs, quotes, profiles). */
export const VIOLATION_ACTION = 'moderation.contact_filtered';
export const VIOLATION_WINDOW_DAYS = 30;
/** Hits in the window that raise each warning level. */
export const WARNING_THRESHOLDS = { WARNING: 3, FINAL_WARNING: 6 } as const;

/** Which warning, if any, a number of recent violations calls for. */
export function warningLevelFor(violations: number): keyof typeof WARNING_THRESHOLDS | null {
  if (violations >= WARNING_THRESHOLDS.FINAL_WARNING) return 'FINAL_WARNING';
  if (violations >= WARNING_THRESHOLDS.WARNING) return 'WARNING';
  return null;
}

@Injectable()
export class ChatModerationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly realtime: ChatRealtime,
  ) {}

  private since(): Date {
    return new Date(Date.now() - VIOLATION_WINDOW_DAYS * 86_400_000);
  }

  async violations(userId: string): Promise<number> {
    return this.prisma.auditLog.count({
      where: { actorUserId: userId, action: VIOLATION_ACTION, createdAt: { gte: this.since() } },
    });
  }

  /**
   * Call after logging a contact-filter hit. Repeated attempts raise a warning (once per level
   * per window): the user is told, and staff are notified so they can act on the account.
   */
  async recordViolation(userId: string): Promise<void> {
    const count = await this.violations(userId);
    const level = warningLevelFor(count);
    if (!level) return;
    const already = await this.prisma.accountWarning.findFirst({
      where: { userId, level, createdAt: { gte: this.since() } },
    });
    if (already) return;
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { firstName: true, lastName: true, email: true },
    });
    const warning = await this.prisma.accountWarning.create({
      data: { userId, level, violations: count },
    });
    const admins = await this.prisma.user.findMany({
      where: { role: 'ADMIN', status: 'ACTIVE' },
      select: { id: true },
    });
    await this.prisma.notification.createMany({
      data: [
        {
          userId,
          type: 'SYSTEM' as const,
          title:
            level === 'FINAL_WARNING'
              ? 'Final warning: contact details'
              : 'Please keep contact details off GarmentGate',
          body: 'Messages with phone numbers, emails, links or messenger handles are hidden and reviewed. Repeated attempts can suspend your account.',
          data: { warningId: warning.id },
        },
        ...admins.map((a) => ({
          userId: a.id,
          type: 'SYSTEM' as const,
          title: `${level === 'FINAL_WARNING' ? 'Final warning' : 'Warning'} issued`,
          body: `${user.firstName} ${user.lastName} (${user.email}): ${String(count)} contact-detail attempts in ${String(VIOLATION_WINDOW_DAYS)} days`,
          data: { userId },
        })),
      ],
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

  async activeWarnings(userId: string): Promise<AccountWarning[]> {
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

  async acknowledge(userId: string, id: string): Promise<void> {
    const { count } = await this.prisma.accountWarning.updateMany({
      where: { id, userId, acknowledgedAt: null },
      data: { acknowledgedAt: new Date() },
    });
    if (count === 0) throw new NotFoundException('Warning not found');
  }

  /** Flagged messages waiting for a decision, with the sender's track record. */
  async queue(): Promise<FlaggedMessage[]> {
    const rows = await this.prisma.message.findMany({
      where: { flagged: true, moderationStatus: 'FLAGGED' },
      orderBy: { createdAt: 'desc' },
      take: 200,
      include: {
        sender: { select: { id: true, firstName: true, lastName: true, email: true } },
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
    const stats = new Map(
      await Promise.all(
        senders.map(
          async (id) =>
            [
              id,
              {
                violations: await this.violations(id),
                warnings: await this.prisma.accountWarning.count({ where: { userId: id } }),
              },
            ] as const,
        ),
      ),
    );
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
        sender: { name: `${m.sender.firstName} ${m.sender.lastName}`, email: m.sender.email },
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

  /**
   * release: a false positive; deliver exactly what was typed (and the real file names).
   * confirm: keep it hidden. Either way the message leaves the queue.
   */
  async decide(adminId: string, id: string, action: 'release' | 'confirm'): Promise<void> {
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: { attachments: { include: { file: { select: { originalFilename: true } } } } },
    });
    if (!message) throw new NotFoundException('Message not found');
    await this.prisma.$transaction(async (tx) => {
      await tx.message.update({
        where: { id },
        data:
          action === 'release'
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
}
