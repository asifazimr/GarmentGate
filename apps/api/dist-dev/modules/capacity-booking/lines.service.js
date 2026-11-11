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
import { dateOnly, isoDate, slotCapacityMinutes, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { lineCalendarDays } from './line-calendar.js';
const lineInclude = {
    categories: { select: { id: true, name: true }, orderBy: { sortOrder: 'asc' } },
    slots: { where: { status: 'OPEN' }, select: { bookedMinutes: true, endDate: true } },
};
const today = () => dateOnly(new Date().toISOString());
let LinesService = class LinesService {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async list(ctx) {
        const lines = await this.prisma.productionLine.findMany({
            where: { manufacturerProfileId: ctx.profileId },
            orderBy: [{ status: 'asc' }, { code: 'asc' }],
            include: lineInclude,
        });
        return lines.map((l) => this.lineView(l));
    }
    async create(ctx, dto) {
        await this.assertCategories(dto.categoryIds);
        try {
            const line = await this.prisma.productionLine.create({
                data: {
                    manufacturerProfileId: ctx.profileId,
                    ...this.lineData(dto),
                    categories: { connect: dto.categoryIds.map((id) => ({ id })) },
                },
                include: lineInclude,
            });
            await this.audit.log({
                actorUserId: ctx.userId,
                action: 'capacity.line_created',
                entityType: 'ProductionLine',
                entityId: line.id,
            });
            return this.lineView(line);
        }
        catch (error) {
            throw this.uniqueCode(error);
        }
    }
    async update(ctx, id, dto) {
        await this.ownLine(ctx, id);
        await this.assertCategories(dto.categoryIds);
        try {
            const line = await this.prisma.productionLine.update({
                where: { id },
                data: {
                    ...this.lineData(dto),
                    categories: { set: dto.categoryIds.map((c) => ({ id: c })) },
                },
                include: lineInclude,
            });
            return this.lineView(line);
        }
        catch (error) {
            throw this.uniqueCode(error);
        }
    }
    async remove(ctx, id) {
        await this.ownLine(ctx, id);
        const [booked, bookings] = await Promise.all([
            this.prisma.capacitySlot.count({ where: { lineId: id, bookedMinutes: { gt: 0 } } }),
            this.prisma.capacityBooking.count({ where: { lineId: id } }),
        ]);
        if (booked > 0 || bookings > 0)
            throw new ConflictException('This line has bookings: set it to Retired instead');
        await this.prisma.productionLine.delete({ where: { id } });
    }
    async openSlot(ctx, dto) {
        const line = await this.ownLine(ctx, dto.lineId);
        if (line.status !== 'ACTIVE')
            throw new ConflictException('Activate the line first');
        const start = dateOnly(dto.startDate);
        const end = dateOnly(dto.endDate);
        if (start < today())
            throw new BadRequestException('Windows can’t start in the past');
        if (end.getTime() - start.getTime() > 366 * 86_400_000)
            throw new BadRequestException('Open at most a year at a time');
        const capacity = slotCapacityMinutes(line, start, end);
        if (capacity === 0)
            throw new BadRequestException('No working days in that window');
        const total = dto.totalMinutes ?? capacity;
        if (total > capacity)
            throw new BadRequestException(`The line can make at most ${String(capacity)} minutes in that window`);
        try {
            const slot = await this.prisma.$transaction(async (tx) => {
                await tx.$queryRaw `SELECT id FROM production_lines WHERE id = ${line.id}::uuid FOR UPDATE`;
                const overlap = await tx.capacitySlot.findFirst({
                    where: {
                        lineId: line.id,
                        status: 'OPEN',
                        startDate: { lte: end },
                        endDate: { gte: start },
                    },
                    select: { id: true },
                });
                if (overlap)
                    throw new ConflictException('That window overlaps one already open');
                return tx.capacitySlot.create({
                    data: { lineId: line.id, startDate: start, endDate: end, totalMinutes: total },
                });
            });
            return this.slotView(slot);
        }
        catch (error) {
            if (String(error).includes('capacity_slots_no_overlap'))
                throw new ConflictException('That window overlaps one already open');
            throw error;
        }
    }
    async updateSlot(ctx, id, dto) {
        const slot = await this.ownSlot(ctx, id);
        const line = await this.ownLine(ctx, slot.lineId);
        const end = dto.endDate ? dateOnly(dto.endDate) : slot.endDate;
        if (end < slot.startDate)
            throw new BadRequestException('The end can’t be before the start');
        const capacity = slotCapacityMinutes(line, slot.startDate, end);
        const total = dto.totalMinutes ?? Math.min(slot.totalMinutes, capacity);
        if (total > capacity)
            throw new BadRequestException(`The line can make at most ${String(capacity)} minutes in that window`);
        if (dto.status === 'CLOSED' && slot.bookedMinutes > 0)
            throw new ConflictException('This window has bookings: reduce it instead of closing it');
        try {
            const { count } = await this.prisma.capacitySlot.updateMany({
                where: {
                    id,
                    bookedMinutes: { lte: total },
                    ...(dto.status === 'CLOSED' && { bookedMinutes: 0 }),
                },
                data: { endDate: end, totalMinutes: total, ...(dto.status && { status: dto.status }) },
            });
            if (count !== 1)
                throw new ConflictException('More minutes are booked than that: reload and try again');
        }
        catch (error) {
            if (String(error).includes('capacity_slots_no_overlap'))
                throw new ConflictException('That window overlaps one already open');
            throw error;
        }
        return this.slotView(await this.prisma.capacitySlot.findUniqueOrThrow({ where: { id } }));
    }
    async deleteSlot(ctx, id) {
        await this.ownSlot(ctx, id);
        const { count } = await this.prisma.capacitySlot.deleteMany({
            where: { id, bookedMinutes: 0 },
        });
        if (count !== 1)
            throw new ConflictException('This window has bookings: reduce it instead');
    }
    async calendar(ctx, query) {
        const from = dateOnly(query.from);
        const to = new Date(from.getTime() + (query.days - 1) * 86_400_000);
        const lines = await this.prisma.productionLine.findMany({
            where: { manufacturerProfileId: ctx.profileId, status: { not: 'RETIRED' } },
            orderBy: { code: 'asc' },
            include: {
                ...lineInclude,
            },
        });
        const slots = await this.prisma.capacitySlot.findMany({
            where: {
                lineId: { in: lines.map((l) => l.id) },
                startDate: { lte: to },
                endDate: { gte: from },
            },
            orderBy: { startDate: 'asc' },
        });
        return {
            from: query.from,
            days: query.days,
            lines: lines.map((l) => {
                const own = slots.filter((s) => s.lineId === l.id);
                return {
                    line: this.lineView(l),
                    slots: own.map((s) => this.slotView(s)),
                    days: lineCalendarDays(l, own, query.from, query.days),
                };
            }),
        };
    }
    lineData(dto) {
        return {
            code: dto.code.toUpperCase(),
            name: dto.name,
            dailySamMinutes: dto.dailySamMinutes,
            workingDays: [...new Set(dto.workingDays)].sort(),
            cmRateMinorPer100Min: dto.cmRateMinorPer100Min,
            currency: dto.currency,
            status: dto.status,
        };
    }
    async ownLine(ctx, id) {
        const line = await this.prisma.productionLine.findFirst({
            where: { id, manufacturerProfileId: ctx.profileId },
        });
        if (!line)
            throw new NotFoundException('Line not found');
        return line;
    }
    async ownSlot(ctx, id) {
        const slot = await this.prisma.capacitySlot.findFirst({
            where: { id, line: { manufacturerProfileId: ctx.profileId } },
        });
        if (!slot)
            throw new NotFoundException('Window not found');
        return slot;
    }
    async assertCategories(ids) {
        const found = await this.prisma.category.count({ where: { id: { in: ids } } });
        if (found !== new Set(ids).size)
            throw new BadRequestException('Unknown category');
    }
    uniqueCode(error) {
        return typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002'
            ? new ConflictException('You already have a line with that code')
            : error;
    }
    lineView(l) {
        const now = today();
        return {
            id: l.id,
            code: l.code,
            name: l.name,
            categories: l.categories,
            dailySamMinutes: l.dailySamMinutes,
            workingDays: l.workingDays,
            cmRateMinorPer100Min: l.cmRateMinorPer100Min,
            currency: l.currency,
            status: l.status,
            upcomingBookedMinutes: l.slots
                .filter((s) => s.endDate >= now)
                .reduce((a, s) => a + s.bookedMinutes, 0),
        };
    }
    slotView(s) {
        return {
            id: s.id,
            lineId: s.lineId,
            startDate: isoDate(s.startDate),
            endDate: isoDate(s.endDate),
            totalMinutes: s.totalMinutes,
            bookedMinutes: s.bookedMinutes,
            status: s.status,
        };
    }
};
LinesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        AuditService])
], LinesService);
export { LinesService };
//# sourceMappingURL=lines.service.js.map