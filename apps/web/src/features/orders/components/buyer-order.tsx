'use client';

import type { BuyerPaymentPurpose, OrderStatus } from '@garmentgate/shared';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OpenThreadButton } from '@/features/chat/components/open-thread-button';
import { countryName } from '@/lib/countries';
import { useMoney } from '@/lib/use-money';
import { InspectionsPanel } from '@/features/qc/components/inspections-panel';
import { PayDialog } from '@/features/qc/components/pay-dialog';
import { OpenDisputeDialog } from '@/features/trust/components/dispute-dialogs';
import { BuyerDisputePanel } from '@/features/trust/components/dispute-panel';
import { ShippingCard } from '@/features/logistics/components/shipping-card';
import { TrackingCard } from '@/features/logistics/components/tracking-card';
import { useOrderLogistics } from '@/features/logistics/order-api';
import { MerchandiserNote } from '@/features/contracts/components/contracts-pages';
import { FeesCard } from '@/features/payments/components/fees-card';
import { OrderReviewsCard } from '@/features/trust/components/reviews';
import { purchaseOrderUrl, useBuyerOrder } from '../api';
import { NextAction } from './next-action';
import {
  RequestSampleDialog,
  ReorderDialog,
  SampleDecisionDialog,
  TransitionDialog,
} from './order-dialogs';
import {
  OrderError,
  OrderHeader,
  OrderLoading,
  PoButton,
  SampleRounds,
  SummaryCard,
} from './order-parts';
import { OrderTimeline } from './order-timeline';

export function BuyerOrderPage({ code }: { code: string }) {
  const t = useTranslations('orders');
  const locale = useLocale();
  const showMoney = useMoney();
  const format = useFormatter();
  const order = useBuyerOrder(code);
  const logistics = useOrderLogistics(code);
  const [requesting, setRequesting] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [moving, setMoving] = useState<OrderStatus | null>(null);
  // `?pay=deposit` (straight after accepting a quote) opens the deposit right away.
  const params = useSearchParams();
  const [paying, setPaying] = useState<BuyerPaymentPurpose | null>(
    params.get('pay') === 'deposit' ? 'DEPOSIT' : null,
  );
  const [disputing, setDisputing] = useState(false);

  if (order.isPending) return <OrderLoading />;
  if (order.isError)
    return (
      <OrderError
        error={order.error}
        retry={() => void order.refetch()}
        retrying={order.isFetching}
        back="/buyer/orders"
      />
    );
  const o = order.data;
  const money = (minor: number) => showMoney(minor, o.currency);
  const latest = o.samples.at(-1) ?? null;
  const can = (to: OrderStatus) => o.allowedTransitions.includes(to);
  const stage = o.milestones.find((m) => m.status !== 'COMPLETED');
  const finalFailed =
    o.status === 'QC' &&
    o.inspections.filter((i) => i.type === 'PRE_SHIPMENT').at(-1)?.result === 'FAIL';

  return (
    <div className="space-y-8">
      <OrderHeader
        back="/buyer/orders"
        code={o.code}
        status={o.status}
        title={o.title}
        progress={o.progressPercent}
        party={<Badge variant="code">{o.manufacturerCode}</Badge>}
        actions={
          <>
            <OpenThreadButton target={{ orderCode: o.code }} base="/buyer" />
            <PoButton href={purchaseOrderUrl(o.code)} label={t('purchaseOrder')} />
          </>
        }
      />

      <NextAction
        role="BUYER"
        status={o.status}
        latestSample={latest}
        inspections={o.inspections}
        balancePaid={o.balancePaid}
        shippingChosen={logistics.data ? logistics.data.accepted !== null : undefined}
        values={{
          deposit: money(o.depositMinor),
          balance: money(o.totalMinor - o.depositMinor),
          stage: stage ? t(`timeline.phases.${stage.stage}`) : '',
        }}
      >
        {o.status === 'DRAFT' ? (
          <>
            <Button onClick={() => setRequesting(true)}>{t('actions.requestSample')}</Button>
            <Button variant="outline" onClick={() => setMoving('DEPOSIT_PENDING')}>
              {t('actions.skipSample')}
            </Button>
          </>
        ) : null}
        {o.status === 'SAMPLING' &&
        (latest?.status === 'SHIPPED' || latest?.status === 'RECEIVED') ? (
          <Button onClick={() => setReviewing(true)}>{t('actions.reviewSample')}</Button>
        ) : null}
        {o.status === 'SAMPLE_APPROVED' ? (
          <>
            <Button onClick={() => setMoving('DEPOSIT_PENDING')}>{t('actions.confirm')}</Button>
            <Button variant="outline" onClick={() => setRequesting(true)}>
              {t('actions.anotherSample')}
            </Button>
          </>
        ) : null}
        {o.status === 'DEPOSIT_PENDING' ? (
          <>
            <Button onClick={() => setPaying('DEPOSIT')}>{t('actions.payDeposit')}</Button>
            <PoButton href={purchaseOrderUrl(o.code)} label={t('purchaseOrder')} />
          </>
        ) : null}
        {finalFailed ? (
          <>
            <Button onClick={() => setMoving('IN_PRODUCTION')}>{t('actions.rework')}</Button>
            <Button variant="outline" onClick={() => setDisputing(true)}>
              {t('actions.dispute')}
            </Button>
          </>
        ) : null}
        {o.status === 'READY_TO_SHIP' && !o.balancePaid ? (
          <Button onClick={() => setPaying('BALANCE')}>{t('actions.payBalance')}</Button>
        ) : null}
        {can('DELIVERED') ? (
          <Button onClick={() => setMoving('DELIVERED')}>{t('actions.delivered')}</Button>
        ) : null}
        {can('COMPLETED') ? (
          <Button onClick={() => setMoving('COMPLETED')}>{t('actions.complete')}</Button>
        ) : null}
        {o.status === 'COMPLETED' ? (
          <Button onClick={() => setReordering(true)}>{t('actions.reorder')}</Button>
        ) : null}
      </NextAction>

      <BuyerDisputePanel code={o.code} />

      <TrackingCard code={o.code} />
      <ShippingCard code={o.code} />
      <FeesCard code={o.code} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section aria-labelledby="timeline-heading">
          <h2 id="timeline-heading" className="mb-4 text-lg font-semibold tracking-[-0.01em]">
            {t('timeline.title')}
          </h2>
          <OrderTimeline
            order={o}
            slot={(key) =>
              key === 'sample' ? (
                <SampleRounds samples={o.samples} />
              ) : key === 'qc' ? (
                <InspectionsPanel
                  role="BUYER"
                  code={o.code}
                  status={o.status}
                  inspections={o.inspections}
                />
              ) : null
            }
          />
        </section>
        <aside className="space-y-4">
          <MerchandiserNote />
          <SummaryCard
            rows={[
              [t('fields.quantity'), `${format.number(o.quantity)} pcs`],
              [t('fields.unitPrice'), money(o.unitPriceMinor)],
              [t('fields.total'), money(o.totalMinor)],
              [t('fields.deposit', { percent: o.depositBps / 100 }), money(o.depositMinor)],
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
              ...(o.reorderOfCode
                ? ([[t('fields.reorderOf'), o.reorderOfCode]] as [string, string][])
                : []),
            ]}
          >
            {o.specification ? (
              <p className="text-muted-foreground text-sm leading-relaxed">{o.specification}</p>
            ) : null}
            {o.allowedTransitions.includes('CANCELLED') ||
            o.allowedTransitions.includes('DISPUTED') ? (
              <div className="flex flex-wrap gap-2 border-t pt-3">
                {o.allowedTransitions.includes('DISPUTED') ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-danger-ink"
                    onClick={() => setDisputing(true)}
                  >
                    {t('actions.dispute')}
                  </Button>
                ) : null}
                {o.allowedTransitions.includes('CANCELLED') ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                    onClick={() => setMoving('CANCELLED')}
                  >
                    {t('actions.cancel')}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </SummaryCard>
          {o.status === 'COMPLETED' ? <OrderReviewsCard code={o.code} side="BUYER" /> : null}
        </aside>
      </div>

      <RequestSampleDialog code={o.code} open={requesting} onClose={() => setRequesting(false)} />
      <SampleDecisionDialog
        code={o.code}
        sample={latest}
        open={reviewing}
        onClose={() => setReviewing(false)}
      />
      <TransitionDialog
        code={o.code}
        to={moving}
        copy={moving === 'IN_PRODUCTION' ? 'REWORK' : undefined}
        onClose={() => setMoving(null)}
      />
      <OpenDisputeDialog code={o.code} open={disputing} onClose={() => setDisputing(false)} />
      <PayDialog
        code={o.code}
        purpose={paying ?? 'BALANCE'}
        open={paying !== null}
        onClose={() => setPaying(null)}
      />
      <ReorderDialog
        code={o.code}
        quantity={o.quantity}
        open={reordering}
        onClose={() => setReordering(false)}
      />
    </div>
  );
}
