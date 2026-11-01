'use client';

import { CloudUpload } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { type DragEvent, useId, useState } from 'react';
import { formatBytes } from '@/lib/format';
import { cn } from '@/lib/utils';

/**
 * Click or drop a single file. Validates type and size before anything is uploaded, shows
 * progress while `progress` is set, and is keyboard reachable through its hidden input.
 */
export function FileDropzone({
  onFile,
  accept,
  maxBytes,
  progress = null,
  label,
  hint,
  compact = false,
  disabled = false,
}: {
  onFile: (file: File) => void;
  /** MIME types, e.g. ['application/pdf', 'image/png'] */
  accept: readonly string[];
  maxBytes: number;
  /** 0–100 while uploading, null when idle. */
  progress?: number | null;
  label?: string;
  hint?: string;
  compact?: boolean;
  disabled?: boolean;
}) {
  const t = useTranslations('patterns.dropzone');
  const locale = useLocale();
  const id = useId();
  const [dragging, setDragging] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const busy = progress !== null;
  const size = formatBytes(maxBytes, locale);

  const take = (file: File | undefined) => {
    if (!file || busy || disabled) return;
    if (!accept.includes(file.type)) {
      setProblem(t('fileType'));
      return;
    }
    if (file.size > maxBytes) {
      setProblem(t('fileSize', { size }));
      return;
    }
    setProblem(null);
    onFile(file);
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragging(false);
    take(event.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          'group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-border-strong bg-surface text-sm transition-[border-color,background-color] duration-150 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/30',
          compact ? 'min-h-12 gap-3 px-4' : 'min-h-36 flex-col gap-3 px-6 py-8 text-center',
          dragging ? 'border-primary bg-primary-soft' : 'hover:border-primary/50 hover:bg-card',
          (busy || disabled) && 'pointer-events-none',
          disabled && 'opacity-60',
        )}
      >
        <span
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full bg-card text-primary-ink shadow-xs ring-1 ring-border transition-transform duration-200 group-hover:-translate-y-0.5',
            compact ? 'size-8' : 'size-11',
          )}
          aria-hidden="true"
        >
          <CloudUpload className={compact ? 'size-4' : 'size-5'} />
        </span>
        <span className="space-y-0.5">
          <span className="block">
            {busy ? (
              <span className="text-foreground font-medium">
                {t('uploading', { percent: progress })}
              </span>
            ) : (
              <>
                <span className="text-primary-ink font-medium">{label ?? t('cta')}</span>{' '}
                {!compact ? <span className="text-muted-foreground">{t('or')}</span> : null}
              </>
            )}
          </span>
          {!compact && !busy ? (
            <span className="text-subtle-foreground block text-xs">
              {hint ?? t('hint', { size })}
            </span>
          ) : null}
        </span>
        {busy ? (
          <span className="bg-muted absolute inset-x-0 bottom-0 h-1" aria-hidden="true">
            <span
              className="bg-primary block h-full transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </span>
        ) : null}
        <input
          id={id}
          type="file"
          className="sr-only"
          accept={accept.join(',')}
          disabled={busy || disabled}
          onChange={(e) => {
            take(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
      </label>
      {problem ? (
        <p role="alert" className="text-danger-ink text-sm">
          {problem}
        </p>
      ) : null}
    </div>
  );
}
