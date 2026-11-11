import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { availableLocales } from '@garmentgate/shared';
import { Logo } from '@/components/logo';
import { currentYear } from '../data';
import { AUDIENCES, EXPLORE_LINKS, LEGAL_DOCS, PRIMARY_LINKS, RESOURCE_LINKS } from './links';
import { LocaleSwitcher } from './locale-switcher';

/** Public site footer: every audience, page and legal document, one click away. */
export async function SiteFooter() {
  const t = await getTranslations('marketing');
  const year = await currentYear();
  const column = (title: string, links: { href: string; label: string }[]) => (
    <div>
      <h2 className="font-mono text-[0.6875rem] tracking-[0.12em] text-white/50 uppercase">
        {title}
      </h2>
      <ul className="mt-4 grid gap-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-white/75 transition-colors outline-none hover:text-white focus-visible:text-white focus-visible:underline"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <footer className="bg-brand-deep text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
        <div className="space-y-4">
          <Logo inverted />
          <p className="max-w-xs text-sm leading-relaxed text-white/65">{t('footer.tagline')}</p>
          <LocaleSwitcher locales={availableLocales(process.env.NODE_ENV !== 'production')} />
        </div>
        {column(
          t('footer.platform'),
          PRIMARY_LINKS.map(({ key, href }) => ({ href, label: t(`nav.${key}`) })),
        )}
        {column(
          t('footer.solutions'),
          AUDIENCES.map(({ key, href }) => ({ href, label: t(`nav.items.${key}.title`) })),
        )}
        {column(
          t('footer.explore'),
          EXPLORE_LINKS.map(({ key, href }) => ({ href, label: t(`nav.${key}`) })),
        )}
        {column(t('footer.company'), [
          ...RESOURCE_LINKS.map(({ key, href }) => ({ href, label: t(`nav.${key}`) })),
          { href: '/login', label: t('footer.signIn') },
          { href: '/register', label: t('footer.createAccount') },
          { href: '/contact', label: t('nav.contact') },
        ])}
        {column(
          t('footer.legal'),
          LEGAL_DOCS.map((doc) => ({
            href: `/legal/${doc}`,
            label: t(`legal.docs.${doc}.title`),
          })),
        )}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:justify-between sm:px-6">
          <p>{t('footer.rights', { year })}</p>
          <p>{t('footer.draftNote')}</p>
        </div>
      </div>
    </footer>
  );
}
