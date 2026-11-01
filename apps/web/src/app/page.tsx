import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

// Signed-in visitors are redirected to their dashboard by the proxy.
export default async function Home() {
  const t = await getTranslations('landing');
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-8 px-4 py-12 sm:px-6">
      <Logo className="text-lg" />
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {t('title')}
        </h1>
        <p className="text-muted-foreground max-w-prose text-lg">{t('body')}</p>
      </header>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" render={<Link href="/register" />}>
          {t('getStarted')}
        </Button>
        <Button size="lg" variant="outline" render={<Link href="/login" />}>
          {t('signIn')}
        </Button>
      </div>
    </main>
  );
}
