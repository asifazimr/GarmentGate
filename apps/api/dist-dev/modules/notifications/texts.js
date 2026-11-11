import { DEFAULT_MESSAGING_SETTINGS, MessagingSettingsSchema, } from '@garmentgate/shared';
export const TEXTS_QUEUE = 'texts';
export const MESSAGING_KEY = 'messaging';
export async function messagingSettings(prisma) {
    const row = await prisma.platformSetting.findUnique({ where: { key: MESSAGING_KEY } });
    const parsed = MessagingSettingsSchema.safeParse(row?.value);
    return parsed.success ? parsed.data : DEFAULT_MESSAGING_SETTINGS;
}
//# sourceMappingURL=texts.js.map