import { ChevronDown } from 'lucide-react';
import { JsonLd } from './json-ld';

/** Questions as native disclosure widgets (keyboard and screen-reader ready), plus FAQ markup. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <>
      <div className="divide-y rounded-2xl border bg-card">
        {items.map(({ q, a }) => (
          <details key={q} className="group px-5 py-1 sm:px-6">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium outline-none focus-visible:underline [&::-webkit-details-marker]:hidden">
              {q}
              <ChevronDown
                className="text-muted-foreground size-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </summary>
            <p className="text-muted-foreground pb-5 leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }}
      />
    </>
  );
}
