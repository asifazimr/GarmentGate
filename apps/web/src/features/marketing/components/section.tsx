import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '../reveal';

/** A page band with the standard width and rhythm. `tone` sets the surface. */
export function Section({
  children,
  id,
  tone = 'plain',
  className,
}: {
  children: ReactNode;
  id?: string;
  tone?: 'plain' | 'surface' | 'deep';
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative scroll-mt-24 lg:scroll-mt-36',
        tone === 'surface' && 'bg-surface border-y',
        tone === 'deep' && 'bg-brand-deep overflow-hidden text-white',
        className,
      )}
    >
      {tone === 'deep' ? <DeepBackdrop /> : null}
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">{children}</div>
    </section>
  );
}

/** Woven grid and a soft glow on the dark brand surface. */
export function DeepBackdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div
        aria-hidden="true"
        className="bg-primary absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
      />
    </>
  );
}

/** Eyebrow, title and intro for a section. `inverted` for dark bands. */
export function SectionHeading({
  eyebrow,
  title,
  body,
  inverted = false,
  center = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  inverted?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn('max-w-2xl', center && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p
          className={cn(
            'font-mono text-xs tracking-[0.14em] uppercase',
            inverted ? 'text-brand-gold' : 'text-primary-ink',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display mt-3 text-[2.25rem] leading-[1.08] tracking-[-0.015em] text-balance sm:text-display-lg">
        {title}
      </h2>
      {body ? (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed text-pretty',
            inverted ? 'text-white/70' : 'text-muted-foreground',
          )}
        >
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}

/** The top band of an inner page: eyebrow, serif headline, intro and actions. */
export function PageHero({
  eyebrow,
  title,
  body,
  actions,
  aside,
}: {
  eyebrow: string;
  title: string;
  body: string;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div
        aria-hidden="true"
        className="bg-primary/20 pointer-events-none absolute -top-24 -end-24 size-96 rounded-full blur-3xl"
      />
      <div
        className={cn(
          'relative mx-auto grid max-w-6xl gap-12 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-24',
          aside && 'lg:grid-cols-[1.15fr_1fr] lg:items-center',
        )}
      >
        <div>
          <Reveal above>
            <p className="text-primary-ink font-mono text-xs tracking-[0.14em] uppercase">
              {eyebrow}
            </p>
          </Reveal>
          <Reveal above delay={0.05}>
            <h1 className="font-display mt-4 text-[2.75rem] leading-[1.02] tracking-[-0.02em] text-balance sm:text-display-xl">
              {title}
            </h1>
          </Reveal>
          <Reveal above delay={0.1}>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed text-pretty">
              {body}
            </p>
          </Reveal>
          {actions ? (
            <Reveal above delay={0.15} className="mt-9 flex flex-col gap-3 sm:flex-row">
              {actions}
            </Reveal>
          ) : null}
        </div>
        {aside}
      </div>
    </section>
  );
}
