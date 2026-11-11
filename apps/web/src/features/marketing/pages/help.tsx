import {
  ArrowRight,
  ClipboardCheck,
  Compass,
  Factory,
  type LucideIcon,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UserCog,
  Wallet,
  Warehouse,
} from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Faq } from '../components/faq';
import { type HelpEntry, HelpSearch } from '../components/help-search';
import { HELP_TOPICS, type HelpTopic } from '../components/links';
import { PageHero, Section } from '../components/section';
import { sectionList } from '../data';
import { Reveal } from '../reveal';

export const HELP_ICONS: Record<HelpTopic, LucideIcon> = {
  'getting-started': Compass,
  buyers: ShoppingBag,
  manufacturers: Factory,
  payments: Wallet,
  quality: ClipboardCheck,
  shipping: Truck,
  inspectors: ShieldCheck,
  partners: Warehouse,
  account: UserCog,
};

async function topicItems(topic: HelpTopic) {
  const t = await getTranslations('marketing.help.topics');
  return sectionList.parse(t.raw(`${topic}.items`)).map(([q, a]) => ({ q, a }));
}

/** Still stuck? Support links shown under every help page. */
async function StillStuck() {
  const t = await getTranslations('marketing');
  return (
    <Reveal className="bg-surface mt-12 flex flex-col gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div>
        <h2 className="text-lg font-semibold">{t('help.stillStuck.title')}</h2>
        <p className="text-muted-foreground mt-1 max-w-xl text-sm">{t('help.stillStuck.body')}</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button variant="outline" render={<Link href="/login" />}>
          {t('nav.signIn')}
        </Button>
        <Button render={<Link href="/contact?topic=SUPPORT" />}>
          {t('common.contactSupport')}
        </Button>
      </div>
    </Reveal>
  );
}

export async function HelpPage() {
  const t = await getTranslations('marketing.help');
  const entries: HelpEntry[] = [];
  for (const topic of HELP_TOPICS)
    for (const { q, a } of await topicItems(topic))
      entries.push({ topic, topicTitle: t(`topics.${topic}.title`), q, a });
  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} body={t('hero.body')} />
      <Section>
        <HelpSearch entries={entries} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HELP_TOPICS.map((topic, i) => {
            const Icon = HELP_ICONS[topic];
            const count = entries.filter((e) => e.topic === topic).length;
            return (
              <li key={topic}>
                <Reveal delay={(i % 3) * 0.04} className="h-full">
                  <Link
                    href={`/help/${topic}`}
                    className="bg-card hover:border-border-strong group flex h-full gap-4 rounded-2xl border p-5 shadow-xs transition-[border-color,box-shadow] outline-none hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/40"
                  >
                    <span className="bg-primary-soft text-primary-ink flex size-10 shrink-0 items-center justify-center rounded-xl">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2 font-semibold">
                        {t(`topics.${topic}.title`)}
                        <ArrowRight
                          className="text-muted-foreground size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-muted-foreground mt-1 block text-sm">
                        {t(`topics.${topic}.body`)}
                      </span>
                      <span className="text-subtle-foreground mt-2 block font-mono text-xs">
                        {t('topicCount', { count })}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <StillStuck />
      </Section>
    </>
  );
}

export async function HelpTopicPage({ topic }: { topic: HelpTopic }) {
  const t = await getTranslations('marketing.help');
  const Icon = HELP_ICONS[topic];
  const items = await topicItems(topic);
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[15rem_minmax(0,1fr)]">
      <nav aria-label={t('hero.eyebrow')} className="lg:sticky lg:top-24 lg:self-start">
        <Link
          href="/help"
          className="text-primary-ink mb-3 inline-block text-sm font-medium hover:underline"
        >
          ← {t('back')}
        </Link>
        <ul className="grid gap-1 text-sm">
          {HELP_TOPICS.map((tp) => (
            <li key={tp}>
              <Link
                href={`/help/${tp}`}
                aria-current={tp === topic ? 'page' : undefined}
                className={
                  tp === topic
                    ? 'bg-primary-soft text-primary-ink block rounded-md px-3 py-2 font-medium'
                    : 'text-muted-foreground hover:bg-surface block rounded-md px-3 py-2'
                }
              >
                {t(`topics.${tp}.title`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="min-w-0">
        <span className="bg-primary-soft text-primary-ink flex size-12 items-center justify-center rounded-xl">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <h1 className="font-display mt-5 text-display-lg">{t(`topics.${topic}.title`)}</h1>
        <p className="text-muted-foreground mt-2 text-lg">{t(`topics.${topic}.body`)}</p>
        <div className="mt-10">
          <Faq items={items} />
        </div>
        <StillStuck />
      </div>
    </div>
  );
}
