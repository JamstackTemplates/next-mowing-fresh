import type { Metadata } from 'next';
import { MowerPass } from '../components/art/marks';
import { ClosingBand } from '../components/closing-band';
import { Hero } from '../components/hero';
import { IncludesLine } from '../components/includes-line';
import { PlansPair } from '../components/plans';
import { PriceSkyline } from '../components/price-skyline';
import { RoundRibbon } from '../components/rounds';
import { Steps } from '../components/steps';
import { StripePicker } from '../components/stripe-picker';
import { formatPrice, fromPrice } from '../content/prices';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

export default function HomePage() {
  return <>
    <Hero>
      <Hero.Heading>Fresh stripes, every week or every fortnight.</Hero.Heading>
      <Hero.Introduction>
        We mow, edge and clear away the clippings across twelve suburbs in Melbourne&apos;s inner east.
        Pick a plan and a stripe, and we&apos;ll quote for your lawn.
      </Hero.Introduction>
      <Hero.Price amount={`from ${formatPrice(fromPrice)}`}>a visit, weekly</Hero.Price>
      <Hero.Actions>
        <Hero.Quote>Ask for a quote</Hero.Quote>
        <Hero.Phone>Call</Hero.Phone>
      </Hero.Actions>
      <Hero.SuburbLink>Is my suburb on a round?</Hero.SuburbLink>
      <Hero.Status />
    </Hero>

    <IncludesLine title="Every visit includes">
      <IncludesLine.Item icon="mower">Mow, front and back</IncludesLine.Item>
      <IncludesLine.Item icon="edger">Edge every path and bed</IncludesLine.Item>
      <IncludesLine.Item icon="snipper">Whipper-snip the fence line</IncludesLine.Item>
      <IncludesLine.Item icon="blower">Blow paths and driveway clean</IncludesLine.Item>
      <IncludesLine.Item icon="bag">Clippings taken away</IncludesLine.Item>
    </IncludesLine>

    <section aria-label="Stripe patterns" className="py-16 sm:py-24">
      <div className="wrap">
        <StripePicker name="home-stripe" legend="Pick your stripe">
          <p>Every plan comes with a pattern. Try one on the lawn here, then mention it when you ask for a quote.</p>
        </StripePicker>
      </div>
    </section>
    <MowerPass />

    <PlansPair title="Two plans, same crew, same stripes" linkText="See every price by lawn size">
      <p>Your lawn gets mown on your suburb&apos;s round day by the same two people each time.</p>
    </PlansPair>

    <PriceSkyline title="Priced by the size of your lawn" priceLabel="weekly, a visit" linkText="Full price table">
      <p>Five sizes, from a townhouse courtyard to a double block. Fortnightly and one-off prices are on the price table.</p>
    </PriceSkyline>

    <RoundRibbon title="On the rounds" waitlistLabel="waitlist" linkText="Check your suburb">
      <p>Each suburb has its own day, so the crew is never far from your lawn.</p>
    </RoundRibbon>

    <Steps title="How it starts">
      <Steps.Step title="Send an enquiry">Tell us your suburb, roughly how big the lawn is and the plan you like the look of.</Steps.Step>
      <Steps.Step title="We look and quote">We drop by on your suburb&apos;s round day, look at the lawn and reply with a quote.</Steps.Step>
      <Steps.Step title="Your first mow">Nothing is booked until you say yes to the quote. Then we put you on the round.</Steps.Step>
    </Steps>

    <ClosingBand title="Ready for stripes?" quote="Ask for a quote" phone="Call" />

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }} />
  </>;
}
