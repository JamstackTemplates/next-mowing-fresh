import type { RoundDay, Suburb } from '../../content/suburbs';

/**
 * Schematic (not geographic) quilt of lawn plots in rough relative positions. Each served plot is
 * striped in its round day's direction; waitlist plots are left shaggy. Positions are keyed by suburb
 * id: add a position here when adding a suburb (unplaced suburbs are listed below the map).
 */
export const PLOTS: Record<string, { x: number; y: number; w: number; h: number }> = {
  kew: { x: 16, y: 16, w: 150, h: 120 },
  'kew-east': { x: 176, y: 16, w: 136, h: 100 },
  'balwyn-north': { x: 322, y: 16, w: 150, h: 92 },
  'box-hill': { x: 482, y: 56, w: 142, h: 124 },
  hawthorn: { x: 16, y: 146, w: 134, h: 132 },
  'hawthorn-east': { x: 160, y: 126, w: 152, h: 102 },
  balwyn: { x: 322, y: 118, w: 150, h: 92 },
  camberwell: { x: 160, y: 238, w: 172, h: 112 },
  canterbury: { x: 342, y: 220, w: 130, h: 100 },
  'surrey-hills': { x: 482, y: 190, w: 142, h: 130 },
  'glen-iris': { x: 56, y: 360, w: 206, h: 104 },
  ashburton: { x: 272, y: 360, w: 176, h: 104 },
};

export const DAY_FILL: Record<RoundDay, string> = {
  Mon: 'url(#lawn-v)', Tue: 'url(#lawn-h)', Wed: 'url(#lawn-d)', Thu: 'url(#lawn-d2)', Fri: 'url(#lawn-check)', Sat: 'url(#lawn-v)',
};

export function SuburbMap({ suburbs, activeId, className = '' }: { suburbs: readonly Suburb[]; activeId?: string; className?: string }) {
  return (
    <svg data-art viewBox="0 0 640 480" className={`suburb-map ${className}`} data-active={activeId || undefined} aria-hidden="true" focusable="false">
      <rect width="640" height="480" rx="20" fill="var(--path)" />
      {suburbs.map(suburb => {
        const plot = PLOTS[suburb.id];
        if (!plot) return null;
        const served = suburb.status === 'served';
        const label = suburb.name;
        const chip = label.length * 7.4 + 18;
        return (
          <g key={suburb.id} className="map-plot" data-on={activeId === suburb.id ? 'true' : undefined}>
            <rect x={plot.x} y={plot.y} width={plot.w} height={plot.h} rx="8" fill={served ? DAY_FILL[suburb.roundDay] : 'url(#shaggy)'} />
            <rect className="map-outline" x={plot.x} y={plot.y} width={plot.w} height={plot.h} rx="8" fill="none" stroke="var(--art-ink)" strokeWidth="2.5" />
            <rect x={plot.x + 8} y={plot.y + plot.h - 32} width={Math.min(chip, plot.w - 16)} height="24" rx="12" fill="var(--surface)" stroke="var(--art-ink)" strokeWidth="1.5" />
            <text x={plot.x + 17} y={plot.y + plot.h - 15.5} fontSize="12" fontWeight="600" fill="var(--text)" fontFamily="var(--font-sans)">{label}</text>
            <text x={plot.x + plot.w - 10} y={plot.y + 22} fontSize="11" textAnchor="end" fill={served ? '#fff' : 'var(--text)'} fontFamily="var(--font-mono)"
              stroke={served ? 'var(--art-ink)' : 'none'} strokeWidth="3" paintOrder="stroke">{served ? suburb.roundDay : 'waitlist'}</text>
          </g>
        );
      })}
    </svg>
  );
}
