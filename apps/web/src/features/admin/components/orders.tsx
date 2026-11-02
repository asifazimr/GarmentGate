'use client';

import type { AdminOrderSummary } from '@garmentgate/shared';
import { Package } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { useAdminOrders } from '@/features/orders/api';
import { formatMoney } from '@/lib/format';

/** Every order with both sides' totals and the platform's take; rows open the order. */
export function AdminOrders() {
  const t = useTranslations('adminPanel.orders');
  const tst = useTranslations('statuses.order');
  const locale = useLocale();
  const format = useFormatter();
  const orders = useAdminOrders();

  const columns = useMemo<DataColumn<AdminOrderSummary>[]>(() => {
    const money = (minor: number, currency: string) => formatMoney(minor, currency, locale);
    return [
      {
        id: 'code',
        header: t('columns.code'),
        value: (o) => o.code,
        cell: (o) => <Badge variant="code">{o.code}</Badge>,
      },
      {
        id: 'title',
        header: t('columns.title'),
        value: (o) => o.title,
        cell: (o) => <span className="line-clamp-1 max-w-56">{o.title}</span>,
        hideOnMobile: true,
      },
      {
        id: 'buyer',
        header: t('columns.buyer'),
        value: (o) => `${o.buyer.code} ${o.buyer.name}`,
        cell: (o) => (
          <span>
            <span className="font-mono text-xs">{o.buyer.code}</span>
            <span className="text-muted-foreground block text-xs">{o.buyer.name}</span>
          </span>
        ),
        hideOnMobile: true,
      },
      {
        id: 'factory',
        header: t('columns.factory'),
        value: (o) => `${o.manufacturer.code} ${o.manufacturer.name}`,
        cell: (o) => (
          <span>
            <span className="font-mono text-xs">{o.manufacturer.code}</span>
            <span className="text-muted-foreground block text-xs">{o.manufacturer.name}</span>
          </span>
        ),
        hideOnMobile: true,
      },
      {
        id: 'status',
        header: t('columns.status'),
        value: (o) => tst(o.status),
        cell: (o) => <StatusBadge domain="order" status={o.status} />,
      },
      {
        id: 'quantity',
        header: t('columns.quantity'),
        value: (o) => o.quantity,
        cell: (o) => format.number(o.quantity),
        align: 'end',
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'currency',
        header: t('columns.currency'),
        value: (o) => o.currency,
        hideOnMobile: true,
      },
      {
        id: 'buyerTotal',
        header: t('columns.buyerTotal'),
        value: (o) => o.buyerTotalMinor,
        cell: (o) => money(o.buyerTotalMinor, o.currency),
        align: 'end',
        searchable: false,
      },
      {
        id: 'factoryTotal',
        header: t('columns.factoryTotal'),
        value: (o) => o.manufacturerTotalMinor,
        cell: (o) => money(o.manufacturerTotalMinor, o.currency),
        align: 'end',
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'margin',
        header: t('columns.margin'),
        value: (o) => o.buyerTotalMinor - o.manufacturerTotalMinor + o.commissionMinor,
        cell: (o) =>
          money(o.buyerTotalMinor - o.manufacturerTotalMinor + o.commissionMinor, o.currency),
        align: 'end',
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'shipBy',
        header: t('columns.shipBy'),
        value: (o) => o.requestedShipDate,
        cell: (o) =>
          o.requestedShipDate
            ? format.dateTime(new Date(o.requestedShipDate), { dateStyle: 'medium' })
            : '—',
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'created',
        header: t('columns.created'),
        value: (o) => o.createdAt,
        cell: (o) => format.dateTime(new Date(o.createdAt), { dateStyle: 'medium' }),
        searchable: false,
        hideOnMobile: true,
      },
    ];
  }, [t, tst, locale, format]);

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <DataTable
        data={orders.data}
        columns={columns}
        loading={orders.isPending}
        error={orders.isError}
        onRetry={() => void orders.refetch()}
        retrying={orders.isFetching}
        filters={[
          { column: 'status', label: t('columns.status') },
          { column: 'currency', label: t('columns.currency') },
        ]}
        initialSort={{ id: 'created', desc: true }}
        rowHref={(o) => `/admin/orders/${o.code}`}
        csvName="orders"
        empty={{ icon: Package, title: t('empty'), description: t('emptyBody') }}
      />
    </div>
  );
}
