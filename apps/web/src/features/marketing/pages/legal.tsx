import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { LEGAL_DOCS, type LegalDoc } from '../components/links';
import { sectionList } from '../data';

/** A legal document (draft text until reviewed by counsel), with the others in a side list. */
export async function LegalPage({ doc }: { doc: LegalDoc }) {
  const t = await getTranslations('marketing.legal');
  const sections = sectionList.parse(t.raw(`docs.${doc}.sections`));
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[14rem_minmax(0,1fr)]">
      <nav aria-label="Legal" className="lg:sticky lg:top-24 lg:self-start">
        <ul className="grid gap-1 text-sm">
          {LEGAL_DOCS.map((d) => (
            <li key={d}>
              <Link
                href={`/legal/${d}`}
                aria-current={d === doc ? 'page' : undefined}
                className={cn(
                  'block rounded-md px-3 py-2 transition-colors',
                  d === doc
                    ? 'bg-primary-soft text-primary-ink font-medium'
                    : 'text-muted-foreground hover:bg-surface',
                )}
              >
                {t(`docs.${d}.title`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <article className="max-w-[65ch]">
        <p className="bg-warning-soft text-warning-ink flex gap-3 rounded-xl px-4 py-3 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {t('draft')}
        </p>
        <h1 className="font-display mt-8 text-display-lg">{t(`docs.${doc}.title`)}</h1>
        <p className="text-muted-foreground mt-2 font-mono text-xs">{t('updated')}</p>
        <div className="mt-10 grid gap-8">
          {sections.map(([heading, body], i) => (
            <section key={heading}>
              <h2 className="text-lg font-semibold">
                <span className="text-muted-foreground me-2 font-mono text-sm">{i + 1}.</span>
                {heading}
              </h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">{body}</p>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
