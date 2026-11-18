'use client';
import { useEffect, useState } from 'react';
import { business } from '../content/business';
import { phoneLinesLabel, phoneLinesStatic } from '../lib/phone-lines';
import { site } from '../lib/site';

/**
 * Phone-line status in the business zone (site.config.json timeZone), refreshed every minute in the
 * browser. Static and no-JS output is the neutral weekly summary, never "open" or "closed".
 */
export function PhoneLinesBadge({ className = '' }: { className?: string }) {
  const [label, setLabel] = useState(() => phoneLinesStatic(business.phoneHours));
  useEffect(() => {
    const update = () => setLabel(phoneLinesLabel(business.phoneHours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);
  const state = label.includes(' open,') ? 'open' : label.includes(' closed,') ? 'closed' : 'neutral';
  return (
    <p className={`inline-flex items-center gap-2.5 rounded-full border-2 border-line bg-surface px-3.5 py-1.5 text-[.9rem] font-medium ${className}`} data-state={state}>
      <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-full ${state === 'open' ? 'bg-stripe-light ring-4 ring-stripe-light/30' : state === 'closed' ? 'bg-muted' : 'bg-mower'}`} />
      <span>{label}</span>
    </p>
  );
}
