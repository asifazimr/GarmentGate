import { createHash, randomInt, timingSafeEqual } from 'node:crypto';
import { BadRequestException, ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import {
  type AdminMessaging,
  type ConfirmPhoneDto,
  maskPhone,
  type MessagingSettings,
  type MyMessaging,
  PHONE_CODE_MAX_ATTEMPTS,
  PHONE_CODE_TTL_MS,
  type SetTextChannelDto,
  type StartPhoneVerificationDto,
  type TestTextDto,
  type TextChannel,
  textBody,
} from '@garmentgate/shared';
import type { OutboundMessageStatus, Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { MESSAGING_KEY, messagingSettings, type TextJob } from '../notifications/texts.js';
import { TEXT_PROVIDER, type TextProvider } from './text-provider.js';

const hashCode = (userId: string, code: string) =>
  createHash('sha256').update(`${userId}:${code}`).digest('hex');
const dayStart = () => new Date(Math.floor(Date.now() / 86_400_000) * 86_400_000);

/** Twilio's MessageStatus → ours (anything in flight stays SENT). */
function receiptStatus(s: string): OutboundMessageStatus | null {
  switch (s) {
    case 'delivered':
    case 'read':
      return 'DELIVERED';
    case 'failed':
    case 'undelivered':
      return 'FAILED';
    case 'sent':
      return 'SENT';
    default:
      return null;
  }
}

/**
 * Texts: verified mobile numbers, the SMS/WhatsApp channel choice, sending the notifications
 * the Notifier queues (daily cap, channel and template rules), delivery receipts and the staff
 * log. Numbers are personal contact details: they reach only their owner and staff.
 */
@Injectable()
export class MessagingService {
  private readonly logger = new Logger(MessagingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    @Inject(TEXT_PROVIDER) private readonly provider: TextProvider,
  ) {}

  settings(): Promise<MessagingSettings> {
    return messagingSettings(this.prisma);
  }

  async setSettings(adminId: string, s: MessagingSettings): Promise<MessagingSettings> {
    const value = JSON.parse(JSON.stringify(s)) as Prisma.InputJsonValue;
    await this.prisma.platformSetting.upsert({
      where: { key: MESSAGING_KEY },
      create: { key: MESSAGING_KEY, value },
      update: { value },
    });
    await this.audit.log({
      actorUserId: adminId,
      action: 'messaging.settings_updated',
      entityType: 'PlatformSetting',
      entityId: MESSAGING_KEY,
      metadata: value,
    });
    return s;
  }

  // ── The person's own number ───────────────────────────────────────────────

  async mine(userId: string): Promise<MyMessaging> {
    const [u, settings] = await Promise.all([
      this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: {
          phoneE164: true,
          phoneVerifiedAt: true,
          pendingPhone: true,
          phoneCodeExpiresAt: true,
          textChannel: true,
        },
      }),
      this.settings(),
    ]);
    return {
      phone: u.phoneE164 ? maskPhone(u.phoneE164) : null,
      verified: u.phoneVerifiedAt !== null,
      pending:
        u.pendingPhone !== null &&
        u.phoneCodeExpiresAt !== null &&
        u.phoneCodeExpiresAt.getTime() > Date.now(),
      channel: u.textChannel,
      smsAvailable: settings.smsEnabled && this.provider.supports('SMS'),
      whatsappAvailable: settings.whatsappEnabled && this.provider.supports('WHATSAPP'),
    };
  }

  /** Sends a 6-digit code by SMS; the number becomes the person's once confirmed. */
  async startVerification(userId: string, dto: StartPhoneVerificationDto): Promise<void> {
    const code = String(randomInt(0, 1_000_000)).padStart(6, '0');
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        pendingPhone: dto.phone,
        phoneCodeHash: hashCode(userId, code),
        phoneCodeExpiresAt: new Date(Date.now() + PHONE_CODE_TTL_MS),
        phoneCodeAttempts: 0,
      },
    });
    const result = await this.provider.send({
      channel: 'SMS',
      to: dto.phone,
      body: `Your GarmentGate code is ${code}. It expires in 10 minutes. Don't share it.`,
    });
    // The code itself is never stored in the log.
    await this.prisma.outboundMessage.create({
      data: {
        userId,
        channel: 'SMS',
        to: dto.phone,
        type: 'VERIFY',
        body: 'Your GarmentGate code is ••••••.',
        status: result.ok ? 'SENT' : 'FAILED',
        error: result.error ?? null,
        providerRef: result.providerRef,
      },
    });
    if (!result.ok)
      throw new BadRequestException('We couldn’t text that number: check it and try again');
  }

  async confirm(userId: string, dto: ConfirmPhoneDto): Promise<MyMessaging> {
    const u = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        pendingPhone: true,
        phoneCodeHash: true,
        phoneCodeExpiresAt: true,
        phoneCodeAttempts: true,
      },
    });
    if (
      !u.pendingPhone ||
      !u.phoneCodeHash ||
      !u.phoneCodeExpiresAt ||
      u.phoneCodeExpiresAt.getTime() <= Date.now()
    )
      throw new ConflictException('The code expired: send a new one');
    if (u.phoneCodeAttempts >= PHONE_CODE_MAX_ATTEMPTS)
      throw new ConflictException('Too many tries: send a new code');
    const given = Buffer.from(hashCode(userId, dto.code));
    const expected = Buffer.from(u.phoneCodeHash);
    if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { phoneCodeAttempts: { increment: 1 } },
      });
      throw new BadRequestException('That code isn’t right');
    }
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        phoneE164: u.pendingPhone,
        phoneVerifiedAt: new Date(),
        pendingPhone: null,
        phoneCodeHash: null,
        phoneCodeExpiresAt: null,
        phoneCodeAttempts: 0,
      },
    });
    await this.audit.log({
      actorUserId: userId,
      action: 'account.phone_verified',
      entityType: 'User',
      entityId: userId,
    });
    return this.mine(userId);
  }

  async setChannel(userId: string, dto: SetTextChannelDto): Promise<MyMessaging> {
    await this.prisma.user.update({ where: { id: userId }, data: { textChannel: dto.channel } });
    return this.mine(userId);
  }

  async removePhone(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        phoneE164: null,
        phoneVerifiedAt: null,
        pendingPhone: null,
        phoneCodeHash: null,
        phoneCodeExpiresAt: null,
        phoneCodeAttempts: 0,
      },
    });
  }

  // ── Sending (the texts worker) ────────────────────────────────────────────

  /** Sends one queued notification text, or records why it was skipped. */
  async deliver(job: TextJob): Promise<OutboundMessageStatus> {
    const [user, settings] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: job.userId },
        select: { phoneE164: true, phoneVerifiedAt: true, textChannel: true, status: true },
      }),
      this.settings(),
    ]);
    if (!user?.phoneE164 || !user.phoneVerifiedAt || user.status !== 'ACTIVE') return 'SKIPPED';
    const body = textBody(job.title, job.body, job.url);
    const template = settings.whatsappTemplates[job.type];
    const channel: TextChannel | null =
      user.textChannel === 'WHATSAPP' &&
      settings.whatsappEnabled &&
      template &&
      this.provider.supports('WHATSAPP')
        ? 'WHATSAPP'
        : settings.smsEnabled && this.provider.supports('SMS')
          ? 'SMS'
          : null;
    const record = (
      status: OutboundMessageStatus,
      extra: { error?: string; ref?: string | null },
    ) =>
      this.prisma.outboundMessage.create({
        data: {
          userId: job.userId,
          channel: channel ?? user.textChannel,
          to: user.phoneE164 ?? '',
          type: job.type,
          body,
          status,
          error: extra.error ?? null,
          providerRef: extra.ref ?? null,
        },
      });
    if (!channel) {
      await record('SKIPPED', { error: 'No text channel is on for this message' });
      return 'SKIPPED';
    }
    const today = await this.prisma.outboundMessage.count({
      where: {
        userId: job.userId,
        createdAt: { gte: dayStart() },
        status: { in: ['QUEUED', 'SENT', 'DELIVERED'] },
        type: { notIn: ['VERIFY', 'TEST'] },
      },
    });
    if (today >= settings.dailyLimitPerUser) {
      await record('SKIPPED', { error: 'Daily text limit reached' });
      return 'SKIPPED';
    }
    const result = await this.provider.send({
      channel,
      to: user.phoneE164,
      body,
      ...(channel === 'WHATSAPP' && template
        ? {
            contentSid: template,
            contentVariables: { '1': job.title, '2': job.body, '3': job.url },
          }
        : {}),
    });
    await record(result.ok ? 'SENT' : 'FAILED', { error: result.error, ref: result.providerRef });
    if (!result.ok) this.logger.warn({ error: result.error, type: job.type }, 'Text not sent');
    return result.ok ? 'SENT' : 'FAILED';
  }

  /** Twilio delivery receipt (signature already checked). */
  async receipt(params: Record<string, string>): Promise<void> {
    const sid = params.MessageSid;
    const status = receiptStatus(params.MessageStatus ?? '');
    if (!sid || !status) return;
    // Never move backwards (a late "sent" after "delivered").
    await this.prisma.outboundMessage.updateMany({
      where: {
        providerRef: sid,
        status: { in: status === 'SENT' ? ['QUEUED'] : ['QUEUED', 'SENT'] },
      },
      data: {
        status,
        ...(status === 'FAILED' && {
          error: params.ErrorCode ? `Twilio error ${params.ErrorCode}` : 'Undelivered',
        }),
      },
    });
  }

  // ── Staff ─────────────────────────────────────────────────────────────────

  async admin(): Promise<AdminMessaging> {
    const [settings, rows] = await Promise.all([
      this.settings(),
      this.prisma.outboundMessage.findMany({
        orderBy: { createdAt: 'desc' },
        take: 500,
        include: { user: { select: { firstName: true, lastName: true, email: true, role: true } } },
      }),
    ]);
    return {
      live: this.provider.live,
      settings,
      messages: rows.map((r) => ({
        id: r.id,
        channel: r.channel,
        to: r.to,
        user: r.user
          ? {
              name: `${r.user.firstName} ${r.user.lastName}`,
              email: r.user.email,
              role: r.user.role,
            }
          : null,
        type: r.type,
        body: r.body,
        status: r.status,
        error: r.error,
        providerRef: r.providerRef,
        createdAt: r.createdAt.toISOString(),
      })),
    };
  }

  async test(adminId: string, dto: TestTextDto): Promise<void> {
    const settings = await this.settings();
    const template = Object.values(settings.whatsappTemplates)[0];
    if (dto.channel === 'WHATSAPP' && !template)
      throw new ConflictException('Add a WhatsApp template first (WhatsApp only sends templates)');
    const body = 'GarmentGate test message: texts are working.';
    const result = await this.provider.send({
      channel: dto.channel,
      to: dto.phone,
      body,
      ...(dto.channel === 'WHATSAPP' && template
        ? {
            contentSid: template,
            contentVariables: {
              '1': 'Test',
              '2': 'Texts are working.',
              '3': 'https://garmentgate.com',
            },
          }
        : {}),
    });
    await this.prisma.outboundMessage.create({
      data: {
        userId: adminId,
        channel: dto.channel,
        to: dto.phone,
        type: 'TEST',
        body,
        status: result.ok ? 'SENT' : 'FAILED',
        error: result.error ?? null,
        providerRef: result.providerRef,
      },
    });
    if (!result.ok) throw new BadRequestException(result.error ?? 'Not sent');
  }
}
