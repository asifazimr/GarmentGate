var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuditService_1;
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
let AuditService = AuditService_1 = class AuditService {
    prisma;
    logger = new Logger(AuditService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async log(entry) {
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
        }
        catch (error) {
            this.logger.error({ err: error, action: entry.action }, 'Failed to write audit log');
        }
    }
};
AuditService = AuditService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AuditService);
export { AuditService };
//# sourceMappingURL=audit.service.js.map