import { CalendarCheck, CheckCircle2, FileSignature, PackagePlus, UserRound } from 'lucide-react';
import { getFormatter, getLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatMoney } from '@/lib/format';
import { LeadForm } from '../components/lead-form';
import { PageHero, Section, SectionHeading } from '../components/section';
import { stringList } from '../data';
import { Reveal } from '../reveal';

const HOW = [
  { key: 'agree', Icon: FileSignature },
  { key: 'calloff', Icon: PackagePlus },
  { key: 'produce', Icon: CheckCircle2 },
  { key: 'review', Icon: UserRound },
] as const;

export async function EnterprisePage() {
  const t = await getTranslations('marketing');
  const format = await getFormatter();
  const locale = await getLocale();
  return (
    <>
      <PageHero
        eyebrow={t('enterprise.hero.eyebrow')}
        title={t('enterprise.hero.title')}
        body={t('enterprise.hero.body')}
        actions={
          <Button size="lg" render={<a href="#plan" />}>
            {t('common.talkToUs')}
          </Button>
        }
        aside={
          <Reveal
            above
            delay={0.15}
            className="bg-card mx-auto w-full max-w-sm rounded-2xl border p-6 shadow-xl"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground text-sm">
                {t('enterprise.contract.title')}
              </span>
              <Badge variant="code">CTR-2026-00007</Badge>
            </div>
            <p className="mt-3 font-medium">{t('enterprise.contract.product')}</p>
            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="bg-surface rounded-lg p-3">
                <dt className="text-muted-foreground text-xs">{t('enterprise.contract.price')}</dt>
                <dd className="tabular mt-1 font-semibold">{formatMoney(840, 'USD', locale)}</dd>
              </div>
              <div className="bg-surface rounded-lg p-3">
                <dt className="text-muted-foreground text-xs">{t('enterprise.contract.volume')}</dt>
                <dd className="tabular mt-1 font-semibold">{format.number(40_000)}</dd>
              </div>
            </dl>
            <div className="mt-4">
              <div className="bg-muted h-2 overflow-hidden rounded-full">
                <div className="bg-primary h-full w-[35%] rounded-full" />
              </div>
              <p className="text-muted-foreground tabular mt-1.5 text-xs">
                {format.number(14_000)} {t('enterprise.contract.used')}
              </p>
            </div>
            <Button className="mt-5 w-full" tabIndex={-1} aria-hidden="true">
              <CalendarCheck />
              {t('enterprise.contract.callOff')}
            </Button>
          </Reveal>
        }
      />
      <Section>
        <SectionHeading title={t('enterprise.how.title')} />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOW.map(({ key, Icon }, i) => (
            <li key={key}>
              <Reveal delay={i * 0.05} className="bg-card h-full rounded-2xl border p-6 shadow-xs">
                <Icon className="text-primary-ink size-6" aria-hidden="true" />
                <h3 className="mt-5 font-semibold">{t(`enterprise.how.items.${key}.title`)}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t(`enterprise.how.items.${key}.body`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="deep">
        <SectionHeading inverted title={t('enterprise.fit.title')} />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {stringList.parse(t.raw('enterprise.fit.items')).map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
            >
              <CheckCircle2 className="text-brand-gold mt-0.5 size-5 shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Section>
      <Section id="plan">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeading title={t('enterprise.form.title')} body={t('enterprise.form.body')} />
          <Suspense fallback={<Skeleton className="h-[36rem] rounded-2xl" />}>
            <LeadForm kind="ENTERPRISE" />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
