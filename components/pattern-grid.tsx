import type { ReactNode } from 'react';
import { minBandLabel, patterns, surchargeLabel } from '../content/patterns';
import { SectionHeading } from './section-heading';

/** Prices page: 2×2 tile grid of stripe pattern swatches with surcharge and minimum lawn size. */
export function PatternGrid({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <section aria-labelledby="patterns-title" className="bg-surface-soft py-16 sm:py-24">
      <div className="wrap">
        <SectionHeading id="patterns-title" title={title}>{children}</SectionHeading>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {patterns.map(pattern => (
            <li
              key={pattern.id}
              className="flex flex-col gap-5 rounded-[1.5rem] border-[3px] bg-surface p-5 shadow-[0_18px_36px_-28px_var(--shadow)] sm:flex-row sm:items-center sm:p-6"
              style={{ borderColor: 'var(--art-ink)' }}
            >
              <div
                aria-hidden="true"
                className={`lawn lawn--${pattern.id} relative size-28 shrink-0 overflow-hidden rounded-2xl border-[3px] [--stripe-w:1.15rem] sm:size-32`}
                style={{ borderColor: 'var(--art-ink)' }}
              >
                <div className="pointer-events-none absolute inset-2 rounded-lg border-2 border-chalk/85" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[1.25rem]">{pattern.name}</h3>
                  <span className="font-figures rounded-full bg-surface-soft px-3 py-1 text-[.82rem] font-bold">
                    {surchargeLabel(pattern)}
                  </span>
                </div>
                <p className="mt-2 text-muted">{pattern.description}</p>
                <p className="font-figures mt-3 text-[.8rem] font-semibold text-accent-ink">{minBandLabel(pattern)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
