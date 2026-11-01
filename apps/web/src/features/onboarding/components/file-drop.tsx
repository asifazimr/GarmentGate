'use client';

import { UPLOAD_CONTENT_TYPES } from '@garmentgate/shared';
import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type DragEvent, useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { checkFile } from '../api';

/** Click or drop a single file. Validates type and size before anything is uploaded. */
export function FileDrop({
  onFile,
  progress,
  label,
  compact = false,
}: {
  onFile: (file: File) => void;
  /** 0–100 while uploading, null when idle. */
  progress: number | null;
  label: string;
  compact?: boolean;
}) {
  const t = useTranslations('onboarding');
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const busy = progress !== null;

  const take = (file: File | undefined) => {
    if (!file || busy) return;
    const issue = checkFile(file);
    if (issue) {
      setProblem(t(`errors.${issue}`));
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
          'flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed text-sm transition-colors has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50',
          compact ? 'min-h-11 px-4' : 'min-h-24 flex-col px-4 py-5 text-center',
          dragging ? 'border-primary bg-primary/5' : 'hover:border-foreground/40',
          busy && 'pointer-events-none opacity-80',
        )}
      >
        <Upload className="text-muted-foreground size-5 shrink-0" aria-hidden="true" />
        <span>
          <span className="text-primary font-medium">
            {busy ? t('documents.uploading', { percent: progress }) : label}
          </span>
          {!compact && !busy ? (
            <span className="text-muted-foreground block text-xs">{t('documents.uploadHint')}</span>
          ) : null}
        </span>
        <input
          ref={input}
          id={id}
          type="file"
          className="sr-only"
          accept={UPLOAD_CONTENT_TYPES.join(',')}
          disabled={busy}
          onChange={(e) => {
            take(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
      </label>
      {busy ? (
        <div className="bg-muted h-1 overflow-hidden rounded-full" aria-hidden="true">
          <div className="bg-primary h-full transition-[width]" style={{ width: `${progress}%` }} />
        </div>
      ) : null}
      {problem ? (
        <p role="alert" className="text-destructive text-sm">
          {problem}
        </p>
      ) : null}
    </div>
  );
}

export function formatBytes(bytes: number, locale: string): string {
  const units = ['byte', 'kilobyte', 'megabyte'] as const;
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return new Intl.NumberFormat(locale, {
    style: 'unit',
    unit: units[unit],
    unitDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(value);
}
