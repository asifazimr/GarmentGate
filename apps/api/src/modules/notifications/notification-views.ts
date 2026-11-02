import {
  NOTIFICATION_CATEGORY,
  type Notification,
  type NotificationLink,
  NotificationLinkSchema,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';

export const notificationSelect = {
  id: true,
  type: true,
  title: true,
  body: true,
  data: true,
  readAt: true,
  createdAt: true,
} satisfies Prisma.NotificationSelect;
type Row = Prisma.NotificationGetPayload<{ select: typeof notificationSelect }>;

/** Only known link keys pass through; anything else in `data` stays server-side. */
export function linkOf(data: Prisma.JsonValue): NotificationLink {
  const parsed = NotificationLinkSchema.safeParse(data ?? {});
  if (!parsed.success) return {};
  const { orderCode, rfqCode, conversationId, inspectionId } = parsed.data;
  return Object.fromEntries(
    Object.entries({ orderCode, rfqCode, conversationId, inspectionId }).filter(
      ([, v]) => typeof v === 'string',
    ),
  );
}

export function notificationView(n: Row): Notification {
  return {
    id: n.id,
    type: n.type,
    category: NOTIFICATION_CATEGORY[n.type],
    title: n.title,
    body: n.body,
    link: linkOf(n.data),
    readAt: n.readAt?.toISOString() ?? null,
    createdAt: n.createdAt.toISOString(),
  };
}
