import {
  ClipboardCheck,
  Factory,
  Handshake,
  LifeBuoy,
  type LucideIcon,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Users,
  Wallet,
} from 'lucide-react';

export interface MenuColumn {
  key: string;
  links: { key: string; href: string }[];
}

export interface MenuPanel {
  key: 'buyers' | 'manufacturers' | 'gig' | 'logistics' | 'support';
  Icon: LucideIcon;
  steps: string[];
  columns: MenuColumn[];
  promo: { Icon: LucideIcon; href: string };
}

/**
 * The public site's mega menu: one panel per audience, each with its journey in steps, three
 * columns of links (only to pages and features that exist) and a highlight card.
 */
export const MENU: MenuPanel[] = [
  {
    key: 'buyers',
    Icon: ShoppingBag,
    steps: ['post', 'quote', 'sample', 'track', 'receive'],
    columns: [
      {
        key: 'start',
        links: [
          { key: 'requestQuotes', href: '/register?as=buyer' },
          { key: 'estimate', href: '/tools/cost-calculator' },
          { key: 'samples', href: '/help/buyers' },
          { key: 'capacity', href: '/buyers/capacity' },
        ],
      },
      {
        key: 'manage',
        links: [
          { key: 'tracker', href: '/login?next=/buyer/orders' },
          { key: 'qc', href: '/trust#quality' },
          { key: 'escrow', href: '/how-it-works#money' },
          { key: 'shipping', href: '/help/shipping' },
        ],
      },
      {
        key: 'explore',
        links: [
          { key: 'categories', href: '/categories' },
          { key: 'sourcing', href: '/sourcing' },
          { key: 'corporate', href: '/buyers/enterprise' },
          { key: 'plus', href: '/buyers/plus' },
        ],
      },
    ],
    promo: { Icon: ShieldCheck, href: '/register?as=buyer' },
  },
  {
    key: 'manufacturers',
    Icon: Factory,
    steps: ['apply', 'verify', 'quote', 'produce', 'paid'],
    columns: [
      {
        key: 'start',
        links: [
          { key: 'apply', href: '/register?as=manufacturer' },
          { key: 'why', href: '/manufacturers' },
          { key: 'verification', href: '/help/getting-started' },
          { key: 'plans', href: '/pricing#factories' },
        ],
      },
      {
        key: 'manage',
        links: [
          { key: 'requests', href: '/login?next=/manufacturer/rfqs' },
          { key: 'orders', href: '/login?next=/manufacturer/orders' },
          { key: 'capacity', href: '/login?next=/manufacturer/capacity' },
          { key: 'payouts', href: '/help/payments' },
        ],
      },
      {
        key: 'explore',
        links: [
          { key: 'categories', href: '/categories' },
          { key: 'sourcing', href: '/sourcing' },
          { key: 'stories', href: '/stories' },
          { key: 'help', href: '/help/manufacturers' },
        ],
      },
    ],
    promo: { Icon: Wallet, href: '/register?as=manufacturer' },
  },
  {
    key: 'gig',
    Icon: Users,
    steps: ['apply', 'certify', 'claim', 'checkin', 'paid'],
    columns: [
      {
        key: 'start',
        links: [
          { key: 'apply', href: '/inspectors/apply' },
          { key: 'how', href: '/inspectors#how' },
          { key: 'need', href: '/inspectors#need' },
          { key: 'faq', href: '/help/inspectors' },
        ],
      },
      {
        key: 'work',
        links: [
          { key: 'tasks', href: '/login?next=/inspector/tasks' },
          { key: 'jobs', href: '/login?next=/inspector' },
          { key: 'earnings', href: '/login?next=/inspector/earnings' },
          { key: 'aql', href: '/trust#quality' },
        ],
      },
      {
        key: 'explore',
        links: [
          { key: 'fair', href: '/inspectors#fair' },
          { key: 'trust', href: '/trust' },
          { key: 'sourcing', href: '/sourcing' },
          { key: 'about', href: '/about' },
        ],
      },
    ],
    promo: { Icon: ClipboardCheck, href: '/inspectors/apply' },
  },
  {
    key: 'logistics',
    Icon: Truck,
    steps: ['lanes', 'rates', 'accept', 'track', 'paid'],
    columns: [
      {
        key: 'start',
        links: [
          { key: 'apply', href: '/logistics#apply' },
          { key: 'what', href: '/logistics#what' },
          { key: 'terms', href: '/logistics#terms' },
          { key: 'faq', href: '/help/partners' },
        ],
      },
      {
        key: 'manage',
        links: [
          { key: 'portal', href: '/login?next=/partner' },
          { key: 'tracking', href: '/logistics#portal' },
          { key: 'papers', href: '/logistics#portal' },
          { key: 'payouts', href: '/logistics#terms' },
        ],
      },
      {
        key: 'explore',
        links: [
          { key: 'journey', href: '/how-it-works#journey' },
          { key: 'shipping', href: '/help/shipping' },
          { key: 'sourcing', href: '/sourcing' },
          { key: 'contact', href: '/contact?topic=LOGISTICS_PARTNER' },
        ],
      },
    ],
    promo: { Icon: Handshake, href: '/logistics#apply' },
  },
  {
    key: 'support',
    Icon: LifeBuoy,
    steps: ['search', 'topic', 'message', 'reply'],
    columns: [
      {
        key: 'help',
        links: [
          { key: 'gettingStarted', href: '/help/getting-started' },
          { key: 'payments', href: '/help/payments' },
          { key: 'shipping', href: '/help/shipping' },
          { key: 'quality', href: '/help/quality' },
        ],
      },
      {
        key: 'account',
        links: [
          { key: 'signIn', href: '/login' },
          { key: 'reset', href: '/forgot-password' },
          { key: 'track', href: '/login?next=/buyer/orders' },
          { key: 'texts', href: '/help/account' },
        ],
      },
      {
        key: 'company',
        links: [
          { key: 'how', href: '/how-it-works' },
          { key: 'pricing', href: '/pricing' },
          { key: 'trust', href: '/trust' },
          { key: 'about', href: '/about' },
        ],
      },
    ],
    promo: { Icon: LifeBuoy, href: '/contact?topic=SUPPORT' },
  },
];
