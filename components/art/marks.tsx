import { Mower, MowerShape } from './mower';

/** Square badge: three mown stripes with the mower parked on them. Also the site icon (app/icon.svg). */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg data-art viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="var(--stripe-dark)" />
      <rect x="0" y="0" width="22" height="64" fill="var(--stripe-light)" />
      <rect x="42" y="0" width="22" height="64" fill="var(--stripe-light)" />
      <rect width="64" height="64" rx="14" fill="none" stroke="var(--art-ink)" strokeWidth="3" />
      <g transform="translate(19 10) scale(.26)"><MowerShape bag={false} /></g>
    </svg>
  );
}

/**
 * Line marking under headings: a straight boundary line ending in an oval's corner arc.
 * `tone="chalk"` for use on lawn bands, `tone="paint"` (green) on dew surfaces.
 */
export function ChalkRule({ tone = 'paint', className = '' }: { tone?: 'paint' | 'chalk'; className?: string }) {
  const colour = tone === 'chalk' ? 'var(--chalk)' : 'var(--accent)';
  return (
    <svg data-art viewBox="0 0 240 26" preserveAspectRatio="xMinYMid meet" className={`block h-6 w-60 max-w-full ${className}`} aria-hidden="true" focusable="false">
      <path d="M2 23 H196 Q228 23 236 2" fill="none" stroke={colour} strokeWidth="4" strokeLinecap="round" />
      <circle cx="120" cy="23" r="5" fill={colour} />
    </svg>
  );
}

/**
 * Mower-pass divider: two mown rows, the mower at the end of its pass, and uncut grass beyond.
 * Alternate `flip` between uses so passes go back and forth down the page.
 */
export function MowerPass({ flip = false, className = '' }: { flip?: boolean; className?: string }) {
  return (
    <div data-art aria-hidden="true" className={`relative h-12 overflow-hidden ${flip ? '-scale-x-100' : ''} ${className}`}>
      <div className="shaggy absolute inset-0" />
      <div className="lawn lawn--rows absolute inset-y-0 left-0 right-[22%] [--stripe-w:1.5rem]" />
      <Mower rotate={90} className="absolute top-1/2 right-[22%] h-20 w-12 -translate-y-1/2 translate-x-[calc(100%-.4rem)]" />
    </div>
  );
}
