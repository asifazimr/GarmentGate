import { Injectable, Logger } from '@nestjs/common';
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

/** Append-only audit trail. Failures are logged, never thrown: auditing must not break a request. */
@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private readonly prisma: PrismaService) {}

  async log(entry: AuditEntry): Promise<void> {
    try {
      await this.prisma.auditLog.create({
        data: {
          action: entry.action,
          entityType: entry.entityType,
          entityId: entry.entityId ?? null,
          actorUserId: entry.actorUserId ?? null,
          ...(entry.metadata !== undefined && { metadata: entry.metadata }),
          ip: entry.ip ?? null,
          userAgent: entry.userAgent?.slice(0, 500) ?? null,
        },
      });
    } catch (error) {
      this.logger.error({ err: error, action: entry.action }, 'Failed to write audit log');
    }
  }
}
