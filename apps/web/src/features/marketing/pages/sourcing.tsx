import { ArrowRight, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { countryName } from '@/lib/countries';
import { CtaBand } from '../components/cta-band';
import { CategoryCard, CountryCard, FactStrip } from '../components/directory-bits';
import { PageHero, Section, SectionHeading } from '../components/section';
import { publicDirectory } from '../data';
import { Reveal } from '../reveal';

const NOTES = ['BD', 'VN', 'IN', 'TR', 'CN', 'PK'] as const;
const hasNote = (c: string): c is (typeof NOTES)[number] =>
  (NOTES as readonly string[]).includes(c);

export async function SourcingPage() {
  const t = await getTranslations('marketing');
  const locale = await getLocale();
  const directory = await publicDirectory();
  return (
    <>
      <PageHero
        eyebrow={t('directory.sourcing.hero.eyebrow')}
        title={t('directory.sourcing.hero.title')}
        body={t('directory.sourcing.hero.body')}
      />
      <Section>
        {directory ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {directory.countries.map((c, i) => (
              <li key={c.code}>
                <Reveal delay={(i % 3) * 0.04} className="h-full">
                  <CountryCard country={c} name={countryName(c.code, locale)} />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <p className="bg-warning-soft text-warning-ink rounded-xl px-5 py-4">
            {t('directory.unavailable')}
          </p>
        )}
      </Section>
      <CtaBand
        title={t('directory.sourcing.cta.title')}
        body={t('directory.sourcing.cta.body')}
        primary={{ href: '/contact?topic=SALES', label: t('common.talkToUs') }}
        secondary={{ href: '/categories', label: t('nav.categories') }}
      />
    </>
  );
}

export async function CountryPage({ code }: { code: string }) {
  const t = await getTranslations('marketing');
  const tc = await getTranslations('certifications');
  const locale = await getLocale();
  const directory = await publicDirectory();
  if (!directory)
    return (
      <Section>
        <p className="bg-warning-soft text-warning-ink rounded-xl px-5 py-4">
          {t('directory.unavailable')}
        </p>
      </Section>
    );
  const country = directory.countries.find((c) => c.code === code.toUpperCase());
  if (!country) notFound();
  const name = countryName(country.code, locale);
  const categories = country.categories
    .map((slug) => directory.categories.find((c) => c.slug === slug))
    .filter((c) => c !== undefined);
  return (
    <>
      <PageHero
        eyebrow={t('directory.country.eyebrow')}
        title={t('directory.country.title', { country: name })}
        body={t('directory.country.body', { country: name })}
        actions={
          <Button size="lg" render={<Link href="/register?as=buyer" />}>
            {t('common.createBuyer')}
            <ArrowRight />
          </Button>
        }
      />
      <Section>
        <FactStrip
          factories={country.factories}
          second={{ label: t('directory.facts.products'), value: String(country.products) }}
          minMoq={country.minMoq}
          leadTimeDays={country.leadTimeDays}
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <SectionHeading title={t('directory.country.makes', { country: name })} />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <CategoryCard category={c} subcategories={[]} counts={false} />
                </li>
              ))}
            </ul>
          </div>
          <div className="grid content-start gap-8">
            <div className="bg-surface rounded-2xl border p-6">
              <h2 className="text-lg font-semibold">
                {t('directory.country.about', { country: name })}
              </h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {hasNote(country.code)
                  ? t(`directory.country.notes.${country.code}`)
                  : t('directory.country.noteGeneric')}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{t('directory.country.certs')}</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {t('directory.country.certsBody')}
              </p>
              {country.certifications.length > 0 ? (
                <ul className="mt-4 grid gap-2">
                  {country.certifications.map((c) => (
                    <li
                      key={c.type}
                      className="bg-card flex items-center justify-between gap-3 rounded-xl border px-4 py-3 shadow-xs"
                    >
                      <span className="flex items-center gap-2.5">
                        <BadgeCheck className="text-success-ink size-4" aria-hidden="true" />
                        {tc(c.type)}
                      </span>
                      <span className="text-muted-foreground tabular text-sm">
                        {t('directory.country.certFactories', { count: c.factories })}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground mt-4 text-sm">
                  {t('directory.country.noCerts')}
                </p>
              )}
            </div>
          </div>
        </div>
      </Section>
      <CtaBand
        title={t('directory.country.cta.title', { country: name })}
        body={t('directory.country.cta.body', { country: name })}
        primary={{ href: '/register?as=buyer', label: t('common.createBuyer') }}
        secondary={{ href: '/sourcing', label: t('nav.sourcing') }}
      />
    </>
  );
}
