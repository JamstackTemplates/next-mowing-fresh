/**
 * The Fresh Stripes push mower, drawn top-down (front of the deck at the top of the 100×170 box).
 * Use `<MowerShape />` inside another SVG, or `<Mower />` as a standalone graphic.
 */
export function MowerShape({ bag = true }: { bag?: boolean }) {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* handle */}
      <path d="M26 80 L21 158 M74 80 L79 158" fill="none" stroke="var(--art-ink)" strokeWidth="4.5" />
      <path d="M13 160 H87" fill="none" stroke="var(--art-ink)" strokeWidth="8" />
      <path d="M33 160 H67" fill="none" stroke="var(--mower)" strokeWidth="4" />
      {/* catcher bag */}
      {bag ? <rect x="22" y="80" width="56" height="50" rx="11" fill="url(#mesh)" stroke="var(--art-ink)" strokeWidth="3" /> : null}
      {/* wheels */}
      <g fill="var(--art-ink)">
        <rect x="1" y="6" width="13" height="24" rx="4" />
        <rect x="86" y="6" width="13" height="24" rx="4" />
        <rect x="1" y="50" width="13" height="24" rx="4" />
        <rect x="86" y="50" width="13" height="24" rx="4" />
      </g>
      {/* deck */}
      <rect x="8" y="0" width="84" height="80" rx="20" fill="var(--mower)" stroke="var(--art-ink)" strokeWidth="3" />
      <path d="M10 58 Q50 70 90 58 L90 62 Q90 78 72 79 H28 Q10 78 10 62 Z" fill="var(--mower-shade)" />
      <path d="M22 9 Q50 3 78 9" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="3" />
      {/* engine */}
      <circle cx="50" cy="36" r="20" fill="#24382c" stroke="var(--art-ink)" strokeWidth="3" />
      <circle cx="50" cy="36" r="12" fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="2" />
      <circle cx="50" cy="36" r="5.5" fill="var(--mower)" stroke="var(--art-ink)" strokeWidth="2" />
      <rect x="64" y="10" width="10" height="7" rx="2" fill="#e53935" stroke="var(--art-ink)" strokeWidth="1.5" />
    </g>
  );
}

export function Mower({ className = '', rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <svg data-art viewBox="0 0 100 170" className={className} aria-hidden="true" focusable="false"
      style={rotate ? { rotate: `${rotate}deg` } : undefined}>
      <MowerShape />
    </svg>
  );
}
