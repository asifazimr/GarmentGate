import * as React from 'react';
import { cn } from 'cn';
import { fieldSurface } from './input';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        fieldSurface,
        'flex field-sizing-content min-h-24 w-full px-3 py-2.5 text-base leading-relaxed md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
