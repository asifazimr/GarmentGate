import { availableLocales } from '@garmentgate/shared';
import { SiteFooter } from '@/features/marketing/components/site-footer';
import { SiteHeader } from '@/features/marketing/components/site-header';

/** The public website: shared header (audiences, sign in, get started) and footer. */
export default function MarketingLayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader locales={availableLocales(process.env.NODE_ENV !== 'production')} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
