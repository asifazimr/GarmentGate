'use client';

import type { OrderStatus } from '@garmentgate/shared';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OpenThreadButton } from '@/features/chat/components/open-thread-button';
import {
  OrderFinanceCard,
  OverrideStatusButton,
} from '@/features/admin/components/order-admin-panels';
import { formatMoney } from '@/lib/format';
import { purchaseOrderUrl, useAdminOrder } from '../api';
import { InspectionsPanel } from '@/features/qc/components/inspections-panel';
import { useAdminDispute } from '@/features/trust/api';
import { AdminDisputePanel } from '@/features/trust/components/dispute-panel';
import { NextAction } from './next-action';
import { TransitionDialog } from './order-dialogs';
import {
  OrderError,
  OrderHeader,
  OrderLoading,
  PoButton,
  SampleRounds,
  SummaryCard,
} from './order-parts';
import { OrderTimeline } from './order-timeline';
import { MerchandiserPicker } from '@/features/contracts/components/admin-contracts';
import { ReplaceFactoryButton } from '@/features/exceptions/components/replace-factory-dialog';
import { HsCodeCard } from '@/features/logistics/components/hs-code-card';

export function AdminOrderPage({ code }: { code: string }) {
  const t = useTranslations('orders');
  const ts = useTranslations('orders.transitions');
  const locale = useLocale();
  const format = useFormatter();
  const order = useAdminOrder(code);
  const dispute = useAdminDispute(code);
  const [moving, setMoving] = useState<OrderStatus | null>(null);

  if (order.isPending) return <OrderLoading />;
  if (order.isError)
    return (
      <OrderError
        error={order.error}
        retry={() => void order.refetch()}
        retrying={order.isFetching}
        back="/admin/orders"
      />
    );
  const o = order.data;
  const money = (minor: number) => formatMoney(minor, o.currency, locale);
  const markup = o.buyerTotalMinor - o.manufacturerTotalMinor;
  const openDispute =
    dispute.data?.dispute?.status === 'OPEN' || dispute.data?.dispute?.status === 'UNDER_REVIEW';
  // Samples have their own flow (buyer requests / approves), disputes are opened by the buyer
  // and an open one is closed by resolving it: staff move everything else.
  const moves = openDispute
    ? []
    : o.allowedTransitions.filter(
        (s) => s !== 'SAMPLING' && s !== 'SAMPLE_APPROVED' && s !== 'DISPUTED',
      );

  return (
    <div className="space-y-8">
      <OrderHeader
        back="/admin/orders"
        code={o.code}
        status={o.status}
        title={o.title}
        progress={o.progressPercent}
        party={
          <>
            <Badge variant="info">
              {o.buyer.code} · {o.buyer.name}
            </Badge>
            <Badge variant="progress">
              {o.manufacturer.code} · {o.manufacturer.name}
            </Badge>
          </>
        }
        actions={
          <>
            <OpenThreadButton
              target={{ orderCode: o.code }}
              base="/admin"
              label={t('buyerThread')}
            />
            <OpenThreadButton
              target={{ orderCode: o.code, factoryCode: o.manufacturer.code }}
              base="/admin"
              label={t('factoryThread')}
            />
            <PoButton href={purchaseOrderUrl(o.code, 'buyer')} label={t('poBuyer')} />
            <PoButton href={purchaseOrderUrl(o.code, 'manufacturer')} label={t('poFactory')} />
            <OverrideStatusButton code={o.code} status={o.status} />
            <ReplaceFactoryButton code={o.code} status={o.status} currency={o.currency} />
            <MerchandiserPicker buyerCode={o.buyer.code} />
          </>
        }
      />

      <NextAction
        role="ADMIN"
        status={o.status}
        latestSample={o.samples.at(-1) ?? null}
        inspections={o.inspections}
        balancePaid={o.balancePaid}
      >
        {moves.map((to) => (
          <Button
            key={to}
            variant={to === 'CANCELLED' ? 'ghost' : 'default'}
            onClick={() => setMoving(to)}
          >
            {ts(`${to}.action`)}
          </Button>
        ))}
      </NextAction>

      <AdminDisputePanel code={o.code} />

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
                  role="ADMIN"
                  code={o.code}
                  status={o.status}
                  inspections={o.inspections}
                />
              ) : null
            }
          />
        </section>
        <aside className="space-y-4">
          <SummaryCard
            rows={[
              [t('fields.quantity'), `${format.number(o.quantity)} pcs`],
              [t('fields.buyerPrice'), money(o.buyerUnitPriceMinor)],
              [t('fields.factoryPrice'), money(o.manufacturerUnitPriceMinor)],
              [t('fields.buyerTotal'), money(o.buyerTotalMinor)],
              [t('fields.factoryTotal'), money(o.manufacturerTotalMinor)],
              [t('fields.markup'), money(markup)],
              [
                t('fields.commission', { percent: o.commissionBps / 100 }),
                o.commissionBps > 0 || o.commissionMinor > 0
                  ? `${money(o.commissionMinor)}${o.repeatOrder ? ` · ${t('fields.repeat')}` : ''}`
                  : t('fields.atConfirmation'),
              ],
              [t('fields.margin'), money(markup + o.commissionMinor)],
              [t('fields.terms'), o.incoterm],
            ]}
          />
          <OrderFinanceCard code={o.code} />
          <HsCodeCard code={o.code} hsCode={o.hsCode} />
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('history')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm">
                {[...o.events].reverse().map((e, i) => (
                  <li key={`${e.at}-${String(i)}`} className="border-s-2 ps-3">
                    <p className="font-medium">{e.from ? `${e.from} → ${e.to}` : e.to}</p>
                    <p className="text-muted-foreground text-xs">
                      {format.dateTime(new Date(e.at), { dateStyle: 'medium', timeStyle: 'short' })}{' '}
                      · {e.actor}
                    </p>
                    {e.note ? <p className="text-muted-foreground text-xs">{e.note}</p> : null}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </aside>
      </div>
      <TransitionDialog code={o.code} to={moving} onClose={() => setMoving(null)} />
    </div>
  );
}
