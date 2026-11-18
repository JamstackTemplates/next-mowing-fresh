import type { ReactNode } from 'react';
import { business } from '../content/business';
import { Icon } from './art/icons';
import { Mower } from './art/mower';
import { SiteLink } from './site-link';

/** Suburbs page: shaggy-to-striped transition band holding the waitlist note and quote CTA. */
export function WaitlistBand({
  title,
  children,
  quote,
  phone,
}: {
  title: ReactNode;
  children: ReactNode;
  quote: ReactNode;
  phone: ReactNode;
}) {
  const tel = business.phone.replace(/[^\d+]/g, '');
  return (
    <section aria-labelledby="waitlist-title" className="relative overflow-hidden py-14 sm:py-18">
      <div data-art aria-hidden="true" className="shaggy absolute inset-y-0 left-0 right-[32%]" />
      <div data-art aria-hidden="true" className="lawn lawn--straight absolute inset-y-0 left-[68%] right-0 [--stripe-w:2.8rem]" />
      <Mower rotate={90} className="absolute top-1/2 left-[68%] hidden h-36 w-22 -translate-x-1/2 -translate-y-1/2 lg:block" />
      <div className="wrap relative z-[1]">
        <div
          className="max-w-xl rounded-[1.75rem] border-[3px] bg-bg px-6 py-7 shadow-[0_24px_40px_-24px_var(--shadow)] sm:px-9"
          style={{ borderColor: 'var(--art-ink)' }}
        >
          <h2 id="waitlist-title" className="text-[clamp(1.5rem,3vw,2.2rem)]">{title}</h2>
          <div className="mt-3 text-[1.05rem] text-muted">{children}</div>
          <div className="mt-6 flex flex-wrap gap-3">
            <SiteLink href="/contact/" className="button">{quote}</SiteLink>
            {business.phone ? (
              <a href={`tel:${tel}`} className="button button-quiet">
                <Icon name="phone" className="size-5" />{phone} <span className="font-figures text-[.9rem]">{business.phone}</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
