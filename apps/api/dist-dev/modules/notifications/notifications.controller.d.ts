import { type ActivityPage, type ActivityQuery, type NotificationList, type NotificationPreferences, type UpdateNotificationPreferencesDto } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { NotificationsService } from './notifications.service.js';
export declare class NotificationsController {
    private readonly notifications;
    constructor(notifications: NotificationsService);
    list(user: AuthenticatedUser): Promise<NotificationList>;
    activity(user: AuthenticatedUser, query: ActivityQuery): Promise<ActivityPage>;
    preferences(user: AuthenticatedUser): Promise<NotificationPreferences>;
    updatePreferences(user: AuthenticatedUser, dto: UpdateNotificationPreferencesDto): Promise<NotificationPreferences>;
    markAllRead(user: AuthenticatedUser): Promise<void>;
    markRead(user: AuthenticatedUser, id: string): Promise<void>;
}
