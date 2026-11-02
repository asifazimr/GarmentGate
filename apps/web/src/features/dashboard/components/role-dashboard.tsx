'use client';

import {
  ArrowRight,
  ClipboardList,
  Factory,
  FilePlus2,
  FileText,
  MessageSquare,
  PackageSearch,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import { PageHeader } from '@/components/patterns/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ActivityFeed } from '@/features/activity/activity-feed';
import { useMe } from '@/features/auth/api';
import { FactoryTodo, FactoryTodoSkeleton } from './factory-todo';
import { NAV } from '@/features/shell/nav';

const BUILT = new Set(
  [...NAV.BUYER, ...NAV.MANUFACTURER].filter((i) => i.built).map((i) => i.href),
);

/** A built section, or a page inside one (e.g. /buyer/rfqs/new). */
const isBuilt = (href: string) => [...BUILT].some((b) => href === b || href.startsWith(`${b}/`));

type DashboardRole = 'buyer' | 'manufacturer';

/** Home for verified buyers and manufacturers. Every key action is one tap away. */
export function RoleDashboard({ role }: { role: DashboardRole }) {
  const t = useTranslations('dashboard');
  const tb = useTranslations('dashboard.buyer.actions');
  const tm = useTranslations('dashboard.manufacturer.actions');
  const me = useMe();

  const actions =
    role === 'buyer'
      ? [
          { href: '/buyer/rfqs/new', Icon: FileText, title: tb('rfq'), body: tb('rfqBody') },
          { href: '/buyer/orders', Icon: Truck, title: tb('orders'), body: tb('ordersBody') },
          {
            href: '/buyer/messages',
            Icon: MessageSquare,
            title: tb('messages'),
            body: tb('messagesBody'),
          },
        ]
      : [
          {
            href: '/manufacturer/rfqs',
            Icon: ClipboardList,
            title: tm('rfqs'),
            body: tm('rfqsBody'),
          },
          {
            href: '/manufacturer/orders',
            Icon: PackageSearch,
            title: tm('orders'),
            body: tm('ordersBody'),
          },
          {
            href: '/manufacturer/profile',
            Icon: Factory,
            title: tm('profile'),
            body: tm('profileBody'),
          },
        ];

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow={
          me.data ? (me.data.company?.publicCode ?? undefined) : <Skeleton className="h-4 w-24" />
        }
        title={
          me.isPending ? (
            <Skeleton className="h-8 w-64" />
          ) : (
            t('welcome', { name: me.data?.firstName ?? '' })
          )
        }
        description={t(`${role}.subtitle`)}
        actions={
          role === 'buyer' ? (
            <Button render={<Link href="/buyer/rfqs/new" />}>
              <FilePlus2 />
              {tb('rfq')}
            </Button>
          ) : null
        }
      />

      {role === 'manufacturer' ? (
        // Reads the current time (open deadlines), so it streams in after the static shell.
        <Suspense fallback={<FactoryTodoSkeleton />}>
          <FactoryTodo />
        </Suspense>
      ) : null}

      <section aria-labelledby="quick-actions" className="space-y-3">
        <h2 id="quick-actions" className="text-muted-foreground text-sm font-medium">
          {t('quickActions')}
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map(({ href, Icon, title, body }) => (
            <li key={href}>
              <Link
                href={href}
                className="group block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              >
                <Card interactive className="h-full">
                  <CardHeader>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="bg-primary-soft text-primary-ink flex size-10 items-center justify-center rounded-lg">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <ArrowRight
                        className="text-subtle-foreground size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      {title}
                      {isBuilt(href) ? null : <Badge variant="neutral">{t('comingSoon')}</Badge>}
                    </CardTitle>
                    <CardDescription>{body}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ActivityFeed
        emptyAction={
          role === 'buyer' ? (
            <Button render={<Link href="/buyer/rfqs/new" />}>
              <FilePlus2 />
              {tb('rfq')}
            </Button>
          ) : (
            <Button variant="outline" render={<Link href="/manufacturer/profile" />}>
              {tm('profile')}
            </Button>
          )
        }
      />
    </div>
  );
}
