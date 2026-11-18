import type { ReactNode } from 'react';
import { business } from '../content/business';
import { Icon } from './art/icons';
import { CopyEmail } from './copy-email';
import { PhoneLinesBadge } from './phone-lines-badge';

/** "What to put in your message": a ruled checklist with an icon per tip (tips live in content/business.ts). */
export function MessageChecklist({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <section aria-labelledby="checklist-title">
      <h2 id="checklist-title" className="text-[clamp(1.4rem,2.6vw,1.9rem)]">{title}</h2>
      {children ? <div className="mt-3 text-muted">{children}</div> : null}
      <ul className="mt-6 border-t-2 border-dashed border-accent">
        {business.enquiries.usefulToInclude.map(tip => (
          <li key={tip.text} className="flex items-center gap-4 border-b-2 border-dashed border-accent py-3.5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-soft text-ink"><Icon name={tip.icon} className="size-7" /></span>
            <span className="font-medium">{tip.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The form (or email fallback) sits on a dew panel edged with mown stripes. */
export function FormPanel({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border-[3px] bg-surface shadow-[0_30px_50px_-34px_var(--shadow)]" style={{ borderColor: 'var(--art-ink)' }}>
      <div data-art aria-hidden="true" className="lawn lawn--straight h-4 [--stripe-w:1.1rem]" />
      <div className="p-5 sm:p-8">{children}</div>
    </div>
  );
}

/** Email and phone shown together, always visible, with phone-line hours. */
export function ContactDetails({ emailLabel, phoneLabel }: { emailLabel: ReactNode; phoneLabel: ReactNode }) {
  const tel = business.phone.replace(/[^\d+]/g, '');
  return (
    <section aria-label="Email and phone" className="mt-12 grid gap-6 rounded-[1.5rem] bg-surface-soft p-6 sm:grid-cols-2 sm:p-8">
      <div>
        <h2 className="flex items-center gap-2 text-[1.15rem]"><Icon name="flag" className="size-6" />{emailLabel}</h2>
        <p className="mt-2"><a className="text-link text-[1.15rem] wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a></p>
        <div className="mt-3 flex flex-wrap items-center gap-3"><CopyEmail email={business.email} /></div>
      </div>
      {business.phone ? (
        <div>
          <h2 className="flex items-center gap-2 text-[1.15rem]"><Icon name="phone" className="size-6" />{phoneLabel}</h2>
          <p className="mt-2"><a className="text-link font-figures text-[1.1rem]" href={`tel:${tel}`}>{business.phone}</a></p>
          <PhoneLinesBadge className="mt-3" />
        </div>
      ) : null}
    </section>
  );
}
