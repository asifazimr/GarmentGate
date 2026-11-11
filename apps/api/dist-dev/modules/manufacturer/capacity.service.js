var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { addMonths, buildCalendar, CAPACITY_ORDER_STATUSES, monthKey, monthStart, } from './capacity-calendar.js';
const MAX_MONTHS = 24;
let CapacityService = class CapacityService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async calendar(ctx, from, months) {
        const start = from ?? monthKey(new Date());
        const count = Math.min(Math.max(months, 1), MAX_MONTHS);
        const end = addMonths(start, count);
        const [profile, overrides, orders] = await Promise.all([
            this.prisma.manufacturerProfile.findUniqueOrThrow({
                where: { id: ctx.profileId },
                select: { monthlyCapacityPcs: true },
            }),
            this.prisma.capacityMonth.findMany({
                where: {
                    manufacturerProfileId: ctx.profileId,
                    month: { gte: monthStart(start), lt: monthStart(end) },
                },
            }),
            this.prisma.order.findMany({
                where: {
                    manufacturerProfileId: ctx.profileId,
                    status: { in: [...CAPACITY_ORDER_STATUSES] },
                    requestedShipDate: { gte: monthStart(start), lt: monthStart(end) },
                },
                select: { quantity: true, requestedShipDate: true },
            }),
        ]);
        return {
            defaultMonthlyCapacityPcs: profile.monthlyCapacityPcs,
            months: buildCalendar({
                from: start,
                count,
                defaultCapacity: profile.monthlyCapacityPcs,
                overrides,
                orders,
            }),
        };
    }
    async updateMonth(ctx, month, dto) {
        const current = monthKey(new Date());
        if (month < current)
            throw new BadRequestException('Past months can’t be changed');
        const where = {
            manufacturerProfileId_month: {
                manufacturerProfileId: ctx.profileId,
                month: monthStart(month),
            },
        };
        const data = {
            availablePcs: dto.availablePcs,
            externalBookedPcs: dto.externalBookedPcs,
            note: dto.note ?? null,
        };
        await this.prisma.capacityMonth.upsert({
            where,
            create: { manufacturerProfileId: ctx.profileId, month: monthStart(month), ...data },
            update: data,
        });
    }
};
CapacityService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CapacityService);
export { CapacityService };
//# sourceMappingURL=capacity.service.js.map