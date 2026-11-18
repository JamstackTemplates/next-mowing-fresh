import type { ReactNode } from 'react';
import { Icon } from './art/icons';

type ContentProps = { children: ReactNode };

/** "Every visit includes": pegs along a chalk boundary line on a full-bleed mown band. */
function IncludesSection({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <section aria-labelledby="includes-title" className="lawn lawn--straight fringe-top fringe-bottom relative py-14 [--fringe:var(--stripe-light)] [--stripe-w:3.4rem] sm:py-16">
      <div className="wrap">
        <h2 id="includes-title" className="inline-block rounded-full bg-bg px-5 py-2.5 text-[clamp(1.2rem,2.4vw,1.6rem)] shadow-[0_8px_20px_-12px_var(--shadow)]">{title}</h2>
        <ol className="relative mt-10 grid gap-5 sm:grid-cols-5 sm:gap-3">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.95rem] w-1 rounded bg-chalk sm:top-[2rem] sm:right-0 sm:bottom-auto sm:left-0 sm:h-1 sm:w-auto" />
          {children}
        </ol>
      </div>
    </section>
  );
}

function Item({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <li className="relative flex items-center gap-4 sm:flex-col sm:items-center sm:gap-3 sm:text-center">
      <span className="grid size-16 shrink-0 place-items-center rounded-full border-[3px] bg-surface text-ink shadow-[0_0_0_5px_var(--chalk)]" style={{ borderColor: 'var(--art-ink)' }}>
        <Icon name={icon} className="size-8" />
      </span>
      <span className="rounded-xl bg-bg/95 px-3 py-1.5 font-semibold leading-snug">{children}</span>
    </li>
  );
}

export const IncludesLine = Object.assign(IncludesSection, { Item });
export type { ContentProps };
