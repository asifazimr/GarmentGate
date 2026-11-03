import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  type CapacitySlot,
  type CapacitySlotDto,
  type CapacitySlotUpdateDto,
  dateOnly,
  isoDate,
  type LineCalendar,
  type LineCalendarQuery,
  type ManufacturerLine,
  type ProductionLineDto,
  slotCapacityMinutes,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ManufacturerContext } from '../manufacturer/manufacturer-context.service.js';
import { lineCalendarDays } from './line-calendar.js';

const lineInclude = {
  categories: { select: { id: true, name: true }, orderBy: { sortOrder: 'asc' } },
  slots: { where: { status: 'OPEN' }, select: { bookedMinutes: true, endDate: true } },
} satisfies Prisma.ProductionLineInclude;
type LineRow = Prisma.ProductionLineGetPayload<{ include: typeof lineInclude }>;
type SlotRow = Prisma.CapacitySlotGetPayload<object>;

const today = () => dateOnly(new Date().toISOString());

/**
 * A factory's production lines and the windows it opens for capacity booking. Lines are measured
 * in SAM minutes and kept apart from the pieces-per-month capacity used by RFQ matching.
 */
@Injectable()
export class LinesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  // ── Lines ─────────────────────────────────────────────────────────────────

  async list(ctx: ManufacturerContext): Promise<ManufacturerLine[]> {
    const lines = await this.prisma.productionLine.findMany({
      where: { manufacturerProfileId: ctx.profileId },
      orderBy: [{ status: 'asc' }, { code: 'asc' }],
      include: lineInclude,
    });
    return lines.map((l) => this.lineView(l));
  }

  async create(ctx: ManufacturerContext, dto: ProductionLineDto): Promise<ManufacturerLine> {
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
    } catch (error) {
      throw this.uniqueCode(error);
    }
  }

  async update(
    ctx: ManufacturerContext,
    id: string,
    dto: ProductionLineDto,
  ): Promise<ManufacturerLine> {
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
    } catch (error) {
      throw this.uniqueCode(error);
    }
  }

  /** Lines with booked minutes can't be deleted: retire them instead (bookings keep their line). */
  async remove(ctx: ManufacturerContext, id: string): Promise<void> {
    await this.ownLine(ctx, id);
    const booked = await this.prisma.capacitySlot.count({
      where: { lineId: id, bookedMinutes: { gt: 0 } },
    });
    if (booked > 0)
      throw new ConflictException('This line has bookings: set it to Retired instead');
    await this.prisma.productionLine.delete({ where: { id } });
  }

  // ── Slots ─────────────────────────────────────────────────────────────────

  /**
   * Opens a window for booking. The line row is locked while checking for overlaps, so two
   * windows opened at once can't both land on the same days (the DB exclusion constraint backs
   * this up).
   */
  async openSlot(ctx: ManufacturerContext, dto: CapacitySlotDto): Promise<CapacitySlot> {
    const line = await this.ownLine(ctx, dto.lineId);
    if (line.status !== 'ACTIVE') throw new ConflictException('Activate the line first');
    const start = dateOnly(dto.startDate);
    const end = dateOnly(dto.endDate);
    if (start < today()) throw new BadRequestException('Windows can’t start in the past');
    if (end.getTime() - start.getTime() > 366 * 86_400_000)
      throw new BadRequestException('Open at most a year at a time');
    const capacity = slotCapacityMinutes(line, start, end);
    if (capacity === 0) throw new BadRequestException('No working days in that window');
    const total = dto.totalMinutes ?? capacity;
    if (total > capacity)
      throw new BadRequestException(
        `The line can make at most ${String(capacity)} minutes in that window`,
      );
    try {
      const slot = await this.prisma.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT id FROM production_lines WHERE id = ${line.id}::uuid FOR UPDATE`;
        const overlap = await tx.capacitySlot.findFirst({
          where: {
            lineId: line.id,
            status: 'OPEN',
            startDate: { lte: end },
            endDate: { gte: start },
          },
          select: { id: true },
        });
        if (overlap) throw new ConflictException('That window overlaps one already open');
        return tx.capacitySlot.create({
          data: { lineId: line.id, startDate: start, endDate: end, totalMinutes: total },
        });
      });
      return this.slotView(slot);
    } catch (error) {
      if (String(error).includes('capacity_slots_no_overlap'))
        throw new ConflictException('That window overlaps one already open');
      throw error;
    }
  }

  /**
   * Shortens or lengthens a window, offers more or fewer minutes, or closes it. Never below what's
   * already booked: the update only applies while that holds (bookings may land meanwhile).
   */
  async updateSlot(
    ctx: ManufacturerContext,
    id: string,
    dto: CapacitySlotUpdateDto,
  ): Promise<CapacitySlot> {
    const slot = await this.ownSlot(ctx, id);
    const line = await this.ownLine(ctx, slot.lineId);
    const end = dto.endDate ? dateOnly(dto.endDate) : slot.endDate;
    if (end < slot.startDate) throw new BadRequestException('The end can’t be before the start');
    const capacity = slotCapacityMinutes(line, slot.startDate, end);
    const total = dto.totalMinutes ?? Math.min(slot.totalMinutes, capacity);
    if (total > capacity)
      throw new BadRequestException(
        `The line can make at most ${String(capacity)} minutes in that window`,
      );
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
    } catch (error) {
      if (String(error).includes('capacity_slots_no_overlap'))
        throw new ConflictException('That window overlaps one already open');
      throw error;
    }
    return this.slotView(await this.prisma.capacitySlot.findUniqueOrThrow({ where: { id } }));
  }

  async deleteSlot(ctx: ManufacturerContext, id: string): Promise<void> {
    await this.ownSlot(ctx, id);
    const { count } = await this.prisma.capacitySlot.deleteMany({
      where: { id, bookedMinutes: 0 },
    });
    if (count !== 1) throw new ConflictException('This window has bookings: reduce it instead');
  }

  // ── Calendar ──────────────────────────────────────────────────────────────

  async calendar(ctx: ManufacturerContext, query: LineCalendarQuery): Promise<LineCalendar> {
    const from = dateOnly(query.from);
    const to = new Date(from.getTime() + (query.days - 1) * 86_400_000);
    const lines = await this.prisma.productionLine.findMany({
      where: { manufacturerProfileId: ctx.profileId, status: { not: 'RETIRED' } },
      orderBy: { code: 'asc' },
      include: {
        ...lineInclude,
        // Every slot touching the window, open or closed (the factory sees its history too).
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

  // ── Helpers ───────────────────────────────────────────────────────────────

  private lineData(dto: ProductionLineDto) {
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

  private async ownLine(ctx: ManufacturerContext, id: string) {
    const line = await this.prisma.productionLine.findFirst({
      where: { id, manufacturerProfileId: ctx.profileId },
    });
    if (!line) throw new NotFoundException('Line not found');
    return line;
  }

  private async ownSlot(ctx: ManufacturerContext, id: string): Promise<SlotRow> {
    const slot = await this.prisma.capacitySlot.findFirst({
      where: { id, line: { manufacturerProfileId: ctx.profileId } },
    });
    if (!slot) throw new NotFoundException('Window not found');
    return slot;
  }

  private async assertCategories(ids: string[]): Promise<void> {
    const found = await this.prisma.category.count({ where: { id: { in: ids } } });
    if (found !== new Set(ids).size) throw new BadRequestException('Unknown category');
  }

  private uniqueCode(error: unknown): unknown {
    return typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002'
      ? new ConflictException('You already have a line with that code')
      : error;
  }

  private lineView(l: LineRow): ManufacturerLine {
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

  private slotView(s: SlotRow): CapacitySlot {
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
}
