'use client';

import { BadgeCheck, Handshake, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/logo';

const POINTS = [
  { key: 'verified', Icon: BadgeCheck },
  { key: 'escrow', Icon: ShieldCheck },
  { key: 'managed', Icon: Handshake },
] as const;

/** Left half of the split-screen auth layout (hidden on small screens). */
export function BrandPanel() {
  const t = useTranslations('brand');
  return (
    <aside className="relative hidden overflow-hidden bg-[oklch(0.33_0.06_190)] text-white lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
      {/* Woven-thread texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, white 0 1px, transparent 1px 14px), repeating-linear-gradient(-45deg, white 0 1px, transparent 1px 14px)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-32 -top-32 size-[28rem] rounded-full bg-[oklch(0.6_0.12_180)] opacity-30 blur-3xl"
      />

      <Logo inverted className="relative text-lg" />

      <div className="relative max-w-lg space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="space-y-4"
        >
          <h2 className="text-4xl leading-tight font-semibold tracking-tight text-balance xl:text-5xl">
            {t('headline')}
          </h2>
          <p className="text-lg text-white/75">{t('subhead')}</p>
        </motion.div>

        <ul className="space-y-6">
          {POINTS.map(({ key, Icon }, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
              className="flex gap-4"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-medium">{t(`points.${key}.title`)}</p>
                <p className="text-sm text-white/70">{t(`points.${key}.body`)}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <p className="relative text-sm text-white/60">{t('stat')}</p>
    </aside>
  );
}
