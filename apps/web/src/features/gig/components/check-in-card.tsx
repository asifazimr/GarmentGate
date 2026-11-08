'use client';

import type { InspectorJobDetail } from '@garmentgate/shared';
import { LocateFixed } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ApiError } from '@/lib/api';
import { useCheckIn } from '../api';

/** GPS check-in at the factory: the report unlocks once the inspector is on site. */
export function CheckInCard({ job }: { job: InspectorJobDetail }) {
  const t = useTranslations('gig.checkIn');
  const format = useFormatter();
  const checkIn = useCheckIn(job.id);
  const [locating, setLocating] = useState(false);

  if (!job.checkIn.required) return null;

  const locate = () => {
    if (!('geolocation' in navigator)) {
      toast.error(t('unsupported'));
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        checkIn
          .mutateAsync({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
          .then((r) => toast.success(t('done', { m: r.distanceM })))
          .catch((err: unknown) => toast.error(err instanceof ApiError ? err.message : t('failed')))
          .finally(() => setLocating(false));
      },
      () => {
        setLocating(false);
        toast.error(t('denied'));
      },
      { enableHighAccuracy: true, timeout: 20_000, maximumAge: 0 },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <LocateFixed className="size-4" aria-hidden="true" />
          {t('title')}
          {job.checkIn.at ? <Badge variant="success">{t('checkedIn')}</Badge> : null}
        </CardTitle>
        <CardDescription>
          {job.checkIn.at
            ? t('at', {
                date: format.dateTime(new Date(job.checkIn.at), {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }),
                m: job.checkIn.distanceM ?? 0,
              })
            : t('description')}
        </CardDescription>
      </CardHeader>
      {job.checkIn.at || job.result !== 'PENDING' ? null : (
        <CardContent>
          <Button onClick={locate} disabled={locating || checkIn.isPending}>
            {locating || checkIn.isPending ? t('locating') : t('action')}
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
