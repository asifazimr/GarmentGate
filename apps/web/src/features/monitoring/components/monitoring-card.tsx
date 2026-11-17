'use client';

import { type BuyerMonitoring } from '@garmentgate/shared';
import { Cctv, ShieldCheck } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { ErrorState } from '@/components/patterns/error-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ApiError } from '@/lib/api';
import { useMoney } from '@/lib/use-money';
import { cn } from '@/lib/utils';
import { useAddMonitoring, useOrderMonitoring } from '../api';
import { VideoPlayer } from './video-player';

/**
 * Video monitoring on the buyer's order page (staff see the same on the admin order page):
 * the offer, then a reminder to pay the fee, then the order's cameras live and recorded.
 */
export function MonitoringCard({ code, staff = false }: { code: string; staff?: boolean }) {
  const t = useTranslations('monitoring.buyer');
  const money = useMoney();
  const query = useOrderMonitoring(code);
  const add = useAddMonitoring(code);

  if (query.isPending) return <Skeleton className="h-40 rounded-xl" aria-label={t('title')} />;
  if (query.isError)
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorState
            size="compact"
            onRetry={() => void query.refetch()}
            retrying={query.isFetching}
          />
        </CardContent>
      </Card>
    );
  const m = query.data;
  // Nothing to offer and nothing bought: stay out of the way.
  if (!m.added && (!m.available || staff)) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cctv className="size-4" aria-hidden="true" />
          {t('title')}
          {m.added ? (
            <Badge variant={m.paid ? 'success' : 'warning'} className="ms-auto">
              {m.paid ? t('active') : t('unpaid')}
            </Badge>
          ) : null}
        </CardTitle>
        <CardDescription>{m.added ? t('description') : t('offer')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!m.added ? (
          <Button
            disabled={add.isPending}
            onClick={() =>
              add.mutate(undefined, {
                onSuccess: () => toast.success(t('addedToast')),
                onError: (err) =>
                  toast.error(err instanceof ApiError ? err.message : t('addFailed')),
              })
            }
          >
            {m.feeMinor === null
              ? t('add')
              : t('addFor', { amount: money(m.feeMinor, m.currency) })}
          </Button>
        ) : !m.paid && !staff ? (
          <p className="text-sm">{t('payFirst')}</p>
        ) : !m.watchable ? (
          <p className="text-muted-foreground text-sm">{t('notWatchable')}</p>
        ) : m.cameras.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t('noCameras')}</p>
        ) : (
          <Cameras code={code} cameras={m.cameras} />
        )}
        <p className="text-muted-foreground flex gap-2 text-xs">
          <ShieldCheck className="text-primary-ink size-4 shrink-0" aria-hidden="true" />
          {t('privacy')}
        </p>
      </CardContent>
    </Card>
  );
}

function Cameras({ code, cameras }: { code: string; cameras: BuyerMonitoring['cameras'] }) {
  const t = useTranslations('monitoring');
  const format = useFormatter();
  const [selected, setSelected] = useState(0);
  const [recording, setRecording] = useState<string | null>(null);
  const camera = cameras[Math.min(selected, cameras.length - 1)];
  if (!camera) return null;
  const label = t('buyer.camera', { number: camera.number });
  const area = t(`area.${camera.area}`);
  const src = recording ?? camera.playbackUrl;
  return (
    <div className="space-y-3">
      {cameras.length > 1 ? (
        <div role="tablist" aria-label={t('buyer.cameras')} className="flex flex-wrap gap-2">
          {cameras.map((c, i) => (
            <button
              key={c.number}
              type="button"
              role="tab"
              aria-selected={i === selected}
              onClick={() => {
                setSelected(i);
                setRecording(null);
              }}
              className={cn(
                'inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/40 md:min-h-9',
                i === selected
                  ? 'border-primary/40 bg-primary-soft text-primary-ink'
                  : 'bg-card hover:border-border-strong',
              )}
            >
              <span
                className={cn('size-2 rounded-full', c.live ? 'bg-success' : 'bg-neutral-ink/40')}
                aria-hidden="true"
              />
              {t('buyer.camera', { number: c.number })} · {t(`area.${c.area}`)}
            </button>
          ))}
        </div>
      ) : null}
      {src && (camera.live || recording) ? (
        <VideoPlayer key={src} src={src} live={!recording} overlay={`${code} · ${label}`} />
      ) : (
        <div className="bg-surface text-muted-foreground flex aspect-video items-center justify-center rounded-lg border text-sm">
          {t('buyer.offline', { camera: `${label} · ${area}` })}
        </div>
      )}
      {camera.recordings.length > 0 ? (
        <div>
          <h3 className="text-sm font-medium">{t('buyer.recordings')}</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {recording ? (
              <li>
                <Button size="sm" variant="outline" onClick={() => setRecording(null)}>
                  {t('buyer.backToLive')}
                </Button>
              </li>
            ) : null}
            {camera.recordings.map((r) => (
              <li key={r.startedAt}>
                <Button
                  size="sm"
                  variant={recording === r.playbackUrl ? 'default' : 'outline'}
                  onClick={() => setRecording(r.playbackUrl)}
                >
                  {format.dateTime(new Date(r.startedAt), {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                  {r.durationSeconds
                    ? ` · ${t('buyer.minutes', { count: Math.max(1, Math.round(r.durationSeconds / 60)) })}`
                    : ''}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
