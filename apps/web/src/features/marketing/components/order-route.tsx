import { ClipboardCheck, Factory, MapPin, Warehouse } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const STOPS = [
  { key: 'factory', Icon: Factory },
  { key: 'qc', Icon: ClipboardCheck },
  { key: 'hub', Icon: Warehouse },
  { key: 'you', Icon: MapPin },
] as const;

/** "Order in motion": a parcel travelling factory → QC → hub → you (static under reduced motion). */
export async function OrderRoute() {
  const t = await getTranslations('marketing.home.hero.route');
  return (
    <div className="mt-10 max-w-xl" aria-hidden="true">
      <style>{`@keyframes gg-route { 0% { inset-inline-start: 0% } 85%, 100% { inset-inline-start: calc(100% - 0.75rem) } }`}</style>
      <div className="relative mx-5 h-px bg-[repeating-linear-gradient(90deg,var(--border-strong)_0_6px,transparent_6px_12px)]">
        <span className="bg-primary absolute top-1/2 inset-s-0 size-3 -translate-y-1/2 rounded-sm shadow-[0_0_16px] shadow-primary motion-safe:animate-[gg-route_4.5s_var(--ease-out-expo)_infinite]" />
      </div>
      <ol className="-mt-5 flex justify-between">
        {STOPS.map(({ key, Icon }) => (
          <li key={key} className="flex w-10 flex-col items-center gap-2">
            <span className="bg-card text-primary-ink flex size-10 items-center justify-center rounded-full border shadow-xs">
              <Icon className="size-4" />
            </span>
            <span className="text-muted-foreground font-mono text-[0.6875rem] tracking-wide uppercase">
              {t(key)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
