import { ClipboardCheck, Factory, ShoppingBag, Truck } from 'lucide-react';

/** The four audiences, their pages and where they sign up. */
export const AUDIENCES = [
  {
    key: 'buyers',
    start: 'buyer',
    href: '/buyers',
    signup: '/register?as=buyer',
    Icon: ShoppingBag,
  },
  {
    key: 'manufacturers',
    start: 'manufacturer',
    href: '/manufacturers',
    signup: '/register?as=manufacturer',
    Icon: Factory,
  },
  {
    key: 'inspectors',
    start: 'inspector',
    href: '/inspectors',
    signup: '/inspectors/apply',
    Icon: ClipboardCheck,
  },
  {
    key: 'logistics',
    start: 'logistics',
    href: '/logistics',
    signup: '/logistics#apply',
    Icon: Truck,
  },
] as const;

export const PRIMARY_LINKS = [
  { key: 'how', href: '/how-it-works' },
  { key: 'pricing', href: '/pricing' },
  { key: 'trust', href: '/trust' },
  { key: 'contact', href: '/contact' },
] as const;

export const EXPLORE_LINKS = [
  { key: 'categories', href: '/categories' },
  { key: 'sourcing', href: '/sourcing' },
  { key: 'calculator', href: '/tools/cost-calculator' },
  { key: 'stories', href: '/stories' },
] as const;

export const RESOURCE_LINKS = [
  { key: 'help', href: '/help' },
  { key: 'about', href: '/about' },
] as const;

export const HELP_TOPICS = [
  'getting-started',
  'buyers',
  'manufacturers',
  'payments',
  'quality',
  'shipping',
  'inspectors',
  'partners',
  'account',
] as const;
export type HelpTopic = (typeof HELP_TOPICS)[number];

export const LEGAL_DOCS = [
  'terms',
  'buyer-terms',
  'manufacturer-terms',
  'privacy',
  'cookies',
  'acceptable-use',
] as const;
export type LegalDoc = (typeof LEGAL_DOCS)[number];
