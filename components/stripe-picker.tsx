import type { ReactNode } from 'react';
import { minBandLabel, patterns, surchargeLabel } from '../content/patterns';
import { Mower } from './art/mower';

/**
 * The signature stripe band and its pattern picker. A native radio group: CSS :has() swaps the mown
 * layer (and the mower makes one pass) with no JavaScript. Without :has() support the band stays
 * straight and every pattern's description is listed. Give each instance a unique `name`.
 */
export function StripePicker({ name, legend, children, compact = false }: {
  name: string;
  /** Visible heading that labels the radio group. */
  legend: ReactNode;
  /** Optional copy under the legend. */
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <div role="radiogroup" aria-labelledby={`${name}-label`} className="stripe-picker">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className={`relative overflow-hidden rounded-[1.75rem] border-4 shadow-[0_24px_48px_-28px_var(--shadow)] lg:col-span-8 ${compact ? 'aspect-[16/7]' : 'aspect-[16/9] sm:aspect-[16/7.5]'}`} style={{ borderColor: 'var(--art-ink)' }}>
          <div className="shaggy absolute inset-0" />
          {patterns.map(pattern => (
            <div key={pattern.id} data-pattern={pattern.id} className={`picker-layer lawn lawn--${pattern.id} [--stripe-w:clamp(1.8rem,4vw,3.4rem)]`}>
              <Mower rotate={90} className="picker-mower h-auto" />
            </div>
          ))}
          <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-[1.2rem] border-[3px] border-chalk/85 sm:inset-5" />
        </div>
        <div className="lg:col-span-4 lg:pb-2">
          <h2 id={`${name}-label`} className="text-[clamp(1.75rem,3.6vw,2.9rem)]">{legend}</h2>
          {children ? <div className="pt-4 text-[1.05rem] text-muted">{children}</div> : null}
          <div className="mt-5 grid gap-2" aria-live="polite">
            {patterns.map(pattern => (
              <p key={pattern.id} data-pattern-note={pattern.id} className="rounded-2xl border-l-[6px] border-mower bg-surface px-4 py-3">
                <strong className="block font-display text-[1.05rem]">{pattern.name}</strong>
                <span className="mt-1 block">{pattern.description}</span>
                <span className="font-figures mt-2 block text-[.8rem] text-muted">{surchargeLabel(pattern)} · {minBandLabel(pattern)}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {patterns.map(pattern => (
          <label key={pattern.id} className="picker-option flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-line bg-surface-soft p-2.5 pr-3 transition-colors hover:border-accent">
            <input type="radio" name={name} value={pattern.id} defaultChecked={pattern.id === 'straight'} className="sr-only" />
            <span aria-hidden="true" className={`lawn lawn--${pattern.id} size-12 shrink-0 rounded-xl border-2 [--stripe-w:.55rem] sm:size-14`} style={{ borderColor: 'var(--art-ink)' }} />
            <span className="min-w-0">
              <span className="block font-semibold leading-tight">{pattern.name}</span>
              <span className="font-figures mt-1 block text-[.72rem] text-muted">{pattern.surcharge ? `+$${pattern.surcharge}` : 'Included'}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
