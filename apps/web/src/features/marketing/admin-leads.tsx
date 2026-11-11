'use client';

import { type AdminLead, AdminLeadSchema, LeadStatusSchema } from '@garmentgate/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Inbox } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { PageHeader } from '@/components/patterns/page-header';
import { Badge } from '@/components/ui/badge';
import { OptionSelect } from '@/features/logistics/components/form-bits';
import { apiJson, apiSend } from '@/lib/api';
import { countryName } from '@/lib/countries';

const key = ['admin', 'leads'] as const;
const TONE = { NEW: 'warning', CONTACTED: 'info', CLOSED: 'neutral' } as const;

/** Staff: enquiries from the public website (sales, enterprise, partners, support, press). */
export function AdminLeadsPage() {
  const t = useTranslations('leads');
  const tk = useTranslations('marketing.contact.topics');
  const format = useFormatter();
  const locale = useLocale();
  const queryClient = useQueryClient();
  const leads = useQuery({
    queryKey: key,
    queryFn: () => apiJson('/admin/leads', z.array(AdminLeadSchema)),
  });
  const update = useMutation({
    mutationFn: ({ id, status }: { id: string; status: AdminLead['status'] }) =>
      apiSend(`/admin/leads/${id}`, { method: 'PATCH', body: { status } }),
    onSuccess: () => toast.success(t('saved')),
    onError: () => toast.error(t('failed')),
    onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
  });
  const columns = useMemo<DataColumn<AdminLead>[]>(
    () => [
      {
        id: 'received',
        header: t('cols.received'),
        value: (l) => l.createdAt,
        cell: (l) =>
          format.dateTime(new Date(l.createdAt), { dateStyle: 'medium', timeStyle: 'short' }),
        sortable: true,
      },
      { id: 'kind', header: t('cols.kind'), value: (l) => tk(l.kind) },
      {
        id: 'who',
        header: t('cols.who'),
        value: (l) => `${l.name} ${l.email} ${l.company ?? ''} ${l.phone ?? ''}`,
        cell: (l) => (
          <div className="min-w-0">
            <p className="font-medium">{l.name}</p>
            <p className="text-muted-foreground truncate text-xs">
              {[l.email, l.company, l.country ? countryName(l.country, locale) : null, l.phone]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
        ),
      },
      {
        id: 'message',
        header: t('cols.message'),
        value: (l) => l.message,
        cell: (l) => (
          <p className="line-clamp-3 max-w-md text-sm whitespace-pre-line">{l.message}</p>
        ),
        hideOnMobile: true,
      },
      { id: 'source', header: t('cols.source'), value: (l) => l.source ?? '', hideOnMobile: true },
      {
        id: 'status',
        header: t('cols.status'),
        value: (l) => l.status,
        cell: (l) => (
          <div className="grid min-w-36 gap-1.5">
            <Badge variant={TONE[l.status]}>{t(`status.${l.status}`)}</Badge>
            <OptionSelect
              id={`lead-status-${l.id}`}
              value={l.status}
              onChange={(v) => update.mutate({ id: l.id, status: LeadStatusSchema.parse(v) })}
              options={LeadStatusSchema.options.map((s) => ({ value: s, label: t(`status.${s}`) }))}
            />
            {l.handledBy ? (
              <span className="text-muted-foreground text-xs">{l.handledBy}</span>
            ) : null}
          </div>
        ),
        csv: true,
      },
    ],
    [t, tk, format, locale, update],
  );
  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <DataTable
        data={leads.data ?? []}
        columns={columns}
        loading={leads.isPending}
        error={leads.isError}
        onRetry={() => void leads.refetch()}
        retrying={leads.isFetching}
        csvName="leads"
        empty={{ icon: Inbox, title: t('empty'), description: t('emptyBody') }}
      />
    </div>
  );
}
