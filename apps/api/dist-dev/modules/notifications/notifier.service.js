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
var Notifier_1;
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_PREFERENCES, LOCKED_IN_APP, NOTIFICATION_CATEGORY, NOTIFICATION_EVENT, notificationHref, ROLE_HOME, settingsPath, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MailService } from '../mail/mail.service.js';
import { notificationSelect, notificationView } from './notification-views.js';
import { RealtimeService } from './realtime.service.js';
import { messagingSettings, TEXTS_QUEUE } from './texts.js';
const MESSAGE_EMAIL_GAP_MS = 30 * 60_000;
const ACTION_LABEL = {
    orderCode: 'Open the order',
    rfqCode: 'Open the request',
    bookingCode: 'Open the booking',
    conversationId: 'Read the message',
    inspectionId: 'Open the inspection',
};
let Notifier = Notifier_1 = class Notifier {
    prisma;
    realtime;
    mail;
    config;
    texts;
    logger = new Logger(Notifier_1.name);
    constructor(prisma, realtime, mail, config, texts) {
        this.prisma = prisma;
        this.realtime = realtime;
        this.mail = mail;
        this.config = config;
        this.texts = texts;
    }
    async notify(input) {
        try {
            await this.deliver(input);
        }
        catch (error) {
            this.logger.error({ err: error, type: input.type }, 'Failed to deliver a notification');
        }
    }
    async deliver(input) {
        const audiences = Array.isArray(input.to) ? input.to : [input.to];
        const or = audiences.map((a) => a === 'ADMINS'
            ? { role: 'ADMIN' }
            : 'userIds' in a
                ? { id: { in: a.userIds } }
                : 'companyId' in a
                    ? { companyId: a.companyId }
                    : { company: { manufacturerProfile: { id: a.manufacturerProfileId } } });
        if (or.length === 0)
            return;
        const category = NOTIFICATION_CATEGORY[input.type];
        const users = await this.prisma.user.findMany({
            where: { status: 'ACTIVE', deletedAt: null, OR: or },
            select: {
                id: true,
                email: true,
                firstName: true,
                role: true,
                phoneVerifiedAt: true,
                notificationPrefs: {
                    where: { category },
                    select: { inApp: true, email: true, text: true },
                },
            },
        });
        if (users.length === 0)
            return;
        const prefs = users.map((u) => {
            const p = u.notificationPrefs[0] ?? DEFAULT_PREFERENCES[category];
            return {
                user: u,
                inApp: LOCKED_IN_APP.includes(category) || p.inApp,
                email: p.email,
                text: p.text && u.phoneVerifiedAt !== null,
            };
        });
        const link = input.link ?? {};
        const wantsEmail = input.email === false ? [] : prefs.filter((p) => p.email).map((p) => p.user);
        let skip = new Set();
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
        const wantsText = prefs.filter((p) => p.text).map((p) => p.user);
        if (wantsText.length > 0) {
            const settings = await messagingSettings(this.prisma);
            if ((settings.smsEnabled || settings.whatsappEnabled) && settings.types.includes(input.type))
                for (const user of wantsText)
                    await this.texts.add('text', {
                        userId: user.id,
                        type: input.type,
                        title: input.title,
                        body: input.body,
                        url: new URL(notificationHref(user.role, link) ?? ROLE_HOME[user.role], web).toString(),
                    }, {
                        attempts: 3,
                        backoff: { type: 'exponential', delay: 30_000 },
                        removeOnComplete: 1000,
                    });
        }
    }
};
Notifier = Notifier_1 = __decorate([
    Injectable(),
    __param(4, InjectQueue(TEXTS_QUEUE)),
    __metadata("design:paramtypes", [PrismaService,
        RealtimeService,
        MailService,
        ConfigService, Function])
], Notifier);
export { Notifier };
//# sourceMappingURL=notifier.service.js.map