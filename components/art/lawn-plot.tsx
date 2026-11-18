import type { CSSProperties } from 'react';

/**
 * Plan view of a lawn drawn roughly to relative scale (side ∝ √area), striped, with the same small
 * house footprint on every plot for scale. The open-ended top band runs off its frame.
 */
export function plotSide(index: number): number {
  return [62, 92, 118, 150, 196][Math.min(index, 4)];
}

export function LawnPlot({ index, open = false, className = '', style }: { index: number; open?: boolean; className?: string; style?: CSSProperties }) {
  const side = plotSide(index);
  const pad = 4;
  const view = side + pad * 2;
  return (
    <svg data-art viewBox={`0 0 ${view} ${view}`} className={className} style={style} aria-hidden="true" focusable="false">
      <rect x={pad} y={pad} width={side} height={side} rx="4" fill="url(#lawn-v-sm)" />
      {open ? (
        <>
          <path d={`M${pad} ${pad + side} V${pad} H${pad + side}`} fill="none" stroke="var(--art-ink)" strokeWidth="2.5" />
          <path d={`M${pad + side} ${pad} V${pad + side} H${pad}`} fill="none" stroke="var(--art-ink)" strokeWidth="2.5" strokeDasharray="6 7" />
        </>
      ) : <rect x={pad} y={pad} width={side} height={side} rx="4" fill="none" stroke="var(--art-ink)" strokeWidth="2.5" />}
      <g transform={`translate(${pad + 8} ${pad + 8})`} stroke="var(--art-ink)" strokeWidth="2">
        <rect width="26" height="18" fill="var(--roof)" />
        <path d="M0 9 H26" stroke="#fff" strokeOpacity=".35" />
      </g>
    </svg>
  );
}
