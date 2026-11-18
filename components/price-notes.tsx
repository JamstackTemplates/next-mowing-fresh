import { Children, type ReactNode } from 'react';

/** Prices page: small chalk-outlined panel for pricing rules (AUD, GST, quote confirmation). */
export function PriceNotes({ title, children }: { title: ReactNode; children: ReactNode }) {
  const items = Children.toArray(children);
  return (
    <section aria-labelledby="price-notes-title" className="pb-16 sm:pb-24">
      <div className="wrap">
        <div
          className="max-w-3xl rounded-[1.5rem] border-[3px] border-dashed border-accent bg-surface p-6 shadow-[0_18px_36px_-28px_var(--shadow)] sm:p-8"
        >
          <h2 id="price-notes-title" className="text-[clamp(1.25rem,2.4vw,1.65rem)]">{title}</h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5 text-muted">
                <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
