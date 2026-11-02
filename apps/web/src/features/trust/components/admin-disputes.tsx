'use client';

import type { AdminDisputeSummary } from '@garmentgate/shared';
import { Scale } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { useAdminDisputes } from '../api';

/** Every dispute, open ones first; each row opens the order, where staff mediate and resolve. */
export function AdminDisputes() {
  const t = useTranslations('trust.disputes');
  const tst = useTranslations('statuses.dispute');
  const format = useFormatter();
  const disputes = useAdminDisputes();

  const columns = useMemo<DataColumn<AdminDisputeSummary>[]>(
    () => [
      {
        id: 'order',
        header: t('admin.columns.order'),
        value: (d) => d.orderCode,
        cell: (d) => <Badge variant="code">{d.orderCode}</Badge>,
      },
      { id: 'reason', header: t('admin.columns.reason'), value: (d) => t(`reasons.${d.reason}`) },
      {
        id: 'status',
        header: t('admin.columns.status'),
        value: (d) => tst(d.status),
        cell: (d) => <StatusBadge domain="dispute" status={d.status} />,
      },
      {
        id: 'parties',
        header: t('admin.columns.parties'),
        value: (d) => `${d.buyerCode} → ${d.manufacturerCode}`,
        cell: (d) => (
          <span className="font-mono text-xs">
            {d.buyerCode} → {d.manufacturerCode}
          </span>
        ),
        hideOnMobile: true,
      },
      {
        id: 'evidence',
        header: t('admin.columns.evidence'),
        value: (d) => d.evidenceToReview,
        cell: (d) =>
          d.evidenceToReview > 0 ? (
            <Badge variant="warning">{t('admin.toReview', { count: d.evidenceToReview })}</Badge>
          ) : (
            <span className="text-muted-foreground">—</span>
          ),
        searchable: false,
        align: 'end',
        hideOnMobile: true,
      },
      {
        id: 'assignee',
        header: t('admin.columns.assignee'),
        value: (d) => d.assignedTo ?? t('admin.unassigned'),
        hideOnMobile: true,
      },
      {
        id: 'opened',
        header: t('admin.columns.opened'),
        value: (d) => d.openedAt,
        cell: (d) => format.dateTime(new Date(d.openedAt), { dateStyle: 'medium' }),
        searchable: false,
      },
    ],
    [t, tst, format],
  );

  return (
    <div className="space-y-6">
      <PageHeader title={t('admin.title')} description={t('admin.description')} />
      <DataTable
        data={disputes.data}
        columns={columns}
        loading={disputes.isPending}
        error={disputes.isError}
        onRetry={() => void disputes.refetch()}
        retrying={disputes.isFetching}
        filters={[
          { column: 'status', label: t('admin.columns.status') },
          { column: 'reason', label: t('admin.columns.reason') },
          { column: 'assignee', label: t('admin.columns.assignee') },
        ]}
        rowHref={(d) => `/admin/orders/${d.orderCode}`}
        csvName="disputes"
        empty={{ icon: Scale, title: t('admin.empty'), description: t('admin.emptyBody') }}
      />
    </div>
  );
}
