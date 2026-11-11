import {
  ArrowRight,
  BadgeCheck,
  CalendarRange,
  CheckCircle2,
  FileCheck2,
  Hammer,
  Handshake,
  Inbox,
  Landmark,
  UserPlus,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { CtaBand } from '../components/cta-band';
import { Faq } from '../components/faq';
import { MoneyFlow } from '../components/money-flow';
import { PageHero, Section, SectionHeading } from '../components/section';
import { publicPricing, stringList } from '../data';
import { Reveal } from '../reveal';

const WHY = [
  { key: 'orders', Icon: Inbox },
  { key: 'paid', Icon: Wallet },
  { key: 'noChasing', Icon: Handshake },
  { key: 'capacity', Icon: CalendarRange },
] as const;
const STEPS = [
  { key: 'apply', Icon: UserPlus },
  { key: 'verify', Icon: FileCheck2 },
  { key: 'profile', Icon: BadgeCheck },
  { key: 'quote', Icon: Hammer },
  { key: 'paid', Icon: Landmark },
] as const;
const FAQ = ['q1', 'q2', 'q3', 'q4'] as const;

export async function ManufacturersPage() {
  const t = await getTranslations('marketing');
  const pricing = await publicPricing();
  return (
    <>
      <PageHero
        eyebrow={t('manufacturers.hero.eyebrow')}
        title={t('manufacturers.hero.title')}
        body={t('manufacturers.hero.body')}
        actions={
          <>
            <Button size="lg" render={<Link href="/register?as=manufacturer" />}>
              {t('common.createFactory')}
              <ArrowRight />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/pricing#factories" />}>
              {t('manufacturers.plans.cta')}
            </Button>
          </>
        }
      />

      <Section>
        <SectionHeading title={t('manufacturers.why.title')} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map(({ key, Icon }, i) => (
            <li key={key}>
              <Reveal delay={i * 0.05} className="bg-card h-full rounded-2xl border p-6 shadow-xs">
                <Icon className="text-primary-ink size-6" aria-hidden="true" />
                <h3 className="mt-5 font-semibold">{t(`manufacturers.why.items.${key}.title`)}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t(`manufacturers.why.items.${key}.body`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHeading title={t('manufacturers.steps.title')} />
        <ol className="relative mt-12 grid gap-6 lg:grid-cols-5">
          <span
            aria-hidden="true"
            className="bg-border absolute top-5 inset-x-5 hidden h-px lg:block"
          />
          {STEPS.map(({ key, Icon }, i) => (
            <li key={key} className="relative">
              <Reveal delay={i * 0.06}>
                <span className="bg-primary text-primary-foreground relative flex size-10 items-center justify-center rounded-full shadow-md">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold">
                  {t(`manufacturers.steps.items.${key}.title`)}
                </h3>
                <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {t(`manufacturers.steps.items.${key}.body`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="deep">
        <SectionHeading
          inverted
          center
          title={t('manufacturers.payouts.title')}
          body={t('manufacturers.payouts.body')}
        />
        <MoneyFlow schedule={pricing?.releaseSchedule ?? null} />
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading title={t('manufacturers.expect.title')} />
            <ul className="mt-8 grid gap-3">
              {stringList.parse(t.raw('manufacturers.expect.items')).map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2
                    className="text-success-ink mt-0.5 size-5 shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="bg-brand-deep self-start rounded-2xl p-8 text-white shadow-lg">
            <h3 className="font-display text-3xl">{t('manufacturers.plans.title')}</h3>
            <p className="mt-3 leading-relaxed text-white/70">{t('manufacturers.plans.body')}</p>
            <Button
              className="mt-6 bg-white text-[oklch(0.25_0.04_192)] hover:bg-white/90"
              render={<Link href="/pricing#factories" />}
            >
              {t('manufacturers.plans.cta')}
              <ArrowRight />
            </Button>
          </Reveal>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading title={t('common.faq')} className="mb-10" />
        <Faq
          items={FAQ.map((q) => ({
            q: t(`manufacturers.faq.${q}.q`),
            a: t(`manufacturers.faq.${q}.a`),
          }))}
        />
      </Section>

      <CtaBand
        title={t('manufacturers.cta.title')}
        body={t('manufacturers.cta.body')}
        primary={{ href: '/register?as=manufacturer', label: t('common.createFactory') }}
        secondary={{ href: '/contact?topic=MANUFACTURER', label: t('common.talkToUs') }}
      />
    </>
  );
}
