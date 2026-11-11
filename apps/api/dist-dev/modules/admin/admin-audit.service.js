var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
let AdminAuditService = class AdminAuditService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(query) {
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
};
AdminAuditService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AdminAuditService);
export { AdminAuditService };
//# sourceMappingURL=admin-audit.service.js.map