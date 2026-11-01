import { cn } from 'cn';

/** Loading placeholder with a soft shimmer (static under prefers-reduced-motion). */
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(
        'animate-shimmer rounded-md bg-muted bg-[linear-gradient(90deg,transparent_25%,color-mix(in_oklch,var(--foreground)_6%,transparent)_50%,transparent_75%)] bg-size-[200%_100%] motion-reduce:animate-none',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
