import { Injectable } from '@nestjs/common';
import {
  DEFAULT_LOGISTICS_SETTINGS,
  type LogisticsSettings,
  LogisticsSettingsSchema,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';

const KEY = 'logistics';

/** Shipper mode, cargo insurance pricing and quote validity (`platform_settings.logistics`). */
@Injectable()
export class LogisticsSettingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  async get(): Promise<LogisticsSettings> {
    const row = await this.prisma.platformSetting.findUnique({ where: { key: KEY } });
    const parsed = LogisticsSettingsSchema.safeParse(row?.value);
    return parsed.success ? parsed.data : DEFAULT_LOGISTICS_SETTINGS;
  }

  async set(adminId: string, settings: LogisticsSettings): Promise<LogisticsSettings> {
    const value: Prisma.InputJsonValue = { ...settings };
    await this.prisma.platformSetting.upsert({
      where: { key: KEY },
      create: { key: KEY, value },
      update: { value },
    });
    await this.audit.log({
      actorUserId: adminId,
      action: 'logistics.settings_updated',
      entityType: 'PlatformSetting',
      entityId: KEY,
      metadata: value,
    });
    return settings;
  }
}
