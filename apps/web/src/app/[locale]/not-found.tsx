import { Compass } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { EmptyState } from '@/components/patterns/empty-state';
import { Button } from '@/components/ui/button';

export default async function NotFound() {
  const t = await getTranslations('patterns.notFound');
  return (
    <main id="main" className="mx-auto flex w-full max-w-xl flex-1 items-center px-4 py-16">
      <EmptyState
        icon={Compass}
        title={t('title')}
        description={t('body')}
        action={<Button render={<Link href="/" />}>{t('home')}</Button>}
        className="w-full"
      />
    </main>
  );
}
