import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Appear } from './appear';

/**
 * Shown when a list has nothing in it. Always say what to do next, and include the primary
 * action when there is one (CLAUDE.md UX rule).
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  size = 'default',
  className,
}: {
  icon: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  size?: 'default' | 'compact';
  className?: string;
}) {
  return (
    <Appear
      className={cn(
        'flex flex-col items-center justify-center text-center',
        size === 'default'
          ? 'bg-card rounded-2xl border border-dashed px-6 py-14 sm:py-20'
          : 'px-4 py-10',
        className,
      )}
    >
      <div className="relative mb-5" aria-hidden="true">
        {/* Concentric rings: quiet, on-brand texture instead of an illustration. */}
        <span className="border-border/70 absolute inset-[-14px] rounded-full border" />
        <span className="border-border/40 absolute inset-[-28px] rounded-full border" />
        <span className="bg-primary-soft text-primary-ink relative flex size-12 items-center justify-center rounded-full shadow-xs">
          <Icon className="size-5" />
        </span>
      </div>
      <h3 className="mt-2 text-base font-semibold tracking-[-0.01em]">{title}</h3>
      {description ? (
        <p className="text-muted-foreground mt-1.5 max-w-sm text-sm leading-relaxed text-pretty">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6 flex flex-wrap justify-center gap-2">{action}</div> : null}
    </Appear>
  );
}
