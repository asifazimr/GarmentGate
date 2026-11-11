import { ArrowRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { countryName } from '@/lib/countries';
import { CtaBand } from '../components/cta-band';
import { CategoryCard, FactStrip, topLevel } from '../components/directory-bits';
import { Faq } from '../components/faq';
import { PageHero, Section, SectionHeading } from '../components/section';
import { publicDirectory, stringList } from '../data';
import { Reveal } from '../reveal';

export async function CategoriesPage() {
  const t = await getTranslations('marketing');
  const directory = await publicDirectory();
  const groups = directory ? topLevel(directory.categories) : [];
  return (
    <>
      <PageHero
        eyebrow={t('directory.categories.hero.eyebrow')}
        title={t('directory.categories.hero.title')}
        body={t('directory.categories.hero.body')}
      />
      <Section>
        {directory ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map(({ parent, children }, i) => (
              <li key={parent.slug}>
                <Reveal delay={(i % 3) * 0.04} className="h-full">
                  <CategoryCard category={parent} subcategories={children} />
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
        title={t('directory.categories.cta.title')}
        body={t('directory.categories.cta.body')}
        primary={{ href: '/register?as=buyer', label: t('common.createBuyer') }}
        secondary={{ href: '/contact?topic=SALES', label: t('common.talkToUs') }}
      />
    </>
  );
}

export async function CategoryPage({ slug }: { slug: string }) {
  const t = await getTranslations('marketing');
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
  const category = directory.categories.find((c) => c.slug === slug);
  if (!category || (category.factories === 0 && category.products === 0)) notFound();
  const name = category.name;
  const children = directory.categories.filter(
    (c) => c.parentSlug === slug && (c.factories > 0 || c.products > 0),
  );
  const parent = category.parentSlug
    ? directory.categories.find((c) => c.slug === category.parentSlug)
    : undefined;
  const lead = category.leadTimeDays;
  return (
    <>
      <PageHero
        eyebrow={
          parent
            ? `${t('directory.category.eyebrow')} · ${parent.name}`
            : t('directory.category.eyebrow')
        }
        title={t('directory.category.title', { name })}
        body={t('directory.category.body', { name })}
        actions={
          <>
            <Button size="lg" render={<Link href="/register?as=buyer" />}>
              {t('common.createBuyer')}
              <ArrowRight />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/tools/cost-calculator" />}>
              {t('nav.calculator')}
            </Button>
          </>
        }
      />
      <Section>
        <FactStrip
          factories={category.factories}
          second={{
            label: t('directory.facts.countries'),
            value: String(category.countries.length),
          }}
          minMoq={category.minMoq}
          leadTimeDays={lead}
        />
        {children.length > 0 ? (
          <div className="mt-14">
            <SectionHeading title={t('directory.category.subcategories')} />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((c) => (
                <li key={c.slug}>
                  <CategoryCard category={c} subcategories={[]} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {category.countries.length > 0 ? (
          <div className="mt-14">
            <SectionHeading
              title={t('directory.category.where')}
              body={t('directory.category.whereBody', { name })}
            />
            <ul className="mt-6 flex flex-wrap gap-2">
              {category.countries.map((code) => (
                <li key={code}>
                  <Link
                    href={`/sourcing/${code.toLowerCase()}`}
                    className="bg-card hover:border-border-strong inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm shadow-xs"
                  >
                    <Badge variant="code">{code}</Badge>
                    {countryName(code, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading title={t('directory.category.tips.title', { name })} />
            <ul className="mt-8 grid gap-3">
              {stringList.parse(t.raw('directory.category.tips.items')).map((tip) => (
                <li key={tip} className="bg-card flex gap-3 rounded-xl border p-4 shadow-xs">
                  <Lightbulb
                    className="text-primary-ink mt-0.5 size-5 shrink-0"
                    aria-hidden="true"
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title={t('common.faq')} className="mb-8" />
            <Faq
              items={[
                {
                  q: t('directory.category.faq.moq.q', { name }),
                  a: category.minMoq
                    ? t('directory.category.faq.moq.a', { name, moq: category.minMoq })
                    : t('directory.category.faq.moq.none'),
                },
                {
                  q: t('directory.category.faq.lead.q'),
                  a: lead
                    ? t('directory.category.faq.lead.a', { name, ...lead })
                    : t('directory.category.faq.lead.none'),
                },
                { q: t('directory.category.faq.pay.q'), a: t('directory.category.faq.pay.a') },
              ]}
            />
          </div>
        </div>
      </Section>
      <CtaBand
        title={t('directory.category.cta.title', { name })}
        body={t('directory.category.cta.body')}
        primary={{ href: '/register?as=buyer', label: t('common.createBuyer') }}
        secondary={{ href: '/categories', label: t('nav.categories') }}
      />
    </>
  );
}
