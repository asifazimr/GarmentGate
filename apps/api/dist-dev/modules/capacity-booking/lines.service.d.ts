import { type CapacitySlot, type CapacitySlotDto, type CapacitySlotUpdateDto, type LineCalendar, type LineCalendarQuery, type ManufacturerLine, type ProductionLineDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ManufacturerContext } from '../manufacturer/manufacturer-context.service.js';
export declare class LinesService {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(ctx: ManufacturerContext): Promise<ManufacturerLine[]>;
    create(ctx: ManufacturerContext, dto: ProductionLineDto): Promise<ManufacturerLine>;
    update(ctx: ManufacturerContext, id: string, dto: ProductionLineDto): Promise<ManufacturerLine>;
    remove(ctx: ManufacturerContext, id: string): Promise<void>;
    openSlot(ctx: ManufacturerContext, dto: CapacitySlotDto): Promise<CapacitySlot>;
    updateSlot(ctx: ManufacturerContext, id: string, dto: CapacitySlotUpdateDto): Promise<CapacitySlot>;
    deleteSlot(ctx: ManufacturerContext, id: string): Promise<void>;
    calendar(ctx: ManufacturerContext, query: LineCalendarQuery): Promise<LineCalendar>;
    private lineData;
    private ownLine;
    private ownSlot;
    private assertCategories;
    private uniqueCode;
    private lineView;
    private slotView;
}
