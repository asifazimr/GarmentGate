import { type Notification, type NotificationLink } from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
export declare const notificationSelect: {
    id: true;
    type: true;
    title: true;
    body: true;
    data: true;
    readAt: true;
    createdAt: true;
};
type Row = Prisma.NotificationGetPayload<{
    select: typeof notificationSelect;
}>;
export declare function linkOf(data: Prisma.JsonValue): NotificationLink;
export declare function notificationView(n: Row): Notification;
export {};
