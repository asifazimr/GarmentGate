'use client';

import { RotateCw, VideoOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * An HLS player for signed camera links. Safari plays HLS natively; elsewhere hls.js is loaded
 * on demand (only pages with a player pay for it). `overlay` is drawn over the picture (the
 * order code and camera number), so screenshots carry the order, never a factory name.
 */
export function VideoPlayer({
  src,
  overlay,
  live = false,
  className,
}: {
  src: string;
  overlay?: string;
  live?: boolean;
  className?: string;
}) {
  const t = useTranslations('monitoring.player');
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    let destroyed = false;
    let destroy: (() => void) | undefined;
    const fail = () => {
      if (!destroyed) setFailed(true);
    };
    if (el.canPlayType('application/vnd.apple.mpegurl')) {
      el.src = src;
      el.addEventListener('error', fail);
      destroy = () => {
        el.removeEventListener('error', fail);
        el.removeAttribute('src');
        el.load();
      };
    } else {
      void import('hls.js').then(({ default: Hls }) => {
        if (destroyed) return;
        if (!Hls.isSupported()) {
          fail();
          return;
        }
        const hls = new Hls({ lowLatencyMode: live });
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) fail();
        });
        hls.loadSource(src);
        hls.attachMedia(el);
        destroy = () => hls.destroy();
      }, fail);
    }
    return () => {
      destroyed = true;
      destroy?.();
    };
  }, [src, live, attempt]);

  return (
    <div
      className={cn('relative aspect-video overflow-hidden rounded-lg bg-black', className)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {failed ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center text-sm text-white/80">
          <VideoOff className="size-6" aria-hidden="true" />
          <p>{t('error')}</p>
          <Button
            size="sm"
            variant="outline"
            className="border-white/30 bg-transparent text-white hover:bg-white/10"
            onClick={() => {
              setFailed(false);
              setAttempt((a) => a + 1);
            }}
          >
            <RotateCw />
            {t('retry')}
          </Button>
        </div>
      ) : (
        <video
          ref={video}
          className="size-full object-contain"
          controls
          muted
          autoPlay={live}
          playsInline
          disablePictureInPicture
          controlsList="nodownload noremoteplayback"
          aria-label={overlay}
        />
      )}
      {overlay ? (
        <span className="pointer-events-none absolute start-2 top-2 rounded bg-black/60 px-2 py-0.5 font-mono text-xs text-white">
          {overlay}
        </span>
      ) : null}
      {live && !failed ? (
        <span className="pointer-events-none absolute end-2 top-2 flex items-center gap-1.5 rounded bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
          <span className="bg-destructive size-2 animate-pulse rounded-full motion-reduce:animate-none" />
          {t('live')}
        </span>
      ) : null}
    </div>
  );
}
