import { z } from 'zod';
import type { Role } from '../auth/roles.js';
import { ROLE_HOME } from '../auth/routing.js';

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
  'MILESTONE_UPDATE',
  'QC_RESULT',
  'MESSAGE_RECEIVED',
  'PAYMENT_UPDATE',
  'DISPUTE_UPDATE',
  'REVIEW_RECEIVED',
  'SYSTEM',
]);
export type NotificationType = z.infer<typeof NotificationTypeSchema>;

/** What people choose to hear about: each type belongs to one category. */
export const NOTIFICATION_CATEGORIES = [
  'QUOTES',
  'MESSAGES',
  'ORDERS',
  'QC',
  'PAYMENTS',
  'DISPUTES',
  'REVIEWS',
  'ACCOUNT',
] as const;
export const NotificationCategorySchema = z.enum(NOTIFICATION_CATEGORIES);
export type NotificationCategory = z.infer<typeof NotificationCategorySchema>;

export const NOTIFICATION_CATEGORY: Record<NotificationType, NotificationCategory> = {
  EMAIL_VERIFIED: 'ACCOUNT',
  KYC_SUBMITTED: 'ACCOUNT',
  KYC_APPROVED: 'ACCOUNT',
  KYC_REJECTED: 'ACCOUNT',
  SYSTEM: 'ACCOUNT',
  RFQ_INVITATION: 'QUOTES',
  QUOTE_RECEIVED: 'QUOTES',
  QUOTE_OFFERED: 'QUOTES',
  ORDER_UPDATE: 'ORDERS',
  MILESTONE_UPDATE: 'ORDERS',
  QC_RESULT: 'QC',
  MESSAGE_RECEIVED: 'MESSAGES',
  PAYMENT_UPDATE: 'PAYMENTS',
  DISPUTE_UPDATE: 'DISPUTES',
  REVIEW_RECEIVED: 'REVIEWS',
};

/** Account and security notices always show in the app; only their email can be turned off. */
export const LOCKED_IN_APP: readonly NotificationCategory[] = ['ACCOUNT'];

/** Defaults when someone hasn't chosen: everything in the app, email for what needs action. */
export const DEFAULT_PREFERENCES: Record<NotificationCategory, { inApp: boolean; email: boolean }> =
  {
    QUOTES: { inApp: true, email: true },
    MESSAGES: { inApp: true, email: true },
    ORDERS: { inApp: true, email: true },
    QC: { inApp: true, email: true },
    PAYMENTS: { inApp: true, email: true },
    DISPUTES: { inApp: true, email: true },
    REVIEWS: { inApp: true, email: false },
    ACCOUNT: { inApp: true, email: true },
  };

export const NotificationPreferenceSchema = z.object({
  category: NotificationCategorySchema,
  inApp: z.boolean(),
  email: z.boolean(),
});
export type NotificationPreference = z.infer<typeof NotificationPreferenceSchema>;

export const NotificationPreferencesSchema = z.object({
  preferences: z.array(NotificationPreferenceSchema),
});
export type NotificationPreferences = z.infer<typeof NotificationPreferencesSchema>;

export const UpdateNotificationPreferencesSchema = z.object({
  preferences: z.array(NotificationPreferenceSchema).min(1).max(NOTIFICATION_CATEGORIES.length),
});
export type UpdateNotificationPreferencesDto = z.infer<typeof UpdateNotificationPreferencesSchema>;

/** Deep-link context: which RFQ, order, thread or dispute a notification is about. */
export const NotificationLinkSchema = z.object({
  orderCode: z.string().optional(),
  rfqCode: z.string().optional(),
  conversationId: z.string().optional(),
  inspectionId: z.string().optional(),
  bookingCode: z.string().optional(),
});
export type NotificationLink = z.infer<typeof NotificationLinkSchema>;

export const NotificationSchema = z.object({
  id: z.uuid(),
  type: NotificationTypeSchema,
  category: NotificationCategorySchema,
  title: z.string(),
  body: z.string(),
  link: NotificationLinkSchema,
  readAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
});
export type Notification = z.infer<typeof NotificationSchema>;

export const NotificationListSchema = z.object({
  items: z.array(NotificationSchema),
  unreadCount: z.number().int().nonnegative(),
});
export type NotificationList = z.infer<typeof NotificationListSchema>;

/** The activity feed: the same events, paged further back. */
export const ActivityQuerySchema = z.object({
  before: z.iso.datetime().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});
export type ActivityQuery = z.infer<typeof ActivityQuerySchema>;

export const ActivityPageSchema = z.object({
  items: z.array(NotificationSchema),
  nextBefore: z.iso.datetime().nullable(),
});
export type ActivityPage = z.infer<typeof ActivityPageSchema>;

/** Socket event pushed to a user's room when a notification is created. */
export const NOTIFICATION_EVENT = 'notification:new';

/** Where a notification takes this role in the web app (null: nowhere specific). */
export function notificationHref(role: Role, link: NotificationLink): string | null {
  const home = ROLE_HOME[role];
  if (link.inspectionId && (role === 'INSPECTOR' || role === 'ADMIN'))
    return role === 'INSPECTOR' ? `${home}/inspections/${link.inspectionId}` : null;
  if (link.conversationId && role !== 'INSPECTOR') return `${home}/messages/${link.conversationId}`;
  if (link.orderCode && role !== 'INSPECTOR') return `${home}/orders/${link.orderCode}`;
  if (link.bookingCode && (role === 'BUYER' || role === 'MANUFACTURER' || role === 'ADMIN'))
    return role === 'ADMIN' ? `${home}/capacity` : `${home}/capacity/bookings/${link.bookingCode}`;
  if (link.rfqCode && (role === 'BUYER' || role === 'MANUFACTURER'))
    return `${home}/rfqs/${link.rfqCode}`;
  return null;
}

/** Where each role changes these settings. */
export const settingsPath = (role: Role): string => `${ROLE_HOME[role]}/settings`;
