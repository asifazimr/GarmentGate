import { ArrowRight, ClipboardCheck, Crown, Megaphone, Shirt, UserRound } from 'lucide-react';
import Link from 'next/link';
import { getFormatter, getLocale, getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { formatMoney } from '@/lib/format';
import { CtaBand } from '../components/cta-band';
import { Faq } from '../components/faq';
import { PageHero, Section, SectionHeading } from '../components/section';
import { publicPricing, stringList } from '../data';
import { Reveal } from '../reveal';
import { Approx } from '../components/approx';

const FAQ = ['q1', 'q2', 'q3'] as const;

export async function BuyerPlusPage() {
  const t = await getTranslations('marketing');
  const format = await getFormatter();
  const locale = await getLocale();
  const pricing = await publicPricing();
  const plus = pricing?.buyerPlus;
  const usd = (minor: number) => formatMoney(minor, 'USD', locale);
  const perks: { key: string; Icon: typeof Crown; title: string; body: string }[] = [];
  if (plus?.freeInspections)
    perks.push({
      key: 'inspections',
      Icon: ClipboardCheck,
      title: t('plus.perks.inspections.title'),
      body: t('plus.perks.inspections.body'),
    });
  if (plus && plus.sampleDiscountBps >= 10_000)
    perks.push({
      key: 'samples',
      Icon: Shirt,
      title: t('plus.perks.freeSamples.title'),
      body: t('plus.perks.freeSamples.body'),
    });
  else if (plus && plus.sampleDiscountBps > 0)
    perks.push({
      key: 'samples',
      Icon: Shirt,
      title: t('plus.perks.samples.title', {
        percent: format.number(plus.sampleDiscountBps / 100),
      }),
      body: t('plus.perks.samples.body'),
    });
  if (plus?.priorityRfqs)
    perks.push({
      key: 'priority',
      Icon: Megaphone,
      title: t('plus.perks.priority.title'),
      body: t('plus.perks.priority.body'),
    });
  if (plus?.merchandiser)
    perks.push({
      key: 'merchandiser',
      Icon: UserRound,
      title: t('plus.perks.merchandiser.title'),
      body: t('plus.perks.merchandiser.body'),
    });
  return (
    <>
      <PageHero
        eyebrow={t('plus.hero.eyebrow')}
        title={t('plus.hero.title')}
        body={t('plus.hero.body')}
        actions={
          <Button size="lg" render={<Link href="/register?as=buyer" />}>
            {t('plus.join.cta')}
            <ArrowRight />
          </Button>
        }
        aside={
          plus ? (
            <Reveal
              above
              delay={0.15}
              className="bg-brand-deep mx-auto w-full max-w-sm rounded-3xl p-8 text-white shadow-xl"
            >
              <Crown className="text-brand-gold size-8" aria-hidden="true" />
              <p className="font-display tabular mt-6 text-5xl">
                {t('plus.price', { price: usd(plus.monthlyUsdMinor) })}
              </p>
              <Approx minor={plus.monthlyUsdMinor} className="mt-1 text-white/60" />
              <p className="mt-2 text-white/60">
                {t('plus.yearly', { price: usd(plus.yearlyUsdMinor) })}
              </p>
            </Reveal>
          ) : undefined
        }
      />
      {perks.length > 0 ? (
        <Section>
          <SectionHeading title={t('plus.perksTitle')} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {perks.map(({ key, Icon, title, body }, i) => (
              <li key={key}>
                <Reveal
                  delay={(i % 2) * 0.05}
                  className="bg-card flex h-full gap-5 rounded-2xl border p-6 shadow-xs"
                >
                  <span className="bg-brand-deep text-brand-gold flex size-11 shrink-0 items-center justify-center rounded-xl">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold">{title}</span>
                    <span className="text-muted-foreground mt-1 block leading-relaxed">{body}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
      <Section tone="surface">
        <SectionHeading title={t('plus.join.title')} />
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {stringList.parse(t.raw('plus.join.items')).map((step, i) => (
            <li key={step} className="bg-card flex gap-4 rounded-2xl border p-6 shadow-xs">
              <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-sm">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </Section>
      <Section>
        <SectionHeading title={t('common.faq')} className="mb-10" />
        <Faq items={FAQ.map((q) => ({ q: t(`plus.faq.${q}.q`), a: t(`plus.faq.${q}.a`) }))} />
      </Section>
      <CtaBand
        title={t('buyers.cta.title')}
        body={t('buyers.cta.body')}
        primary={{ href: '/register?as=buyer', label: t('plus.join.cta') }}
        secondary={{ href: '/pricing', label: t('common.seePricing') }}
      />
    </>
  );
}
