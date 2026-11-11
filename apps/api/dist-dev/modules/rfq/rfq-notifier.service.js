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
import { Notifier } from '../notifications/notifier.service.js';
let RfqNotifier = class RfqNotifier {
    prisma;
    notifier;
    constructor(prisma, notifier) {
        this.prisma = prisma;
        this.notifier = notifier;
    }
    async send(userIds, type, title, body, data) {
        const unique = [...new Set(userIds)];
        if (unique.length === 0)
            return;
        await this.notifier.notify({ to: { userIds: unique }, type, title, body, link: data });
    }
    async admins() {
        const rows = await this.prisma.user.findMany({
            where: { role: 'ADMIN', status: 'ACTIVE' },
            select: { id: true },
        });
        return rows.map((r) => r.id);
    }
    async companyUsers(where) {
        const rows = await this.prisma.user.findMany({
            where: {
                status: 'ACTIVE',
                ...('companyId' in where
                    ? { companyId: where.companyId }
                    : { company: { manufacturerProfile: { id: where.manufacturerProfileId } } }),
            },
            select: { id: true },
        });
        return rows.map((r) => r.id);
    }
};
RfqNotifier = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        Notifier])
], RfqNotifier);
export { RfqNotifier };
//# sourceMappingURL=rfq-notifier.service.js.map