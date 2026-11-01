'use client';

import type { RfqAttachmentView } from '@garmentgate/shared';
import { Download, FileText, Loader2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatBytes } from '@/lib/format';

/** RFQ files with their sanitizing and review state; links go to the sanitized copies. */
export function AttachmentList({
  files,
  showReview = false,
}: {
  files: RfqAttachmentView[];
  showReview?: boolean;
}) {
  const t = useTranslations('rfq.files');
  const locale = useLocale();
  return (
    <ul className="divide-y rounded-lg border">
      {files.map((f) => (
        <li key={f.id} className="flex flex-wrap items-center gap-3 p-3">
          {f.thumbUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- short-lived signed rendition URL
            <img src={f.thumbUrl} alt="" className="size-10 shrink-0 rounded-md object-cover" />
          ) : (
            <span className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-md">
              <FileText className="text-muted-foreground size-5" aria-hidden="true" />
            </span>
          )}
          <div className="min-w-[10rem] flex-1">
            <p className="truncate text-sm font-medium">{f.fileName}</p>
            <p className="text-muted-foreground text-xs">
              {t(`kinds.${f.kind}`)} · {formatBytes(f.sizeBytes, locale)}
            </p>
          </div>
          {f.processing === 'FAILED' ? (
            <span className="text-danger-ink text-xs">{t('failed')}</span>
          ) : f.processing !== 'READY' ? (
            <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
              <Loader2
                className="size-3.5 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
              {t('processing')}
            </span>
          ) : showReview ? (
            <Badge
              variant={
                f.review === 'APPROVED' ? 'success' : f.review === 'REJECTED' ? 'danger' : 'warning'
              }
            >
              {t(`review.${f.review}`)}
            </Badge>
          ) : null}
          {f.url ? (
            <Button
              variant="outline"
              size="sm"
              render={<a href={f.url} target="_blank" rel="noopener noreferrer" />}
              aria-label={t('open', { name: f.fileName })}
            >
              <Download />
              {t('openShort')}
            </Button>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
