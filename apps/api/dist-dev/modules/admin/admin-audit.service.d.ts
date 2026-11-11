import type { AuditEntry, AuditQuery } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
export declare class AdminAuditService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(query: AuditQuery): Promise<AuditEntry[]>;
}
