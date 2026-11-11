import { estimateOrder } from '@garmentgate/shared';
import { ArrowRight, Info } from 'lucide-react';
import Link from 'next/link';
import { getFormatter, getLocale, getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { formatMoney } from '@/lib/format';
import { CtaBand } from '../components/cta-band';
import { PageHero, Section, SectionHeading } from '../components/section';
import { publicPricing, stringList } from '../data';
import { Reveal } from '../reveal';
import { estimateTerms, STORIES, type StorySlug } from '../terms';

async function costs(slug: StorySlug) {
  const pricing = await publicPricing();
  const story = STORIES.find((s) => s.slug === slug);
  if (!pricing || !story) return null;
  return { input: story.input, estimate: estimateOrder(story.input, estimateTerms(pricing)) };
}

export async function StoriesPage() {
  const t = await getTranslations('marketing');
  const locale = await getLocale();
  const format = await getFormatter();
  return (
    <>
      <PageHero
        eyebrow={t('stories.hero.eyebrow')}
        title={t('stories.hero.title')}
        body={t('stories.hero.body')}
      />
      <Section>
        <ul className="grid gap-5 lg:grid-cols-3">
          {await Promise.all(
            STORIES.map(async ({ slug, input }, i) => {
              const c = await costs(slug);
              return (
                <li key={slug}>
                  <Reveal delay={i * 0.05} className="h-full">
                    <Link
                      href={`/stories/${slug}`}
                      className="bg-card hover:border-border-strong group flex h-full flex-col rounded-2xl border p-6 shadow-xs transition-[border-color,box-shadow] outline-none hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/40"
                    >
                      <Badge variant="neutral" className="self-start">
                        {t('stories.illustrative')}
                      </Badge>
                      <h2 className="mt-4 text-xl font-semibold tracking-[-0.015em]">
                        {t(`stories.items.${slug}.title`)}
                      </h2>
                      <p className="text-muted-foreground mt-2 flex-1 leading-relaxed">
                        {t(`stories.items.${slug}.summary`)}
                      </p>
                      <p className="text-muted-foreground mt-4 font-mono text-xs">
                        {t(`stories.items.${slug}.route`)}
                      </p>
                      <dl className="mt-4 grid grid-cols-2 gap-3 border-t pt-4 text-sm">
                        <div>
                          <dt className="text-muted-foreground">{t('stories.facts.quantity')}</dt>
                          <dd className="tabular font-medium">{format.number(input.quantity)}</dd>
                        </div>
                        {c ? (
                          <div>
                            <dt className="text-muted-foreground">{t('stories.facts.landed')}</dt>
                            <dd className="tabular font-medium">
                              {formatMoney(c.estimate.landedPerPiece, 'USD', locale)}
                            </dd>
                          </div>
                        ) : null}
                      </dl>
                      <span className="text-primary-ink mt-5 inline-flex items-center gap-1 text-sm font-medium">
                        {t('stories.read')}
                        <ArrowRight
                          className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            }),
          )}
        </ul>
      </Section>
      <CtaBand
        title={t('stories.cta.title')}
        body={t('stories.cta.body')}
        primary={{ href: '/tools/cost-calculator', label: t('nav.calculator') }}
        secondary={{ href: '/register?as=buyer', label: t('common.createBuyer') }}
      />
    </>
  );
}

export async function StoryPage({ slug }: { slug: StorySlug }) {
  const t = await getTranslations('marketing');
  const locale = await getLocale();
  const format = await getFormatter();
  const c = await costs(slug);
  const usd = (minor: number) => formatMoney(minor, 'USD', locale);
  const story = STORIES.find((s) => s.slug === slug);
  const input = story?.input;
  return (
    <>
      <PageHero
        eyebrow={t('stories.illustrative')}
        title={t(`stories.items.${slug}.title`)}
        body={t(`stories.items.${slug}.summary`)}
      />
      <Section>
        <p className="bg-surface text-muted-foreground flex gap-3 rounded-xl border px-4 py-3 text-sm">
          <Info className="text-primary-ink mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {t('stories.illustrativeNote')}
        </p>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <SectionHeading title={t('stories.journey')} />
            <ol className="relative mt-8 grid gap-4">
              {stringList.parse(t.raw(`stories.items.${slug}.steps`)).map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-sm">
                    {i + 1}
                  </span>
                  <p className="pt-1 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
          <aside className="grid content-start gap-4">
            <dl className="bg-card grid gap-3 rounded-2xl border p-6 text-sm shadow-xs">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{t('stories.facts.buyer')}</dt>
                <dd className="text-end font-medium">{t(`stories.items.${slug}.buyer`)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{t('stories.facts.route')}</dt>
                <dd className="text-end font-medium">{t(`stories.items.${slug}.route`)}</dd>
              </div>
              {input ? (
                <>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{t('stories.facts.quantity')}</dt>
                    <dd className="tabular font-medium">{format.number(input.quantity)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{t('stories.facts.price')}</dt>
                    <dd className="tabular font-medium">{usd(input.unitPriceMinor)}</dd>
                  </div>
                </>
              ) : null}
            </dl>
            {c ? (
              <div className="bg-brand-deep rounded-2xl p-6 text-white shadow-lg">
                <h2 className="font-mono text-xs tracking-[0.12em] text-white/60 uppercase">
                  {t('stories.costs')}
                </h2>
                <dl className="mt-4 grid gap-2 text-sm">
                  {(
                    [
                      [t('calculator.rows.goods'), c.estimate.goods],
                      [t('calculator.rows.samples'), c.estimate.sampleFees],
                      [t('calculator.rows.sampleCredit'), -c.estimate.sampleCredit],
                      [t('calculator.rows.inspections'), c.estimate.inspectionFees],
                      [t('calculator.rows.freight'), c.estimate.freight],
                      [t('calculator.rows.duty'), c.estimate.duty],
                    ] satisfies [string, number][]
                  )
                    .filter(([, v]) => v !== 0)
                    .map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4">
                        <dt className="text-white/70">{label}</dt>
                        <dd className="tabular">{usd(value)}</dd>
                      </div>
                    ))}
                  <div className="mt-2 flex justify-between gap-4 border-t border-white/10 pt-3 font-semibold">
                    <dt>{t('calculator.rows.landed')}</dt>
                    <dd className="tabular">{usd(c.estimate.landed)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 text-white/70">
                    <dt>{t('stories.facts.landed')}</dt>
                    <dd className="tabular">{usd(c.estimate.landedPerPiece)}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs text-white/55">
                  {t('stories.assumptions', {
                    samples: c.input.samples,
                    inspections: c.input.inspections,
                    freight: usd(c.input.freightMinor),
                    duty: format.number(c.input.dutyBps / 10_000, { style: 'percent' }),
                  })}{' '}
                  {c.input.plus ? t('stories.plusNote') : ''}{' '}
                  {c.input.firstOrder ? t('stories.firstNote') : ''}
                </p>
              </div>
            ) : null}
          </aside>
        </div>
      </Section>
      <CtaBand
        title={t('stories.cta.title')}
        body={t('stories.cta.body')}
        primary={{ href: '/tools/cost-calculator', label: t('nav.calculator') }}
        secondary={{ href: '/stories', label: t('nav.stories') }}
      />
    </>
  );
}
