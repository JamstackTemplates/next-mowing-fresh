import type { Metadata } from 'next';
import { AddonsRack } from '../../components/addons-rack';
import { MowerPass } from '../../components/art/marks';
import { ClosingBand } from '../../components/closing-band';
import { PageHead } from '../../components/page-head';
import { PatternGrid } from '../../components/pattern-grid';
import { PlanSpread } from '../../components/plans';
import { PriceChart } from '../../components/price-chart';
import { PriceNotes } from '../../components/price-notes';
import { SectionHeading } from '../../components/section-heading';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Plans & prices',
  description: 'Weekly and fortnightly lawn mowing plans and prices by lawn size in Melbourne’s inner east, from $45 a visit in AUD with GST included.',
  alternates: { canonical: absoluteUrl('/prices/') },
};

export default function PricesPage() {
  return (
    <>
      <PageHead pattern="straight" title="Plans & prices">
        <p>Two regular mowing plans, five lawn sizes and four stripe patterns, with clippings always taken away.</p>
      </PageHead>

      <section aria-labelledby="plans-detail-title" className="bg-surface-soft py-16 sm:py-20">
        <div className="wrap">
          <SectionHeading id="plans-detail-title" title="Weekly or fortnightly">
            <p>Both plans follow your suburb&apos;s round day and include the same clean finish on every visit.</p>
          </SectionHeading>
          <div className="mt-12">
            <PlanSpread includesLabel="Every visit includes" winter="Winter rhythm" />
          </div>
        </div>
      </section>

      <PriceChart
        title="Prices by lawn size"
        helperTitle="Lawn-size helper"
        helperNote="Enter an approximate length and width in metres to highlight the matching band. Nothing is submitted."
      >
        <p>Per-visit prices in Australian dollars, GST included. Pick your band from the examples or measure your lawn below.</p>
      </PriceChart>

      <MowerPass flip />

      <PatternGrid title="Four stripe patterns">
        <p>Straight and diagonal stripes are included at no extra cost. Two-pass patterns add a little extra time on the mower.</p>
      </PatternGrid>

      <AddonsRack title="Extras from the shed">
        <p>Add any of these to a regular plan or ask about them in a one-off enquiry.</p>
      </AddonsRack>

      <PriceNotes title="Good to know">
        <span>All prices are in AUD and include GST.</span>
        <span>Rates shown are per visit for regular access.</span>
        <span>We look at your lawn in person and reply with a firm quote.</span>
        <span>Nothing is booked until you say yes to the quote.</span>
      </PriceNotes>

      <ClosingBand title="Ready for a quote?" quote="Ask for a quote" phone="Call" />
    </>
  );
}
