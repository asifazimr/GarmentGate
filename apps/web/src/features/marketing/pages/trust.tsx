import {
  BadgeCheck,
  Check,
  ClipboardCheck,
  FileLock2,
  Landmark,
  MessageSquareLock,
  Truck,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { CtaBand } from '../components/cta-band';
import { PageHero, Section } from '../components/section';
import { stringList } from '../data';
import { Reveal } from '../reveal';

const PILLARS = [
  { key: 'verification', Icon: BadgeCheck },
  { key: 'money', Icon: Landmark },
  { key: 'quality', Icon: ClipboardCheck },
  { key: 'delivery', Icon: Truck },
  { key: 'privacy', Icon: FileLock2 },
  { key: 'conduct', Icon: MessageSquareLock },
] as const;

export async function TrustPage() {
  const t = await getTranslations('marketing');
  return (
    <>
      <PageHero
        eyebrow={t('trust.hero.eyebrow')}
        title={t('trust.hero.title')}
        body={t('trust.hero.body')}
      />
      <Section>
        <ul className="grid gap-5 md:grid-cols-2">
          {PILLARS.map(({ key, Icon }, i) => (
            <li key={key} id={key} className="scroll-mt-24 lg:scroll-mt-36">
              <Reveal
                delay={(i % 2) * 0.06}
                className="bg-card h-full rounded-2xl border p-6 shadow-xs sm:p-8"
              >
                <span className="bg-brand-deep text-brand-gold flex size-11 items-center justify-center rounded-xl">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-xl font-semibold tracking-[-0.015em]">
                  {t(`trust.pillars.${key}.title`)}
                </h2>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  {t(`trust.pillars.${key}.body`)}
                </p>
                <ul className="mt-5 grid gap-2 text-sm">
                  {stringList.parse(t.raw(`trust.pillars.${key}.points`)).map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <Check
                        className="text-success-ink mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand
        title={t('trust.cta.title')}
        body={t('trust.cta.body')}
        primary={{ href: '/contact?topic=ENTERPRISE', label: t('common.talkToUs') }}
        secondary={{ href: '/how-it-works', label: t('common.howItWorks') }}
      />
    </>
  );
}
