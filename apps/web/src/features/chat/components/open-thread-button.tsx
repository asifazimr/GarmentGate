'use client';

import type { OpenConversationDto } from '@garmentgate/shared';
import { MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useOpenConversation } from '../api';

/** "Message GarmentGate" about an RFQ or order: opens (or creates) that thread. */
export function OpenThreadButton({
  target,
  base,
  variant = 'outline',
  className,
  label,
}: {
  label?: string;
  target: OpenConversationDto;
  base: '/buyer' | '/manufacturer' | '/admin';
  variant?: 'outline' | 'default' | 'ghost';
  className?: string;
}) {
  const t = useTranslations('chat');
  const router = useRouter();
  const open = useOpenConversation();
  return (
    <Button
      variant={variant}
      className={className}
      disabled={open.isPending}
      onClick={() =>
        open.mutate(target, {
          onSuccess: (c) => router.push(`${base}/messages/${c.id}`),
          onError: () => toast.error(t('failed')),
        })
      }
    >
      <MessageSquare />
      {label ?? (base === '/admin' ? t('openThread') : t('messageUs'))}
    </Button>
  );
}
