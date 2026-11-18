import type { Metadata } from 'next';
import { MowerPass } from '../../components/art/marks';
import { PageHead } from '../../components/page-head';
import { RoundSheet } from '../../components/rounds';
import { SuburbFinder } from '../../components/suburb-finder';
import { WaitlistBand } from '../../components/waitlist-band';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Suburbs',
  description: 'Check whether your Melbourne inner-east suburb is on our Monday to Saturday mowing rounds or on the waitlist.',
  alternates: { canonical: absoluteUrl('/suburbs/') },
};

export default function SuburbsPage() {
  return (
    <>
      <PageHead size="small" icon="pin" title="Where we mow">
        <p>Twelve suburbs across Melbourne&apos;s inner east, arranged in Monday to Saturday rounds near Victoria Park, Kew.</p>
      </PageHead>

      <SuburbFinder
        title="Check your suburb"
        inputLabel="Suburb name or postcode"
        placeholder="e.g. Camberwell or 3124"
        quoteLabel="Ask for a quote"
      >
        <p>Look up your suburb below or read the full Monday to Saturday round sheet beneath the map.</p>
      </SuburbFinder>

      <MowerPass />

      <RoundSheet title="Weekly round sheet" waitlistLabel="waitlist">
        <p>Each suburb has a set day so the crew works one neighbourhood at a time.</p>
      </RoundSheet>

      <WaitlistBand title="Waitlist &amp; nearby streets" quote="Ask for a quote" phone="Call">
        <p>On the waitlist? Send an enquiry and we&apos;ll tell you when a spot opens.</p>
      </WaitlistBand>
    </>
  );
}
