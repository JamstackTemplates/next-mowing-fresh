import type { ReactNode } from 'react';
import { business } from '../content/business';
import { HeroYard } from './art/hero-yard';
import { Icon } from './art/icons';
import { PhoneLinesBadge } from './phone-lines-badge';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

/** Home hero: copy on the left, the half-mown front yard bleeding off the right edge. */
function HeroSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="hero-title" className="glow relative overflow-hidden">
      <div className="wrap relative z-[1] pt-7 pb-6 sm:pt-14 lg:flex lg:min-h-[min(calc(100svh-5.5rem),56rem)] lg:items-center lg:py-16">
        <div className="lg:w-[47%] lg:pr-6">{children}</div>
      </div>
      {/* mobile: cropped around the mower; desktop: full yard bleeding off the right edge */}
      <div
        data-art
        className="relative h-[18rem] overflow-hidden border-t-4 sm:h-[26rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[54%] lg:rounded-bl-[3rem] lg:border-t-0 lg:border-b-4 lg:border-l-4"
        style={{ borderColor: 'var(--art-ink)' }}
      >
        <HeroYard />
      </div>
    </section>
  );
}

function Heading({ children }: ContentProps) {
  return <h1 id="hero-title" className="text-[clamp(2.15rem,4vw,3.65rem)] leading-[1.04] tracking-[-.01em]">{children}</h1>;
}

function Introduction({ children }: ContentProps) {
  return <p className="mt-4 max-w-[34rem] text-[clamp(1rem,1.4vw,1.22rem)] text-muted sm:mt-5">{children}</p>;
}

/** Price tag on a chalk-outlined label, e.g. "from $45 a visit". */
function Price({ amount, children }: { amount: string; children: ReactNode }) {
  return (
    <p className="mt-5 inline-flex items-baseline gap-3 rounded-2xl border-[3px] border-dashed border-accent bg-surface px-4 py-2.5 shadow-[0_10px_24px_-16px_var(--shadow)]">
      <span className="font-figures text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-none">{amount}</span>
      <span className="text-[.95rem] font-semibold text-muted">{children}</span>
    </p>
  );
}

function Actions({ children }: ContentProps) {
  return <div className="mt-5 flex flex-wrap items-center gap-3">{children}</div>;
}

function Quote({ children }: ContentProps) {
  return <SiteLink href="/contact/" className="button text-[1.05rem]">{children}</SiteLink>;
}

function Phone({ children }: ContentProps) {
  if (!business.phone) return null;
  return (
    <a href={`tel:${business.phone.replace(/[^\d+]/g, '')}`} className="button button-quiet">
      <Icon name="phone" className="size-5" />{children} <span className="font-figures text-[.92rem]">{business.phone}</span>
    </a>
  );
}

function SuburbLink({ children }: ContentProps) {
  return (
    <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-5">
      <SiteLink href="/suburbs/" className="text-link inline-flex items-center gap-2"><Icon name="pin" className="size-5 text-ink" />{children}</SiteLink>
    </p>
  );
}

function Status() {
  return <PhoneLinesBadge className="mt-4" />;
}

export const Hero = Object.assign(HeroSection, { Heading, Introduction, Price, Actions, Quote, Phone, SuburbLink, Status });
