'use client';

import {
  type AdminDispute,
  type BuyerDispute,
  type DisputeEvidence,
  EVIDENCE_MAX_BYTES,
  EVIDENCE_TYPES,
  type ManufacturerDispute,
} from '@garmentgate/shared';
import { FileText, Loader2, Scale } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { ErrorState } from '@/components/patterns/error-state';
import { FileDropzone } from '@/components/patterns/file-dropzone';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { OpenThreadButton } from '@/features/chat/components/open-thread-button';
import { formatMoney } from '@/lib/format';
import {
  uploadEvidence,
  useAddEvidence,
  useAdminDispute,
  useAssignDispute,
  useBuyerDispute,
  useFactoryDispute,
} from '../api';
import { ResolveDisputeDialog } from './dispute-dialogs';

type AnyDispute = BuyerDispute | ManufacturerDispute | AdminDispute;
const isOpen = (d: AnyDispute) => d.status === 'OPEN' || d.status === 'UNDER_REVIEW';

export function BuyerDisputePanel({ code }: { code: string }) {
  const query = useBuyerDispute(code);
  return (
    <Panel
      query={query}
      code={code}
      threads={(d) => <OpenThreadButton target={{ disputeId: d.id }} base="/buyer" />}
    >
      {(d) => (d.refundMinor ? <Refund minor={d.refundMinor} currency={d.currency} /> : null)}
    </Panel>
  );
}

export function FactoryDisputePanel({ code }: { code: string }) {
  return (
    <Panel
      query={useFactoryDispute(code)}
      code={code}
      threads={(d) => <OpenThreadButton target={{ disputeId: d.id }} base="/manufacturer" />}
    />
  );
}

export function AdminDisputePanel({ code }: { code: string }) {
  const t = useTranslations('trust.disputes');
  const query = useAdminDispute(code);
  const assign = useAssignDispute();
  const [resolving, setResolving] = useState(false);
  return (
    <Panel
      query={query}
      code={code}
      threads={(d) => (
        <>
          <OpenThreadButton
            target={{ disputeId: d.id }}
            base="/admin"
            label={t('admin.buyerThread')}
          />
          <OpenThreadButton
            target={{ disputeId: d.id, factoryCode: d.manufacturer.code }}
            base="/admin"
            label={t('admin.factoryThread')}
          />
        </>
      )}
    >
      {(d) => (
        <>
          <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <Row label={t('admin.buyer')} value={`${d.buyer.code} · ${d.buyer.name}`} />
            <Row
              label={t('admin.factory')}
              value={`${d.manufacturer.code} · ${d.manufacturer.name}`}
            />
            <Row label={t('admin.openedBy')} value={d.openedBy} />
            <Row label={t('admin.assignedTo')} value={d.assignedTo ?? t('admin.unassigned')} />
          </dl>
          {d.originalDescription !== d.description ? (
            <div className="bg-warning-soft text-warning-ink rounded-lg p-3 text-sm">
              <p className="mb-1 text-xs font-medium">{t('admin.original')}</p>
              <p className="whitespace-pre-line">{d.originalDescription}</p>
            </div>
          ) : null}
          {d.refundMinor ? <Refund minor={d.refundMinor} currency={d.currency} /> : null}
          {isOpen(d) ? (
            <div className="flex flex-wrap gap-2 border-t pt-4">
              {d.status === 'OPEN' ? (
                <Button
                  variant="outline"
                  disabled={assign.isPending}
                  onClick={() =>
                    assign.mutate(d.id, {
                      onSuccess: () => toast.success(t('admin.assigned')),
                      onError: () => toast.error(t('admin.assignFailed')),
                    })
                  }
                >
                  {t('admin.assign')}
                </Button>
              ) : null}
              <Button onClick={() => setResolving(true)}>{t('admin.resolve')}</Button>
            </div>
          ) : null}
          <ResolveDisputeDialog dispute={d} open={resolving} onClose={() => setResolving(false)} />
        </>
      )}
    </Panel>
  );
}

/**
 * The dispute on an order, as the viewer may see it: reason, description, evidence and the
 * outcome. Renders nothing when the order has never been disputed.
 */
function Panel<D extends AnyDispute>({
  query,
  code,
  threads,
  children,
}: {
  query: {
    isPending: boolean;
    isError: boolean;
    isFetching: boolean;
    data: { dispute: D | null } | undefined;
    refetch: () => Promise<unknown>;
  };
  code: string;
  /** Buttons to the mediation thread(s) with GarmentGate. */
  threads?: (dispute: D) => React.ReactNode;
  children?: (dispute: D) => React.ReactNode;
}) {
  const t = useTranslations('trust.disputes');
  const format = useFormatter();
  if (query.isPending) return <Skeleton className="h-40 rounded-xl" />;
  if (query.isError)
    return (
      <ErrorState
        size="compact"
        title={t('loadFailed')}
        onRetry={() => void query.refetch()}
        retrying={query.isFetching}
      />
    );
  const d = query.data?.dispute;
  if (!d) return null;
  const day = (iso: string) => format.dateTime(new Date(iso), { dateStyle: 'medium' });

  return (
    <Card aria-labelledby="dispute-heading">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Scale className="text-muted-foreground size-4" aria-hidden="true" />
          <CardTitle id="dispute-heading">{t('title')}</CardTitle>
          <StatusBadge domain="dispute" status={d.status} />
          {threads ? <div className="ms-auto flex flex-wrap gap-2">{threads(d)}</div> : null}
        </div>
        <CardDescription>
          {t('openedOn', { date: day(d.openedAt), reason: t(`reasons.${d.reason}`) })}
          {d.resolvedAt ? ` · ${t('resolvedOn', { date: day(d.resolvedAt) })}` : ''}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed whitespace-pre-line">{d.description}</p>
        {d.resolution ? (
          <div className="bg-surface rounded-lg border p-3 text-sm">
            <p className="text-muted-foreground mb-1 text-xs font-medium">{t('resolution')}</p>
            <p className="whitespace-pre-line">{d.resolution}</p>
          </div>
        ) : isOpen(d) ? (
          <p className="text-muted-foreground text-sm">{t('mediating')}</p>
        ) : null}
        {children?.(d)}
        <Evidence items={d.evidence} />
        {isOpen(d) ? <AddEvidence code={code} /> : null}
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 sm:block">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function Refund({ minor, currency }: { minor: number; currency: string }) {
  const t = useTranslations('trust.disputes');
  const locale = useLocale();
  return (
    <p className="bg-success-soft text-success-ink rounded-lg p-3 text-sm font-medium">
      {t('refunded', { amount: formatMoney(minor, currency, locale) })}
    </p>
  );
}

function Evidence({ items }: { items: DisputeEvidence[] }) {
  const t = useTranslations('trust.disputes');
  if (items.length === 0) return <p className="text-muted-foreground text-sm">{t('noEvidence')}</p>;
  return (
    <div className="space-y-2">
      <h3 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        {t('evidence')}
      </h3>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((e) => (
          <li key={e.id} className="bg-surface space-y-1.5 overflow-hidden rounded-lg border">
            <EvidenceThumb item={e} />
            <div className="space-y-1 px-2 pb-2 text-xs">
              <p className="text-muted-foreground">{t(`from.${e.from}`)}</p>
              {e.note ? <p className="line-clamp-2">{e.note}</p> : null}
              {e.from === 'YOU' && e.review !== 'APPROVED' ? (
                <Badge variant={e.review === 'REJECTED' ? 'danger' : 'neutral'}>
                  {t(`review.${e.review}`)}
                </Badge>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EvidenceThumb({ item: e }: { item: DisputeEvidence }) {
  const t = useTranslations('trust.disputes');
  const box = 'bg-muted flex aspect-[4/3] w-full items-center justify-center';
  if (!e.url)
    return (
      <div className={box}>
        <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Loader2 className="size-3.5 motion-safe:animate-spin" aria-hidden="true" />
          {e.processing === 'FAILED' ? t('processingFailed') : t('processing')}
        </span>
      </div>
    );
  return (
    <a
      href={e.url}
      target="_blank"
      rel="noreferrer"
      className="focus-visible:ring-ring/40 block outline-none focus-visible:ring-3"
      aria-label={t('openFile', { name: e.name })}
    >
      {e.kind === 'IMAGE' && e.thumbUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- signed, short-lived storage URL
        <img src={e.thumbUrl} alt="" className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div className={box}>
          <FileText className="text-muted-foreground size-6" aria-hidden="true" />
        </div>
      )}
    </a>
  );
}

/** Either side (or staff) adds evidence while the dispute is open; it's reviewed before sharing. */
function AddEvidence({ code }: { code: string }) {
  const t = useTranslations('trust.disputes');
  const add = useAddEvidence(code);
  const [progress, setProgress] = useState<number | null>(null);
  const onFile = (file: File) => {
    setProgress(0);
    uploadEvidence(code, file, setProgress)
      .then((fileId) => add.mutateAsync({ fileId, note: undefined }))
      .then(() => toast.success(t('evidenceAdded')))
      .catch(() => toast.error(t('uploadFailed')))
      .finally(() => setProgress(null));
  };
  return (
    <div className="space-y-1.5 border-t pt-4">
      <FileDropzone
        compact
        accept={EVIDENCE_TYPES}
        maxBytes={EVIDENCE_MAX_BYTES}
        progress={progress}
        disabled={progress !== null}
        label={t('addEvidence')}
        hint={t('evidenceHint')}
        onFile={onFile}
      />
      <p className="text-muted-foreground text-xs">{t('evidenceReview')}</p>
    </div>
  );
}
