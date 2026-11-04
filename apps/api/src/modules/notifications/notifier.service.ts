import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DEFAULT_PREFERENCES,
  LOCKED_IN_APP,
  NOTIFICATION_CATEGORY,
  NOTIFICATION_EVENT,
  type NotificationLink,
  type NotificationType,
  notificationHref,
  ROLE_HOME,
  settingsPath,
} from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MailService } from '../mail/mail.service.js';
import { notificationSelect, notificationView } from './notification-views.js';
import { RealtimeService } from './realtime.service.js';

/** Who hears about it: specific people, a company's active members, or GarmentGate staff. */
export type Audience =
  { userIds: string[] } | { companyId: string } | { manufacturerProfileId: string } | 'ADMINS';

export interface NotifyInput {
  to: Audience | Audience[];
  type: NotificationType;
  title: string;
  body: string;
  link?: NotificationLink;
  /** False when the caller sends its own email (verification, KYC decision). */
  email?: boolean;
}

/** Message emails are batched: at most one per person per this many minutes. */
const MESSAGE_EMAIL_GAP_MS = 30 * 60_000;

const ACTION_LABEL: Record<string, string> = {
  orderCode: 'Open the order',
  rfqCode: 'Open the request',
  bookingCode: 'Open the booking',
  conversationId: 'Read the message',
  inspectionId: 'Open the inspection',
};

/**
 * The one way the platform tells people something. Writes the in-app notification, pushes it
 * to open tabs over Socket.io, and emails it, each according to the person's preferences per
 * category. Callers write the text per audience (codes, never the other side's names).
 */
@Injectable()
export class Notifier {
  private readonly logger = new Logger(Notifier.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly realtime: RealtimeService,
    private readonly mail: MailService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async notify(input: NotifyInput): Promise<void> {
    try {
      await this.deliver(input);
    } catch (error) {
      // A notification must never fail the action that caused it.
      this.logger.error({ err: error, type: input.type }, 'Failed to deliver a notification');
    }
  }

  private async deliver(input: NotifyInput): Promise<void> {
    const audiences = Array.isArray(input.to) ? input.to : [input.to];
    const or: Prisma.UserWhereInput[] = audiences.map((a) =>
      a === 'ADMINS'
        ? { role: 'ADMIN' }
        : 'userIds' in a
          ? { id: { in: a.userIds } }
          : 'companyId' in a
            ? { companyId: a.companyId }
            : { company: { manufacturerProfile: { id: a.manufacturerProfileId } } },
    );
    if (or.length === 0) return;
    const category = NOTIFICATION_CATEGORY[input.type];
    const users = await this.prisma.user.findMany({
      where: { status: 'ACTIVE', deletedAt: null, OR: or },
      select: {
        id: true,
        email: true,
        firstName: true,
        role: true,
        notificationPrefs: { where: { category }, select: { inApp: true, email: true } },
      },
    });
    if (users.length === 0) return;
    const prefs = users.map((u) => {
      const p = u.notificationPrefs[0] ?? DEFAULT_PREFERENCES[category];
      return { user: u, inApp: LOCKED_IN_APP.includes(category) || p.inApp, email: p.email };
    });
    const link = input.link ?? {};

    // Message emails are batched: skip anyone who already heard about a message recently.
    const wantsEmail = input.email === false ? [] : prefs.filter((p) => p.email).map((p) => p.user);
    let skip = new Set<string>();
    if (input.type === 'MESSAGE_RECEIVED' && wantsEmail.length > 0) {
      const recent = await this.prisma.notification.findMany({
        where: {
          userId: { in: wantsEmail.map((u) => u.id) },
          type: 'MESSAGE_RECEIVED',
          createdAt: { gte: new Date(Date.now() - MESSAGE_EMAIL_GAP_MS) },
        },
        select: { userId: true },
        distinct: ['userId'],
      });
      skip = new Set(recent.map((r) => r.userId));
    }

    const inApp = prefs.filter((p) => p.inApp).map((p) => p.user.id);
    if (inApp.length > 0) {
      const created = await this.prisma.notification.createManyAndReturn({
        data: inApp.map((userId) => ({
          userId,
          type: input.type,
          title: input.title,
          body: input.body,
          data: link,
        })),
        select: { ...notificationSelect, userId: true },
      });
      for (const n of created)
        this.realtime.toUser(n.userId, NOTIFICATION_EVENT, notificationView(n));
    }

    const mailTo = wantsEmail.filter((u) => !skip.has(u.id));
    const web = this.config.get('WEB_APP_URL', { infer: true });
    const firstKey = Object.keys(link).find((k) => k in ACTION_LABEL);
    for (const user of mailTo) {
      const href = notificationHref(user.role, link) ?? ROLE_HOME[user.role];
      await this.mail.send('notification', user.email, {
        firstName: user.firstName,
        title: input.title,
        body: input.body,
        actionUrl: new URL(href, web).toString(),
        actionLabel: (firstKey && ACTION_LABEL[firstKey]) ?? 'Open GarmentGate',
        preferencesUrl: new URL(settingsPath(user.role), web).toString(),
      });
    }
  }
}
