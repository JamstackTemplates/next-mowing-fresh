import type { ReactNode } from 'react';

/**
 * Line icons drawn for the crew's kit: 2px rounded strokes in currentColor with mower-yellow and
 * lawn-green fills, on a 32×32 grid. Decorative: pair every icon with visible text.
 */
const paths: Record<string, ReactNode> = {
  mower: <>
    <rect x="7" y="4" width="18" height="15" rx="4.5" fill="var(--mower)" />
    <circle cx="16" cy="11.5" r="3.5" fill="currentColor" />
    <path d="M10 19 L9 28 M22 19 L23 28 M7 28 H25" />
  </>,
  edger: <>
    <circle cx="10" cy="23" r="5" fill="var(--mower)" />
    <path d="M10 23 L23 6 M20 4 L26 8 M10 18 V28 M4 28 H18" />
  </>,
  snipper: <>
    <path d="M25 3 L9 23" />
    <path d="M21 9 H27" />
    <ellipse cx="8" cy="25" rx="5" ry="3" fill="var(--mower)" />
    <path d="M3 28 L1 30 M13 28 L15 30 M8 28 V31" />
  </>,
  blower: <>
    <rect x="4" y="9" width="12" height="15" rx="3" fill="var(--mower)" />
    <path d="M16 19 H24 L29 22 M16 15 H22" />
    <path d="M27 11 q2 -2 4 0 M28 16 q2 -1 3 1" />
  </>,
  bag: <>
    <path d="M7 10 Q6 26 16 28 Q26 26 25 10 Z" fill="var(--stripe-light)" />
    <path d="M7 10 Q16 4 25 10" />
    <path d="M11 14 V24 M16 14 V26 M21 14 V24" opacity=".6" />
  </>,
  calendar: <>
    <rect x="4" y="7" width="24" height="21" rx="3" />
    <path d="M4 13 H28 M10 4 V9 M22 4 V9" />
    <rect x="9" y="17" width="6" height="6" fill="var(--stripe-light)" stroke="none" />
  </>,
  phone: <>
    <path d="M9 4 L13 4 L15 10 L12 12 Q14 18 20 20 L22 17 L28 19 L28 23 Q28 28 23 28 Q6 26 4 9 Q4 4 9 4 Z" fill="var(--mower)" />
  </>,
  pin: <>
    <path d="M16 29 Q6 18 6 12 A10 10 0 0 1 26 12 Q26 18 16 29 Z" fill="var(--mower)" />
    <circle cx="16" cy="12" r="3.5" fill="var(--surface)" />
  </>,
  shears: <>
    <path d="M16 18 L28 3 M16 18 L4 3" />
    <circle cx="11" cy="25" r="4" fill="var(--mower)" />
    <circle cx="21" cy="25" r="4" fill="var(--mower)" />
    <path d="M13 22 L16 18 L19 22" />
  </>,
  spray: <>
    <rect x="9" y="12" width="13" height="17" rx="3" fill="var(--stripe-light)" />
    <path d="M12 12 V7 H20 L22 10 M20 7 V5 H13" />
    <path d="M25 4 l3 -1 M26 8 h3 M25 12 l3 1" />
  </>,
  spreader: <>
    <path d="M6 6 H22 L19 18 H9 Z" fill="var(--mower)" />
    <circle cx="9" cy="25" r="3.5" />
    <circle cx="19" cy="25" r="3.5" />
    <path d="M22 6 L28 2 M14 18 V22" />
  </>,
  ruler: <>
    <rect x="3" y="11" width="26" height="10" rx="2" fill="var(--mower)" />
    <path d="M8 11 V15 M13 11 V17 M18 11 V15 M23 11 V17" />
  </>,
  stripes: <>
    <rect x="4" y="4" width="24" height="24" rx="4" fill="var(--stripe-dark)" />
    <path d="M10 4 V28 M22 4 V28" stroke="var(--stripe-light)" strokeWidth="6" />
    <rect x="4" y="4" width="24" height="24" rx="4" />
  </>,
  gate: <>
    <path d="M4 28 V6 M28 28 V6" />
    <path d="M8 26 V10 M14 26 V10 M20 26 V10 M8 12 H24 M8 22 H24" />
    <path d="M24 10 V26" />
    <circle cx="22" cy="17" r="1.6" fill="currentColor" />
  </>,
  flag: <>
    <path d="M8 29 V4" />
    <path d="M8 5 H25 L21 10.5 L25 16 H8" fill="var(--mower)" />
  </>,
};

export type IconName = keyof typeof paths;

export function Icon({ name, className = 'size-7' }: { name: string; className?: string }) {
  return (
    <svg data-art viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] ?? paths.mower}
    </svg>
  );
}
