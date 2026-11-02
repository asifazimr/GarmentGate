import type { ImageUrls } from '@garmentgate/shared';
import type { ComponentProps } from 'react';

/**
 * An uploaded image from its WebP renditions (320 / 800 / 1600 px wide): the browser picks the
 * smallest that fills the slot, using `sizes`. Signed, short-lived URLs can't go through
 * next/image's cache, so this is a plain <img> with the same care: intrinsic size (no layout
 * shift), lazy loading below the fold and off-main-thread decoding.
 */
export function Rendition({
  urls,
  sizes,
  priority = false,
  alt,
  ...props
}: {
  urls: ImageUrls;
  /** How wide the image renders, e.g. "(min-width: 768px) 33vw, 100vw". */
  sizes: string;
  /** Above the fold (the first image a page shows): load eagerly. */
  priority?: boolean;
  alt: string;
} & Omit<ComponentProps<'img'>, 'src' | 'srcSet' | 'sizes' | 'alt'>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- signed rendition URLs; next/image can't cache them
    <img
      src={urls.medium}
      srcSet={`${urls.thumb} 320w, ${urls.medium} 800w, ${urls.large} 1600w`}
      sizes={sizes}
      width={urls.width}
      height={urls.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      {...props}
    />
  );
}
