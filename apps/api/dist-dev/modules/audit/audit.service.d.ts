import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
export interface AuditEntry {
    action: string;
    entityType: string;
    entityId?: string | null;
    actorUserId?: string | null;
    metadata?: Prisma.InputJsonValue;
    ip?: string | undefined;
    userAgent?: string | undefined;
}
export declare class AuditService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    log(entry: AuditEntry): Promise<void>;
}
