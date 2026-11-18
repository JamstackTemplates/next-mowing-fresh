import type { Metadata } from 'next';
import { ChalkRule } from '../components/art/marks';
import { OffTheLawn } from '../components/art/off-the-lawn';
import { SiteLink } from '../components/site-link';

export const metadata: Metadata = {
  title: 'Patch not mown',
};

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="glow py-14 sm:py-20">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-5">
          <p className="font-figures inline-block rounded-full border-2 border-line bg-surface px-3.5 py-1 text-[.82rem] font-bold text-muted">
            Error 404
          </p>
          <h1 id="not-found-title" className="mt-4 text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.06]">
            This patch hasn&apos;t been mown.
          </h1>
          <ChalkRule className="mt-4" />
          <p className="mt-5 max-w-[34rem] text-[1.08rem] text-muted">
            Looks like the mower wandered off the lawn into the garden bed. Try one of the mown paths below instead.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <SiteLink href="/" className="button">Home</SiteLink>
            <SiteLink href="/prices/" className="button button-quiet">Prices</SiteLink>
            <SiteLink href="/suburbs/" className="button button-quiet">Suburbs</SiteLink>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div
            className="overflow-hidden rounded-[1.75rem] border-[3px] shadow-[0_24px_48px_-28px_var(--shadow)]"
            style={{ borderColor: 'var(--art-ink)' }}
          >
            <OffTheLawn className="block h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
