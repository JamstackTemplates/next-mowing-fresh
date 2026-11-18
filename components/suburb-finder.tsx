'use client';

import { useEffect, useId, useState, type ReactNode } from 'react';
import { ROUND_DAY_NAMES, suburbs } from '../content/suburbs';
import { lookupMessage, lookupSuburb } from '../lib/suburb-lookup';
import { PLOTS, SuburbMap } from './art/suburb-map';
import { SectionHeading } from './section-heading';
import { SiteLink } from './site-link';

/**
 * Suburbs page: two-column lookup (hidden without JS) paired with the schematic patchwork map.
 * Matching a served or waitlist suburb highlights its plot on the map.
 */
export function SuburbFinder({
  title,
  children,
  inputLabel,
  placeholder,
  quoteLabel,
}: {
  title: ReactNode;
  children?: ReactNode;
  inputLabel: ReactNode;
  placeholder: string;
  quoteLabel: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  const inputId = useId();
  const statusId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const result = lookupSuburb(query, suburbs);
  const activeId = result.kind === 'served' || result.kind === 'waitlist' ? result.suburb.id : undefined;
  const message = lookupMessage(result);
  const unplaced = suburbs.filter(suburb => !PLOTS[suburb.id]);

  return (
    <section aria-labelledby="lookup-title" className="py-16 sm:py-20">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
        <div>
          <SectionHeading id="lookup-title" title={title}>{children}</SectionHeading>

          {/* Progressive-enhanced lookup: hidden when JavaScript is unavailable. */}
          <div className={mounted ? 'mt-7' : 'hidden'}>
            <label htmlFor={inputId} className="block text-[.95rem] font-semibold">{inputLabel}</label>
            <div className="mt-2 flex flex-wrap gap-3">
              <input
                id={inputId}
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder={placeholder}
                aria-describedby={statusId}
                autoComplete="off"
                className="min-h-12 min-w-0 flex-1 rounded-xl border-2 border-line bg-surface px-4 py-2.5 text-[1.05rem] text-ink placeholder:text-muted/70"
              />
              {query.trim() ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="button button-quiet min-h-12 px-4 py-2 text-[.92rem]"
                >
                  Clear
                </button>
              ) : null}
            </div>

            <div
              id={statusId}
              role="status"
              aria-live="polite"
              className={`mt-4 rounded-2xl border-l-[6px] px-4 py-3.5 ${
                result.kind === 'served'
                  ? 'border-accent bg-surface-soft text-ink'
                  : result.kind === 'waitlist'
                    ? 'border-mower bg-surface text-ink'
                    : result.kind === 'unknown'
                      ? 'border-soil bg-surface text-ink'
                      : 'border-line bg-surface text-muted'
              }`}
            >
              <p className="font-medium">{message}</p>
              {result.kind !== 'empty' ? (
                <p className="mt-2">
                  <SiteLink href="/contact/" className="text-link">{quoteLabel}</SiteLink>
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <figure className="m-0">
            <SuburbMap
              suburbs={suburbs}
              activeId={activeId}
              className="h-auto w-full drop-shadow-[0_24px_38px_var(--shadow)]"
            />
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[.9rem] text-muted">
              <span>Striped plots are open rounds; shaggy plots are on the waitlist.</span>
              <span className="font-figures text-[.78rem]">12 inner-east suburbs</span>
            </figcaption>
          </figure>
          {unplaced.length ? (
            <ul className="mt-4 flex flex-wrap gap-2 text-[.9rem]">
              {unplaced.map(suburb => (
                <li key={suburb.id} className="rounded-full border border-line bg-surface px-3 py-1">
                  {suburb.name} ({suburb.postcode}) · {ROUND_DAY_NAMES[suburb.roundDay]}
                  {suburb.status === 'waitlist' ? ' · waitlist' : ''}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
