import { PlanTierSchema, type PublicPricing } from '@garmentgate/shared';
import { Check, Crown } from 'lucide-react';
import Link from 'next/link';
import { getFormatter, getLocale, getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatMoney } from '@/lib/format';
import { cn } from '@/lib/utils';
import { CtaBand } from '../components/cta-band';
import { Faq } from '../components/faq';
import { MoneyFlow } from '../components/money-flow';
import { PageHero, Section, SectionHeading } from '../components/section';
import { publicPricing } from '../data';
import { Reveal } from '../reveal';
import { Approx } from '../components/approx';

const FAQ = ['q1', 'q2', 'q3'] as const;

export async function PricingPage() {
  const t = await getTranslations('marketing');
  const pricing = await publicPricing();
  return (
    <>
      <PageHero
        eyebrow={t('pricing.hero.eyebrow')}
        title={t('pricing.hero.title')}
        body={t('pricing.hero.body')}
      />
      {pricing ? (
        <>
          <BuyerPricing pricing={pricing} />
          <FactoryPricing pricing={pricing} />
          <Section tone="deep">
            <SectionHeading
              inverted
              center
              title={t('pricing.schedule.title')}
              body={t('pricing.schedule.body')}
            />
            <MoneyFlow schedule={pricing.releaseSchedule} />
          </Section>
        </>
      ) : (
        <Section>
          <p className="bg-warning-soft text-warning-ink rounded-xl px-5 py-4">
            {t('pricing.unavailable')}
          </p>
        </Section>
      )}
      <Section>
        <SectionHeading title={t('common.faq')} className="mb-10" />
        <Faq items={FAQ.map((q) => ({ q: t(`pricing.faq.${q}.q`), a: t(`pricing.faq.${q}.a`) }))} />
      </Section>
      <CtaBand
        title={t('home.cta.title')}
        body={t('home.cta.body')}
        primary={{ href: '/register', label: t('home.cta.primary') }}
        secondary={{ href: '/contact', label: t('common.talkToUs') }}
      />
    </>
  );
}

async function BuyerPricing({ pricing }: { pricing: PublicPricing }) {
  const t = await getTranslations('marketing.pricing');
  const format = await getFormatter();
  const locale = await getLocale();
  const usd = (minor: number) => formatMoney(minor, 'USD', locale);
  const { fees, buyerPlus: plus } = pricing;
  const card = (title: string, value: string, body: string, note?: string, minor?: number) => (
    <div className="bg-card flex h-full flex-col rounded-2xl border p-6 shadow-xs">
      <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
      <p className="font-display tabular mt-3 text-3xl">{value}</p>
      {minor !== undefined ? <Approx minor={minor} /> : null}
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{body}</p>
      {note ? <p className="text-success-ink mt-auto pt-4 text-sm font-medium">{note}</p> : null}
    </div>
  );
  const plusPerks = [
    plus.freeInspections ? t('plus.perks.inspections') : null,
    plus.sampleDiscountBps >= 10_000
      ? t('plus.perks.freeSamples')
      : plus.sampleDiscountBps > 0
        ? t('plus.perks.samples', { percent: format.number(plus.sampleDiscountBps / 100) })
        : null,
    plus.priorityRfqs ? t('plus.perks.priority') : null,
    plus.merchandiser ? t('plus.perks.merchandiser') : null,
  ].filter((p): p is string => p !== null);
  return (
    <Section id="buyers">
      <SectionHeading title={t('buyers.title')} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          {card(t('buyers.orders.title'), t('buyers.orders.value'), t('buyers.orders.body'))}
        </Reveal>
        <Reveal delay={0.05}>
          {card(
            t('buyers.sample.title'),
            usd(fees.sampleFeeUsdMinor),
            t('buyers.sample.body'),
            fees.creditSampleFees ? t('buyers.sample.credit') : undefined,
            fees.sampleFeeUsdMinor,
          )}
        </Reveal>
        <Reveal delay={0.1}>
          {card(
            t('buyers.inspection.title'),
            usd(fees.inspectionFeeUsdMinor),
            t('buyers.inspection.body'),
            fees.firstInspectionFree ? t('buyers.inspection.firstFree') : undefined,
            fees.inspectionFeeUsdMinor,
          )}
        </Reveal>
        <Reveal delay={0.15}>
          {card(t('buyers.freight.title'), t('buyers.freight.value'), t('buyers.freight.body'))}
        </Reveal>
      </div>
      <p className="text-muted-foreground mt-4 text-sm">
        {t('buyers.claim', { days: fees.claimWindowDays })}
      </p>

      <div id="plus" className="mt-10 scroll-mt-24 lg:scroll-mt-36">
        <Reveal className="bg-brand-deep grid gap-8 overflow-hidden rounded-3xl p-8 text-white shadow-lg sm:p-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Crown className="text-brand-gold size-7" aria-hidden="true" />
            <h3 className="font-display mt-4 text-4xl">{t('plus.title')}</h3>
            <p className="mt-2 text-white/70">{t('plus.body')}</p>
            <p className="font-display tabular mt-6 text-4xl">
              {t('plus.month', { price: usd(plus.monthlyUsdMinor) })}
            </p>
            <Approx minor={plus.monthlyUsdMinor} className="text-white/60" />
            <p className="text-sm text-white/60">
              {t('plus.year', { price: usd(plus.yearlyUsdMinor) })}
            </p>
            <Button
              className="mt-6 bg-white text-[oklch(0.25_0.04_192)] hover:bg-white/90"
              render={<Link href="/register?as=buyer" />}
            >
              {t('plus.cta')}
            </Button>
          </div>
          <ul className="grid content-center gap-3">
            {plusPerks.map((p) => (
              <li
                key={p}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
              >
                <Check className="text-brand-gold mt-0.5 size-5 shrink-0" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

async function FactoryPricing({ pricing }: { pricing: PublicPricing }) {
  const t = await getTranslations('marketing.pricing.factories');
  const locale = await getLocale();
  const usd = (minor: number) => formatMoney(minor, 'USD', locale);
  const { tiers, rfqHeadStartHours } = pricing.factoryPlans;
  return (
    <Section tone="surface" id="factories">
      <SectionHeading title={t('title')} body={t('body')} />
      <ul className="mt-10 grid gap-4 lg:grid-cols-3">
        {PlanTierSchema.options.map((tier, i) => {
          const terms = tiers[tier];
          const featured = tier === 'PRO';
          const perks = [
            t('perks.matched'),
            terms.maxProducts === null
              ? t('perks.unlimited')
              : t('perks.products', { count: terms.maxProducts }),
            terms.searchBoost > 0 ? t('perks.boost', { level: terms.searchBoost }) : null,
            terms.markupDiscountBps > 0
              ? t('perks.markup', { points: terms.markupDiscountBps / 100 })
              : null,
            terms.rfqHeadStart && rfqHeadStartHours > 0
              ? t('perks.headStart', { hours: rfqHeadStartHours })
              : null,
          ].filter((p): p is string => p !== null);
          return (
            <li key={tier}>
              <Reveal
                delay={i * 0.06}
                className={cn(
                  'bg-card flex h-full flex-col rounded-2xl border p-6 shadow-xs sm:p-7',
                  featured && 'border-primary ring-primary/20 shadow-lg ring-2',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold">{t(`tiers.${tier}`)}</h3>
                  {featured ? <Badge variant="info">{t('popular')}</Badge> : null}
                </div>
                <p className="font-display tabular mt-4 text-4xl">
                  {usd(terms.monthlyUsdMinor)}
                  <span className="text-muted-foreground font-sans text-sm">
                    {' '}
                    {terms.monthlyUsdMinor > 0 ? t('month') : t('forever')}
                  </span>
                </p>
                {terms.monthlyUsdMinor > 0 ? <Approx minor={terms.monthlyUsdMinor} /> : null}
                <p className="text-muted-foreground h-5 text-sm">
                  {terms.yearlyUsdMinor > 0 ? t('year', { price: usd(terms.yearlyUsdMinor) }) : ''}
                </p>
                <ul className="mt-6 grid flex-1 content-start gap-2.5 text-sm">
                  {perks.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <Check
                        className="text-success-ink mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8"
                  variant={featured ? 'default' : 'outline'}
                  render={<Link href="/register?as=manufacturer" />}
                >
                  {tier === 'FREE' ? t('cta') : t('upgrade', { tier: t(`tiers.${tier}`) })}
                </Button>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
