'use client';

import type { OrderException } from '@garmentgate/shared';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { useExceptions } from '../api';
import { ReplaceFactoryButton } from './replace-factory-dialog';

/**
 * Orders that need a decision (business model: exception flow): a week or more late, a failed
 * final inspection, a rejected sample. Rework and refunds are on the order; another factory is
 * one click away here.
 */
export function ExceptionsPage() {
  const t = useTranslations('exceptions');
  const format = useFormatter();
  const exceptions = useExceptions();
  const columns = useMemo<DataColumn<OrderException>[]>(
    () => [
      {
        id: 'order',
        header: t('columns.order'),
        value: (e) =>
          `${e.orderCode} ${e.buyer.code} ${e.manufacturer.code} ${e.manufacturer.name}`,
        cell: (e) => (
          <span>
            <Link
              href={`/admin/orders/${e.orderCode}`}
              className="font-mono text-xs font-medium hover:underline"
            >
              {e.orderCode}
            </Link>
            <span className="text-muted-foreground block text-xs">
              {e.manufacturer.code} · {e.manufacturer.name}
            </span>
          </span>
        ),
      },
      {
        id: 'status',
        header: t('columns.status'),
        value: (e) => e.status,
        cell: (e) => <StatusBadge domain="order" status={e.status} />,
      },
      {
        id: 'problem',
        header: t('columns.problem'),
        value: (e) => e.kind,
        cell: (e) => (
          <span className="space-y-1 text-sm">
            <Badge variant={e.kind === 'DELAY' ? 'warning' : 'danger'}>
              {t(`kinds.${e.kind}`)}
            </Badge>
            <span className="text-muted-foreground block text-xs">
              {e.kind === 'DELAY'
                ? t('late', {
                    days: e.daysLate ?? 0,
                    stage: e.stage === 'SHIP_DATE' ? t('shipDate') : (e.stage ?? '').toLowerCase(),
                  })
                : e.since
                  ? format.dateTime(new Date(e.since), { dateStyle: 'medium' })
                  : ''}
            </span>
          </span>
        ),
      },
      {
        id: 'alerted',
        header: t('columns.alerted'),
        value: (e) => e.delayAlertedAt ?? '',
        cell: (e) =>
          e.delayAlertedAt ? (
            <span className="text-xs">
              {format.dateTime(new Date(e.delayAlertedAt), { dateStyle: 'medium' })}
            </span>
          ) : (
            <span className="text-muted-foreground text-xs">—</span>
          ),
        searchable: false,
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (e) => (
          <span className="flex justify-end">
            <ReplaceFactoryButton code={e.orderCode} status={e.status} currency={e.currency} />
          </span>
        ),
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ],
    [t, format],
  );
  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <DataTable
        data={exceptions.data}
        columns={columns}
        loading={exceptions.isPending}
        error={exceptions.isError}
        onRetry={() => void exceptions.refetch()}
        retrying={exceptions.isFetching}
        csvName="order-exceptions"
        empty={{ icon: AlertTriangle, title: t('empty'), description: t('emptyBody') }}
      />
    </div>
  );
}
