'use client';

import {
  LOCKED_IN_APP,
  type NotificationCategory,
  type NotificationPreference,
} from '@garmentgate/shared';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { CATEGORY_ICONS } from '@/features/activity/notification-icons';
import { useNotificationPreferences, useSaveNotificationPreferences } from './api';
import { PreferencesCard } from './preferences';

/** Which categories reach the person in the app (bell, live) and by email. Saves on toggle. */
export function NotificationSettings({ categories }: { categories: NotificationCategory[] }) {
  const t = useTranslations('settings');
  const prefs = useNotificationPreferences();
  const save = useSaveNotificationPreferences();

  const toggle = (p: NotificationPreference, channel: 'inApp' | 'email', value: boolean) => {
    save.mutate(
      { preferences: [{ ...p, [channel]: value }] },
      {
        onSuccess: () => toast.success(t('saved')),
        onError: () => toast.error(t('saveFailed')),
      },
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <PreferencesCard />
      <Card>
        <CardHeader>
          <CardTitle>{t('notifications.title')}</CardTitle>
          <CardDescription>{t('notifications.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          {prefs.isPending ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} className="h-12 rounded-lg" />
              ))}
            </div>
          ) : prefs.isError ? (
            <ErrorState onRetry={() => void prefs.refetch()} retrying={prefs.isFetching} />
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b text-start text-xs">
                  <th scope="col" className="py-2 text-start font-medium">
                    {t('notifications.category')}
                  </th>
                  <th scope="col" className="w-20 py-2 text-center font-medium">
                    {t('notifications.inApp')}
                  </th>
                  <th scope="col" className="w-20 py-2 text-center font-medium">
                    {t('notifications.email')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {prefs.data.preferences
                  .filter((p) => categories.includes(p.category))
                  .map((p) => {
                    const Icon = CATEGORY_ICONS[p.category];
                    const locked = LOCKED_IN_APP.includes(p.category);
                    const label = t(`notifications.categories.${p.category}.title`);
                    return (
                      <tr key={p.category}>
                        <th scope="row" className="py-3 pe-3 text-start font-normal">
                          <span className="flex items-start gap-3">
                            <Icon
                              className="text-muted-foreground mt-0.5 size-4 shrink-0"
                              aria-hidden="true"
                            />
                            <span>
                              <span className="block font-medium">{label}</span>
                              <span className="text-muted-foreground block text-xs">
                                {t(`notifications.categories.${p.category}.body`)}
                              </span>
                            </span>
                          </span>
                        </th>
                        <td className="py-3 text-center">
                          <span className="inline-flex size-11 items-center justify-center md:size-8">
                            <Checkbox
                              checked={p.inApp}
                              disabled={locked || save.isPending}
                              aria-label={t('notifications.inAppFor', { category: label })}
                              onCheckedChange={(v) => toggle(p, 'inApp', v)}
                            />
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          <span className="inline-flex size-11 items-center justify-center md:size-8">
                            <Checkbox
                              checked={p.email}
                              disabled={save.isPending}
                              aria-label={t('notifications.emailFor', { category: label })}
                              onCheckedChange={(v) => toggle(p, 'email', v)}
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
          <p className="text-muted-foreground mt-4 text-xs">{t('notifications.footnote')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
