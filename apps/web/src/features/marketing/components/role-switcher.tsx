'use client';

import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AUDIENCES } from './links';

const MORE: Record<(typeof AUDIENCES)[number]['start'], string> = {
  buyer: '/buyers',
  manufacturer: '/manufacturers',
  inspector: '/inspectors',
  logistics: '/logistics',
};

/** "Find your way in": one tab per audience with what they get and the first three steps. */
export function RoleSwitcher({ steps }: { steps: Record<string, string[]> }) {
  const t = useTranslations('marketing.home.roles');
  return (
    <Tabs defaultValue="buyer" className="mt-12">
      <TabsList className="grid w-full grid-cols-2 gap-1 overflow-visible group-data-horizontal/tabs:h-auto sm:inline-flex sm:w-auto md:group-data-horizontal/tabs:h-auto">
        {AUDIENCES.map(({ start, Icon }) => (
          <TabsTrigger key={start} value={start} className="min-h-11 gap-2 px-4">
            <Icon className="size-4" aria-hidden="true" />
            {t(`tabs.${start}`)}
          </TabsTrigger>
        ))}
      </TabsList>
      {AUDIENCES.map(({ start, signup }) => (
        <TabsContent key={start} value={start} className="pt-6">
          <div className="bg-card grid gap-8 rounded-2xl border p-6 shadow-xs sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-[-0.02em]">{t(`${start}.title`)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(`${start}.body`)}</p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button render={<Link href={signup} />}>
                  {t(`${start}.cta`)}
                  <ArrowRight />
                </Button>
                <Button variant="ghost" render={<Link href={MORE[start]} />}>
                  {t(`${start}.more`)}
                </Button>
              </div>
            </div>
            <ol className="grid gap-3">
              {(steps[start] ?? []).map((step, i) => (
                <li
                  key={step}
                  className="bg-surface flex items-start gap-4 rounded-xl border px-4 py-3.5"
                >
                  <span className="bg-primary text-primary-foreground flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                  {i === 2 ? (
                    <Check
                      className="text-success-ink ms-auto mt-1 size-4 shrink-0"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
