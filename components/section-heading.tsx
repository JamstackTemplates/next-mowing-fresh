import type { ReactNode } from 'react';
import { ChalkRule } from './art/marks';

/** Section title on a painted (or chalk) boundary line, with an optional short introduction. */
export function SectionHeading({ title, children, tone = 'paint', id, className = '' }: {
  title: ReactNode; children?: ReactNode; tone?: 'paint' | 'chalk'; id?: string; className?: string;
}) {
  return (
    <div className={className}>
      <h2 id={id} className="max-w-[22ch] text-[clamp(1.75rem,3.6vw,2.9rem)]">{title}</h2>
      <ChalkRule tone={tone} className="mt-3" />
      {children ? <div className={`mt-4 max-w-(--measure) text-[1.08rem] ${tone === 'chalk' ? 'text-on-deep-muted' : 'text-muted'}`}>{children}</div> : null}
    </div>
  );
}
