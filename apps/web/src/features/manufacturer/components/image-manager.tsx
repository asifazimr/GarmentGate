'use client';

import { IMAGE_CONTENT_TYPES, IMAGE_MAX_BYTES, type OwnedImage } from '@garmentgate/shared';
import { ArrowLeft, ArrowRight, ImageOff, Loader2, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { FileDropzone } from '@/components/patterns/file-dropzone';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface Upload {
  key: string;
  name: string;
  progress: number;
}

/**
 * Grid of owned images with multi-upload, pipeline + review status and reordering.
 * Used for factory photos and product images.
 */
export function ImageManager({
  images,
  max,
  onAdd,
  onRemove,
  onReorder,
  disabled = false,
}: {
  images: OwnedImage[];
  max: number;
  onAdd: (file: File, onProgress: (p: number) => void) => Promise<unknown>;
  onRemove: (id: string) => void;
  onReorder: (ids: string[]) => void;
  disabled?: boolean;
}) {
  const t = useTranslations('manufacturer.photos');
  const [uploads, setUploads] = useState<Upload[]>([]);
  const room = max - images.length - uploads.length;

  const add = (file: File) => {
    if (room <= 0) return;
    const key = `${file.name}-${file.size}-${String(Date.now())}`;
    setUploads((u) => [...u, { key, name: file.name, progress: 0 }]);
    const setProgress = (progress: number) =>
      setUploads((u) => u.map((x) => (x.key === key ? { ...x, progress } : x)));
    onAdd(file, setProgress)
      .catch(() => toast.error(t('uploadFailed')))
      .finally(() => setUploads((u) => u.filter((x) => x.key !== key)));
  };

  const move = (index: number, delta: number) => {
    const ids = images.map((i) => i.id);
    const target = index + delta;
    const [moved] = ids.splice(index, 1);
    if (!moved || target < 0 || target > ids.length) return;
    ids.splice(target, 0, moved);
    onReorder(ids);
  };

  return (
    <div className="space-y-4">
      {images.length > 0 || uploads.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <li
              key={image.id}
              className="group bg-card relative overflow-hidden rounded-xl border shadow-xs"
            >
              <div className="bg-muted relative aspect-[4/3]">
                {image.urls ? (
                  // eslint-disable-next-line @next/next/no-img-element -- short-lived signed URLs; next/image can't cache them
                  <img
                    src={image.urls.medium}
                    alt={image.caption ?? ''}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                ) : image.processing === 'FAILED' ? (
                  <div className="text-danger-ink flex size-full flex-col items-center justify-center gap-2 p-3 text-center text-xs">
                    <ImageOff className="size-5" aria-hidden="true" />
                    {t('failed')}
                  </div>
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <Skeleton className="absolute inset-0 rounded-none" />
                    <span className="text-muted-foreground relative inline-flex items-center gap-1.5 text-xs font-medium">
                      <Loader2
                        className="size-3.5 animate-spin motion-reduce:animate-none"
                        aria-hidden="true"
                      />
                      {t('processing')}
                    </span>
                  </div>
                )}
                {index === 0 && image.urls ? (
                  <span className="bg-background/85 absolute top-2 start-2 rounded-md px-1.5 py-0.5 text-[0.6875rem] font-medium backdrop-blur">
                    1
                  </span>
                ) : null}
              </div>
              <div className="flex items-center justify-between gap-1 p-2">
                <StatusBadge domain="media" status={image.review} className="max-w-full truncate" />
                <div className="flex shrink-0">
                  <IconAction
                    label={t('moveEarlier')}
                    disabled={disabled || index === 0}
                    onClick={() => move(index, -1)}
                  >
                    <ArrowLeft className="rtl:rotate-180" />
                  </IconAction>
                  <IconAction
                    label={t('moveLater')}
                    disabled={disabled || index === images.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    <ArrowRight className="rtl:rotate-180" />
                  </IconAction>
                  <IconAction
                    label={t('remove')}
                    disabled={disabled}
                    onClick={() => onRemove(image.id)}
                    danger
                  >
                    <Trash2 />
                  </IconAction>
                </div>
              </div>
              {image.review === 'REJECTED' && image.reviewNote ? (
                <p className="text-danger-ink border-t px-2 py-1.5 text-xs">
                  {t('rejectedNote', { note: image.reviewNote })}
                </p>
              ) : null}
            </li>
          ))}
          {uploads.map((u) => (
            <li key={u.key} className="bg-card relative overflow-hidden rounded-xl border">
              <div className="bg-muted relative flex aspect-[4/3] items-center justify-center">
                <span className="text-muted-foreground px-3 text-center text-xs">{u.name}</span>
                <span className="bg-border absolute inset-x-0 bottom-0 h-1">
                  <span
                    className="bg-primary block h-full transition-[width]"
                    style={{ width: `${u.progress}%` }}
                  />
                </span>
              </div>
              <div className="text-muted-foreground p-2 text-xs tabular">{u.progress}%</div>
            </li>
          ))}
        </ul>
      ) : null}

      {room > 0 ? (
        <FileDropzone
          multiple
          compact={images.length > 0}
          accept={IMAGE_CONTENT_TYPES}
          maxBytes={IMAGE_MAX_BYTES}
          label={t('add')}
          hint={t('max', { max })}
          disabled={disabled}
          onFile={add}
        />
      ) : null}
    </div>
  );
}

function IconAction({
  label,
  onClick,
  disabled,
  danger = false,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={label}
            disabled={disabled}
            onClick={onClick}
            className={cn('size-9 md:size-7', danger && 'hover:text-danger-ink')}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
