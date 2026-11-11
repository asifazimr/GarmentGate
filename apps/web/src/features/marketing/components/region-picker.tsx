'use client';

import { type Currency, CurrencySchema, LOCALES } from '@garmentgate/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState, useTransition } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { meQueryKey, useMe } from '@/features/auth/api';
import { OptionSelect } from '@/features/logistics/components/form-bits';
import { apiSend } from '@/lib/api';
import { useDisplayCurrency } from '@/lib/use-money';
import { cn } from '@/lib/utils';
import { setVisitorCurrency } from '@/lib/visitor-currency';
import { chooseLocale } from '../locale-action';

/**
 * "EN · USD": language and display currency. Signed-in users save both to their preferences;
 * visitors keep them in cookies. Charges never change currency: other currencies are shown as
 * approximate conversions next to prices.
 */
export function RegionPicker({ locales, className }: { locales: string[]; className?: string }) {
  const t = useTranslations('marketing.region');
  const locale = useLocale();
  const router = useRouter();
  const queryClient = useQueryClient();
  const me = useMe();
  const currency = useDisplayCurrency() ?? 'USD';
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const save = useMutation({
    mutationFn: (dto: { locale?: string; displayCurrency?: Currency }) =>
      apiSend('/auth/me/preferences', { method: 'PATCH', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: meQueryKey }),
  });
  const currencyNames = useMemo(() => {
    const names = new Intl.DisplayNames([locale], { type: 'currency' });
    return CurrencySchema.options.map((c) => ({ value: c, label: `${c} · ${names.of(c) ?? c}` }));
  }, [locale]);

  const pickLocale = (next: string) =>
    start(async () => {
      if (me.data) await save.mutateAsync({ locale: next });
      else await chooseLocale(next);
      router.refresh();
    });
  const pickCurrency = (next: Currency) => {
    setVisitorCurrency(next);
    if (me.data) save.mutate({ displayCurrency: next });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={t('label')}
        className={cn(
          'text-muted-foreground hover:text-foreground data-popup-open:text-foreground inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/40 md:min-h-9',
          className,
        )}
      >
        <Globe className="size-4" aria-hidden="true" />
        <span className="tabular">
          {locale.toUpperCase()} · {currency}
        </span>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="w-80 gap-4 p-4">
        {locales.length > 1 ? (
          <fieldset className="grid gap-1">
            <legend className="text-muted-foreground mb-1 font-mono text-[0.6875rem] tracking-[0.12em] uppercase">
              {t('language')}
            </legend>
            {LOCALES.filter((l) => locales.includes(l.code)).map((l) => (
              <button
                key={l.code}
                type="button"
                disabled={pending}
                aria-pressed={l.code === locale}
                onClick={() => pickLocale(l.code)}
                className="hover:bg-surface flex min-h-10 items-center justify-between rounded-md px-2 text-start text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              >
                <span lang={l.code}>{l.name}</span>
                {l.code === locale ? (
                  <Check className="text-primary-ink size-4" aria-hidden="true" />
                ) : null}
              </button>
            ))}
          </fieldset>
        ) : null}
        <div className="grid gap-1.5">
          <label
            htmlFor="region-currency"
            className="text-muted-foreground font-mono text-[0.6875rem] tracking-[0.12em] uppercase"
          >
            {t('currency')}
          </label>
          <OptionSelect
            id="region-currency"
            value={currency}
            onChange={(v) => pickCurrency(CurrencySchema.parse(v))}
            options={currencyNames}
          />
          <p className="text-muted-foreground text-xs leading-relaxed">{t('hint')}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
