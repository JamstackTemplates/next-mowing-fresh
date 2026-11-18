import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { LogoMark } from './art/marks';
import { SiteLink } from './site-link';

/** Dew-coloured header edged with two mown stripes and a grass fringe. */
export function SiteHeader() {
  return (
    <header className="relative z-10 bg-bg">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3 sm:min-h-20 sm:flex-nowrap">
        <SiteLink href="/" className="group flex items-center gap-3 no-underline">
          <LogoMark className="size-10 shrink-0 transition-transform group-hover:-rotate-6 sm:size-11" />
          <span className="font-display leading-none">
            <span className="block text-[1.02rem] font-bold tracking-[.01em] sm:text-[1.12rem]">{business.shortName}</span>
            <span className="mt-1 hidden text-[.7rem] font-medium tracking-[.16em] text-muted sm:block">Mowing</span>
          </span>
        </SiteLink>
        <div className="sm:order-last"><DarkModeToggle /></div>
        <nav aria-label="Main" className="flex w-full items-center justify-between gap-4 border-t-2 border-line/70 pt-2 sm:w-auto sm:justify-end sm:gap-7 sm:border-0 sm:pt-0">
          <SiteLink href="/prices/" markCurrent="page" className="chalk-link">Prices</SiteLink>
          <SiteLink href="/suburbs/" markCurrent="page" className="chalk-link">Suburbs</SiteLink>
          <SiteLink href="/contact/" markCurrent="page" className="button min-h-10 px-4 py-1.5 text-[.95rem] aria-[current=page]:bg-accent-strong">Get a quote</SiteLink>
        </nav>
      </div>
      <div data-art aria-hidden="true" className="lawn lawn--straight fringe-top h-3 [--fringe:var(--stripe-light)] [--stripe-w:1.6rem]" />
    </header>
  );
}
