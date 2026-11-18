import { asset } from '../../lib/paths';

/**
 * "Half-mown front yard": day (Saturday morning) and night (under warm porch and floodlight glow)
 * illustrations of a Melbourne weatherboard front yard, framed for both mobile crop and desktop bleed.
 */
export function HeroYard({ className = '' }: { className?: string }) {
  const shared = `h-full w-full object-cover object-[58%_54%] lg:object-[48%_45%] ${className}`;
  return (
    <>
      <img
        src={asset('/hero-yard-light.webp')}
        alt=""
        width={1200}
        height={1200}
        fetchPriority="high"
        decoding="async"
        className={`day-only block ${shared}`}
      />
      <img
        src={asset('/hero-yard-dark.webp')}
        alt=""
        width={1200}
        height={1200}
        fetchPriority="high"
        decoding="async"
        className={`night-only ${shared}`}
      />
    </>
  );
}
