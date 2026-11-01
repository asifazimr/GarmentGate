'use client';

import {
  ClipboardList,
  Factory,
  FileText,
  MessageSquare,
  PackageSearch,
  Truck,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AppHeader } from '@/features/account/components/app-header';
import { useMe } from '@/features/auth/api';

type DashboardRole = 'buyer' | 'manufacturer';

/** Home for verified buyers and manufacturers. Key actions are one tap away. */
export function RoleDashboard({ role }: { role: DashboardRole }) {
  const t = useTranslations('dashboard');
  const tb = useTranslations('dashboard.buyer.actions');
  const tm = useTranslations('dashboard.manufacturer.actions');
  const actions =
    role === 'buyer'
      ? [
          { key: 'rfq', Icon: FileText, title: tb('rfq'), body: tb('rfqBody') },
          { key: 'orders', Icon: Truck, title: tb('orders'), body: tb('ordersBody') },
          { key: 'messages', Icon: MessageSquare, title: tb('messages'), body: tb('messagesBody') },
        ]
      : [
          { key: 'rfqs', Icon: ClipboardList, title: tm('rfqs'), body: tm('rfqsBody') },
          { key: 'orders', Icon: PackageSearch, title: tm('orders'), body: tm('ordersBody') },
          { key: 'profile', Icon: Factory, title: tm('profile'), body: tm('profileBody') },
        ];
  const me = useMe();

  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 space-y-8 px-4 py-8 sm:px-6 sm:py-12">
        <header className="space-y-2">
          {me.isPending ? (
            <Skeleton className="h-9 w-64" />
          ) : (
            <h1 className="text-3xl font-semibold tracking-tight">
              {t('welcome', { name: me.data?.firstName ?? '' })}
            </h1>
          )}
          <p className="text-muted-foreground">{t(`${role}.subtitle`)}</p>
        </header>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map(({ key, Icon, title, body }) => (
            <li key={key}>
              <Card className="h-full">
                <CardHeader>
                  <span className="bg-primary/10 text-primary mb-2 flex size-10 items-center justify-center rounded-lg">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <CardTitle className="flex items-center gap-2">
                    {title}
                    <Badge variant="outline">{t('comingSoon')}</Badge>
                  </CardTitle>
                  <CardDescription>{body}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
