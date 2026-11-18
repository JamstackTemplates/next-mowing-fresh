import type { ReactNode } from 'react';
import { addons } from '../content/addons';
import { formatPrice } from '../content/prices';
import { Icon } from './art/icons';
import { SectionHeading } from './section-heading';

/** Prices page: optional add-ons hung along a shed pegboard tool rail. */
export function AddonsRack({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <section aria-labelledby="addons-title" className="py-16 sm:py-24">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-start lg:gap-14">
        <SectionHeading id="addons-title" title={title}>{children}</SectionHeading>

        <div
          className="pegboard relative overflow-hidden rounded-[1.5rem] border-[3px] p-5 shadow-[0_24px_44px_-30px_var(--shadow)] sm:p-7"
          style={{ borderColor: 'var(--art-ink)' }}
        >
          {/* Wooden/steel rail the tools hang from */}
          <div aria-hidden="true" className="mb-5 h-3.5 rounded-full border-2 bg-soil shadow-sm" style={{ borderColor: 'var(--art-ink)' }} />
          <ul className="space-y-3">
            {addons.map(addon => (
              <li
                key={addon.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 bg-surface px-4 py-3.5 shadow-[0_6px_14px_-10px_var(--shadow)]"
                style={{ borderColor: 'var(--art-ink)' }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="grid size-12 shrink-0 place-items-center rounded-xl border-2 bg-surface-soft text-ink"
                    style={{ borderColor: 'var(--art-ink)' }}
                  >
                    <Icon name={addon.icon} className="size-7" />
                  </span>
                  <div>
                    <p className="font-display text-[1.05rem] font-bold leading-snug">{addon.name}</p>
                    <p className="text-[.9rem] text-muted">{addon.unit}</p>
                  </div>
                </div>
                <p className="font-figures rounded-xl bg-surface-soft px-3.5 py-1.5 text-[1.05rem] font-bold">
                  from {formatPrice(addon.price)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
