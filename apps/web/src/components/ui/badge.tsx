import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';

/**
 * Compact label. Tone variants (success, warning, info, progress, danger, neutral) are soft
 * backgrounds with high-contrast ink; StatusBadge maps every domain status onto them.
 */
const badgeVariants = cva(
  'group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-md border border-transparent px-2 text-xs font-medium whitespace-nowrap transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/90',
        brand: 'bg-primary-soft text-primary-ink',
        secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-muted',
        outline: 'border-border-strong bg-card text-foreground [a]:hover:bg-muted',
        code: 'border-border bg-surface font-mono text-[0.6875rem] tracking-wide text-foreground uppercase',
        neutral: 'bg-neutral-soft text-neutral-ink',
        success: 'bg-success-soft text-success-ink',
        warning: 'bg-warning-soft text-warning-ink',
        info: 'bg-info-soft text-info-ink',
        progress: 'bg-progress-soft text-progress-ink',
        danger: 'bg-danger-soft text-danger-ink',
        destructive: 'bg-danger-soft text-danger-ink',
        ghost: 'text-muted-foreground hover:bg-muted',
        link: 'text-primary-ink underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant = 'default',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  });
}

export { Badge, badgeVariants };
