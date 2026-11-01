import type { Role } from '@garmentgate/shared';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { EmptyState } from '@/components/patterns/empty-state';
import { PageHeader } from '@/components/patterns/page-header';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { NAV, navItemFor } from './nav';

/** Placeholder for sections in the navigation that aren't built yet. */
export async function ComingSoon({ role, section }: { role: Role; section: string }) {
  const item = navItemFor(role, section);
  if (!item) notFound();
  const t = await getTranslations('patterns.comingSoon');
  const tn = await getTranslations('nav');
  const label = tn(item.label);
  return (
    <div className="space-y-8">
      <PageHeader title={label} />
      <EmptyState
        icon={Sparkles}
        title={t('title')}
        description={t('body')}
        action={
          <Button variant="outline" render={<Link href={NAV[role][0]?.href ?? '/'} />}>
            <ArrowLeft />
            {t('back')}
          </Button>
        }
      />
    </div>
  );
}

export function ComingSoonSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-72 w-full rounded-2xl" />
    </div>
  );
}
