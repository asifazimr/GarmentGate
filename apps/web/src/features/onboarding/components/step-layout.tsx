import { useTranslations } from 'next-intl';

export function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="space-y-2">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="text-muted-foreground">{subtitle}</p>
    </header>
  );
}

export function OptionalTag() {
  const t = useTranslations('common');
  return <span className="text-muted-foreground ms-1 text-xs font-normal">({t('optional')})</span>;
}
