'use client';

import {
  ORDER_IMAGE_MAX_BYTES,
  ORDER_MEDIA_TYPES,
  ORDER_VIDEO_MAX_BYTES,
  type OrderMilestone,
  type OrderStatus,
  type ProductionStage,
  ProductionStageSchema,
} from '@garmentgate/shared';
import { Loader2 } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { FileDropzone } from '@/components/patterns/file-dropzone';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { OpenThreadButton } from '@/features/chat/components/open-thread-button';
import { countryName } from '@/lib/countries';
import { formatMoney } from '@/lib/format';
import {
  purchaseOrderUrl,
  uploadOrderMedia,
  useAddMilestoneMedia,
  useFactoryOrder,
  useFactoryPayouts,
  useUpdateMilestone,
} from '../api';
import { NextAction } from './next-action';
import { ShipSampleDialog, TransitionDialog } from './order-dialogs';
import { InspectionsPanel } from '@/features/qc/components/inspections-panel';
import { ShipmentPanel } from '@/features/qc/components/shipment-panel';
import { FactoryDisputePanel } from '@/features/trust/components/dispute-panel';
import { OrderReviewsCard } from '@/features/trust/components/reviews';
import {
  OrderError,
  OrderHeader,
  OrderLoading,
  PoButton,
  SampleRounds,
  SummaryCard,
} from './order-parts';
import { OrderTimeline } from './order-timeline';

export function FactoryOrderPage({ code }: { code: string }) {
  const t = useTranslations('orders');
  const locale = useLocale();
  const format = useFormatter();
  const order = useFactoryOrder(code);
  const payouts = useFactoryPayouts(code);
  const [shipping, setShipping] = useState(false);
  const [moving, setMoving] = useState<OrderStatus | null>(null);

  if (order.isPending) return <OrderLoading />;
  if (order.isError)
    return (
      <OrderError
        error={order.error}
        retry={() => void order.refetch()}
        retrying={order.isFetching}
        back="/manufacturer/orders"
      />
    );
  const o = order.data;
  const latest = o.samples.at(-1) ?? null;
  const sampleToShip =
    o.status === 'SAMPLING' && latest && ['REQUESTED', 'IN_PROGRESS'].includes(latest.status);
  const stage = o.milestones.find((m) => m.status !== 'COMPLETED');
  const allDone = o.milestones.length > 0 && !stage;

  return (
    <div className="space-y-8">
      <OrderHeader
        back="/manufacturer/orders"
        code={o.code}
        status={o.status}
        title={o.title}
        progress={o.progressPercent}
        party={<Badge variant="code">{o.buyerCode}</Badge>}
        actions={
          <>
            <OpenThreadButton target={{ orderCode: o.code }} base="/manufacturer" />
            <PoButton href={purchaseOrderUrl(o.code)} label={t('purchaseOrder')} />
          </>
        }
      />

      <NextAction
        role="MANUFACTURER"
        status={o.status}
        latestSample={latest}
        inspections={o.inspections}
        balancePaid={o.balancePaid}
        values={{
          stage: stage ? t(`timeline.phases.${stage.stage}`) : t('timeline.phases.PACKING'),
        }}
      >
        {sampleToShip ? (
          <Button onClick={() => setShipping(true)}>{t('actions.shipSample')}</Button>
        ) : null}
        {o.allowedTransitions.includes('QC') ? (
          <Button disabled={!allDone} onClick={() => setMoving('QC')}>
            {t('actions.toInspection')}
          </Button>
        ) : null}
        {o.allowedTransitions.includes('SHIPPED') && o.shipment && o.balancePaid ? (
          <Button onClick={() => setMoving('SHIPPED')}>{t('actions.ship')}</Button>
        ) : null}
      </NextAction>

      <FactoryDisputePanel code={o.code} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section aria-labelledby="timeline-heading">
          <h2 id="timeline-heading" className="mb-4 text-lg font-semibold tracking-[-0.01em]">
            {t('timeline.title')}
          </h2>
          <OrderTimeline
            order={o}
            slot={(key) => {
              if (key === 'sample') return <SampleRounds samples={o.samples} />;
              if (key === 'qc')
                return (
                  <InspectionsPanel
                    role="MANUFACTURER"
                    code={o.code}
                    status={o.status}
                    inspections={o.inspections}
                  />
                );
              if (key === 'shipping')
                return (
                  <ShipmentPanel
                    role="MANUFACTURER"
                    code={o.code}
                    status={o.status}
                    shipment={o.shipment}
                    defaultIncoterm={o.incoterm}
                  />
                );
              const parsed = ProductionStageSchema.safeParse(key);
              const milestone = parsed.success
                ? o.milestones.find((m) => m.stage === parsed.data)
                : undefined;
              return parsed.success &&
                milestone &&
                (o.status === 'IN_PRODUCTION' || o.status === 'QC') ? (
                <StageEditor
                  code={o.code}
                  stage={parsed.data}
                  milestone={milestone}
                  editable={o.status === 'IN_PRODUCTION'}
                />
              ) : null;
            }}
          />
        </section>
        <aside className="space-y-4">
          <SummaryCard
            rows={[
              [t('fields.quantity'), `${format.number(o.quantity)} pcs`],
              [t('fields.yourPrice'), formatMoney(o.unitPriceMinor, o.currency, locale)],
              [t('fields.yourTotal'), formatMoney(o.totalMinor, o.currency, locale)],
              // Commission is fixed when the order is confirmed; shown once it applies.
              ...(payouts.data && payouts.data.commissionMinor > 0
                ? ([
                    [
                      t('fields.commission', { percent: payouts.data.commissionBps / 100 }),
                      `− ${formatMoney(payouts.data.commissionMinor, o.currency, locale)}`,
                    ],
                    [
                      t('fields.youReceive'),
                      formatMoney(payouts.data.netMinor, o.currency, locale),
                    ],
                  ] as [string, string][])
                : []),
              [
                t('fields.terms'),
                `${o.incoterm}${o.destinationPort ? ` ${o.destinationPort}` : ''}`,
              ],
              [t('fields.destination'), countryName(o.destinationCountry, locale)],
              [
                t('fields.shipBy'),
                o.requestedShipDate
                  ? format.dateTime(new Date(o.requestedShipDate), { dateStyle: 'medium' })
                  : '—',
              ],
            ]}
          >
            {o.specification ? (
              <p className="text-muted-foreground text-sm leading-relaxed">{o.specification}</p>
            ) : null}
          </SummaryCard>
          {o.status === 'COMPLETED' ? <OrderReviewsCard code={o.code} side="MANUFACTURER" /> : null}
        </aside>
      </div>

      <ShipSampleDialog
        code={o.code}
        sample={latest}
        open={shipping}
        onClose={() => setShipping(false)}
      />
      <TransitionDialog code={o.code} to={moving} onClose={() => setMoving(null)} />
    </div>
  );
}

/** The factory's controls for one production stage: status, a note, photos and videos. */
function StageEditor({
  code,
  stage,
  milestone,
  editable,
}: {
  code: string;
  stage: ProductionStage;
  milestone: OrderMilestone;
  editable: boolean;
}) {
  const t = useTranslations('orders.stage');
  const update = useUpdateMilestone(code);
  const attach = useAddMilestoneMedia(code);
  const [note, setNote] = useState('');
  const [uploading, setUploading] = useState<number | null>(null);

  const set = (status: 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED') =>
    update.mutate(
      { stage, dto: { status, note: note.trim() || undefined } },
      {
        onSuccess: () => {
          setNote('');
          toast.success(t(`saved.${status}`));
        },
        onError: (e) => toast.error(e.message),
      },
    );
  const upload = (file: File) => {
    setUploading(0);
    uploadOrderMedia(code, file, setUploading)
      .then((fileId) => attach.mutateAsync({ stage, fileId }))
      .then(() => toast.success(t('uploaded')))
      .catch(() => toast.error(t('uploadFailed')))
      .finally(() => setUploading(null));
  };

  return (
    <div className="space-y-3">
      {editable && milestone.status !== 'COMPLETED' ? (
        <>
          <Textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t('notePlaceholder')}
            aria-label={t('note')}
          />
          <div className="flex flex-wrap gap-2">
            {milestone.status !== 'IN_PROGRESS' ? (
              <Button
                size="sm"
                variant="outline"
                disabled={update.isPending}
                onClick={() => set('IN_PROGRESS')}
              >
                {t('start')}
              </Button>
            ) : null}
            <Button size="sm" disabled={update.isPending} onClick={() => set('COMPLETED')}>
              {update.isPending ? (
                <Loader2 className="animate-spin motion-reduce:animate-none" />
              ) : null}
              {t('complete')}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-warning-ink"
              disabled={update.isPending}
              onClick={() => set('DELAYED')}
            >
              {t('delayed')}
            </Button>
          </div>
        </>
      ) : null}
      {milestone.status !== 'PENDING' ? (
        <FileDropzone
          compact
          accept={ORDER_MEDIA_TYPES}
          maxBytes={ORDER_VIDEO_MAX_BYTES}
          progress={uploading}
          label={t('addMedia')}
          hint={t('mediaHint', {
            photo: Math.round(ORDER_IMAGE_MAX_BYTES / 1_048_576),
            video: Math.round(ORDER_VIDEO_MAX_BYTES / 1_048_576),
          })}
          onFile={upload}
        />
      ) : null}
    </div>
  );
}
