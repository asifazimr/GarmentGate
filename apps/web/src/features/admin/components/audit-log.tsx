'use client';

import type { AuditEntry } from '@garmentgate/shared';
import { History } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { PageHeader } from '@/components/patterns/page-header';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuditLog } from '../api';

const WINDOWS = [1, 7, 30, 90, 365] as const;
/** Compact, readable metadata: `key: value` pairs, nested values as JSON. */
function describe(metadata: unknown): string {
  if (metadata === null || typeof metadata !== 'object') return '';
  return Object.entries(metadata)
    .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : String(v)}`)
    .join(' · ');
}

/** Everything staff and the platform did, newest first: who, what, on which record. */
export function AuditLog() {
  const t = useTranslations('adminPanel.audit');
  const format = useFormatter();
  const [days, setDays] = useState<(typeof WINDOWS)[number]>(30);
  const log = useAuditLog(days);

  const columns = useMemo<DataColumn<AuditEntry>[]>(
    () => [
      {
        id: 'at',
        header: t('columns.at'),
        value: (e) => e.createdAt,
        cell: (e) =>
          format.dateTime(new Date(e.createdAt), { dateStyle: 'medium', timeStyle: 'short' }),
        searchable: false,
      },
      {
        id: 'action',
        header: t('columns.action'),
        value: (e) => e.action,
        cell: (e) => <Badge variant="code">{e.action}</Badge>,
      },
      {
        id: 'actor',
        header: t('columns.actor'),
        value: (e) => (e.actor ? `${e.actor.name} <${e.actor.email}>` : t('system')),
        cell: (e) =>
          e.actor ? (
            <span>
              {e.actor.name}
              <span className="text-muted-foreground block text-xs">{e.actor.email}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">{t('system')}</span>
          ),
      },
      { id: 'entity', header: t('columns.entity'), value: (e) => e.entityType },
      {
        id: 'entityId',
        header: t('columns.entityId'),
        value: (e) => e.entityId,
        cell: (e) => <span className="font-mono text-xs">{e.entityId ?? '—'}</span>,
        hideOnMobile: true,
      },
      {
        id: 'details',
        header: t('columns.details'),
        value: (e) => describe(e.metadata),
        cell: (e) => (
          <span className="text-muted-foreground line-clamp-2 max-w-md text-xs break-all">
            {describe(e.metadata) || '—'}
          </span>
        ),
        sortable: false,
        hideOnMobile: true,
      },
      { id: 'ip', header: t('columns.ip'), value: (e) => e.ip, hideOnMobile: true },
    ],
    [t, format],
  );

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <DataTable
        key={days}
        data={log.data}
        columns={columns}
        loading={log.isPending}
        error={log.isError}
        onRetry={() => void log.refetch()}
        retrying={log.isFetching}
        filters={[
          { column: 'entity', label: t('columns.entity') },
          { column: 'action', label: t('columns.action') },
        ]}
        initialSort={{ id: 'at', desc: true }}
        pageSize={50}
        csvName="audit-log"
        empty={{ icon: History, title: t('empty'), description: t('emptyBody') }}
        toolbar={
          <Select
            items={WINDOWS.map((d) => ({ value: String(d), label: t('window', { days: d }) }))}
            value={String(days)}
            onValueChange={(v) => {
              const w = WINDOWS.find((d) => String(d) === v);
              if (w) setDays(w);
            }}
          >
            <SelectTrigger aria-label={t('windowLabel')} className="min-w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {WINDOWS.map((d) => (
                <SelectItem key={d} value={String(d)}>
                  {t('window', { days: d })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />
      {log.data?.length === 2000 ? (
        <p className="text-muted-foreground text-xs">{t('capped')}</p>
      ) : null}
    </div>
  );
}
