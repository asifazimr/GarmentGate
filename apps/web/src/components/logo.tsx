import { cn } from '@/lib/utils';

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2 font-semibold tracking-tight', className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className={cn('size-7 shrink-0', inverted ? 'text-white' : 'text-primary')}
      >
        <rect width="32" height="32" rx="8" fill="currentColor" />
        <path
          d="M10 9.5h12v3.2l-3 2.3v7.5H13v-7.5l-3-2.3z"
          fill={inverted ? 'var(--color-primary)' : 'white'}
        />
      </svg>
      <span className={inverted ? 'text-white' : 'text-foreground'}>GarmentGate</span>
    </span>
  );
}
