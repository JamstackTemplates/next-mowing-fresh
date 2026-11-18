import { MowerShape } from './mower';

/** 404 art: the mower has wandered off the lawn into a garden bed, beside a shaggy patch with "404" mown into it. */
export function OffTheLawn({ className = '' }: { className?: string }) {
  return (
    <svg data-art viewBox="0 0 760 460" className={className} aria-hidden="true" focusable="false">
      {/* striped lawn, its last pass veering off the edge */}
      <rect x="0" y="0" width="470" height="460" fill="url(#shaggy)" />
      <rect x="0" y="0" width="470" height="200" fill="url(#lawn-h)" />
      <path d="M0 200 H300 Q400 200 470 150 V200" fill="var(--stripe-light)" />
      <path d="M470 0 V460" stroke="var(--art-ink)" strokeWidth="3" />
      {/* the "404" mown into the shaggy patch */}
      <text x="24" y="398" fontFamily="var(--font-display)" fontWeight="800" fontSize="144" letterSpacing="2"
        fill="url(#lawn-v)" stroke="var(--art-ink)" strokeWidth="3" paintOrder="stroke">404</text>
      {/* garden bed */}
      <rect x="470" y="0" width="290" height="460" fill="url(#soil)" />
      <g stroke="var(--art-ink)" strokeWidth="2.5">
        {[[560, 70, 34], [700, 120, 40], [600, 380, 30], [720, 360, 36]].map(([cx, cy, r]) => <circle key={cx} cx={cx} cy={cy} r={r} fill="#2f6a3a" />)}
      </g>
      <g fill="var(--mower)">{[[548, 60], [574, 84], [690, 104], [716, 140], [596, 372], [730, 352]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="6" />)}</g>
      <g fill="#fff">{[[566, 54], [706, 128], [612, 388], [710, 372]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="4" />)}</g>
      {/* tyre tracks and clods */}
      <path d="M470 168 Q520 176 560 210 M470 206 Q520 214 556 250" fill="none" stroke="var(--soil-dark)" strokeWidth="9" strokeLinecap="round" strokeDasharray="4 10" />
      <g fill="var(--soil-dark)">{[[520, 150], [590, 300], [640, 196], [508, 260]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="6" />)}</g>
      {/* the wandering mower, nose in the dirt */}
      <g transform="translate(560 140) rotate(68 50 85) scale(.9)"><MowerShape /></g>
      <g fill="none" stroke="var(--art-ink)" strokeWidth="3" strokeLinecap="round">
        <path d="M676 194 q10 -12 4 -24 M690 206 q14 -6 14 -20" />
      </g>
    </svg>
  );
}
