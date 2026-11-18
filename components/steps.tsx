import { Children, type ReactNode } from 'react';
import { SectionHeading } from './section-heading';

/** "How it starts": three numbered stages marked along a painted boundary arc. */
function StepsSection({ title, children }: { title: ReactNode; children: ReactNode }) {
  const steps = Children.toArray(children);
  return (
    <section aria-labelledby="steps-title" className="relative overflow-hidden py-16 sm:py-24">
      <div className="wrap">
        <SectionHeading id="steps-title" title={title} />
        <div className="relative mt-12">
          <svg data-art aria-hidden="true" focusable="false" viewBox="0 0 1200 220" preserveAspectRatio="none" className="absolute inset-x-0 -top-8 hidden h-32 w-full md:block">
            <path d="M10 200 Q600 -40 1190 200" fill="none" stroke="var(--accent)" strokeWidth="5" strokeDasharray="18 14" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <li key={index} className={`relative ${index === 1 ? 'md:-mt-4' : 'md:mt-12'}`}>
                <span aria-hidden="true" className="font-figures block text-[clamp(4.5rem,9vw,7.5rem)] leading-[.9] font-bold text-accent">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="mt-3 max-w-sm rounded-2xl bg-bg">
      <h3 className="text-[1.3rem]">{title}</h3>
      <p className="mt-2 text-muted">{children}</p>
    </div>
  );
}

export const Steps = Object.assign(StepsSection, { Step });
