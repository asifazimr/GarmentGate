import { Clock, LogIn } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { LeadForm } from '../components/lead-form';
import { PageHero, Section } from '../components/section';

export async function ContactPage() {
  const t = await getTranslations('marketing.contact');
  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} body={t('hero.body')} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Suspense fallback={<Skeleton className="h-[36rem] rounded-2xl" />}>
            <LeadForm />
          </Suspense>
          <aside className="grid content-start gap-4">
            <div className="bg-surface rounded-2xl border p-6">
              <LogIn className="text-primary-ink size-5" aria-hidden="true" />
              <h2 className="mt-4 font-semibold">{t('aside.customers.title')}</h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {t('aside.customers.body')}
              </p>
              <Link
                href="/login"
                className="text-primary-ink mt-4 inline-block text-sm font-medium hover:underline"
              >
                {t('aside.customers.title')}
              </Link>
            </div>
            <div className="bg-surface rounded-2xl border p-6">
              <Clock className="text-primary-ink size-5" aria-hidden="true" />
              <h2 className="mt-4 font-semibold">{t('aside.hours.title')}</h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {t('aside.hours.body')}
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
