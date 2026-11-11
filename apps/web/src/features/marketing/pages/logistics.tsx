import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileText,
  Handshake,
  PackageOpen,
  Receipt,
  Scale,
  Ship,
  ShieldAlert,
  Truck,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LeadForm } from '../components/lead-form';
import { PageHero, Section, SectionHeading } from '../components/section';
import { stringList } from '../data';
import { Reveal } from '../reveal';

const WHAT = [
  { key: 'pickup', Icon: Truck },
  { key: 'main', Icon: Ship },
  { key: 'delivery', Icon: PackageOpen },
  { key: 'docs', Icon: FileText },
] as const;
const TERMS = [
  { key: 'rates', Icon: Scale },
  { key: 'paid', Icon: Receipt },
  { key: 'customer', Icon: Building2 },
  { key: 'claims', Icon: ShieldAlert },
] as const;

export async function LogisticsPage() {
  const t = await getTranslations('marketing');
  return (
    <>
      <PageHero
        eyebrow={t('logistics.hero.eyebrow')}
        title={t('logistics.hero.title')}
        body={t('logistics.hero.body')}
        actions={
          <Button size="lg" render={<a href="#apply" />}>
            {t('common.becomePartner')}
            <ArrowRight />
          </Button>
        }
        aside={
          <Reveal
            above
            delay={0.15}
            className="bg-card mx-auto w-full max-w-sm rounded-2xl border p-5 shadow-xl"
          >
            <div className="flex items-center justify-between gap-2">
              <Badge variant="code">SHP-2026-00012</Badge>
              <Badge variant="info">{t('logistics.leg.title')}</Badge>
            </div>
            <p className="mt-4 flex items-center gap-2 font-medium">
              <Truck className="text-primary-ink size-4" aria-hidden="true" />
              {t('logistics.leg.route')}
            </p>
            <p className="text-muted-foreground mt-1 text-sm">{t('logistics.leg.mode')}</p>
            <Button className="mt-4 w-full" tabIndex={-1} aria-hidden="true">
              <Handshake />
              {t('logistics.leg.accept')}
            </Button>
          </Reveal>
        }
      />

      <Section id="what">
        <SectionHeading title={t('logistics.what.title')} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHAT.map(({ key, Icon }, i) => (
            <li key={key}>
              <Reveal delay={i * 0.05} className="bg-card h-full rounded-2xl border p-6 shadow-xs">
                <Icon className="text-primary-ink size-6" aria-hidden="true" />
                <h3 className="mt-5 font-semibold">{t(`logistics.what.items.${key}.title`)}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t(`logistics.what.items.${key}.body`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="deep">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div id="portal" className="scroll-mt-24 lg:scroll-mt-36">
            <SectionHeading
              inverted
              title={t('logistics.portal.title')}
              body={t('logistics.portal.body')}
            />
            <ul className="mt-8 grid gap-3">
              {stringList.parse(t.raw('logistics.portal.items')).map((item) => (
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
          <div id="terms" className="scroll-mt-24 lg:scroll-mt-36">
            <SectionHeading inverted title={t('logistics.terms.title')} />
            <ul className="mt-8 grid gap-3">
              {TERMS.map(({ key, Icon }) => (
                <li
                  key={key}
                  className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <Icon className="text-brand-gold mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block font-medium">
                      {t(`logistics.terms.items.${key}.title`)}
                    </span>
                    <span className="text-sm text-white/65">
                      {t(`logistics.terms.items.${key}.body`)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="apply">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeading title={t('logistics.form.title')} body={t('logistics.form.body')} />
          <Suspense fallback={<Skeleton className="h-[36rem] rounded-2xl" />}>
            <LeadForm kind="LOGISTICS_PARTNER" />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
