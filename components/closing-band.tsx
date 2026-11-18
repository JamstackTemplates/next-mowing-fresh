import type { ReactNode } from 'react';
import { business } from '../content/business';
import { Icon } from './art/icons';
import { Mower } from './art/mower';
import { SiteLink } from './site-link';

/** Narrow diagonal-stripe band with the mower crossing it and a dew panel holding the final call to action. */
export function ClosingBand({ title, quote, phone }: { title: ReactNode; quote: ReactNode; phone: ReactNode }) {
  const tel = business.phone.replace(/[^\d+]/g, '');
  return (
    <section aria-labelledby="closing-title" className="lawn lawn--diagonal fringe-top relative overflow-hidden py-12 [--fringe:var(--stripe-light)] [--stripe-w:2.6rem] sm:py-16">
      <Mower rotate={135} className="absolute top-1/2 right-[6%] hidden h-44 w-28 -translate-y-1/2 md:block" />
      <div className="wrap">
        <div className="flex max-w-3xl flex-wrap items-center gap-x-8 gap-y-5 rounded-[1.75rem] bg-bg px-6 py-7 shadow-[0_24px_40px_-24px_var(--shadow)] sm:px-9">
          <h2 id="closing-title" className="text-[clamp(1.7rem,3.4vw,2.6rem)]">{title}</h2>
          <div className="flex flex-wrap gap-3">
            <SiteLink href="/contact/" className="button">{quote}</SiteLink>
            {business.phone ? <a href={`tel:${tel}`} className="button button-quiet"><Icon name="phone" className="size-5" />{phone} <span className="font-figures text-[.9rem]">{business.phone}</span></a> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
