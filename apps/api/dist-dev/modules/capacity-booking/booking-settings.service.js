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
import { CapacityBookingSettingsSchema, DEFAULT_CAPACITY_BOOKING_SETTINGS, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
const KEY = 'capacity_booking';
let BookingSettingsService = class BookingSettingsService {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async get() {
        const row = await this.prisma.platformSetting.findUnique({ where: { key: KEY } });
        const parsed = CapacityBookingSettingsSchema.safeParse(row?.value);
        return parsed.success ? parsed.data : DEFAULT_CAPACITY_BOOKING_SETTINGS;
    }
    async set(adminId, settings) {
        const value = {
            ...settings,
            cancellationTiers: settings.cancellationTiers.map((t) => ({ ...t })),
        };
        await this.prisma.platformSetting.upsert({
            where: { key: KEY },
            create: { key: KEY, value },
            update: { value },
        });
        await this.audit.log({
            actorUserId: adminId,
            action: 'capacity.settings_updated',
            entityType: 'PlatformSetting',
            entityId: KEY,
            metadata: value,
        });
        return settings;
    }
};
BookingSettingsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        AuditService])
], BookingSettingsService);
export { BookingSettingsService };
//# sourceMappingURL=booking-settings.service.js.map