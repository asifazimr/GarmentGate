import {
  DEFAULT_MESSAGING_SETTINGS,
  type MessagingSettings,
  MessagingSettingsSchema,
  type NotificationType,
} from '@garmentgate/shared';
import type { PrismaService } from '../../prisma/prisma.service.js';

/** BullMQ queue the texts worker (modules/messaging) drains. */
export const TEXTS_QUEUE = 'texts';
export const MESSAGING_KEY = 'messaging';

export interface TextJob {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  url: string;
}

/** `platform_settings.messaging`, or the defaults. */
export async function messagingSettings(prisma: PrismaService): Promise<MessagingSettings> {
  const row = await prisma.platformSetting.findUnique({ where: { key: MESSAGING_KEY } });
  const parsed = MessagingSettingsSchema.safeParse(row?.value);
  return parsed.success ? parsed.data : DEFAULT_MESSAGING_SETTINGS;
}
