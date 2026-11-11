import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/features/marketing/metadata';
import { CalculatorPage } from '@/features/marketing/pages/calculator';

export async function generateMetadata() {
  const t = await getTranslations('marketing.calculator.meta');
  return pageMetadata(t('title'), t('description'), '/tools/cost-calculator');
}

export default function Page() {
  return <CalculatorPage />;
}
