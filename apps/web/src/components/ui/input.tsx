import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cn } from 'cn';

/** Shared field chrome, also used by Textarea and SelectTrigger. */
export const fieldSurface =
  'rounded-lg border border-input bg-card shadow-xs transition-[border-color,box-shadow] duration-150 outline-none placeholder:text-subtle-foreground hover:border-border-strong focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/15 dark:bg-white/[0.03] dark:aria-invalid:ring-destructive/30';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        fieldSurface,
        // 16px text on mobile stops iOS zooming into the field.
        'h-11 w-full min-w-0 px-3 py-1 text-base md:h-9 md:text-sm',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
