import { type ActivityPage, type ActivityQuery, type NotificationList, type NotificationPreferences, type UpdateNotificationPreferencesDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(userId: string): Promise<NotificationList>;
    activity(userId: string, query: ActivityQuery): Promise<ActivityPage>;
    markRead(userId: string, id: string): Promise<void>;
    markAllRead(userId: string): Promise<void>;
    preferences(userId: string): Promise<NotificationPreferences>;
    updatePreferences(userId: string, dto: UpdateNotificationPreferencesDto): Promise<NotificationPreferences>;
}
