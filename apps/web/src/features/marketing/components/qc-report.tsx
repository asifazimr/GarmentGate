import { acceptanceNumber, sampleSize } from '@garmentgate/shared';
import { ClipboardCheck } from 'lucide-react';
import { getFormatter, getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';

const LOT = 6000;
const FOUND = { critical: 0, major: 3, minor: 6 };

/** An illustrative final inspection, with the sample and limits computed by ISO 2859-1. */
export async function QcReport() {
  const t = await getTranslations('marketing.qc');
  const format = await getFormatter();
  const n = sampleSize(LOT);
  const rows = [
    { key: 'critical', found: FOUND.critical, allowed: 0 },
    { key: 'major', found: FOUND.major, allowed: acceptanceNumber(n, '2.5') },
    { key: 'minor', found: FOUND.minor, allowed: acceptanceNumber(n, '4.0') },
  ] as const;
  return (
    <div className="bg-card rounded-2xl border p-6 shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="bg-success-soft text-success-ink flex size-10 items-center justify-center rounded-xl">
            <ClipboardCheck className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-medium">{t('report')}</p>
            <p className="text-muted-foreground font-mono text-xs">{t('standard')}</p>
          </div>
        </div>
        <Badge variant="success">{t('verdict')}</Badge>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <div className="bg-surface rounded-lg p-3">
          <dt className="text-muted-foreground">{t('lot')}</dt>
          <dd className="tabular mt-1 text-lg font-semibold">{format.number(LOT)}</dd>
        </div>
        <div className="bg-surface rounded-lg p-3">
          <dt className="text-muted-foreground">{t('sample')}</dt>
          <dd className="tabular mt-1 text-lg font-semibold">{format.number(n)}</dd>
        </div>
      </dl>
      <ul className="mt-4 divide-y text-sm">
        {rows.map((r) => (
          <li key={r.key} className="flex items-center justify-between gap-3 py-3">
            <span>{t(r.key)}</span>
            <span className="text-muted-foreground tabular">
              {t('found', { found: r.found, allowed: r.allowed })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
