import {
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  ClipboardList,
  LocateFixed,
  MapPin,
  RefreshCw,
  Repeat,
  Star,
  UserPlus,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatMoney } from '@/lib/format';
import { CtaBand } from '../components/cta-band';
import { Faq } from '../components/faq';
import { PageHero, Section, SectionHeading } from '../components/section';
import { publicPricing, stringList } from '../data';
import { Reveal } from '../reveal';
import { Approx } from '../components/approx';

const HOW = [
  { key: 'apply', Icon: UserPlus },
  { key: 'certify', Icon: BadgeCheck },
  { key: 'claim', Icon: ClipboardList },
  { key: 'checkin', Icon: LocateFixed },
  { key: 'report', Icon: Camera },
  { key: 'paid', Icon: Wallet },
] as const;
const FAIR = [
  { key: 'rotation', Icon: Repeat },
  { key: 'ratings', Icon: Star },
  { key: 'audits', Icon: RefreshCw },
] as const;
const FAQ = ['q1', 'q2', 'q3', 'q4'] as const;

export async function InspectorsPage() {
  const t = await getTranslations('marketing');
  const locale = await getLocale();
  const pricing = await publicPricing();
  const rate = pricing ? formatMoney(pricing.inspectorDayRateUsdMinor, 'USD', locale) : null;
  return (
    <>
      <PageHero
        eyebrow={t('inspectors.hero.eyebrow')}
        title={t('inspectors.hero.title')}
        body={t('inspectors.hero.body')}
        actions={
          <Button size="lg" render={<Link href="/inspectors/apply" />}>
            {t('common.applyInspector')}
            <ArrowRight />
          </Button>
        }
        aside={
          <Reveal above delay={0.15} className="mx-auto grid w-full max-w-sm gap-4">
            {rate ? (
              <div className="bg-brand-deep rounded-2xl p-6 text-white shadow-xl">
                <p className="font-mono text-xs tracking-[0.12em] text-white/60 uppercase">
                  {t('inspectors.rate.label')}
                </p>
                <p className="font-display tabular mt-2 text-5xl">{rate}</p>
                {pricing ? (
                  <Approx minor={pricing.inspectorDayRateUsdMinor} className="text-white/60" />
                ) : null}
                <p className="mt-1 text-sm text-white/60">{t('inspectors.rate.note')}</p>
              </div>
            ) : null}
            <div className="bg-card rounded-2xl border p-5 shadow-lg">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="code">ORD-2026-00042</Badge>
                {rate ? <Badge variant="success">{rate}</Badge> : null}
              </div>
              <p className="mt-3 font-medium">{t('inspectors.task.title')}</p>
              <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                <MapPin className="size-3.5" aria-hidden="true" />
                Ashulia · {t('inspectors.task.distance', { km: 8 })} · {t('inspectors.task.pieces')}
              </p>
              <Button className="mt-4 w-full" tabIndex={-1} aria-hidden="true">
                {t('inspectors.task.claim')}
              </Button>
            </div>
          </Reveal>
        }
      />

      <Section id="how">
        <SectionHeading title={t('inspectors.how.title')} />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOW.map(({ key, Icon }, i) => (
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
                <h3 className="mt-5 font-semibold">{t(`inspectors.how.items.${key}.title`)}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t(`inspectors.how.items.${key}.body`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="deep">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div id="need" className="scroll-mt-24 lg:scroll-mt-36">
            <SectionHeading inverted title={t('inspectors.need.title')} />
            <ul className="mt-8 grid gap-3">
              {stringList.parse(t.raw('inspectors.need.items')).map((item) => (
                <li key={item} className="flex gap-3 text-white/85">
                  <CheckCircle2
                    className="text-brand-gold mt-0.5 size-5 shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div id="fair" className="scroll-mt-24 lg:scroll-mt-36">
            <SectionHeading inverted title={t('inspectors.fair.title')} />
            <ul className="mt-8 grid gap-3">
              {FAIR.map(({ key, Icon }) => (
                <li
                  key={key}
                  className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <Icon className="text-brand-gold mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block font-medium">
                      {t(`inspectors.fair.items.${key}.title`)}
                    </span>
                    <span className="text-sm text-white/65">
                      {t(`inspectors.fair.items.${key}.body`)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title={t('common.faq')} className="mb-10" />
        <Faq
          items={FAQ.map((q) => ({ q: t(`inspectors.faq.${q}.q`), a: t(`inspectors.faq.${q}.a`) }))}
        />
      </Section>

      <CtaBand
        title={t('inspectors.cta.title')}
        body={t('inspectors.cta.body')}
        primary={{ href: '/inspectors/apply', label: t('common.applyInspector') }}
        secondary={{ href: '/help/inspectors', label: t('nav.help') }}
      />
    </>
  );
}
