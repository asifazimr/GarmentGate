import { ArrowRight, BadgeCheck, ClipboardCheck, FileSignature, Lock, Truck } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { CtaBand } from '../components/cta-band';
import { JourneyStory } from '../components/journey';
import { JsonLd } from '../components/json-ld';
import { MoneyFlow } from '../components/money-flow';
import { OrderRoute } from '../components/order-route';
import { QcReport } from '../components/qc-report';
import { RoleSwitcher } from '../components/role-switcher';
import { Section, SectionHeading } from '../components/section';
import { StatsStrip } from '../components/stats-strip';
import { publicDirectory, publicPricing, publicStats, stringList } from '../data';
import { CategoryCard, topLevel } from '../components/directory-bits';
import { HeroVisual } from '../hero-visual';
import { Reveal } from '../reveal';

export const PROMISES = [
  { key: 'contract', Icon: FileSignature },
  { key: 'escrow', Icon: Lock },
  { key: 'quality', Icon: ClipboardCheck },
  { key: 'delivery', Icon: Truck },
] as const;

/** The home page: the promise, a way in for each audience, and the managed journey. */
export async function HomePage() {
  const t = await getTranslations('marketing');
  const [stats, pricing, directory] = await Promise.all([
    publicStats(),
    publicPricing(),
    publicDirectory(),
  ]);
  const groups = directory ? topLevel(directory.categories).slice(0, 6) : [];
  const steps = Object.fromEntries(
    (['buyer', 'manufacturer', 'inspector', 'logistics'] as const).map((k) => [
      k,
      stringList.parse(t.raw(`home.roles.${k}.steps`)),
    ]),
  );

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'GarmentGate',
          description: t('home.meta.description'),
        }}
      />
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div
          aria-hidden="true"
          className="bg-primary/25 pointer-events-none absolute -top-40 -end-32 size-[32rem] rounded-full blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 pt-14 pb-24 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pt-24 lg:pb-28">
          <div>
            <Reveal above>
              <span className="bg-card text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-xs">
                <span className="bg-primary size-1.5 rounded-full" aria-hidden="true" />
                {t('home.hero.eyebrow')}
              </span>
            </Reveal>
            <Reveal above delay={0.05}>
              <h1 className="font-display mt-6 text-[2.75rem] leading-[1.02] tracking-[-0.02em] text-balance sm:text-display-xl lg:text-display-2xl">
                {t('home.hero.titleStart')}{' '}
                <em className="text-primary-ink">{t('home.hero.titleAccent')}</em>{' '}
                {t('home.hero.titleEnd')}
              </h1>
            </Reveal>
            <Reveal above delay={0.1}>
              <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed text-pretty">
                {t('home.hero.body')}
              </p>
            </Reveal>
            <Reveal above delay={0.15} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" render={<Link href="/register?as=buyer" />}>
                {t('home.hero.primary')}
                <ArrowRight />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<Link href="/register?as=manufacturer" />}
              >
                {t('home.hero.secondary')}
              </Button>
            </Reveal>
            <OrderRoute />
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* ── Four promises ────────────────────────────────────── */}
      <section className="border-y">
        <ul className="mx-auto grid max-w-6xl divide-y px-4 sm:grid-cols-2 sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:divide-x rtl:lg:divide-x-reverse">
          {PROMISES.map(({ key, Icon }, i) => (
            <li key={key} className="py-8 sm:px-6 sm:first:ps-0">
              <Reveal delay={i * 0.06}>
                <Icon className="text-primary-ink size-5" aria-hidden="true" />
                <h2 className="mt-4 font-semibold tracking-[-0.01em]">
                  {t(`promises.${key}.title`)}
                </h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t(`promises.${key}.body`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* ── A way in for everyone ────────────────────────────── */}
      <Section tone="surface">
        <SectionHeading eyebrow={t('home.roles.eyebrow')} title={t('home.roles.title')} />
        <RoleSwitcher steps={steps} />
      </Section>

      {/* ── The managed journey ──────────────────────────────── */}
      <Section tone="deep" id="journey">
        <SectionHeading
          inverted
          eyebrow={t('home.journey.eyebrow')}
          title={t('home.journey.title')}
          body={t('home.journey.body')}
        />
        <JourneyStory />
      </Section>

      {/* ── Quality ──────────────────────────────────────────── */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={t('home.quality.eyebrow')}
              title={t('home.quality.title')}
              body={t('home.quality.body')}
            />
            <ul className="mt-8 grid gap-3">
              {stringList.parse(t.raw('home.quality.points')).map((p) => (
                <li key={p} className="flex gap-3">
                  <BadgeCheck
                    className="text-success-ink mt-0.5 size-5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <Reveal>
            <QcReport />
          </Reveal>
        </div>
      </Section>

      {/* ── Money ────────────────────────────────────────────── */}
      <Section tone="deep">
        <SectionHeading
          inverted
          center
          eyebrow={t('home.money.eyebrow')}
          title={t('home.money.title')}
          body={t('home.money.body')}
        />
        <MoneyFlow schedule={pricing?.releaseSchedule ?? null} />
      </Section>

      {/* ── The network ──────────────────────────────────────── */}
      {stats ? (
        <Section>
          <SectionHeading
            eyebrow={t('common.eyebrowLive')}
            title={t('home.stats.title')}
            body={t('home.stats.body')}
            className="mb-10"
          />
          <StatsStrip stats={stats} />
        </Section>
      ) : null}

      {groups.length > 0 ? (
        <Section tone="surface">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow={t('nav.categories')}
              title={t('directory.categories.hero.title')}
            />
            <Button variant="outline" render={<Link href="/categories" />}>
              {t('nav.categories')}
              <ArrowRight />
            </Button>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map(({ parent, children }) => (
              <li key={parent.slug}>
                <CategoryCard category={parent} subcategories={children} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CtaBand
        title={t('home.cta.title')}
        body={t('home.cta.body')}
        primary={{ href: '/register', label: t('home.cta.primary') }}
        secondary={{ href: '/contact', label: t('home.cta.secondary') }}
      />
    </>
  );
}
