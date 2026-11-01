import type { Role } from '@garmentgate/shared';
import {
  CalendarRange,
  Factory,
  FileText,
  Gauge,
  Heart,
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
} from 'lucide-react';

export type NavLabel =
  | 'dashboard'
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
  | 'shortlists';

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
    { href: '/buyer/orders', label: 'orders', icon: Package, primary: true },
    { href: '/buyer/messages', label: 'messages', icon: MessageSquare, built: true },
    { href: '/buyer/factories', label: 'factories', icon: Factory, built: true },
    { href: '/buyer/shortlists', label: 'shortlists', icon: Heart, built: true },
    { href: '/buyer/settings', label: 'settings', icon: Settings },
  ],
  MANUFACTURER: [
    { href: '/manufacturer', label: 'dashboard', icon: LayoutDashboard, primary: true },
    { href: '/manufacturer/rfqs', label: 'invitations', icon: Inbox, primary: true, built: true },
    { href: '/manufacturer/orders', label: 'orders', icon: Package, primary: true },
    { href: '/manufacturer/products', label: 'products', icon: Shirt, primary: true, built: true },
    { href: '/manufacturer/capacity', label: 'capacity', icon: CalendarRange, built: true },
    { href: '/manufacturer/profile', label: 'profile', icon: Factory, built: true },
    { href: '/manufacturer/messages', label: 'messages', icon: MessageSquare, built: true },
    { href: '/manufacturer/quotes', label: 'quotes', icon: Receipt },
    { href: '/manufacturer/settings', label: 'settings', icon: Settings },
  ],
  ADMIN: [
    { href: '/admin', label: 'verification', icon: ShieldCheck, primary: true },
    { href: '/admin/rfqs', label: 'rfqs', icon: FileText, primary: true },
    { href: '/admin/orders', label: 'orders', icon: Package, primary: true },
    { href: '/admin/messages', label: 'messages', icon: MessageSquare, primary: true, built: true },
    { href: '/admin/disputes', label: 'disputes', icon: Scale },
    { href: '/admin/moderation', label: 'moderation', icon: ShieldAlert, built: true },
    { href: '/admin/margins', label: 'margins', icon: Percent, built: true },
    { href: '/admin/settings', label: 'settings', icon: Gauge },
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
