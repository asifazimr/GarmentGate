import {
  ArrowRight,
  Ban,
  Cctv,
  DoorClosed,
  EyeOff,
  Factory,
  History,
  ShieldCheck,
  Signpost,
} from 'lucide-react';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { formatMoney } from '@/lib/format';
import { cn } from '@/lib/utils';
import { Approx } from '../components/approx';
import { CtaBand } from '../components/cta-band';
import { Faq } from '../components/faq';
import { LiveViewVisual } from '../components/live-view-visual';
import { PageHero, Section, SectionHeading } from '../components/section';
import { publicPricing, stringList } from '../data';
import { Reveal } from '../reveal';

const CHECKS = [
  { key: 'productionOnly', Icon: Factory },
  { key: 'noSignage', Icon: Signpost },
  { key: 'noFaces', Icon: EyeOff },
  { key: 'noOutsideView', Icon: DoorClosed },
] as const;
const FAQ = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;
const STAGES = ['sampling', 'production', 'inline', 'final', 'shipping'] as const;

/** Live Factory View: watch your order being made, on cameras GarmentGate has checked. */
export async function LiveViewPage() {
  const t = await getTranslations('marketing');
  const locale = await getLocale();
  const pricing = await publicPricing();
  const offer = pricing?.monitoring.enabled ? pricing.monitoring : null;
  return (
    <>
      <PageHero
        eyebrow={t('liveView.hero.eyebrow')}
        title={t('liveView.hero.title')}
        body={t('liveView.hero.body')}
        actions={
          <>
            <Button size="lg" render={<Link href="/register?as=buyer" />}>
              {t('liveView.cta')}
              <ArrowRight />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="#price" />}>
              {t('liveView.seePrice')}
            </Button>
          </>
        }
        aside={
          <Reveal above delay={0.15}>
            <LiveViewVisual />
          </Reveal>
        }
      />

      {/* ── Why ──────────────────────────────────────────────── */}
      <Section>
        <SectionHeading eyebrow={t('liveView.why.eyebrow')} title={t('liveView.why.title')} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {(
            [
              ['travel', Cctv],
              ['progress', History],
              ['trust', ShieldCheck],
            ] as const
          ).map(([key, Icon], i) => (
            <li key={key}>
              <Reveal
                delay={i * 0.05}
                className="bg-card flex h-full flex-col gap-3 rounded-2xl border p-6 shadow-xs"
              >
                <span className="bg-brand-deep text-brand-gold flex size-11 items-center justify-center rounded-xl">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-lg font-semibold">{t(`liveView.why.${key}.title`)}</span>
                <span className="text-muted-foreground leading-relaxed">
                  {t(`liveView.why.${key}.body`)}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── How it works ─────────────────────────────────────── */}
      <Section tone="surface">
        <SectionHeading title={t('liveView.how.title')} />
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {stringList.parse(t.raw('liveView.how.items')).map((step, i) => (
            <li key={step} className="bg-card flex gap-4 rounded-2xl border p-6 shadow-xs">
              <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-sm">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Every camera checked ─────────────────────────────── */}
      <Section tone="deep">
        <SectionHeading
          inverted
          eyebrow={t('liveView.checked.eyebrow')}
          title={t('liveView.checked.title')}
          body={t('liveView.checked.body')}
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {CHECKS.map(({ key, Icon }, i) => (
            <li key={key}>
              <Reveal
                delay={(i % 2) * 0.05}
                className="flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <Icon className="text-brand-gold mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <span>
                  <span className="block font-semibold">{t(`liveView.checked.${key}.title`)}</span>
                  <span className="mt-1 block text-white/70">
                    {t(`liveView.checked.${key}.body`)}
                  </span>
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex gap-2 text-sm text-white/70">
          <Ban className="text-brand-gold mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {t('liveView.checked.switchOff')}
        </p>
      </Section>

      {/* ── Where it fits ────────────────────────────────────── */}
      <Section>
        <SectionHeading title={t('liveView.fits.title')} body={t('liveView.fits.body')} />
        <ol className="mt-10 grid gap-3 sm:grid-cols-5">
          {STAGES.map((stage, i) => (
            <li
              key={stage}
              className={cn(
                'rounded-2xl border p-4',
                stage === 'production'
                  ? 'border-primary/40 bg-primary-soft text-primary-ink shadow-md'
                  : 'bg-card shadow-xs',
              )}
            >
              <span className="font-mono text-xs opacity-70">{String(i + 1).padStart(2, '0')}</span>
              <span className="mt-2 block font-semibold">{t(`liveView.fits.${stage}.title`)}</span>
              <span
                className={cn(
                  'mt-1 block text-sm',
                  stage === 'production' ? '' : 'text-muted-foreground',
                )}
              >
                {t(`liveView.fits.${stage}.body`)}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Price ────────────────────────────────────────────── */}
      <Section tone="surface" id="price">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <SectionHeading title={t('liveView.price.title')} body={t('liveView.price.body')} />
          <Reveal className="bg-card rounded-3xl border p-8 shadow-lg">
            {offer ? (
              <>
                <p className="text-muted-foreground text-sm">{t('liveView.price.label')}</p>
                <p className="font-display tabular mt-2 text-5xl">
                  {formatMoney(offer.feeUsdMinor, 'USD', locale)}
                </p>
                <Approx minor={offer.feeUsdMinor} />
              </>
            ) : (
              <p className="text-muted-foreground">{t('liveView.price.ask')}</p>
            )}
            <ul className="mt-6 grid gap-2 text-sm">
              {stringList.parse(t.raw('liveView.price.includes')).map((item) => (
                <li key={item} className="flex gap-2">
                  <ShieldCheck
                    className="text-success-ink mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Button className="mt-8 w-full" render={<Link href="/register?as=buyer" />}>
              {t('liveView.cta')}
            </Button>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading title={t('common.faq')} className="mb-10" />
        <Faq
          items={FAQ.map((q) => ({ q: t(`liveView.faq.${q}.q`), a: t(`liveView.faq.${q}.a`) }))}
        />
      </Section>

      <CtaBand
        title={t('liveView.band.title')}
        body={t('liveView.band.body')}
        primary={{ href: '/register?as=buyer', label: t('liveView.cta') }}
        secondary={{ href: '/pricing', label: t('common.seePricing') }}
      />
    </>
  );
}
