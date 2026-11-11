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
import { DEFAULT_PREFERENCES, LOCKED_IN_APP, NOTIFICATION_CATEGORIES, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { notificationSelect, notificationView } from './notification-views.js';
const PAGE_SIZE = 20;
let NotificationsService = class NotificationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(userId) {
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
    async activity(userId, query) {
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
    async markRead(userId, id) {
        const { count } = await this.prisma.notification.updateMany({
            where: { id, userId, readAt: null },
            data: { readAt: new Date() },
        });
        if (count === 0) {
            const exists = await this.prisma.notification.count({ where: { id, userId } });
            if (exists === 0)
                throw new NotFoundException('Notification not found');
        }
    }
    async markAllRead(userId) {
        await this.prisma.notification.updateMany({
            where: { userId, readAt: null },
            data: { readAt: new Date() },
        });
    }
    async preferences(userId) {
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
    async updatePreferences(userId, dto) {
        await this.prisma.$transaction(dto.preferences.map((p) => {
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
        }));
        return this.preferences(userId);
    }
};
NotificationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], NotificationsService);
export { NotificationsService };
//# sourceMappingURL=notifications.service.js.map