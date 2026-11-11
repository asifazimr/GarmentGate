import { getTranslations } from 'next-intl/server';
import { CostCalculator } from '../components/cost-calculator';
import { PageHero, Section } from '../components/section';
import { publicPricing } from '../data';
import { estimateTerms } from '../terms';

export async function CalculatorPage() {
  const t = await getTranslations('marketing.calculator');
  const pricing = await publicPricing();
  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} body={t('hero.body')} />
      <Section>
        {pricing ? (
          <CostCalculator terms={estimateTerms(pricing)} />
        ) : (
          <p className="bg-warning-soft text-warning-ink rounded-xl px-5 py-4">
            {t('unavailable')}
          </p>
        )}
      </Section>
    </>
  );
}
