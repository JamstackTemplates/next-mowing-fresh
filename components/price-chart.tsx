'use client';

import { useEffect, useId, useState, type ReactNode } from 'react';
import { bandRange, formatPrice, lawnBands } from '../content/prices';
import { bandForArea, lawnArea, lawnSizeMessage } from '../lib/lawn-size';
import { LawnPlot } from './art/lawn-plot';
import { SectionHeading } from './section-heading';

/**
 * Groundskeeper's price chart with a measuring-tape m² rail and a progressive-enhanced lawn-size
 * helper. Without JavaScript the helper stays hidden and the band descriptions guide the choice.
 */
export function PriceChart({
  title,
  children,
  helperTitle,
  helperNote,
}: {
  title: ReactNode;
  children?: ReactNode;
  helperTitle: ReactNode;
  helperNote: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [lengthInput, setLengthInput] = useState('');
  const [widthInput, setWidthInput] = useState('');
  const lengthId = useId();
  const widthId = useId();
  const statusId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const length = lengthInput.trim() ? Number(lengthInput) : Number.NaN;
  const width = widthInput.trim() ? Number(widthInput) : Number.NaN;
  const area = lawnArea(length, width);
  const matched = area !== null ? bandForArea(area, lawnBands) : null;
  const message = lawnSizeMessage(area, lawnBands);
  const hasInputs = Boolean(lengthInput.trim() || widthInput.trim());

  return (
    <section aria-labelledby="price-chart-title" className="py-16 sm:py-24">
      <div className="wrap">
        <SectionHeading id="price-chart-title" title={title}>{children}</SectionHeading>

        {/* Progressive-enhanced calculator: hidden without JS, never submits anything. */}
        <fieldset
          aria-describedby={statusId}
          className={mounted ? 'mt-10 rounded-[1.5rem] border-[3px] bg-surface p-5 shadow-[0_18px_36px_-26px_var(--shadow)] sm:p-7' : 'hidden'}
          style={{ borderColor: 'var(--art-ink)' }}
        >
          <legend className="font-display px-2 text-[1.1rem] font-bold">{helperTitle}</legend>
          <p className="text-muted">{helperNote}</p>
          <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-end gap-2.5 sm:flex sm:flex-wrap sm:items-end sm:gap-4">
            <div className="min-w-0 sm:flex-none">
              <label htmlFor={lengthId} className="block text-[.92rem] font-semibold">Length (m)</label>
              <input
                id={lengthId}
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={lengthInput}
                onChange={event => setLengthInput(event.target.value)}
                placeholder="e.g. 16"
                className="font-figures mt-1.5 min-h-11 w-full rounded-xl border-2 border-line bg-bg px-3.5 py-2 text-[1.05rem] text-ink placeholder:text-muted/70 sm:w-40"
              />
            </div>
            <span aria-hidden="true" className="font-figures pb-2.5 text-xl font-bold text-muted">×</span>
            <div className="min-w-0 sm:flex-none">
              <label htmlFor={widthId} className="block text-[.92rem] font-semibold">Width (m)</label>
              <input
                id={widthId}
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={widthInput}
                onChange={event => setWidthInput(event.target.value)}
                placeholder="e.g. 12"
                className="font-figures mt-1.5 min-h-11 w-full rounded-xl border-2 border-line bg-bg px-3.5 py-2 text-[1.05rem] text-ink placeholder:text-muted/70 sm:w-40"
              />
            </div>
            {hasInputs ? (
              <button
                type="button"
                onClick={() => { setLengthInput(''); setWidthInput(''); }}
                className="button button-quiet col-span-3 min-h-11 justify-self-start px-4 py-2 text-[.92rem] sm:col-auto"
              >
                Clear
              </button>
            ) : null}
          </div>
          <p
            id={statusId}
            role="status"
            aria-live="polite"
            className={`mt-5 rounded-xl border-l-[6px] px-4 py-3 text-[1rem] font-medium ${matched ? 'border-mower bg-surface-soft text-ink' : 'border-line bg-bg text-muted'}`}
          >
            {message}
          </p>
        </fieldset>

        {/* Groundskeeper's measuring chart: tape rule on the left, semantic table on the right. */}
        <div
          className="mt-8 flex overflow-hidden rounded-[1.5rem] border-[3px] bg-surface-soft shadow-[0_24px_48px_-32px_var(--shadow)]"
          style={{ borderColor: 'var(--art-ink)' }}
        >
          <div aria-hidden="true" className="tape-rule relative flex w-8 shrink-0 flex-col items-center justify-between border-r-[3px] py-3 text-[#10261a] sm:w-11" style={{ borderColor: 'var(--art-ink)' }}>
            <span className="font-figures rounded bg-[#f2b705]/90 px-1 text-[.68rem] font-bold">m²</span>
            <span className="font-figures rounded bg-[#f2b705]/90 px-1 text-[.65rem] font-bold">1000+</span>
          </div>

          <div className="price-chart-wrap min-w-0 flex-1">
            <table
              className="price-table w-full border-collapse text-left"
              style={{ '--col-weekly': '"Weekly"', '--col-fortnightly': '"Fortnightly"', '--col-oneoff': '"One-off"' } as React.CSSProperties}
            >
              <caption className="sr-only">Mowing prices by lawn size in Australian dollars, GST included</caption>
              <thead>
                <tr className="border-b-2 border-line bg-bg text-[.85rem] font-bold uppercase tracking-[.06em] text-muted">
                  <th scope="col" className="px-4 py-4 sm:px-6">Lawn size</th>
                  <th scope="col" className="px-4 py-4 text-right">Weekly</th>
                  <th scope="col" className="px-4 py-4 text-right">Fortnightly</th>
                  <th scope="col" className="px-4 py-4 pr-6 text-right">One-off</th>
                </tr>
              </thead>
              <tbody>
                {lawnBands.map((band, index) => {
                  const isMatch = matched?.id === band.id;
                  return (
                    <tr
                      key={band.id}
                      className="band-row border-b border-line/80 transition-colors last:border-b-0"
                      data-match={isMatch ? 'true' : undefined}
                    >
                      <th scope="row" className="px-4 py-5 font-normal sm:px-6">
                        <div className="flex items-start gap-4">
                          <LawnPlot
                            index={index}
                            open={band.maxM2 === null}
                            className="mt-0.5 w-14 shrink-0 sm:w-16"
                          />
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                              <span className="font-display text-[1.12rem] font-bold">{band.label}</span>
                              <span className="font-figures rounded-md bg-bg px-2 py-0.5 text-[.78rem] font-semibold text-muted">{bandRange(band)}</span>
                              {isMatch ? (
                                <span className="rounded-full bg-mower px-2.5 py-0.5 text-[.75rem] font-bold text-[#10261a]">Your lawn</span>
                              ) : null}
                            </div>
                            <p className="mt-1 text-[.95rem] text-muted">{band.example}</p>
                          </div>
                        </div>
                      </th>
                      <td data-col="weekly" className="font-figures px-4 py-5 text-right text-[1.25rem] font-bold whitespace-nowrap">
                        {formatPrice(band.weekly)}
                      </td>
                      <td data-col="fortnightly" className="font-figures px-4 py-5 text-right text-[1.15rem] font-semibold whitespace-nowrap">
                        {formatPrice(band.fortnightly)}
                      </td>
                      <td data-col="oneoff" className="font-figures px-4 py-5 pr-6 text-right text-[1.08rem] font-medium text-muted whitespace-nowrap">
                        {formatPrice(band.oneOff)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
