'use client';

import { type AdminClaim, RejectClaimSchema, type SupplierClaimStatus } from '@garmentgate/shared';
import { Check, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { PageHeader } from '@/components/patterns/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ApiError } from '@/lib/api';
import { useAdminClaims, useDecideClaim } from '../api';

const TABS = ['PENDING', 'VERIFIED', 'REJECTED', 'ALL'] as const satisfies readonly (
  SupplierClaimStatus | 'ALL'
)[];
const BADGE = { PENDING: 'warning', VERIFIED: 'success', REJECTED: 'danger' } as const;

/**
 * Supplier claims ("we supply these brands"). Staff check the evidence against the named brands,
 * then verify (buyers get a badge with the count, never the names) or reject with a reason.
 */
export function AdminClaims() {
  const t = useTranslations('adminPanel.claims');
  const tclaim = useTranslations('supplierClaims');
  const format = useFormatter();
  const [tab, setTab] = useState<(typeof TABS)[number]>('PENDING');
  const [rejecting, setRejecting] = useState<AdminClaim | null>(null);
  const claims = useAdminClaims(tab);
  const decide = useDecideClaim();

  const columns = useMemo<DataColumn<AdminClaim>[]>(
    () => [
      {
        id: 'brands',
        header: t('columns.brands'),
        value: (c) => c.brandNames.join(', '),
        cell: (c) => (
          <span>
            <span className="font-medium">{c.brandNames.join(', ')}</span>
            {c.note ? (
              <span className="text-muted-foreground block max-w-sm truncate text-xs">
                {c.note}
              </span>
            ) : null}
          </span>
        ),
      },
      {
        id: 'claim',
        header: t('columns.claim'),
        value: (c) => `${tclaim(`tiers.${c.tier}`)} · ${tclaim(`regions.${c.region}`)}`,
        hideOnMobile: true,
      },
      {
        id: 'factory',
        header: t('columns.factory'),
        value: (c) => `${c.manufacturer.code} ${c.manufacturer.name}`,
        cell: (c) => (
          <span>
            <Badge variant="code">{c.manufacturer.code}</Badge>
            <span className="text-muted-foreground block text-xs">{c.manufacturer.name}</span>
          </span>
        ),
      },
      {
        id: 'submitted',
        header: t('columns.submitted'),
        value: (c) => c.createdAt,
        cell: (c) => format.dateTime(new Date(c.createdAt), { dateStyle: 'medium' }),
        searchable: false,
      },
      {
        id: 'status',
        header: t('columns.status'),
        value: (c) => t(`status.${c.status}`),
        cell: (c) => (
          <span title={c.reviewNote ?? undefined}>
            <Badge variant={BADGE[c.status]}>{t(`status.${c.status}`)}</Badge>
          </span>
        ),
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (c) => (
          <span className="flex justify-end gap-1.5">
            {c.evidenceUrl ? (
              <Button
                variant="ghost"
                size="xs"
                render={<a href={c.evidenceUrl} target="_blank" rel="noreferrer" />}
              >
                <ExternalLink />
                {t('evidence')}
              </Button>
            ) : null}
            {c.status === 'PENDING' ? (
              <>
                <Button
                  variant="outline"
                  size="xs"
                  className="text-danger-ink"
                  onClick={() => setRejecting(c)}
                >
                  <X />
                  {t('reject')}
                </Button>
                <Button
                  size="xs"
                  disabled={decide.isPending}
                  onClick={() =>
                    decide.mutate(
                      { id: c.id, verdict: 'verify' },
                      {
                        onSuccess: () => toast.success(t('verified')),
                        onError: (e) =>
                          toast.error(e instanceof ApiError ? e.message : t('failed')),
                      },
                    )
                  }
                >
                  <Check />
                  {t('verify')}
                </Button>
              </>
            ) : null}
          </span>
        ),
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ],
    [t, tclaim, format, decide],
  );

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <Tabs
        value={tab}
        onValueChange={(v) => {
          const next = TABS.find((x) => x === v);
          if (next) setTab(next);
        }}
      >
        <TabsList>
          {TABS.map((x) => (
            <TabsTrigger key={x} value={x}>
              {t(`tabs.${x}`)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <DataTable
        key={tab}
        data={claims.data}
        columns={columns}
        loading={claims.isPending}
        error={claims.isError}
        onRetry={() => void claims.refetch()}
        retrying={claims.isFetching}
        filters={[{ column: 'status', label: t('columns.status') }]}
        initialSort={{ id: 'submitted', desc: tab !== 'PENDING' }}
        csvName={`supplier-claims-${tab.toLowerCase()}`}
        empty={{
          icon: ShieldCheck,
          title: tab === 'PENDING' ? t('emptyPending') : t('empty'),
          description: t('emptyBody'),
        }}
      />
      <RejectDialog claim={rejecting} onClose={() => setRejecting(null)} />
    </div>
  );
}

function RejectDialog({ claim, onClose }: { claim: AdminClaim | null; onClose: () => void }) {
  const t = useTranslations('adminPanel.claims');
  const tc = useTranslations('common');
  const decide = useDecideClaim();
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const close = () => {
    setNote('');
    setError(null);
    onClose();
  };
  const submit = async () => {
    if (!claim) return;
    const parsed = RejectClaimSchema.safeParse({ note });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? null);
      return;
    }
    try {
      await decide.mutateAsync({ id: claim.id, verdict: 'reject', note: parsed.data.note });
      toast.success(t('rejected'));
      close();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : tc('networkError'));
    }
  };
  return (
    <Dialog open={claim !== null} onOpenChange={(o) => !o && close()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('rejectTitle')}</DialogTitle>
          <DialogDescription>{t('rejectBody')}</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-5"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <Field data-invalid={!!error}>
            <FieldLabel htmlFor="claim-reason">{t('reason')}</FieldLabel>
            <Textarea
              id="claim-reason"
              rows={3}
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                setError(null);
              }}
            />
            <FieldError>{error}</FieldError>
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={close}>
              {tc('cancel')}
            </Button>
            <Button type="submit" variant="destructive" disabled={decide.isPending}>
              {t('reject')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
