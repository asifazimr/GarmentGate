import { BadRequestException, Injectable } from '@nestjs/common';
import type { CapacityCalendar, UpdateCapacityMonthDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import {
  addMonths,
  buildCalendar,
  CAPACITY_ORDER_STATUSES,
  monthKey,
  monthStart,
} from './capacity-calendar.js';
import { type ManufacturerContext } from './manufacturer-context.service.js';

const MAX_MONTHS = 24;

@Injectable()
export class CapacityService {
  constructor(private readonly prisma: PrismaService) {}

  async calendar(
    ctx: ManufacturerContext,
    from: string | undefined,
    months: number,
  ): Promise<CapacityCalendar> {
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

  async updateMonth(
    ctx: ManufacturerContext,
    month: string,
    dto: UpdateCapacityMonthDto,
  ): Promise<void> {
    const current = monthKey(new Date());
    if (month < current) throw new BadRequestException('Past months can’t be changed');
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
}
