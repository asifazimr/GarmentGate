'use client';

import type { AdminUser } from '@garmentgate/shared';
import { Users } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { PageHeader } from '@/components/patterns/page-header';
import { Badge } from '@/components/ui/badge';
import { useAdminUsers } from '../api';
import { UserActions } from './user-actions';

const STATUS_BADGE = { ACTIVE: 'success', SUSPENDED: 'danger', DEACTIVATED: 'neutral' } as const;

/** Every account with its company, activity and moderation record; warn, suspend, reactivate. */
export function AdminUsers() {
  const t = useTranslations('adminPanel.users');
  const tr = useTranslations('shell.roles');
  const format = useFormatter();
  const users = useAdminUsers();

  const columns = useMemo<DataColumn<AdminUser>[]>(() => {
    const day = (iso: string | null) =>
      iso ? format.dateTime(new Date(iso), { dateStyle: 'medium' }) : '—';
    return [
      {
        id: 'name',
        header: t('columns.name'),
        value: (u) => u.name,
        cell: (u) => <span className="font-medium">{u.name}</span>,
      },
      { id: 'email', header: t('columns.email'), value: (u) => u.email, hideOnMobile: true },
      { id: 'role', header: t('columns.role'), value: (u) => tr(u.role), hideOnMobile: true },
      {
        id: 'company',
        header: t('columns.company'),
        value: (u) => (u.company ? u.company.name : null),
        cell: (u) =>
          u.company ? (
            <span>
              {u.company.name}
              {u.company.code ? (
                <Badge variant="code" className="ms-2">
                  {u.company.code}
                </Badge>
              ) : null}
            </span>
          ) : (
            '—'
          ),
        hideOnMobile: true,
      },
      {
        id: 'status',
        header: t('columns.status'),
        value: (u) => t(`status.${u.status}`),
        cell: (u) => (
          <span title={u.suspendedReason ?? undefined}>
            <Badge variant={STATUS_BADGE[u.status]}>{t(`status.${u.status}`)}</Badge>
          </span>
        ),
      },
      {
        id: 'moderation',
        header: t('columns.moderation'),
        value: (u) => u.violations,
        cell: (u) =>
          u.violations + u.warnings === 0 ? (
            <span className="text-muted-foreground">—</span>
          ) : (
            <span className="flex flex-wrap gap-1">
              {u.violations > 0 ? (
                <Badge variant={u.violations >= 3 ? 'warning' : 'neutral'}>
                  {t('violations', { count: u.violations })}
                </Badge>
              ) : null}
              {u.warnings > 0 ? (
                <Badge variant="warning">{t('warnings', { count: u.warnings })}</Badge>
              ) : null}
            </span>
          ),
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'lastLogin',
        header: t('columns.lastLogin'),
        value: (u) => u.lastLoginAt,
        cell: (u) => day(u.lastLoginAt),
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'joined',
        header: t('columns.joined'),
        value: (u) => u.createdAt,
        cell: (u) => day(u.createdAt),
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (u) =>
          u.role === 'ADMIN' ? null : (
            <UserActions user={{ id: u.id, name: u.name, status: u.status }} size="xs" />
          ),
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ];
  }, [t, tr, format]);

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <DataTable
        data={users.data}
        columns={columns}
        loading={users.isPending}
        error={users.isError}
        onRetry={() => void users.refetch()}
        retrying={users.isFetching}
        filters={[
          { column: 'role', label: t('columns.role') },
          { column: 'status', label: t('columns.status') },
        ]}
        initialSort={{ id: 'joined', desc: true }}
        csvName="users"
        empty={{ icon: Users, title: t('empty'), description: t('emptyBody') }}
      />
    </div>
  );
}
