import type { ReactNode } from 'react';
import { bandRange, formatPrice, lawnBands } from '../content/prices';
import { LawnPlot, plotSide } from './art/lawn-plot';
import { SectionHeading } from './section-heading';
import { SiteLink } from './site-link';

/** Home: the five lawn sizes as plots rising like a skyline from a garden-edge baseline. */
export function PriceSkyline({ title, children, priceLabel, linkText }: {
  title: ReactNode; children?: ReactNode;
  /** Shown under each price, e.g. "weekly, a visit". */
  priceLabel: ReactNode;
  linkText: ReactNode;
}) {
  return (
    <section aria-labelledby="sizes-title" className="py-16 sm:py-24">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-end lg:gap-14">
        <div>
          <SectionHeading id="sizes-title" title={title}>{children}</SectionHeading>
          <p className="mt-7"><SiteLink href="/prices/" className="button button-quiet">{linkText}</SiteLink></p>
        </div>
        <div>
          <ul className="grid grid-cols-2 items-end gap-x-5 gap-y-9 [--plot-scale:.6] sm:flex sm:justify-between sm:gap-4 sm:[--plot-scale:.72] xl:[--plot-scale:1]">
            {lawnBands.map((band, index) => (
              <li key={band.id} className="flex flex-col items-start">
                <LawnPlot index={index} open={band.maxM2 === null} className="block h-auto" style={{ width: `calc(${plotSide(index) + 8}px * var(--plot-scale))` }} />
                <span aria-hidden="true" className="mt-2 block h-2.5 w-full min-w-16 rounded-full bg-soil" />
                <span className="mt-3 font-display text-[.98rem] font-bold">{band.label}</span>
                <span className="font-figures text-[.72rem] text-muted">{bandRange(band)}</span>
                <span className="font-figures mt-2 text-[1.6rem] leading-none font-bold">{formatPrice(band.weekly)}</span>
                {band.weekly !== null ? <span className="mt-1 text-[.85rem] text-muted">{priceLabel}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
