const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

/**
 * A month grid with mown stripes on mowing days (every Wednesday for weekly, every second one for
 * fortnightly), and a year strip underneath where quieter months are drawn faded.
 */
export function PlanCalendar({ frequency, quietMonths, className = '' }: {
  frequency: 'weekly' | 'fortnightly'; quietMonths: readonly number[]; className?: string;
}) {
  const cell = 34;
  const gap = 5;
  const left = 14;
  const top = 46;
  const mowing = (row: number, col: number) => col === 2 && row < 4 && (frequency === 'weekly' || row % 2 === 0);
  return (
    <svg data-art viewBox="0 0 300 300" className={className} aria-hidden="true" focusable="false">
      <rect x="2" y="8" width="296" height="290" rx="16" fill="var(--surface)" stroke="var(--art-ink)" strokeWidth="3" />
      <rect x="2" y="8" width="296" height="30" rx="14" fill="var(--accent)" />
      <rect x="2" y="24" width="296" height="14" fill="var(--accent)" />
      <path d="M2 38 H298" stroke="var(--art-ink)" strokeWidth="3" />
      {[70, 230].map(x => <rect key={x} x={x} y="0" width="10" height="22" rx="4" fill="var(--mower)" stroke="var(--art-ink)" strokeWidth="2.5" />)}
      {Array.from({ length: 5 }, (_, row) => Array.from({ length: 7 }, (_, col) => {
        const x = left + col * (cell + gap);
        const y = top + row * (cell + gap);
        return mowing(row, col)
          ? <g key={`${row}-${col}`}>
              <rect x={x} y={y} width={cell} height={cell} rx="6" fill="url(#lawn-v-sm)" stroke="var(--art-ink)" strokeWidth="2" />
              <path d={`M${x + 9} ${y + 18} l6 6 l11 -13`} fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          : <rect key={`${row}-${col}`} x={x} y={y} width={cell} height={cell} rx="6" fill="var(--surface-soft)" />;
      }))}
      <g fontFamily="var(--font-mono)" fontSize="11" textAnchor="middle" fill="var(--muted)">
        {MONTHS.map((month, i) => {
          const x = left + i * 23;
          const quiet = quietMonths.includes(i + 1);
          return (
            <g key={i}>
              <rect x={x} y="248" width="19" height="16" rx="3" fill={quiet ? 'var(--surface-soft)' : 'url(#lawn-v-sm)'}
                stroke={quiet ? 'var(--line)' : 'var(--art-ink)'} strokeWidth="1.5" strokeDasharray={quiet ? '3 3' : undefined} />
              <text x={x + 9.5} y="284">{month}</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
