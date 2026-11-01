import { z } from 'zod';

/** Mirrors the Prisma `NotificationType` enum. */
export const NotificationTypeSchema = z.enum([
  'EMAIL_VERIFIED',
  'KYC_SUBMITTED',
  'KYC_APPROVED',
  'KYC_REJECTED',
  'RFQ_INVITATION',
  'QUOTE_RECEIVED',
  'QUOTE_OFFERED',
  'ORDER_UPDATE',
  'MESSAGE_RECEIVED',
  'PAYMENT_UPDATE',
  'DISPUTE_UPDATE',
  'SYSTEM',
]);
export type NotificationType = z.infer<typeof NotificationTypeSchema>;

export const NotificationSchema = z.object({
  id: z.uuid(),
  type: NotificationTypeSchema,
  title: z.string(),
  body: z.string(),
  readAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
});
export type Notification = z.infer<typeof NotificationSchema>;

export const NotificationListSchema = z.object({
  items: z.array(NotificationSchema),
  unreadCount: z.number().int().nonnegative(),
});
export type NotificationList = z.infer<typeof NotificationListSchema>;
