import { Injectable } from '@nestjs/common';
import type { AuditEntry, AuditQuery } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';

/** The audit log, newest first, narrowed on the server; the table pages and searches it. */
@Injectable()
export class AdminAuditService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: AuditQuery): Promise<AuditEntry[]> {
    const rows = await this.prisma.auditLog.findMany({
      where: {
        ...(query.action && { action: { startsWith: query.action } }),
        ...(query.entityType && { entityType: query.entityType }),
        ...(query.entityId && { entityId: query.entityId }),
        ...(query.actorId && { actorUserId: query.actorId }),
        ...((query.from ?? query.to) && {
          createdAt: {
            ...(query.from && { gte: new Date(query.from) }),
            ...(query.to && { lte: new Date(query.to) }),
          },
        }),
      },
      orderBy: { createdAt: 'desc' },
      take: query.limit,
      include: {
        actor: { select: { id: true, firstName: true, lastName: true, email: true, role: true } },
      },
    });
    return rows.map((r) => ({
      id: r.id,
      action: r.action,
      entityType: r.entityType,
      entityId: r.entityId,
      actor: r.actor
        ? {
            id: r.actor.id,
            name: `${r.actor.firstName} ${r.actor.lastName}`,
            email: r.actor.email,
            role: r.actor.role,
          }
        : null,
      metadata: r.metadata,
      ip: r.ip,
      createdAt: r.createdAt.toISOString(),
    }));
  }
}
