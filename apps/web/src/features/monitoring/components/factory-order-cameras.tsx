'use client';

import type { FactoryOrderMonitoring } from '@garmentgate/shared';
import { Cctv } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ApiError } from '@/lib/api';
import { useAssignCameras, useFactoryOrderCameras } from '../api';

/** On the factory's order page, once the buyer added monitoring: which cameras show it. */
export function FactoryOrderCameras({ code }: { code: string }) {
  const t = useTranslations('monitoring');
  const query = useFactoryOrderCameras(code);
  const data = query.data;
  if (!data?.added) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cctv className="size-4" aria-hidden="true" />
          {t('factoryOrder.title')}
        </CardTitle>
        <CardDescription>{t('factoryOrder.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {data.cameras.length === 0 ? (
          <div className="space-y-3">
            <p className="text-sm">{t('factoryOrder.none')}</p>
            <Button variant="outline" render={<Link href="/manufacturer/cameras" />}>
              {t('factoryOrder.manage')}
            </Button>
          </div>
        ) : (
          <Picker
            key={data.cameras.map((c) => `${c.id}:${String(c.assigned)}`).join()}
            code={code}
            cameras={data.cameras}
          />
        )}
      </CardContent>
    </Card>
  );
}

function Picker({ code, cameras }: { code: string; cameras: FactoryOrderMonitoring['cameras'] }) {
  const t = useTranslations('monitoring');
  const assign = useAssignCameras(code);
  const [chosen, setChosen] = useState(
    () => new Set(cameras.filter((c) => c.assigned).map((c) => c.id)),
  );
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        assign.mutate(
          { cameraIds: cameras.filter((c) => chosen.has(c.id)).map((c) => c.id) },
          {
            onSuccess: () => toast.success(t('factoryOrder.saved')),
            onError: (err) =>
              toast.error(err instanceof ApiError ? err.message : t('factory.failed')),
          },
        );
      }}
    >
      <ul className="grid gap-1">
        {cameras.map((c) => (
          <li key={c.id}>
            <label className="flex min-h-11 items-center gap-2.5 text-sm">
              <Checkbox
                checked={chosen.has(c.id)}
                onCheckedChange={(on) =>
                  setChosen((s) => {
                    const next = new Set(s);
                    if (on) next.add(c.id);
                    else next.delete(c.id);
                    return next;
                  })
                }
              />
              {c.label}
              <span className="text-muted-foreground">· {t(`area.${c.area}`)}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="text-muted-foreground text-xs">{t('factoryOrder.hint')}</p>
      <Button type="submit" disabled={assign.isPending}>
        {t('factoryOrder.save')}
      </Button>
    </form>
  );
}
