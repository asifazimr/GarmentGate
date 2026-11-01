import { useId } from 'react';
import { cn } from '@/lib/utils';

/** Mark: a gate arch with a thread passing through it. Wordmark in the UI sans. */
export function Logo({
  className,
  inverted = false,
  iconOnly = false,
}: {
  className?: string;
  inverted?: boolean;
  iconOnly?: boolean;
}) {
  // Unique per instance: url(#id) resolves to the first match in the document, and a copy
  // inside a hidden element (e.g. the desktop sidebar on mobile) would not paint.
  const gradientId = `gg-mark-${useId().replace(/:/g, '')}`;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 text-[1.0625rem] font-semibold tracking-[-0.02em]',
        className,
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" className="size-7 shrink-0">
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="32"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={inverted ? '#ffffff' : 'var(--color-primary)'} />
            <stop
              offset="1"
              stopColor={
                inverted
                  ? 'rgb(255 255 255 / 0.82)'
                  : 'color-mix(in oklch, var(--color-primary), black 22%)'
              }
            />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8.5" fill={`url(#${gradientId})`} />
        {/* Gate arch */}
        <path
          d="M10 24V14.5a6 6 0 0 1 12 0V24"
          fill="none"
          stroke={inverted ? 'var(--color-brand-deep)' : 'white'}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Thread through the gate */}
        <path
          d="M6.5 19.5c3.2-2.2 6.3-2.2 9.5 0s6.3 2.2 9.5 0"
          fill="none"
          stroke="var(--color-brand-gold)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {iconOnly ? (
        <span className="sr-only">GarmentGate</span>
      ) : (
        <span className={inverted ? 'text-white' : 'text-foreground'}>
          Garment<span className={inverted ? 'text-white/70' : 'text-primary-ink'}>Gate</span>
        </span>
      )}
    </span>
  );
}
