import { ArrowRight, CalendarSearch, CheckCircle2, Lock, Repeat, Timer } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CtaBand } from '../components/cta-band';
import { PageHero, Section, SectionHeading } from '../components/section';
import { stringList } from '../data';
import { Reveal } from '../reveal';

const HOW = [
  { key: 'search', Icon: CalendarSearch },
  { key: 'hold', Icon: Timer },
  { key: 'confirm', Icon: Lock },
  { key: 'convert', Icon: Repeat },
] as const;
/** Twelve weeks of one line: booked, open, and the visitor's hold. Illustrative. */
const WEEKS = ['b', 'b', 'o', 'y', 'y', 'y', 'o', 'o', 'b', 'o', 'o', 'o'] as const;

export async function CapacityPage() {
  const t = await getTranslations('marketing');
  return (
    <>
      <PageHero
        eyebrow={t('capacity.hero.eyebrow')}
        title={t('capacity.hero.title')}
        body={t('capacity.hero.body')}
        actions={
          <Button size="lg" render={<Link href="/register?as=buyer" />}>
            {t('common.createBuyer')}
            <ArrowRight />
          </Button>
        }
        aside={
          <Reveal
            above
            delay={0.15}
            className="bg-card mx-auto w-full max-w-md rounded-2xl border p-6 shadow-xl"
          >
            <p className="font-medium">{t('capacity.calendar.title')}</p>
            <p className="text-muted-foreground font-mono text-xs">
              MFR-BD-0421 · {t('capacity.calendar.weeks')} 1–12
            </p>
            <div className="mt-5 grid grid-cols-12 gap-1.5">
              {WEEKS.map((w, i) => (
                <span
                  key={i}
                  className={cn(
                    'h-16 rounded-md',
                    w === 'b' && 'bg-muted',
                    w === 'o' && 'border-primary/40 bg-primary-soft border border-dashed',
                    w === 'y' && 'bg-primary shadow-md',
                  )}
                />
              ))}
            </div>
            <ul className="text-muted-foreground mt-4 flex flex-wrap gap-4 text-xs">
              <li className="flex items-center gap-1.5">
                <span className="bg-muted size-3 rounded-sm" />
                {t('capacity.calendar.booked')}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="border-primary/40 bg-primary-soft size-3 rounded-sm border border-dashed" />
                {t('capacity.calendar.open')}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="bg-primary size-3 rounded-sm" />
                {t('capacity.calendar.yours')}
              </li>
            </ul>
          </Reveal>
        }
      />
      <Section>
        <SectionHeading title={t('capacity.how.title')} />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOW.map(({ key, Icon }, i) => (
            <li key={key}>
              <Reveal
                delay={i * 0.05}
                className="bg-card relative h-full rounded-2xl border p-6 shadow-xs"
              >
                <span
                  className="text-border-strong absolute top-5 end-6 font-mono text-sm"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Icon className="text-primary-ink size-6" aria-hidden="true" />
                <h3 className="mt-5 font-semibold">{t(`capacity.how.items.${key}.title`)}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t(`capacity.how.items.${key}.body`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="surface">
        <SectionHeading title={t('capacity.terms.title')} />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {stringList.parse(t.raw('capacity.terms.items')).map((item) => (
            <li key={item} className="bg-card flex gap-3 rounded-xl border p-4 shadow-xs">
              <CheckCircle2
                className="text-success-ink mt-0.5 size-5 shrink-0"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand
        title={t('capacity.cta.title')}
        body={t('capacity.cta.body')}
        primary={{ href: '/register?as=buyer', label: t('common.createBuyer') }}
        secondary={{ href: '/contact?topic=SALES', label: t('common.talkToUs') }}
      />
    </>
  );
}
