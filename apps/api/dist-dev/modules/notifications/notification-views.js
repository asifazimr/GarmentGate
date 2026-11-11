import { NOTIFICATION_CATEGORY, NotificationLinkSchema, } from '@garmentgate/shared';
export const notificationSelect = {
    id: true,
    type: true,
    title: true,
    body: true,
    data: true,
    readAt: true,
    createdAt: true,
};
export function linkOf(data) {
    const parsed = NotificationLinkSchema.safeParse(data ?? {});
    if (!parsed.success)
        return {};
    const { orderCode, rfqCode, conversationId, inspectionId } = parsed.data;
    return Object.fromEntries(Object.entries({ orderCode, rfqCode, conversationId, inspectionId }).filter(([, v]) => typeof v === 'string'));
}
export function notificationView(n) {
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
//# sourceMappingURL=notification-views.js.map