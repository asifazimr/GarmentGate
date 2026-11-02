import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'cn';
import { isValidElement, type ReactElement } from 'react';

/**
 * Sizes are mobile-first: `default`, `lg` and `icon` are 44px tall on touch screens and
 * compact from `md` up (CLAUDE.md: touch targets ≥ 44px).
 */
const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/40 active:not-aria-[haspopup]:not-disabled:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[var(--shadow-inset-highlight),var(--shadow-xs)] hover:bg-primary/90 focus-visible:ring-primary/35',
        outline:
          'border-border-strong bg-card text-foreground shadow-xs hover:border-border-strong hover:bg-muted aria-expanded:bg-muted dark:bg-card/60 dark:hover:bg-muted',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_6%)] aria-expanded:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_6%)]',
        ghost:
          'text-muted-foreground hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground',
        destructive:
          'bg-destructive text-white shadow-[var(--shadow-inset-highlight),var(--shadow-xs)] hover:bg-destructive/90 focus-visible:ring-destructive/30',
        'destructive-soft':
          'bg-danger-soft text-danger-ink hover:bg-[color-mix(in_oklch,var(--danger-soft),var(--destructive)_10%)] focus-visible:ring-destructive/25',
        link: 'h-auto! px-0! text-primary-ink underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-4 md:h-9 md:px-3.5',
        xs: "h-7 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 rounded-md px-3 text-[0.8125rem] md:h-8 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-12 px-5 text-[0.9375rem] md:h-11',
        icon: 'size-11 md:size-9',
        'icon-xs': "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        'icon-sm': 'size-9 rounded-md md:size-8',
        'icon-lg': 'size-12 md:size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant = 'default',
  size = 'default',
  render,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));
  if (isValidElement(render)) {
    return <ButtonAs render={render} className={classes} {...props} />;
  }
  return <ButtonPrimitive data-slot="button" className={classes} render={render} {...props} />;
}

/**
 * Button styling on another element, usually a <Link>. Deliberately not the Button primitive:
 * that would add role="button" and make screen readers announce a link as a button.
 */
function ButtonAs({
  render,
  className,
  children,
  disabled,
  ...rest
}: Omit<ButtonProps, 'variant' | 'size'> & { render: ReactElement }) {
  return useRender({
    render,
    props: {
      // Accessible names, ids, titles and handlers reach the link (e.g. icon-only links).
      ...domProps(rest),
      className: typeof className === 'string' ? className : undefined,
      children: typeof children === 'function' ? undefined : children,
      ...(disabled && { 'aria-disabled': true, tabIndex: -1 }),
    },
    state: { slot: 'button' },
  });
}

/** The props that make sense on any element: aria-*, data-*, id, title, handlers. */
function domProps(props: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(props).filter(
      ([key]) =>
        key.startsWith('aria-') ||
        key.startsWith('data-') ||
        /^on[A-Z]/.test(key) ||
        key === 'id' ||
        key === 'title' ||
        key === 'tabIndex',
    ),
  );
}

export { Button, buttonVariants };
