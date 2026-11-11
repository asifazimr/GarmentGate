var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { amountForMinutes, buyerRateFor, centiToSam, dateOnly, filterContactDetails, isoDate, partnershipDepositDue, partnershipMonths, samToCenti, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { identityForScrubbing, listedManufacturer } from '../catalog/catalog.queries.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import { Notifier } from '../notifications/notifier.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { reserveMinutes } from './allocation.js';
import { BookingSettingsService } from './booking-settings.service.js';
import { BookingsService, relatedCategoryIds } from './bookings.service.js';
const partnershipInclude = {
    manufacturerProfile: {
        select: { id: true, publicCode: true, company: { select: { country: true } } },
    },
    buyerCompany: {
        select: {
            id: true,
            ...identityForScrubbing.select,
            buyerProfile: { select: { publicCode: true } },
        },
    },
    line: { select: { id: true, code: true, name: true } },
    category: { select: { id: true, name: true } },
    bookings: {
        select: { code: true, status: true, startDate: true, endDate: true },
        orderBy: { startDate: 'asc' },
    },
};
const month = (d) => isoDate(d).slice(0, 7);
let PartnershipsService = class PartnershipsService {
    prisma;
    settings;
    bookings;
    codes;
    notifier;
    audit;
    constructor(prisma, settings, bookings, codes, notifier, audit) {
        this.prisma = prisma;
        this.settings = settings;
        this.bookings = bookings;
        this.codes = codes;
        this.notifier = notifier;
        this.audit = audit;
    }
    async request(ctx, dto) {
        const settings = await this.settings.get();
        const line = await this.prisma.productionLine.findFirst({
            where: { id: dto.lineId, status: 'ACTIVE', manufacturerProfile: listedManufacturer },
            include: { categories: { select: { id: true } } },
        });
        if (!line)
            throw new NotFoundException('That line isn’t available');
        const related = await relatedCategoryIds(this.prisma, dto.categoryId);
        if (!line.categories.some((c) => related.includes(c.id)))
            throw new BadRequestException('This line doesn’t make that category');
        if (dto.startMonth <= month(new Date()))
            throw new BadRequestException('Start from next month at the earliest');
        const note = dto.note ? filterContactDetails(dto.note) : null;
        const year = new Date().getUTCFullYear();
        const partnership = await this.prisma.$transaction(async (tx) => {
            const code = await this.codes.sequential(`CP-${String(year)}`, 5, tx);
            return tx.capacityPartnership.create({
                data: {
                    code,
                    buyerCompanyId: ctx.companyId,
                    createdById: ctx.userId,
                    manufacturerProfileId: line.manufacturerProfileId,
                    lineId: line.id,
                    categoryId: dto.categoryId,
                    monthlyMinutes: dto.monthlyMinutes,
                    months: dto.months,
                    startMonth: dateOnly(`${dto.startMonth}-01`),
                    samPerPieceCenti: dto.samPerPiece === undefined ? null : samToCenti(dto.samPerPiece),
                    currency: line.currency,
                    factoryRateMinorPer100Min: line.cmRateMinorPer100Min,
                    buyerRateMinorPer100Min: buyerRateFor(line.cmRateMinorPer100Min, settings.bookingFeeBps),
                    note: dto.note ?? null,
                    noteFiltered: note?.filtered ?? null,
                },
            });
        });
        await this.audit.log({
            actorUserId: ctx.userId,
            action: note?.flagged ? 'moderation.contact_filtered' : 'capacity.partnership_requested',
            entityType: 'CapacityPartnership',
            entityId: partnership.id,
        });
        await this.notifier.notify({
            to: { manufacturerProfileId: line.manufacturerProfileId },
            type: 'ORDER_UPDATE',
            title: `Partnership request ${partnership.code}`,
            body: `${ctx.publicCode} wants ${dto.monthlyMinutes.toLocaleString('en')} minutes a month on line ${line.code} for ${String(dto.months)} months.`,
        });
        return { code: partnership.code };
    }
    async accept(ctx, code) {
        const p = await this.factoryPartnership(ctx, code);
        if (p.status !== 'REQUESTED')
            throw new ConflictException('This request is no longer open');
        const settings = await this.settings.get();
        const now = new Date();
        const year = now.getUTCFullYear();
        await this.prisma.$transaction(async (tx) => {
            const { count } = await tx.capacityPartnership.updateMany({
                where: { id: p.id, status: 'REQUESTED' },
                data: { status: 'ACTIVE', acceptedAt: now },
            });
            if (count !== 1)
                throw new ConflictException('This request is no longer open');
            for (const m of partnershipMonths(isoDate(p.startMonth), p.months)) {
                const windows = await tx.capacitySlot.findMany({
                    where: {
                        lineId: p.lineId,
                        status: 'OPEN',
                        startDate: { lte: dateOnly(m.end) },
                        endDate: { gte: dateOnly(m.start) },
                    },
                    orderBy: { startDate: 'asc' },
                });
                let left = p.monthlyMinutes;
                const taken = [];
                for (const w of windows) {
                    if (left === 0)
                        break;
                    const take = Math.min(left, w.totalMinutes - w.bookedMinutes);
                    if (take <= 0)
                        continue;
                    if (!(await reserveMinutes(tx, w.id, take)))
                        continue;
                    taken.push({ slotId: w.id, minutes: take });
                    left -= take;
                }
                if (left > 0)
                    throw new ConflictException(`Open line ${p.line.code} for ${m.start.slice(0, 7)} first: ${left.toLocaleString('en')} more minutes are needed`);
                const buyerAmount = amountForMinutes(p.monthlyMinutes, p.buyerRateMinorPer100Min);
                const deposit = (buyerAmount * BigInt(settings.depositBps) + 9999n) / 10000n;
                const bookingCode = await this.codes.sequential(`CB-${String(year)}`, 5, tx);
                await tx.capacityBooking.create({
                    data: {
                        code: bookingCode,
                        kind: 'PARTNERSHIP',
                        partnershipId: p.id,
                        buyerCompanyId: p.buyerCompanyId,
                        createdById: p.createdById,
                        manufacturerProfileId: p.manufacturerProfileId,
                        lineId: p.lineId,
                        categoryId: p.categoryId,
                        minutes: p.monthlyMinutes,
                        samPerPieceCenti: p.samPerPieceCenti,
                        startDate: dateOnly(m.start),
                        endDate: dateOnly(m.end),
                        currency: p.currency,
                        factoryRateMinorPer100Min: p.factoryRateMinorPer100Min,
                        buyerRateMinorPer100Min: p.buyerRateMinorPer100Min,
                        factoryAmountMinor: amountForMinutes(p.monthlyMinutes, p.factoryRateMinorPer100Min),
                        buyerAmountMinor: buyerAmount,
                        feeBps: settings.bookingFeeBps,
                        depositBps: settings.depositBps,
                        depositMinor: deposit < 1n ? 1n : deposit,
                        cancellationTiers: settings.cancellationTiers.map((t) => ({ ...t })),
                        factoryShareBps: settings.factoryShareBps,
                        noteFiltered: p.noteFiltered,
                        note: p.note,
                        factoryAcceptedAt: now,
                        holdExpiresAt: partnershipDepositDue(m.start, now, settings.holdHours),
                        allocations: { create: taken },
                    },
                });
            }
        });
        await this.audit.log({
            actorUserId: ctx.userId,
            action: 'capacity.partnership_accepted',
            entityType: 'CapacityPartnership',
            entityId: p.id,
        });
        await this.notifier.notify({
            to: { companyId: p.buyerCompanyId },
            type: 'ORDER_UPDATE',
            title: `Partnership ${p.code} accepted`,
            body: `${String(p.months)} months are reserved. Each month’s deposit is due two weeks before it starts.`,
        });
    }
    async decline(ctx, code, reason) {
        const p = await this.factoryPartnership(ctx, code);
        const { count } = await this.prisma.capacityPartnership.updateMany({
            where: { id: p.id, status: 'REQUESTED' },
            data: { status: 'DECLINED', declineReason: filterContactDetails(reason).filtered },
        });
        if (count !== 1)
            throw new ConflictException('This request is no longer open');
        await this.notifier.notify({
            to: { companyId: p.buyerCompanyId },
            type: 'ORDER_UPDATE',
            title: `Partnership ${p.code} declined`,
            body: reason,
        });
    }
    async cancel(ctx, code, reason) {
        const p = await this.prisma.capacityPartnership.findFirst({
            where: { code, buyerCompanyId: ctx.companyId },
            include: partnershipInclude,
        });
        if (!p)
            throw new NotFoundException('Partnership not found');
        const { count } = await this.prisma.capacityPartnership.updateMany({
            where: { id: p.id, status: { in: ['REQUESTED', 'ACTIVE'] } },
            data: { status: 'CANCELLED', cancelledAt: new Date() },
        });
        if (count !== 1)
            throw new ConflictException('This partnership has already ended');
        for (const b of p.bookings)
            if ((b.status === 'HELD' || b.status === 'CONFIRMED') && b.startDate > new Date())
                await this.bookings.cancelByBuyer(ctx, b.code, reason).catch(() => undefined);
        await this.notifier.notify({
            to: { manufacturerProfileId: p.manufacturerProfileId },
            type: 'ORDER_UPDATE',
            title: `Partnership ${p.code} cancelled`,
            body: `Months that hadn’t started are back on line ${p.line.code}.`,
        });
    }
    async endFinished() {
        const active = await this.prisma.capacityPartnership.findMany({
            where: { status: 'ACTIVE' },
            select: { id: true, bookings: { select: { status: true } } },
        });
        let ended = 0;
        for (const p of active)
            if (p.bookings.every((b) => ['COMPLETED', 'CANCELLED', 'EXPIRED'].includes(b.status))) {
                await this.prisma.capacityPartnership.update({
                    where: { id: p.id },
                    data: { status: 'ENDED' },
                });
                ended += 1;
            }
        return ended;
    }
    async buyerList(ctx) {
        const rows = await this.prisma.capacityPartnership.findMany({
            where: { buyerCompanyId: ctx.companyId },
            orderBy: { createdAt: 'desc' },
            include: partnershipInclude,
        });
        return rows.map((p) => ({
            ...this.base(p, p.note),
            manufacturer: {
                publicCode: p.manufacturerProfile.publicCode,
                country: p.manufacturerProfile.company.country,
            },
            buyerRateMinorPer100Min: p.buyerRateMinorPer100Min,
            monthlyAmountMinor: Number(amountForMinutes(p.monthlyMinutes, p.buyerRateMinorPer100Min)),
        }));
    }
    async factoryList(ctx) {
        const rows = await this.prisma.capacityPartnership.findMany({
            where: { manufacturerProfileId: ctx.profileId },
            orderBy: { createdAt: 'desc' },
            include: partnershipInclude,
        });
        return rows.map((p) => ({
            ...this.base(p, scrubText(p.noteFiltered ?? p.note, identityPatterns(identityOf(p.buyerCompany)))),
            buyer: { code: p.buyerCompany.buyerProfile?.publicCode ?? '' },
            line: p.line,
            factoryRateMinorPer100Min: p.factoryRateMinorPer100Min,
            monthlyAmountMinor: Number(amountForMinutes(p.monthlyMinutes, p.factoryRateMinorPer100Min)),
        }));
    }
    base(p, note) {
        return {
            code: p.code,
            status: p.status,
            category: p.category,
            monthlyMinutes: p.monthlyMinutes,
            months: p.months,
            startMonth: month(p.startMonth),
            samPerPiece: p.samPerPieceCenti === null ? null : centiToSam(p.samPerPieceCenti),
            currency: p.currency,
            declineReason: p.declineReason,
            note,
            createdAt: p.createdAt.toISOString(),
            bookings: p.bookings.map((b) => ({
                code: b.code,
                status: b.status,
                startDate: isoDate(b.startDate),
                endDate: isoDate(b.endDate),
            })),
        };
    }
    async factoryPartnership(ctx, code) {
        const p = await this.prisma.capacityPartnership.findFirst({
            where: { code, manufacturerProfileId: ctx.profileId },
            include: partnershipInclude,
        });
        if (!p)
            throw new NotFoundException('Partnership not found');
        return p;
    }
};
PartnershipsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        BookingSettingsService,
        BookingsService,
        PublicCodeService,
        Notifier,
        AuditService])
], PartnershipsService);
export { PartnershipsService };
//# sourceMappingURL=partnerships.service.js.map