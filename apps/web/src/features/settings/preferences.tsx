'use client';

import {
  AuthResponseSchema,
  availableLocales,
  CurrencySchema,
  LOCALES,
  type Locale,
  LocaleSchema,
  type UpdatePreferencesDto,
} from '@garmentgate/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ErrorState } from '@/components/patterns/error-state';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { meQueryKey, useMe } from '@/features/auth/api';
import { apiJson } from '@/lib/api';
import { useIsClient } from '@/lib/client-hooks';

const LOCALE_OPTIONS = LOCALES.filter((l) =>
  availableLocales(process.env.NODE_ENV !== 'production').includes(l.code),
);
const NONE = 'none';

/** Interface language and the currency amounts are also shown in. Saves on change. */
export function PreferencesCard() {
  const t = useTranslations('settings.preferences');
  const queryClient = useQueryClient();
  const me = useMe();
  // The user may already be cached from sign-in; the prerendered HTML never has it.
  const user = useIsClient() ? me.data : undefined;
  const save = useMutation({
    mutationFn: (dto: UpdatePreferencesDto) =>
      apiJson('/auth/me/preferences', AuthResponseSchema, { method: 'PATCH', body: dto }),
    onSuccess: ({ user }) => queryClient.setQueryData(meQueryKey, user),
  });

  const setLocale = (locale: Locale) =>
    save.mutate(
      { locale },
      {
        // The API set the language cookie; reload so every server-rendered page follows it.
        onSuccess: () => window.location.reload(),
        onError: () => toast.error(t('failed')),
      },
    );
  const setCurrency = (value: string) => {
    const parsed = CurrencySchema.safeParse(value);
    save.mutate(
      { displayCurrency: parsed.success ? parsed.data : null },
      {
        onSuccess: () => toast.success(t('saved')),
        onError: () => toast.error(t('failed')),
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {me.isError ? (
          <ErrorState size="compact" onRetry={() => void me.refetch()} retrying={me.isFetching} />
        ) : !user ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-16 rounded-lg" />
            <Skeleton className="h-16 rounded-lg" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="pref-locale">{t('language')}</FieldLabel>
              <Select
                items={LOCALE_OPTIONS.map((l) => ({ value: l.code, label: l.name }))}
                value={user.locale}
                disabled={save.isPending}
                onValueChange={(v) => {
                  const parsed = LocaleSchema.safeParse(v);
                  if (parsed.success && parsed.data !== user.locale) setLocale(parsed.data);
                }}
              >
                <SelectTrigger id="pref-locale" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LOCALE_OPTIONS.map((l) => (
                    <SelectItem key={l.code} value={l.code} lang={l.code} dir={l.dir}>
                      <span className="flex items-center gap-2">
                        {l.name}
                        {!l.enabled ? <Badge variant="neutral">{t('preview')}</Badge> : null}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldDescription>{t('languageHint')}</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="pref-currency">{t('currency')}</FieldLabel>
              <Select
                items={[
                  { value: NONE, label: t('currencyNone') },
                  ...CurrencySchema.options.map((c) => ({ value: c, label: c })),
                ]}
                value={user.displayCurrency ?? NONE}
                disabled={save.isPending}
                onValueChange={(v) => {
                  if (typeof v === 'string') setCurrency(v);
                }}
              >
                <SelectTrigger id="pref-currency" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>{t('currencyNone')}</SelectItem>
                  {CurrencySchema.options.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldDescription>{t('currencyHint')}</FieldDescription>
            </Field>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
