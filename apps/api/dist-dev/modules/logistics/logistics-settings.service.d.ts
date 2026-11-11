import { type LogisticsSettings } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
export declare class LogisticsSettingsService {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    get(): Promise<LogisticsSettings>;
    set(adminId: string, settings: LogisticsSettings): Promise<LogisticsSettings>;
}
