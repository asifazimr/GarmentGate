import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Reveal } from '../reveal';
import { DeepBackdrop } from './section';

/** The closing call to action on every page. */
export function CtaBand({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24">
      <Reveal className="bg-brand-deep relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-6 py-16 text-center text-white sm:px-12 sm:py-20">
        <DeepBackdrop />
        <div className="relative">
          <h2 className="font-display text-[2.25rem] leading-tight text-balance sm:text-display-lg">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">{body}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-white text-[oklch(0.25_0.04_192)] hover:bg-white/90"
              render={<Link href={primary.href} />}
            >
              {primary.label}
              <ArrowRight />
            </Button>
            {secondary ? (
              <Button
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/5 text-white hover:bg-white/10 dark:bg-white/5"
                render={<Link href={secondary.href} />}
              >
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
