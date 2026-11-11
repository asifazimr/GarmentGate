import { BadgeCheck, CheckCircle2, Eye, Landmark, Scale, ShieldCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { CtaBand } from '../components/cta-band';
import { PageHero, Section, SectionHeading } from '../components/section';
import { StatsStrip } from '../components/stats-strip';
import { publicStats, stringList } from '../data';
import { Reveal } from '../reveal';

const PRINCIPLES = [
  { key: 'accountable', Icon: ShieldCheck },
  { key: 'verified', Icon: BadgeCheck },
  { key: 'fair', Icon: Scale },
  { key: 'transparent', Icon: Eye },
] as const;

export async function AboutPage() {
  const t = await getTranslations('marketing');
  const stats = await publicStats();
  return (
    <>
      <PageHero
        eyebrow={t('about.hero.eyebrow')}
        title={t('about.hero.title')}
        body={t('about.hero.body')}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading title={t('about.model.title')} body={t('about.model.body')} />
          <Reveal className="bg-brand-deep self-start rounded-2xl p-6 text-white shadow-lg sm:p-8">
            <Landmark className="text-brand-gold size-6" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-semibold">{t('about.earn.title')}</h3>
            <p className="mt-2 text-white/70">{t('about.earn.body')}</p>
            <ul className="mt-5 grid gap-2.5">
              {stringList.parse(t.raw('about.earn.items')).map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2
                    className="text-brand-gold mt-0.5 size-5 shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-white/10 pt-4 text-sm text-white/60">
              {t('about.earn.note')}
            </p>
          </Reveal>
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading title={t('about.principles.title')} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map(({ key, Icon }, i) => (
            <li key={key}>
              <Reveal delay={i * 0.05} className="bg-card h-full rounded-2xl border p-6 shadow-xs">
                <Icon className="text-primary-ink size-6" aria-hidden="true" />
                <h3 className="mt-5 font-semibold">{t(`about.principles.items.${key}.title`)}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t(`about.principles.items.${key}.body`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
        {stats ? (
          <div className="mt-12">
            <StatsStrip stats={stats} />
          </div>
        ) : null}
      </Section>
      <CtaBand
        title={t('about.cta.title')}
        body={t('about.cta.body')}
        primary={{ href: '/contact?topic=PRESS', label: t('about.cta.primary') }}
        secondary={{ href: '/how-it-works', label: t('common.howItWorks') }}
      />
    </>
  );
}
