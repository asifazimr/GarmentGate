import type { CapacityCalendar, UpdateCapacityMonthDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { type ManufacturerContext } from './manufacturer-context.service.js';
export declare class CapacityService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    calendar(ctx: ManufacturerContext, from: string | undefined, months: number): Promise<CapacityCalendar>;
    updateMonth(ctx: ManufacturerContext, month: string, dto: UpdateCapacityMonthDto): Promise<void>;
}
