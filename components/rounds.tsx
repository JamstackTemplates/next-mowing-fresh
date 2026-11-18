import type { ReactNode } from 'react';
import { ROUND_DAY_NAMES, suburbsByDay } from '../content/suburbs';
import { SectionHeading } from './section-heading';
import { SiteLink } from './site-link';

function WaitlistTag({ children }: { children: ReactNode }) {
  return <span className="shaggy ml-2 inline-block rounded-full px-2 py-0.5 align-middle text-[.68rem] font-bold text-ink">{children}</span>;
}

/** Home: every suburb under its round day, chalked onto a deep-stripe band. */
export function RoundRibbon({ title, children, waitlistLabel, linkText }: {
  title: ReactNode; children?: ReactNode; waitlistLabel: string; linkText: ReactNode;
}) {
  return (
    <section aria-labelledby="rounds-title" className="lawn lawn--deep fringe-top fringe-bottom relative py-16 [--fringe:var(--deep-a)] sm:py-20">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="rounds-title" tone="chalk" title={title}>{children}</SectionHeading>
          <SiteLink href="/suburbs/" className="button border-chalk bg-chalk text-[#10261a] hover:bg-mower hover:border-mower">{linkText}</SiteLink>
        </div>
        <ol className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0">
          {suburbsByDay().map(({ day, suburbs }) => (
            <li key={day} className="lg:border-l-4 lg:border-dashed lg:border-chalk/40 lg:px-5 lg:first:border-l-0 lg:first:pl-0">
              <h3 className="text-[1.25rem]"><abbr title={ROUND_DAY_NAMES[day]} className="no-underline">{day}</abbr></h3>
              <span aria-hidden="true" className="mt-2 block h-1 w-10 rounded bg-mower" />
              <ul className="mt-3 space-y-1.5">
                {suburbs.map(suburb => (
                  <li key={suburb.id} className="leading-snug">{suburb.name}{suburb.status === 'waitlist' ? <WaitlistTag>{waitlistLabel}</WaitlistTag> : null}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Suburbs page: the full week as a groundskeeper's ruled sheet, with postcodes. */
export function RoundSheet({ title, children, waitlistLabel }: { title: ReactNode; children?: ReactNode; waitlistLabel: string }) {
  return (
    <section aria-labelledby="sheet-title" className="py-16 sm:py-20">
      <div className="wrap">
        <SectionHeading id="sheet-title" title={title}>{children}</SectionHeading>
        <div className="relative mt-10 rounded-[1.25rem] border-[3px] bg-surface p-2 shadow-[0_24px_40px_-30px_var(--shadow)] sm:p-4" style={{ borderColor: 'var(--art-ink)' }}>
          <span aria-hidden="true" className="absolute -top-4 left-1/2 h-7 w-28 -translate-x-1/2 rounded-lg border-[3px] bg-mower" style={{ borderColor: 'var(--art-ink)' }} />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-6">
            {suburbsByDay().map(({ day, suburbs }) => (
              <li key={day} className="border-b-2 border-line p-4 last:border-b-0 sm:border-r-2 lg:border-b-0 lg:last:border-r-0">
                <h3 className="text-[1.1rem]">{ROUND_DAY_NAMES[day]}</h3>
                <ul className="mt-3 border-t-2 border-line">
                  {suburbs.length ? suburbs.map(suburb => (
                    <li key={suburb.id} className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 border-b-2 border-line py-2.5">
                      <span className="font-semibold">{suburb.name}{suburb.status === 'waitlist' ? <WaitlistTag>{waitlistLabel}</WaitlistTag> : null}</span>
                      <span className="font-figures text-[.78rem] text-muted">{suburb.postcode}</span>
                    </li>
                  )) : <li className="border-b-2 border-line py-2.5 text-muted">No round</li>}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
