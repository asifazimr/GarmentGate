import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type ActivityPage,
  type ActivityQuery,
  DEFAULT_PREFERENCES,
  LOCKED_IN_APP,
  NOTIFICATION_CATEGORIES,
  type NotificationList,
  type NotificationPreferences,
  type UpdateNotificationPreferencesDto,
} from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { notificationSelect, notificationView } from './notification-views.js';

const PAGE_SIZE = 20;

/** In-app notifications, the activity feed and preferences. Every query is the signed-in user's. */
@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string): Promise<NotificationList> {
    const [items, unreadCount] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: PAGE_SIZE,
        select: notificationSelect,
      }),
      this.prisma.notification.count({ where: { userId, readAt: null } }),
    ]);
    return { unreadCount, items: items.map(notificationView) };
  }

  /** Everything that happened on the account, newest first, paged by time. */
  async activity(userId: string, query: ActivityQuery): Promise<ActivityPage> {
    const rows = await this.prisma.notification.findMany({
      where: { userId, ...(query.before && { createdAt: { lt: new Date(query.before) } }) },
      orderBy: { createdAt: 'desc' },
      take: query.limit + 1,
      select: notificationSelect,
    });
    const page = rows.slice(0, query.limit);
    return {
      items: page.map(notificationView),
      nextBefore: rows.length > query.limit ? (page.at(-1)?.createdAt.toISOString() ?? null) : null,
    };
  }

  async markRead(userId: string, id: string): Promise<void> {
    const { count } = await this.prisma.notification.updateMany({
      where: { id, userId, readAt: null },
      data: { readAt: new Date() },
    });
    if (count === 0) {
      const exists = await this.prisma.notification.count({ where: { id, userId } });
      if (exists === 0) throw new NotFoundException('Notification not found');
    }
  }

  async markAllRead(userId: string): Promise<void> {
    await this.prisma.notification.updateMany({
      where: { userId, readAt: null },
      data: { readAt: new Date() },
    });
  }

  async preferences(userId: string): Promise<NotificationPreferences> {
    const rows = await this.prisma.notificationPreference.findMany({ where: { userId } });
    return {
      preferences: NOTIFICATION_CATEGORIES.map((category) => {
        const row = rows.find((r) => r.category === category);
        const p = row ?? DEFAULT_PREFERENCES[category];
        return {
          category,
          inApp: LOCKED_IN_APP.includes(category) || p.inApp,
          email: p.email,
          text: p.text,
        };
      }),
    };
  }

  async updatePreferences(
    userId: string,
    dto: UpdateNotificationPreferencesDto,
  ): Promise<NotificationPreferences> {
    await this.prisma.$transaction(
      dto.preferences.map((p) => {
        const data = {
          inApp: LOCKED_IN_APP.includes(p.category) || p.inApp,
          email: p.email,
          text: p.text,
        };
        return this.prisma.notificationPreference.upsert({
          where: { userId_category: { userId, category: p.category } },
          create: { userId, category: p.category, ...data },
          update: data,
        });
      }),
    );
    return this.preferences(userId);
  }
}
