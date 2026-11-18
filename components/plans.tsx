import type { ReactNode } from 'react';
import { plans, type Plan } from '../content/plans';
import { PlanCalendar } from './art/plan-calendar';
import { SectionHeading } from './section-heading';
import { SiteLink } from './site-link';

/** Home: the two plans as an offset pair of calendars on the soft-green surface. */
export function PlansPair({ title, children, linkText }: { title: ReactNode; children?: ReactNode; linkText: ReactNode }) {
  const [weekly, fortnightly] = plans;
  return (
    <section aria-labelledby="plans-title" className="bg-surface-soft py-16 sm:py-24">
      <div className="wrap">
        <SectionHeading id="plans-title" title={title}>{children}</SectionHeading>
        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="relative lg:col-span-6">
            <div data-art aria-hidden="true" className="lawn lawn--diagonal absolute -inset-x-4 top-16 h-40 rounded-[2rem] [--stripe-w:1.4rem] sm:-left-10" />
            <PlanBlock plan={weekly} tilt />
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:mt-28">
            <PlanBlock plan={fortnightly} />
          </div>
        </div>
        <p className="mt-12"><SiteLink href="/prices/" className="text-link text-[1.05rem]">{linkText}</SiteLink></p>
      </div>
    </section>
  );
}

function PlanBlock({ plan, tilt = false }: { plan: Plan; tilt?: boolean }) {
  return (
    <article className="relative grid gap-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-start">
      <PlanCalendar frequency={plan.frequency} quietMonths={plan.quietMonths}
        className={`w-full max-w-[15rem] drop-shadow-[0_18px_24px_var(--shadow)] ${tilt ? '-rotate-3' : 'rotate-2'}`} />
      <div className="rounded-2xl bg-bg/90 p-1 sm:pt-4">
        <h3 className="text-[1.5rem]">{plan.name}</h3>
        <p className="mt-2 text-[1.05rem]">{plan.summary}</p>
        <p className="mt-3 text-muted"><strong className="text-ink">Best for:</strong> {plan.bestFor}.</p>
        <p className="mt-3 inline-block rounded-lg bg-mower/25 px-2.5 py-1 text-[.92rem] font-medium">{plan.seasonNote}</p>
      </div>
    </article>
  );
}

/** Prices: both plans in full, divided by a painted line, with the winter-rhythm callout. */
export function PlanSpread({ includesLabel, winter }: { includesLabel: ReactNode; winter: ReactNode }) {
  return (
    <div className="grid gap-12 md:grid-cols-2 md:gap-0">
      {plans.map((plan, index) => (
        <article key={plan.id} className={`grid content-start gap-5 ${index ? 'md:border-l-4 md:border-dashed md:border-accent md:pl-12' : 'md:pr-12'}`}>
          <div className="flex items-center gap-5">
            <PlanCalendar frequency={plan.frequency} quietMonths={plan.quietMonths} className="w-28 shrink-0 sm:w-32" />
            <div>
              <h3 className="text-[clamp(1.35rem,2.4vw,1.75rem)]">{plan.name}</h3>
              <p className="mt-1 text-muted">{plan.bestFor}.</p>
            </div>
          </div>
          <p className="text-[1.05rem]">{plan.summary}</p>
          <div>
            <p className="font-semibold">{includesLabel}</p>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {plan.includes.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <svg data-art aria-hidden="true" viewBox="0 0 20 20" className="mt-1 size-4 shrink-0"><rect width="20" height="20" rx="5" fill="var(--stripe-light)" /><path d="M5 10.5l3 3 7-7" fill="none" stroke="var(--art-ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {plan.quietMonths.length ? (
            <aside className="rounded-2xl border-l-[6px] border-mower bg-surface p-4">
              <p className="font-display text-[1rem] font-bold">{winter}</p>
              <p className="mt-1 text-muted">{plan.seasonNote}.</p>
            </aside>
          ) : <p className="text-muted">{plan.seasonNote}.</p>}
        </article>
      ))}
    </div>
  );
}
