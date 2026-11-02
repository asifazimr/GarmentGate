import type { NotificationCategory } from '@garmentgate/shared';
import {
  ClipboardCheck,
  FileText,
  MessageSquare,
  Package,
  Scale,
  ShieldCheck,
  Star,
  Wallet,
} from 'lucide-react';

/** One icon per category, shared by the bell and the activity feed. */
export const CATEGORY_ICONS: Record<NotificationCategory, typeof Package> = {
  QUOTES: FileText,
  MESSAGES: MessageSquare,
  ORDERS: Package,
  QC: ClipboardCheck,
  PAYMENTS: Wallet,
  DISPUTES: Scale,
  REVIEWS: Star,
  ACCOUNT: ShieldCheck,
};
