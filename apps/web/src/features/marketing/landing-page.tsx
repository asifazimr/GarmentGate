import {
  ArrowRight,
  BadgeCheck,
  Baby,
  ClipboardCheck,
  CloudSnow,
  Dumbbell,
  FileText,
  HardHat,
  Layers,
  Lock,
  PackageCheck,
  Scale,
  Scissors,
  Shirt,
  Wind,
} from 'lucide-react';
import Link from 'next/link';
import { cacheLife } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { HeroVisual } from './hero-visual';
import { Reveal } from './reveal';

const STEPS = [
  { key: 'request', Icon: FileText },
  { key: 'compare', Icon: Scale },
  { key: 'track', Icon: PackageCheck },
] as const;

const TRUST = [
  { key: 'verified', Icon: BadgeCheck },
  { key: 'escrow', Icon: Lock },
  { key: 'qc', Icon: ClipboardCheck },
] as const;

const STATS = ['countries', 'aql', 'escrow', 'certs'] as const;

const CATEGORIES = [
  { key: 'tees', Icon: Shirt },
  { key: 'hoodies', Icon: Layers },
  { key: 'denim', Icon: Scissors },
  { key: 'activewear', Icon: Dumbbell },
  { key: 'outerwear', Icon: CloudSnow },
  { key: 'knitwear', Icon: Wind },
  { key: 'kidswear', Icon: Baby },
  { key: 'workwear', Icon: HardHat },
] as const;

/** Woven-thread texture used on dark brand surfaces. */
const WEAVE =
  'repeating-linear-gradient(45deg, rgb(255 255 255 / 0.06) 0 1px, transparent 1px 12px), repeating-linear-gradient(-45deg, rgb(255 255 255 / 0.06) 0 1px, transparent 1px 12px)';

/** The page is prerendered; the copyright year is cached and refreshed daily. */
// eslint-disable-next-line @typescript-eslint/require-await -- 'use cache' functions must be async
async function currentYear(): Promise<number> {
  'use cache';
  cacheLife('days');
  return new Date().getFullYear();
}

export async function LandingPage() {
  const t = await getTranslations('marketing');
  const year = await currentYear();

  return (
    <div className="flex min-h-dvh flex-col">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header
        className="bg-background/80 sticky top-0 z-30 border-b border-transparent backdrop-blur-xl supports-backdrop-filter:border-border/60"
        style={{ top: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
          <Link
            href="/"
            aria-label="GarmentGate home"
            className="rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          >
            <Logo />
          </Link>
          <nav className="text-muted-foreground hidden items-center gap-6 text-sm font-medium md:flex">
            <a href="#how" className="hover:text-foreground transition-colors">
              {t('nav.how')}
            </a>
            <a href="#trust" className="hover:text-foreground transition-colors">
              {t('nav.trust')}
            </a>
            <a href="#categories" className="hover:text-foreground transition-colors">
              {t('nav.categories')}
            </a>
          </nav>
          <div className="ms-auto flex items-center gap-2">
            <Button
              variant="ghost"
              className="hidden sm:inline-flex"
              render={<Link href="/login" />}
            >
              {t('nav.signIn')}
            </Button>
            <Button render={<Link href="/register" />}>{t('nav.getStarted')}</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
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
          <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pt-28 lg:pb-32">
            <div>
              <Reveal above>
                <span className="bg-card text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-xs">
                  <span className="bg-primary size-1.5 rounded-full" aria-hidden="true" />
                  {t('hero.eyebrow')}
                </span>
              </Reveal>
              <Reveal above delay={0.05}>
                <h1 className="font-display mt-6 text-[2.75rem] leading-[1.02] tracking-[-0.02em] sm:text-display-xl lg:text-display-2xl">
                  {t('hero.titleStart')}{' '}
                  <em className="text-primary-ink">{t('hero.titleAccent')}</em> {t('hero.titleEnd')}
                </h1>
              </Reveal>
              <Reveal above delay={0.1}>
                <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed text-pretty">
                  {t('hero.body')}
                </p>
              </Reveal>
              <Reveal above delay={0.15} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" render={<Link href="/register?as=buyer" />}>
                  {t('hero.primary')}
                  <ArrowRight />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  render={<Link href="/register?as=manufacturer" />}
                >
                  {t('hero.secondary')}
                </Button>
              </Reveal>
              <Reveal above delay={0.2}>
                <p className="text-subtle-foreground mt-8 text-sm">{t('hero.proof')}</p>
              </Reveal>
            </div>
            <HeroVisual />
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────── */}
        <section id="how" className="bg-surface scroll-mt-16 border-y">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Reveal className="max-w-2xl">
              <p className="text-primary-ink text-sm font-medium">{t('how.eyebrow')}</p>
              <h2 className="font-display mt-3 text-display leading-tight sm:text-display-lg">
                {t('how.title')}
              </h2>
            </Reveal>
            <ol className="mt-14 grid gap-5 md:grid-cols-3">
              {STEPS.map(({ key, Icon }, i) => (
                <li key={key}>
                  <Reveal
                    delay={i * 0.08}
                    className="bg-card relative h-full rounded-2xl border p-6 shadow-xs sm:p-7"
                  >
                    <span
                      className="text-border-strong absolute top-5 end-6 font-mono text-sm"
                      aria-hidden="true"
                    >
                      0{i + 1}
                    </span>
                    <span className="bg-primary-soft text-primary-ink flex size-11 items-center justify-center rounded-xl">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-lg font-semibold tracking-[-0.015em]">
                      {t(`how.steps.${key}.title`)}
                    </h3>
                    <p className="text-muted-foreground mt-2 leading-relaxed">
                      {t(`how.steps.${key}.body`)}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Trust ────────────────────────────────────────────── */}
        <section id="trust" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <Reveal>
                <p className="text-primary-ink text-sm font-medium">{t('trust.eyebrow')}</p>
                <h2 className="font-display mt-3 text-display leading-tight sm:text-display-lg">
                  {t('trust.title')}
                </h2>
              </Reveal>
              <ul className="grid gap-4">
                {TRUST.map(({ key, Icon }, i) => (
                  <li key={key}>
                    <Reveal
                      delay={i * 0.08}
                      className="flex gap-5 rounded-2xl border bg-card p-6 shadow-xs"
                    >
                      <span className="bg-brand-deep text-brand-gold flex size-11 shrink-0 items-center justify-center rounded-xl">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold tracking-[-0.015em]">
                          {t(`trust.items.${key}.title`)}
                        </h3>
                        <p className="text-muted-foreground mt-1.5 leading-relaxed">
                          {t(`trust.items.${key}.body`)}
                        </p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
            <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border lg:grid-cols-4">
              {STATS.map((key) => (
                <div key={key} className="bg-card px-6 py-7">
                  <dt className="text-muted-foreground text-sm">{t(`trust.stats.${key}.label`)}</dt>
                  <dd className="font-display mt-2 text-4xl tracking-[-0.02em]">
                    {t(`trust.stats.${key}.value`)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Categories ───────────────────────────────────────── */}
        <section id="categories" className="bg-surface scroll-mt-16 border-y">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Reveal className="max-w-2xl">
              <p className="text-primary-ink text-sm font-medium">{t('categories.eyebrow')}</p>
              <h2 className="font-display mt-3 text-display leading-tight sm:text-display-lg">
                {t('categories.title')}
              </h2>
            </Reveal>
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {CATEGORIES.map(({ key, Icon }, i) => (
                <li key={key}>
                  <Reveal
                    delay={(i % 4) * 0.05}
                    className="group bg-card flex h-full flex-col justify-between gap-8 rounded-2xl border p-5 shadow-xs transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md"
                  >
                    <Icon className="text-primary-ink size-6" aria-hidden="true" />
                    <span className="font-medium">{t(`categories.items.${key}`)}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="px-4 py-20 sm:px-6 sm:py-28">
          <Reveal className="bg-brand-deep relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-6 py-16 text-center text-white sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ backgroundImage: WEAVE }}
            />
            <div
              aria-hidden="true"
              className="bg-primary absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            />
            <div className="relative">
              <h2 className="font-display text-display leading-tight sm:text-display-lg">
                {t('cta.title')}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">{t('cta.body')}</p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-[oklch(0.25_0.04_192)] hover:bg-white/90"
                  render={<Link href="/register" />}
                >
                  {t('cta.primary')}
                  <ArrowRight />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-white/5 text-white hover:bg-white/10 dark:bg-white/5"
                  render={<Link href="/login" />}
                >
                  {t('cta.secondary')}
                </Button>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="space-y-2">
            <Logo />
            <p className="text-muted-foreground max-w-sm text-sm">{t('footer.tagline')}</p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <Link
              href="/inspectors/apply"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {t('footer.inspectors')}
            </Link>
            <p className="text-subtle-foreground text-sm">{t('footer.rights', { year })}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
