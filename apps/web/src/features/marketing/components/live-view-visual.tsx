import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';

const TEE = 'M0 7 L9 0 L15 3 L21 0 L30 7 L26 13 L23 11 L23 32 L7 32 L7 11 L4 13 Z';
/** One belt's worth of garments, drawn twice so the loop is seamless. */
const GARMENTS = [0, 80, 160, 240, 320, 400, 480, 560];

/**
 * An illustrated live camera view of a sewing line, framed like the buyer's player (order
 * code, camera number, "Live"). Never real footage: even approved video could identify a
 * factory. The belt moves only for people who haven't asked for reduced motion.
 */
export async function LiveViewVisual({ className }: { className?: string }) {
  const t = await getTranslations('marketing.liveView.visual');
  const areas = [t('areas.cutting'), t('areas.sewing'), t('areas.packing')];
  return (
    <figure
      className={cn('bg-card overflow-hidden rounded-2xl border shadow-xl', className)}
      aria-label={t('label')}
    >
      <div className="bg-brand-deep relative aspect-video overflow-hidden">
        <svg viewBox="0 0 640 360" className="absolute inset-0 size-full" aria-hidden="true">
          {/* Ceiling lights and floor */}
          {[100, 260, 420, 580].map((x) => (
            <g key={x}>
              <rect x={x - 40} y={18} width={80} height={6} rx={3} className="fill-white/40" />
              <path
                d={`M${x - 40} 24 L${x - 90} 150 L${x + 90} 150 L${x + 40} 24 Z`}
                className="fill-white/[0.04]"
              />
            </g>
          ))}
          <rect x={0} y={250} width={640} height={110} className="fill-black/25" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <line
              key={i}
              x1={320}
              y1={250}
              x2={-160 + i * 120}
              y2={360}
              className="stroke-white/[0.06]"
              strokeWidth={1}
            />
          ))}
          {/* Sewing tables with machines */}
          {[70, 230, 390, 550].map((x) => (
            <g key={x}>
              <rect x={x - 55} y={150} width={110} height={10} rx={2} className="fill-white/25" />
              <rect x={x - 48} y={160} width={6} height={70} className="fill-white/15" />
              <rect x={x + 42} y={160} width={6} height={70} className="fill-white/15" />
              <path
                d={`M${x - 30} 150 L${x - 30} 122 Q${x - 30} 112 ${x - 20} 112 L${x + 22} 112 Q${x + 30} 112 ${x + 30} 120 L${x + 30} 135 L${x + 20} 135 L${x + 20} 150 Z`}
                className="fill-primary"
              />
              <rect x={x + 18} y={135} width={4} height={10} className="fill-brand-gold" />
              <circle cx={x - 20} cy={124} r={4} className="fill-white/60" />
            </g>
          ))}
          {/* Conveyor belt and garments */}
          <rect x={0} y={258} width={640} height={26} className="fill-black/40" />
          <rect x={0} y={256} width={640} height={4} className="fill-white/30" />
          <rect x={0} y={284} width={640} height={3} className="fill-white/20" />
          <g className="animate-belt motion-reduce:animate-none">
            {[...GARMENTS, ...GARMENTS.map((x) => x + 640)].map((x, i) => (
              <path
                key={x}
                d={TEE}
                transform={`translate(${String(x + 20)} 222) scale(1.1)`}
                className={i % 3 === 1 ? 'fill-brand-gold/90' : 'fill-white/85'}
              />
            ))}
          </g>
          {/* Fabric bundles in front */}
          {[40, 300, 560].map((x) => (
            <g key={x}>
              <rect x={x} y={305} width={70} height={16} rx={4} className="fill-primary/80" />
              <rect x={x + 6} y={292} width={58} height={14} rx={4} className="fill-white/30" />
            </g>
          ))}
        </svg>
        <span className="absolute start-3 top-3 rounded bg-black/60 px-2 py-0.5 font-mono text-xs text-white">
          {t('overlay')}
        </span>
        <span className="absolute end-3 top-3 flex items-center gap-1.5 rounded bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
          <span className="bg-destructive size-2 animate-pulse rounded-full motion-reduce:animate-none" />
          {t('live')}
        </span>
        <span className="absolute end-3 bottom-3 rounded bg-black/50 px-2 py-0.5 text-[0.6875rem] text-white/70">
          {t('illustration')}
        </span>
      </div>
      <figcaption className="flex flex-wrap items-center gap-2 p-4">
        {areas.map((area, i) => (
          <span
            key={area}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm',
              i === 1
                ? 'border-primary/40 bg-primary-soft text-primary-ink'
                : 'text-muted-foreground',
            )}
          >
            <span
              className={cn('size-2 rounded-full', i === 2 ? 'bg-neutral-ink/40' : 'bg-success')}
              aria-hidden="true"
            />
            {t('camera', { number: i + 1 })} · {area}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
