import type { Role } from '@garmentgate/shared';
import {
  FileSignature,
  AlertTriangle,
  Award,
  BadgeCheck,
  CalendarClock,
  CalendarRange,
  ClipboardCheck,
  Crown,
  Factory,
  FileText,
  Gauge,
  Heart,
  History,
  Inbox,
  LayoutDashboard,
  type LucideIcon,
  MessageSquare,
  Package,
  Percent,
  Receipt,
  Scale,
  Settings,
  ShieldAlert,
  Search,
  ShieldCheck,
  Shirt,
  Sparkles,
  Users,
  Truck,
  Wallet,
} from 'lucide-react';

export type NavLabel =
  | 'dashboard'
  | 'tasks'
  | 'plan'
  | 'texts'
  | 'leads'
  | 'plus'
  | 'plans'
  | 'earnings'
  | 'rfqs'
  | 'orders'
  | 'messages'
  | 'factories'
  | 'settings'
  | 'invitations'
  | 'quotes'
  | 'profile'
  | 'verification'
  | 'disputes'
  | 'moderation'
  | 'margins'
  | 'products'
  | 'capacity'
  | 'discover'
  | 'shortlists'
  | 'inspections'
  | 'inspectors'
  | 'overview'
  | 'certifications'
  | 'claims'
  | 'bookCapacity'
  | 'capacityBooking'
  | 'logistics'
  | 'payments'
  | 'users'
  | 'audit'
  | 'kpis'
  | 'exceptions'
  | 'contracts'
  | 'bookings';

export interface NavItem {
  href: string;
  label: NavLabel;
  icon: LucideIcon;
  /** Shown in the mobile bottom bar; the rest go under "More". */
  primary?: boolean;
  /** Has its own route; otherwise the section renders the "coming soon" page. */
  built?: boolean;
}

/**
 * Every role's destinations. Sections that aren't built yet render a "coming soon" page, so
 * the shell already reflects the product's shape (max 3 clicks to any key action).
 */
export const NAV: Record<Role, NavItem[]> = {
  BUYER: [
    { href: '/buyer', label: 'dashboard', icon: LayoutDashboard, primary: true, built: true },
    { href: '/buyer/search', label: 'discover', icon: Search, primary: true, built: true },
    { href: '/buyer/rfqs', label: 'rfqs', icon: FileText, primary: true, built: true },
    { href: '/buyer/capacity', label: 'bookCapacity', icon: CalendarClock, built: true },
    { href: '/buyer/contracts', label: 'contracts', icon: FileSignature, built: true },
    { href: '/buyer/orders', label: 'orders', icon: Package, primary: true, built: true },
    { href: '/buyer/messages', label: 'messages', icon: MessageSquare, built: true },
    { href: '/buyer/factories', label: 'factories', icon: Factory, built: true },
    { href: '/buyer/shortlists', label: 'shortlists', icon: Heart, built: true },
    { href: '/buyer/plus', label: 'plus', icon: Crown, built: true },
    { href: '/buyer/settings', label: 'settings', icon: Settings, built: true },
  ],
  MANUFACTURER: [
    { href: '/manufacturer', label: 'dashboard', icon: LayoutDashboard, primary: true },
    { href: '/manufacturer/rfqs', label: 'invitations', icon: Inbox, primary: true, built: true },
    { href: '/manufacturer/orders', label: 'orders', icon: Package, primary: true, built: true },
    { href: '/manufacturer/products', label: 'products', icon: Shirt, primary: true, built: true },
    { href: '/manufacturer/capacity', label: 'capacity', icon: CalendarRange, built: true },
    { href: '/manufacturer/contracts', label: 'contracts', icon: FileSignature, built: true },
    { href: '/manufacturer/profile', label: 'profile', icon: Factory, built: true },
    { href: '/manufacturer/plan', label: 'plan', icon: Sparkles, built: true },
    { href: '/manufacturer/messages', label: 'messages', icon: MessageSquare, built: true },
    { href: '/manufacturer/quotes', label: 'quotes', icon: Receipt },
    { href: '/manufacturer/settings', label: 'settings', icon: Settings, built: true },
  ],
  ADMIN: [
    { href: '/admin', label: 'overview', icon: LayoutDashboard, primary: true, built: true },
    { href: '/admin/kpis', label: 'kpis', icon: Gauge, built: true },
    { href: '/admin/exceptions', label: 'exceptions', icon: AlertTriangle, built: true },
    { href: '/admin/kyc', label: 'verification', icon: ShieldCheck, built: true },
    { href: '/admin/certifications', label: 'certifications', icon: BadgeCheck, built: true },
    { href: '/admin/claims', label: 'claims', icon: Award, built: true },
    { href: '/admin/orders', label: 'orders', icon: Package, primary: true, built: true },
    { href: '/admin/payments', label: 'payments', icon: Wallet, primary: true, built: true },
    { href: '/admin/capacity', label: 'capacityBooking', icon: CalendarClock, built: true },
    { href: '/admin/contracts', label: 'contracts', icon: FileSignature, built: true },
    { href: '/admin/plans', label: 'plans', icon: Sparkles, built: true },
    { href: '/admin/messaging', label: 'texts', icon: MessageSquare, built: true },
    { href: '/admin/leads', label: 'leads', icon: Inbox, built: true },
    {
      href: '/admin/logistics',
      label: 'logistics',
      icon: Truck,
      built: true,
    },
    { href: '/admin/disputes', label: 'disputes', icon: Scale, built: true },
    { href: '/admin/messages', label: 'messages', icon: MessageSquare, primary: true, built: true },
    { href: '/admin/moderation', label: 'moderation', icon: ShieldAlert, built: true },
    { href: '/admin/rfqs', label: 'rfqs', icon: FileText },
    { href: '/admin/margins', label: 'margins', icon: Percent, built: true },
    { href: '/admin/inspectors', label: 'inspectors', icon: ClipboardCheck, built: true },
    { href: '/admin/users', label: 'users', icon: Users, built: true },
    { href: '/admin/audit', label: 'audit', icon: History, built: true },
    { href: '/admin/settings', label: 'settings', icon: Gauge, built: true },
  ],
  INSPECTOR: [
    {
      href: '/inspector',
      label: 'inspections',
      icon: ClipboardCheck,
      primary: true,
      built: true,
    },
    { href: '/inspector/tasks', label: 'tasks', icon: Inbox, primary: true, built: true },
    { href: '/inspector/earnings', label: 'earnings', icon: Wallet, primary: true, built: true },
    { href: '/inspector/settings', label: 'settings', icon: Settings, primary: true, built: true },
  ],
  PARTNER: [
    { href: '/partner', label: 'bookings', icon: Truck, primary: true, built: true },
    { href: '/partner/settings', label: 'settings', icon: Settings, primary: true, built: true },
  ],
};

/** Sections reachable under each role's area that render the "coming soon" page for now. */
export function comingSoonSections(role: Role): string[] {
  const base = NAV[role][0]?.href ?? '';
  return NAV[role]
    .filter((item) => !item.built)
    .map((item) => item.href)
    .filter((href) => href !== base)
    .map((href) => href.slice(base.length + 1));
}

export function navItemFor(role: Role, section: string): NavItem | undefined {
  return NAV[role].find((item) => item.href.endsWith(`/${section}`));
}

export function isActive(pathname: string, href: string, home: string): boolean {
  return href === home ? pathname === home : pathname === href || pathname.startsWith(`${href}/`);
}
