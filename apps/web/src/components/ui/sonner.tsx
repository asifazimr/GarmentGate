'use client';

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = (props: ToasterProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      className="toaster group"
      gap={10}
      icons={{
        success: <CircleCheckIcon className="text-success size-4" />,
        info: <InfoIcon className="text-info size-4" />,
        warning: <TriangleAlertIcon className="text-warning size-4" />,
        error: <OctagonXIcon className="text-destructive size-4" />,
        loading: <Loader2Icon className="text-muted-foreground size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'group/toast !items-start !gap-3 !rounded-xl !border !border-border !bg-popover !px-4 !py-3.5 !text-popover-foreground !shadow-lg',
          title: '!text-sm !font-medium',
          description: '!text-[0.8125rem] !text-muted-foreground',
          icon: '!mt-0.5',
          actionButton: '!rounded-md !bg-primary !text-primary-foreground !text-xs !font-medium',
          cancelButton: '!rounded-md !bg-muted !text-foreground !text-xs',
          closeButton: '!border-border !bg-popover !text-muted-foreground hover:!text-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
