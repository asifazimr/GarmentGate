import { Injectable } from '@nestjs/common';
import {
  type CapacityBookingSettings,
  CapacityBookingSettingsSchema,
  DEFAULT_CAPACITY_BOOKING_SETTINGS,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';

const KEY = 'capacity_booking';

/**
 * Booking fee, deposit, hold length and cancellation policy. Each booking snapshots what applied
 * when it was placed, so changes only affect new bookings.
 */
@Injectable()
export class BookingSettingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  async get(): Promise<CapacityBookingSettings> {
    const row = await this.prisma.platformSetting.findUnique({ where: { key: KEY } });
    const parsed = CapacityBookingSettingsSchema.safeParse(row?.value);
    return parsed.success ? parsed.data : DEFAULT_CAPACITY_BOOKING_SETTINGS;
  }

  async set(adminId: string, settings: CapacityBookingSettings): Promise<CapacityBookingSettings> {
    const value: Prisma.InputJsonValue = {
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
}
