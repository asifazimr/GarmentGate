var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { ChatModerationService, VIOLATION_ACTION, VIOLATION_WINDOW_DAYS, } from '../chat/chat-moderation.service.js';
import { ChatRealtime } from '../chat/chat-realtime.service.js';
import { Notifier } from '../notifications/notifier.service.js';
let AdminUsersService = class AdminUsersService {
    prisma;
    moderation;
    realtime;
    notifier;
    audit;
    constructor(prisma, moderation, realtime, notifier, audit) {
        this.prisma = prisma;
        this.moderation = moderation;
        this.realtime = realtime;
        this.notifier = notifier;
        this.audit = audit;
    }
    async list() {
        const since = new Date(Date.now() - VIOLATION_WINDOW_DAYS * 86_400_000);
        const [users, violations] = await Promise.all([
            this.prisma.user.findMany({
                where: { deletedAt: null },
                orderBy: { createdAt: 'desc' },
                take: 5000,
                include: {
                    company: {
                        select: {
                            id: true,
                            legalName: true,
                            type: true,
                            kycStatus: true,
                            buyerProfile: { select: { publicCode: true } },
                            manufacturerProfile: { select: { publicCode: true } },
                        },
                    },
                    _count: { select: { accountWarnings: true } },
                },
            }),
            this.prisma.auditLog.groupBy({
                by: ['actorUserId'],
                where: { action: VIOLATION_ACTION, createdAt: { gte: since } },
                _count: { _all: true },
            }),
        ]);
        const hits = new Map(violations.map((v) => [v.actorUserId, v._count._all]));
        return users.map((u) => ({
            id: u.id,
            email: u.email,
            name: `${u.firstName} ${u.lastName}`,
            role: u.role,
            status: u.status,
            company: u.company
                ? {
                    id: u.company.id,
                    name: u.company.legalName,
                    code: u.company.buyerProfile?.publicCode ??
                        u.company.manufacturerProfile?.publicCode ??
                        null,
                    type: u.company.type,
                    kycStatus: u.company.kycStatus,
                }
                : null,
            emailVerified: u.emailVerifiedAt !== null,
            lastLoginAt: u.lastLoginAt?.toISOString() ?? null,
            createdAt: u.createdAt.toISOString(),
            violations: hits.get(u.id) ?? 0,
            warnings: u._count.accountWarnings,
            suspendedReason: u.suspendedReason,
            suspendedAt: u.suspendedAt?.toISOString() ?? null,
        }));
    }
    async suspend(adminId, userId, dto) {
        if (adminId === userId)
            throw new BadRequestException('You can’t suspend yourself');
        const user = await this.find(userId);
        if (user.status === 'SUSPENDED')
            throw new ConflictException('Already suspended');
        const now = new Date();
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: userId },
                data: { status: 'SUSPENDED', suspendedAt: now, suspendedReason: dto.reason },
            }),
            this.prisma.session.updateMany({
                where: { userId, revokedAt: null },
                data: { revokedAt: now },
            }),
        ]);
        await this.audit.log({
            actorUserId: adminId,
            action: 'user.suspended',
            entityType: 'User',
            entityId: userId,
            metadata: { reason: dto.reason, email: user.email },
        });
    }
    async reactivate(adminId, userId) {
        const user = await this.find(userId);
        if (user.status === 'ACTIVE')
            throw new ConflictException('Already active');
        await this.prisma.user.update({
            where: { id: userId },
            data: { status: 'ACTIVE', suspendedAt: null, suspendedReason: null },
        });
        await this.audit.log({
            actorUserId: adminId,
            action: 'user.reactivated',
            entityType: 'User',
            entityId: userId,
            metadata: { email: user.email },
        });
    }
    async warn(adminId, userId, dto) {
        const user = await this.find(userId);
        if (user.role === 'ADMIN')
            throw new BadRequestException('Staff accounts can’t be warned');
        const violations = await this.moderation.violations(userId);
        await this.prisma.accountWarning.create({
            data: { userId, level: dto.level, violations, issuedById: adminId, note: dto.note },
        });
        await this.notifier.notify({
            to: { userIds: [userId] },
            type: 'SYSTEM',
            title: dto.level === 'FINAL_WARNING'
                ? 'Final warning from GarmentGate'
                : 'A warning from GarmentGate',
            body: dto.note,
        });
        await this.audit.log({
            actorUserId: adminId,
            action: 'user.warned',
            entityType: 'User',
            entityId: userId,
            metadata: { level: dto.level, note: dto.note, violations },
        });
        this.realtime.warning(userId);
    }
    async find(userId) {
        const user = await this.prisma.user.findFirst({
            where: { id: userId, deletedAt: null },
            select: { id: true, email: true, role: true, status: true },
        });
        if (!user)
            throw new NotFoundException('User not found');
        return user;
    }
};
AdminUsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        ChatModerationService,
        ChatRealtime,
        Notifier,
        AuditService])
], AdminUsersService);
export { AdminUsersService };
//# sourceMappingURL=admin-users.service.js.map