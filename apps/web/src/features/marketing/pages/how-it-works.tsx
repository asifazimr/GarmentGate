import { Check, Factory, Landmark, ShoppingBag, X } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CtaBand } from '../components/cta-band';
import { JourneyStory } from '../components/journey';
import { MoneyFlow } from '../components/money-flow';
import { PageHero, Section, SectionHeading } from '../components/section';
import { publicPricing, stringList } from '../data';
import { Reveal } from '../reveal';

const ROWS = ['contract', 'payment', 'quality', 'shipping', 'disputes'] as const;
const ROLES = [
  { key: 'buyer', Icon: ShoppingBag },
  { key: 'garmentgate', Icon: Landmark },
  { key: 'factory', Icon: Factory },
] as const;

export async function HowItWorksPage() {
  const t = await getTranslations('marketing');
  const pricing = await publicPricing();
  return (
    <>
      <PageHero
        eyebrow={t('how.hero.eyebrow')}
        title={t('how.hero.title')}
        body={t('how.hero.body')}
        actions={
          <>
            <Button size="lg" render={<Link href="/register?as=buyer" />}>
              {t('common.createBuyer')}
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/register?as=manufacturer" />}>
              {t('common.createFactory')}
            </Button>
          </>
        }
      />

      <Section>
        <SectionHeading title={t('how.compare.title')} />
        <Reveal className="mt-10 overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[36rem] text-sm">
            <thead>
              <tr className="bg-surface text-start">
                <th
                  scope="col"
                  className="w-1/2 px-5 py-4 text-start font-medium text-muted-foreground"
                >
                  {t('how.compare.directory')}
                </th>
                <th
                  scope="col"
                  className="text-primary-ink w-1/2 px-5 py-4 text-start font-semibold"
                >
                  {t('how.compare.managed')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ROWS.map((key) => {
                const [before, after] = stringList.parse(t.raw(`how.compare.rows.${key}`));
                return (
                  <tr key={key}>
                    <td className="text-muted-foreground px-5 py-4">
                      <span className="flex gap-3">
                        <X className="text-danger-ink mt-0.5 size-4 shrink-0" aria-hidden="true" />
                        {before}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium">
                      <span className="flex gap-3">
                        <Check
                          className="text-success-ink mt-0.5 size-4 shrink-0"
                          aria-hidden="true"
                        />
                        {after}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>
      </Section>

      <Section tone="deep" id="journey">
        <SectionHeading
          inverted
          eyebrow={t('home.journey.eyebrow')}
          title={t('home.journey.title')}
          body={t('home.journey.body')}
        />
        <JourneyStory />
      </Section>

      <Section>
        <SectionHeading title={t('how.roles.title')} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {ROLES.map(({ key, Icon }, i) => (
            <li key={key}>
              <Reveal
                delay={i * 0.06}
                className={
                  key === 'garmentgate'
                    ? 'bg-brand-deep h-full rounded-2xl p-6 text-white shadow-lg'
                    : 'bg-card h-full rounded-2xl border p-6 shadow-xs'
                }
              >
                <Icon
                  className={
                    key === 'garmentgate' ? 'text-brand-gold size-6' : 'text-primary-ink size-6'
                  }
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-lg font-semibold">{t(`how.roles.${key}.title`)}</h3>
                <p
                  className={
                    key === 'garmentgate'
                      ? 'mt-2 leading-relaxed text-white/70'
                      : 'text-muted-foreground mt-2 leading-relaxed'
                  }
                >
                  {t(`how.roles.${key}.body`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="bg-surface mt-10 rounded-2xl border p-6 sm:p-8">
          <h3 className="text-lg font-semibold">{t('how.privacy.title')}</h3>
          <p className="text-muted-foreground mt-3 max-w-3xl leading-relaxed">
            {t('how.privacy.body')}
          </p>
        </Reveal>
      </Section>

      <Section tone="deep" id="money">
        <SectionHeading
          inverted
          center
          eyebrow={t('home.money.eyebrow')}
          title={t('home.money.title')}
          body={t('home.money.body')}
        />
        <MoneyFlow schedule={pricing?.releaseSchedule ?? null} />
      </Section>

      <CtaBand
        title={t('home.cta.title')}
        body={t('home.cta.body')}
        primary={{ href: '/register', label: t('home.cta.primary') }}
        secondary={{ href: '/pricing', label: t('common.seePricing') }}
      />
    </>
  );
}
