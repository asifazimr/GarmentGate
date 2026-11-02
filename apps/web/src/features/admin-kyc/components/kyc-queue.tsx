'use client';

import type { AdminKycCompany, KycStatus } from '@garmentgate/shared';
import { CheckCheck, Inbox } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { countryName } from '@/lib/countries';
import { useKycQueue } from '../api';
import { KycReviewDialog } from './kyc-review-dialog';

const TABS = ['PENDING_REVIEW', 'REJECTED', 'VERIFIED'] as const satisfies readonly KycStatus[];

/** Companies by KYC status: review documents, then approve (with a note) or reject. */
export function KycQueue() {
  const t = useTranslations('admin');
  const format = useFormatter();
  const locale = useLocale();
  const [status, setStatus] = useState<(typeof TABS)[number]>('PENDING_REVIEW');
  const [selected, setSelected] = useState<string | null>(null);
  const queue = useKycQueue(status);

  const columns = useMemo<DataColumn<AdminKycCompany>[]>(
    () => [
      {
        id: 'company',
        header: t('columns.company'),
        value: (c) => c.legalName,
        cell: (c) => (
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{c.legalName}</span>
            {c.publicCode ? <Badge variant="code">{c.publicCode}</Badge> : null}
          </span>
        ),
      },
      { id: 'code', header: t('columns.code'), value: (c) => c.publicCode, hideOnMobile: true },
      {
        id: 'type',
        header: t('columns.type'),
        value: (c) => t(`types.${c.type}`),
        hideOnMobile: true,
      },
      {
        id: 'country',
        header: t('columns.country'),
        value: (c) => countryName(c.country, locale),
        hideOnMobile: true,
      },
      {
        id: 'owner',
        header: t('columns.owner'),
        value: (c) => (c.owner ? `${c.owner.name} <${c.owner.email}>` : null),
        cell: (c) =>
          c.owner ? (
            <span className="text-muted-foreground">
              {c.owner.name}
              <span className="block text-xs">
                {c.owner.email}
                {c.owner.emailVerified ? '' : ` · ${t('emailUnverified')}`}
              </span>
            </span>
          ) : (
            '—'
          ),
        hideOnMobile: true,
      },
      {
        id: 'submitted',
        header: t('columns.submitted'),
        value: (c) => c.submittedAt,
        cell: (c) =>
          c.submittedAt ? format.dateTime(new Date(c.submittedAt), { dateStyle: 'medium' }) : '—',
        searchable: false,
      },
      {
        id: 'documents',
        header: t('columns.documents'),
        value: (c) => c.documentCount + c.certificationCount,
        align: 'end',
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'status',
        header: t('columns.status'),
        value: (c) => c.kycStatus,
        cell: (c) => <StatusBadge domain="kyc" status={c.kycStatus} />,
        searchable: false,
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (c) => (
          <Button variant="outline" size="sm" onClick={() => setSelected(c.id)}>
            {t('review')}
          </Button>
        ),
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ],
    [t, format, locale],
  );

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('subtitle')} />

      <Tabs
        value={status}
        onValueChange={(value) => {
          const tab = TABS.find((candidate) => candidate === value);
          if (tab) setStatus(tab);
        }}
      >
        <TabsList>
          {TABS.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {t(`tabs.${tab}`)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <DataTable
        // A fresh table per tab, so filters and paging don't carry over.
        key={status}
        data={queue.data}
        columns={columns}
        loading={queue.isPending}
        error={queue.isError}
        onRetry={() => void queue.refetch()}
        retrying={queue.isFetching}
        filters={[
          { column: 'type', label: t('columns.type') },
          { column: 'country', label: t('columns.country') },
        ]}
        initialSort={{ id: 'submitted', desc: status !== 'PENDING_REVIEW' }}
        csvName={`kyc-${status.toLowerCase()}`}
        empty={{
          icon: status === 'PENDING_REVIEW' ? CheckCheck : Inbox,
          title: status === 'PENDING_REVIEW' ? t('emptyPending') : t('empty'),
          description: t('emptyBody'),
        }}
      />
      <KycReviewDialog companyId={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
