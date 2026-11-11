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
import { BuyerPlusSettingsSchema, DEFAULT_BUYER_PLUS_SETTINGS, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { BUYER_PLUS_KEY } from '../payments/charges.js';
import { SubscriptionsService } from './subscriptions.service.js';
let BuyerPlusService = class BuyerPlusService {
    prisma;
    subscriptions;
    notifier;
    audit;
    constructor(prisma, subscriptions, notifier, audit) {
        this.prisma = prisma;
        this.subscriptions = subscriptions;
        this.notifier = notifier;
        this.audit = audit;
    }
    onModuleInit() {
        this.subscriptions.onChange('BUYER', (owner) => owner.kind === 'BUYER' ? this.apply(owner.companyId) : Promise.resolve());
    }
    async settings() {
        const row = await this.prisma.platformSetting.findUnique({ where: { key: BUYER_PLUS_KEY } });
        const parsed = BuyerPlusSettingsSchema.safeParse(row?.value);
        return parsed.success ? parsed.data : DEFAULT_BUYER_PLUS_SETTINGS;
    }
    async setSettings(adminId, s) {
        const value = { ...s };
        await this.prisma.platformSetting.upsert({
            where: { key: BUYER_PLUS_KEY },
            create: { key: BUYER_PLUS_KEY, value },
            update: { value },
        });
        await this.audit.log({
            actorUserId: adminId,
            action: 'plus.settings_updated',
            entityType: 'PlatformSetting',
            entityId: BUYER_PLUS_KEY,
            metadata: value,
        });
        return s;
    }
    async mine(ctx) {
        const owner = { kind: 'BUYER', companyId: ctx.companyId };
        const [settings, profile, sub, invoices, company] = await Promise.all([
            this.settings(),
            this.prisma.buyerProfile.findUniqueOrThrow({
                where: { companyId: ctx.companyId },
                select: { plusActive: true },
            }),
            this.subscriptions.live(owner),
            this.subscriptions.invoices(owner),
            this.prisma.company.findUniqueOrThrow({
                where: { id: ctx.companyId },
                select: { merchandiserId: true },
            }),
        ]);
        const m = company.merchandiserId
            ? await this.prisma.user.findFirst({
                where: { id: company.merchandiserId, role: 'ADMIN', status: 'ACTIVE' },
                select: { firstName: true, lastName: true },
            })
            : null;
        return {
            active: profile.plusActive,
            settings,
            subscription: sub
                ? {
                    interval: sub.interval,
                    source: sub.source,
                    status: sub.status,
                    currentPeriodEnd: sub.currentPeriodEnd?.toISOString() ?? null,
                    cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
                }
                : null,
            invoices: invoices.map((i) => ({
                id: i.id,
                amountMinor: i.amountMinor,
                currency: i.currency,
                paidAt: i.paidAt.toISOString(),
            })),
            merchandiser: m ? `${m.firstName} ${m.lastName}` : null,
            cardEnabled: this.subscriptions.cardEnabled(),
        };
    }
    async checkout(ctx, dto) {
        const settings = await this.settings();
        const [company, user] = await Promise.all([
            this.prisma.company.findUniqueOrThrow({
                where: { id: ctx.companyId },
                select: { legalName: true },
            }),
            this.prisma.user.findUniqueOrThrow({ where: { id: ctx.userId }, select: { email: true } }),
        ]);
        return this.subscriptions.checkout({ kind: 'BUYER', companyId: ctx.companyId }, {
            tier: 'PLUS',
            interval: dto.interval,
            amountUsdMinor: dto.interval === 'YEAR' ? settings.yearlyUsdMinor : settings.monthlyUsdMinor,
            customerName: company.legalName,
            email: user.email,
            userId: ctx.userId,
            returnPath: '/buyer/plus',
        });
    }
    cancel(ctx) {
        return this.subscriptions.cancel({ kind: 'BUYER', companyId: ctx.companyId }, ctx.userId);
    }
    async grant(adminId, code, dto) {
        const profile = await this.prisma.buyerProfile.findUnique({
            where: { publicCode: code },
            select: { companyId: true },
        });
        if (!profile)
            throw new NotFoundException('Buyer not found');
        await this.subscriptions.grant({ kind: 'BUYER', companyId: profile.companyId }, {
            tier: dto.plus ? 'PLUS' : null,
            endsOn: dto.endsOn,
            paidUsdMinor: dto.paidUsdMinor,
            bankReference: dto.bankReference,
            note: dto.note,
            adminId,
        });
    }
    async apply(companyId) {
        const now = Date.now();
        const [profile, subs, settings] = await Promise.all([
            this.prisma.buyerProfile.findUniqueOrThrow({
                where: { companyId },
                select: {
                    plusActive: true,
                    publicCode: true,
                    company: { select: { merchandiserId: true } },
                },
            }),
            this.subscriptions.liveAll({ kind: 'BUYER', companyId }),
            this.settings(),
        ]);
        const active = subs.some((s) => {
            if (s.currentPeriodEnd === null)
                return true;
            const grace = (s.status === 'PAST_DUE' ? 7 : 1) * 86_400_000;
            return s.currentPeriodEnd.getTime() + grace > now;
        });
        if (active === profile.plusActive)
            return active;
        await this.prisma.buyerProfile.update({ where: { companyId }, data: { plusActive: active } });
        await this.notifier.notify({
            to: { companyId },
            type: 'PAYMENT_UPDATE',
            title: active ? 'Welcome to GarmentGate Plus' : 'Your GarmentGate Plus membership ended',
            body: active
                ? 'Your member benefits apply from now on.'
                : 'Fees go back to the standard rates for new samples and inspections.',
        });
        if (active && settings.merchandiser && !profile.company.merchandiserId)
            await this.notifier.notify({
                to: 'ADMINS',
                type: 'SYSTEM',
                title: `Assign a merchandiser to ${profile.publicCode}`,
                body: 'This buyer joined GarmentGate Plus, which includes a dedicated merchandiser.',
            });
        return active;
    }
};
BuyerPlusService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        SubscriptionsService,
        Notifier,
        AuditService])
], BuyerPlusService);
export { BuyerPlusService };
//# sourceMappingURL=buyer-plus.service.js.map