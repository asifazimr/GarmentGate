import { type MessagingSettings, type NotificationType } from '@garmentgate/shared';
import type { PrismaService } from '../../prisma/prisma.service.js';
export declare const TEXTS_QUEUE = "texts";
export declare const MESSAGING_KEY = "messaging";
export interface TextJob {
    userId: string;
    type: NotificationType;
    title: string;
    body: string;
    url: string;
}
export declare function messagingSettings(prisma: PrismaService): Promise<MessagingSettings>;
