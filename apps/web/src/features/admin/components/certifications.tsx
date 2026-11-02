'use client';

import {
  type AdminCertification,
  type CertificationStatus,
  RejectCertificationSchema,
} from '@garmentgate/shared';
import { BadgeCheck, Check, ExternalLink, X } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
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
import { useAdminCertifications, useRejectCertification, useVerifyCertification } from '../api';

const TABS = ['PENDING', 'VERIFIED', 'REJECTED', 'ALL'] as const satisfies readonly (
  CertificationStatus | 'ALL'
)[];
const BADGE = {
  PENDING: 'warning',
  VERIFIED: 'success',
  REJECTED: 'danger',
  EXPIRED: 'neutral',
} as const;

/**
 * Certificates factories add after KYC (those sent with KYC are decided there). Open the file,
 * check name, number and dates, then verify or reject with a reason the factory sees.
 */
export function AdminCertifications() {
  const t = useTranslations('adminPanel.certifications');
  const tcert = useTranslations('certifications');
  const format = useFormatter();
  const [tab, setTab] = useState<(typeof TABS)[number]>('PENDING');
  const [rejecting, setRejecting] = useState<AdminCertification | null>(null);
  const certs = useAdminCertifications(tab);
  const verify = useVerifyCertification();

  const columns = useMemo<DataColumn<AdminCertification>[]>(() => {
    const day = (iso: string | null) =>
      iso ? format.dateTime(new Date(iso), { dateStyle: 'medium' }) : '—';
    return [
      {
        id: 'certificate',
        header: t('columns.certificate'),
        value: (c) => c.customName ?? tcert(c.type),
        cell: (c) => (
          <span>
            <span className="font-medium">{c.customName ?? tcert(c.type)}</span>
            {c.certificateNumber ? (
              <span className="text-muted-foreground block font-mono text-xs">
                {c.certificateNumber}
              </span>
            ) : null}
          </span>
        ),
      },
      {
        id: 'number',
        header: t('columns.number'),
        value: (c) => c.certificateNumber,
        hideOnMobile: true,
        className: 'font-mono text-xs',
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
        id: 'kyc',
        header: t('columns.kyc'),
        value: (c) => c.manufacturer.kycStatus,
        cell: (c) => <StatusBadge domain="kyc" status={c.manufacturer.kycStatus} />,
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'expires',
        header: t('columns.expires'),
        value: (c) => c.expiresAt,
        cell: (c) => day(c.expiresAt),
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'submitted',
        header: t('columns.submitted'),
        value: (c) => c.createdAt,
        cell: (c) => day(c.createdAt),
        searchable: false,
      },
      {
        id: 'status',
        header: t('columns.status'),
        value: (c) => t(`status.${c.status}`),
        cell: (c) => (
          <span title={c.rejectionReason ?? undefined}>
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
            {c.fileUrl ? (
              <Button
                variant="ghost"
                size="xs"
                render={<a href={c.fileUrl} target="_blank" rel="noreferrer" />}
              >
                <ExternalLink />
                {t('open')}
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
                  disabled={verify.isPending}
                  onClick={() =>
                    verify.mutate(c.id, {
                      onSuccess: () => toast.success(t('verified')),
                      onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
                    })
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
    ];
  }, [t, tcert, format, verify]);

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
        data={certs.data}
        columns={columns}
        loading={certs.isPending}
        error={certs.isError}
        onRetry={() => void certs.refetch()}
        retrying={certs.isFetching}
        filters={[{ column: 'status', label: t('columns.status') }]}
        initialSort={{ id: 'submitted', desc: tab !== 'PENDING' }}
        csvName={`certifications-${tab.toLowerCase()}`}
        empty={{
          icon: BadgeCheck,
          title: tab === 'PENDING' ? t('emptyPending') : t('empty'),
          description: t('emptyBody'),
        }}
      />
      <RejectDialog cert={rejecting} onClose={() => setRejecting(null)} />
    </div>
  );
}

function RejectDialog({ cert, onClose }: { cert: AdminCertification | null; onClose: () => void }) {
  const t = useTranslations('adminPanel.certifications');
  const tc = useTranslations('common');
  const reject = useRejectCertification();
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const close = () => {
    setReason('');
    setError(null);
    onClose();
  };
  const submit = async () => {
    if (!cert) return;
    const parsed = RejectCertificationSchema.safeParse({ reason });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? null);
      return;
    }
    try {
      await reject.mutateAsync({ id: cert.id, dto: parsed.data });
      toast.success(t('rejected'));
      close();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : tc('networkError'));
    }
  };
  return (
    <Dialog open={cert !== null} onOpenChange={(o) => !o && close()}>
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
            <FieldLabel htmlFor="cert-reason">{t('reason')}</FieldLabel>
            <Textarea
              id="cert-reason"
              rows={3}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setError(null);
              }}
            />
            <FieldError>{error}</FieldError>
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={close}>
              {tc('cancel')}
            </Button>
            <Button type="submit" variant="destructive" disabled={reject.isPending}>
              {t('reject')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
