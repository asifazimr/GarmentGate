import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  ClipboardCheck,
  Crown,
  FileSignature,
  Lock,
  MapPinned,
  PackageSearch,
  Rocket,
  Scale,
  Search,
  Send,
  Shield,
  Shirt,
  Store,
} from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { CtaBand } from '../components/cta-band';
import { Faq } from '../components/faq';
import { PageHero, Section, SectionHeading } from '../components/section';
import { StatsStrip } from '../components/stats-strip';
import { publicStats, stringList } from '../data';
import { HeroVisual } from '../hero-visual';
import { Reveal } from '../reveal';

const WHO = [
  { key: 'brands', Icon: Shirt },
  { key: 'retailers', Icon: Store },
  { key: 'startups', Icon: Rocket },
  { key: 'corporate', Icon: Building2 },
] as const;
const PATH = [
  { key: 'discover', Icon: Search },
  { key: 'request', Icon: Send },
  { key: 'compare', Icon: Scale },
  { key: 'sample', Icon: Shirt },
  { key: 'order', Icon: Lock },
  { key: 'track', Icon: PackageSearch },
] as const;
const PROTECT = [
  { key: 'escrow', Icon: Lock },
  { key: 'qc', Icon: ClipboardCheck },
  { key: 'claims', Icon: Shield },
  { key: 'insurance', Icon: BadgeCheck },
] as const;
const MORE = [
  { key: 'plus', Icon: Crown, href: '/buyers/plus' },
  { key: 'contracts', Icon: FileSignature, href: '/buyers/enterprise' },
  { key: 'capacity', Icon: CalendarClock, href: '/buyers/capacity' },
] as const;
const FAQ = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

export async function BuyersPage() {
  const t = await getTranslations('marketing');
  const stats = await publicStats();
  return (
    <>
      <PageHero
        eyebrow={t('buyers.hero.eyebrow')}
        title={t('buyers.hero.title')}
        body={t('buyers.hero.body')}
        actions={
          <>
            <Button size="lg" render={<Link href="/register?as=buyer" />}>
              {t('common.createBuyer')}
              <ArrowRight />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/contact?topic=SALES" />}>
              {t('common.talkToUs')}
            </Button>
          </>
        }
        aside={<HeroVisual />}
      />

      <Section>
        <SectionHeading title={t('buyers.who.title')} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHO.map(({ key, Icon }, i) => (
            <li key={key}>
              <Reveal delay={i * 0.05} className="bg-card h-full rounded-2xl border p-6 shadow-xs">
                <Icon className="text-primary-ink size-6" aria-hidden="true" />
                <h3 className="mt-5 font-semibold">{t(`buyers.who.items.${key}.title`)}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t(`buyers.who.items.${key}.body`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeading title={t('buyers.path.title')} />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PATH.map(({ key, Icon }, i) => (
            <li key={key}>
              <Reveal
                delay={(i % 3) * 0.05}
                className="bg-card relative h-full rounded-2xl border p-6 shadow-xs"
              >
                <span
                  className="text-border-strong absolute top-5 end-6 font-mono text-sm"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="bg-primary-soft text-primary-ink flex size-10 items-center justify-center rounded-xl">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-semibold">{t(`buyers.path.steps.${key}.title`)}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t(`buyers.path.steps.${key}.body`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="deep">
        <SectionHeading inverted title={t('buyers.protect.title')} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROTECT.map(({ key, Icon }, i) => (
            <li key={key}>
              <Reveal
                delay={i * 0.05}
                className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <Icon className="text-brand-gold size-6" aria-hidden="true" />
                <h3 className="mt-5 font-semibold">{t(`buyers.protect.items.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {t(`buyers.protect.items.${key}.body`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
        {stats ? (
          <div className="mt-12">
            <StatsStrip stats={stats} inverted />
          </div>
        ) : null}
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading title={t('buyers.shipping.title')} body={t('buyers.shipping.body')} />
          <Reveal>
            <ul className="grid gap-3">
              {stringList.parse(t.raw('buyers.shipping.points')).map((p) => (
                <li key={p} className="bg-card flex gap-4 rounded-xl border p-4 shadow-xs">
                  <MapPinned
                    className="text-primary-ink mt-0.5 size-5 shrink-0"
                    aria-hidden="true"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading title={t('buyers.more.title')} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {MORE.map(({ key, Icon, href }, i) => (
            <li key={key}>
              <Reveal delay={i * 0.05} className="h-full">
                <Link
                  href={href}
                  className="bg-card hover:border-border-strong group flex h-full flex-col rounded-2xl border p-6 shadow-xs transition-[border-color,box-shadow] outline-none hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/40"
                >
                  <Icon className="text-primary-ink size-6" aria-hidden="true" />
                  <h3 className="mt-5 font-semibold">{t(`buyers.more.${key}.title`)}</h3>
                  <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                    {t(`buyers.more.${key}.body`)}
                  </p>
                  <span className="text-primary-ink mt-4 inline-flex items-center gap-1 text-sm font-medium">
                    {t('common.learnMore')}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading title={t('common.faq')} className="mb-10" />
        <Faq items={FAQ.map((q) => ({ q: t(`buyers.faq.${q}.q`), a: t(`buyers.faq.${q}.a`) }))} />
      </Section>

      <CtaBand
        title={t('buyers.cta.title')}
        body={t('buyers.cta.body')}
        primary={{ href: '/register?as=buyer', label: t('common.createBuyer') }}
        secondary={{ href: '/contact?topic=SALES', label: t('common.talkToUs') }}
      />
    </>
  );
}
