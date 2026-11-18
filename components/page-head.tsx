import type { ReactNode } from 'react';
import { Icon } from './art/icons';
import { ChalkRule, MowerPass } from './art/marks';
import { Mower } from './art/mower';

type Pattern = 'straight' | 'diagonal' | 'rows' | 'checkerboard' | 'diamond';

/**
 * Inner-page heading: a mown banner (or a mower-pass divider) with the title on a dew panel that
 * overlaps it, a chalk boundary rule and a lede. The page supplies the title and lede as copy.
 */
export function PageHead({ title, children, id, pattern = 'diagonal', size = 'large', icon, divider = false }: {
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Stripe pattern for the banner. */
  pattern?: Pattern;
  size?: 'large' | 'small';
  /** Optional icon shown above the title (see components/art/icons.tsx). */
  icon?: string;
  /** Use a slim mower-pass divider instead of a banner. */
  divider?: boolean;
}) {
  return (
    <header className="relative glow">
      {divider ? <MowerPass className="mt-0" /> : (
        <div data-art aria-hidden="true"
          className={`lawn lawn--${pattern} fringe-bottom relative overflow-hidden [--fringe:var(--stripe-dark)] ${size === 'large' ? 'h-[clamp(8rem,16vw,13rem)] [--stripe-w:3.2rem]' : 'h-[clamp(6rem,10vw,8.5rem)] [--stripe-w:2.4rem]'}`}>
          <div className="absolute inset-x-[5%] inset-y-5 rounded-[2rem] border-4 border-chalk/80" />
          <Mower rotate={90} className={`absolute top-1/2 right-[12%] -translate-y-1/2 ${size === 'large' ? 'h-36 w-20' : 'h-24 w-14'}`} />
        </div>
      )}
      <div className={`wrap relative ${divider ? 'pt-10' : '-mt-10 sm:-mt-14'}`}>
        <div className={`max-w-3xl rounded-[1.5rem] bg-bg ${divider ? '' : 'px-5 pt-6 pb-2 sm:px-8 sm:pt-8'} -ml-0 sm:-ml-8`}>
          {icon ? <Icon name={icon} className="mb-3 size-10 text-ink" /> : null}
          <h1 id={id} className="max-w-[20ch] text-[clamp(2.1rem,5.4vw,4rem)]">{title}</h1>
          <ChalkRule className="mt-4" />
          {children ? <div className="mt-5 max-w-(--measure) text-[clamp(1.05rem,1.5vw,1.2rem)] text-muted">{children}</div> : null}
        </div>
      </div>
    </header>
  );
}
