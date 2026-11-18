/**
 * One shared sheet of SVG patterns, rendered once in the layout. Every illustration fills its lawns
 * with url(#lawn-…) so the stripes follow the theme tokens in both modes, and patterns are never
 * duplicated or trapped inside hidden SVGs. Keep this SVG rendered (it is visually hidden, not display:none).
 */
export function ArtDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        <pattern id="lawn-v" width="46" height="46" patternUnits="userSpaceOnUse">
          <rect width="23" height="46" fill="var(--stripe-light)" />
          <rect x="23" width="23" height="46" fill="var(--stripe-dark)" />
        </pattern>
        <pattern id="lawn-v-sm" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="8" height="16" fill="var(--stripe-light)" />
          <rect x="8" width="8" height="16" fill="var(--stripe-dark)" />
        </pattern>
        <pattern id="lawn-h" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="20" fill="var(--stripe-light)" />
          <rect y="20" width="40" height="20" fill="var(--stripe-dark)" />
        </pattern>
        <pattern id="lawn-d" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="14" height="28" fill="var(--stripe-light)" />
          <rect x="14" width="14" height="28" fill="var(--stripe-dark)" />
        </pattern>
        <pattern id="lawn-d2" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <rect width="14" height="28" fill="var(--stripe-light)" />
          <rect x="14" width="14" height="28" fill="var(--stripe-dark)" />
        </pattern>
        <pattern id="lawn-check" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="var(--stripe-dark)" />
          <rect width="20" height="20" fill="var(--stripe-light)" />
          <rect x="20" y="20" width="20" height="20" fill="var(--stripe-light)" />
          <rect width="40" height="20" fill="#fff" opacity=".08" />
        </pattern>
        <pattern id="shaggy" width="46" height="40" patternUnits="userSpaceOnUse">
          <rect width="46" height="40" fill="var(--shaggy)" />
          <g fill="none" stroke="var(--tuft)" strokeWidth="2" strokeLinecap="round">
            <path d="M6 14 L4 7 M6 14 L7 5 M6 14 L10 8" />
            <path d="M30 32 L27 25 M30 32 L31 23 M30 32 L34 26" />
            <path d="M38 10 L36 4 M38 10 L41 5" />
            <path d="M16 36 L14 30 M16 36 L19 31" />
          </g>
        </pattern>
        <pattern id="weatherboard" width="40" height="14" patternUnits="userSpaceOnUse">
          <rect width="40" height="14" fill="var(--house)" />
          <rect y="11" width="40" height="3" fill="var(--house-line)" />
        </pattern>
        <pattern id="soil" width="30" height="24" patternUnits="userSpaceOnUse">
          <rect width="30" height="24" fill="var(--soil)" />
          <circle cx="6" cy="6" r="1.6" fill="var(--soil-dark)" />
          <circle cx="20" cy="15" r="2" fill="var(--soil-dark)" />
          <circle cx="12" cy="20" r="1.2" fill="var(--soil-dark)" />
        </pattern>
        <pattern id="mesh" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="var(--bag)" />
          <path d="M0 3H6M3 0V6" stroke="#fff" strokeOpacity=".16" strokeWidth="1" />
        </pattern>
      </defs>
    </svg>
  );
}
