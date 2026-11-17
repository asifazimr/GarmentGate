import { Cctv } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/** "Live cameras": the factory has GarmentGate-approved production cameras. */
export function LiveCamerasBadge({ className }: { className?: string }) {
  const t = useTranslations('monitoring');
  return (
    <Badge variant="info" className={cn('gap-1', className)} title={t('badgeHint')}>
      <Cctv aria-hidden="true" />
      {t('badge')}
    </Badge>
  );
}
