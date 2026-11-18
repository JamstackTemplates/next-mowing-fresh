import { business } from '../content/business';
import { suburbs } from '../content/suburbs';
import { hoursSummary } from '../lib/hours';
import { Mower } from './art/mower';
import { SiteLink } from './site-link';

/** The end of the oval: deep stripes, chalk boundary markings, and the mower parked in the corner. */
export function SiteFooter() {
  const tel = business.phone.replace(/[^\d+]/g, '');
  return (
    <footer className="lawn lawn--deep fringe-top relative mt-0 overflow-hidden pt-16 pb-10 [--fringe:var(--deep-a)]">
      <svg data-art aria-hidden="true" focusable="false" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-30">
        <g fill="none" stroke="var(--chalk)" strokeWidth="4">
          <path d="M-20 60 H1220" />
          <circle cx="980" cy="300" r="150" />
          <circle cx="980" cy="300" r="6" fill="var(--chalk)" />
          <path d="M600 60 V440" strokeDasharray="14 14" />
        </g>
      </svg>
      <div className="wrap grid gap-10 md:grid-cols-[1.3fr_1fr_1fr] lg:grid-cols-[1.4fr_1fr_1.2fr_.7fr]">
        <div>
          <p className="font-display text-2xl font-bold leading-tight">{business.name}</p>
          <p className="mt-3 max-w-xs text-on-deep-muted">{business.tagline}. Based near {business.landmark}.</p>
        </div>
        <div>
          <h2 className="text-sm font-bold text-on-deep-muted">Talk to the crew</h2>
          <ul className="mt-3 space-y-2">
            <li><a className="font-semibold underline decoration-mower decoration-2 underline-offset-4 wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a></li>
            {business.phone ? <li><a className="font-figures text-[.95rem] underline decoration-mower decoration-2 underline-offset-4" href={`tel:${tel}`}>{business.phone}</a></li> : null}
            <li className="text-on-deep-muted">Phone lines {hoursSummary(business.phoneHours)}</li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold text-on-deep-muted">On the rounds</h2>
          <ul className="font-figures mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[.78rem]">
            {suburbs.map(suburb => <li key={suburb.id}>{suburb.name}</li>)}
          </ul>
        </div>
        <nav aria-label="Footer" className="flex flex-col items-start gap-2 font-semibold">
          <SiteLink href="/" className="hover:underline">Home</SiteLink>
          <SiteLink href="/prices/" className="hover:underline">Prices</SiteLink>
          <SiteLink href="/suburbs/" className="hover:underline">Suburbs</SiteLink>
          <SiteLink href="/contact/" className="hover:underline">Get a quote</SiteLink>
        </nav>
      </div>
      <div className="wrap mt-12 flex flex-wrap items-end justify-between gap-4 border-t-2 border-dashed border-on-deep/30 pt-6 text-sm text-on-deep-muted md:pr-36">
        <p>Fictitious sample business. Prices in AUD, GST included.</p>
        <p title="Made with love by jamstacks.net">with <span role="img" aria-label="love">❤️</span> <a className="underline-offset-4 hover:underline" href="https://jamstacks.net">jamstacks.net</a></p>
      </div>
      <Mower rotate={-24} className="absolute right-[4%] bottom-[-1.5rem] hidden h-36 w-24 md:block" />
    </footer>
  );
}
