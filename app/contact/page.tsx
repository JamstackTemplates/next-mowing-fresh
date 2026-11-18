import type { Metadata } from 'next';
import { ContactDetails, FormPanel, MessageChecklist } from '../../components/contact-panels';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Ask for a quote',
  description: 'Send a quote enquiry for weekly or fortnightly mowing, a one-off mow or an add-on. Nothing is booked until you say yes to the quote.',
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return <>
    <PageHead divider title={business.enquiries.title}>
      <p>{business.enquiries.introduction}</p>
    </PageHead>
    <div className="wrap pt-10 pb-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <MessageChecklist title="What to put in your message">
          <p>The form asks for your name, email and a message. Put these in the message and we can quote without a second email.</p>
        </MessageChecklist>
        <section aria-label="Enquiry form">
          <FormPanel>
            {hosted ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email} />
              : <>
                <h2 className="text-[1.4rem]">Email the crew</h2>
                <p className="mt-3 text-muted">The enquiry form isn&apos;t connected on this site yet. Email us at the address below with the details from the list, and we&apos;ll reply with a quote.</p>
                <p className="mt-5"><a className="button" href={`mailto:${business.email}?subject=${encodeURIComponent('Mowing quote enquiry')}`}>Email {business.email}</a></p>
              </>}
          </FormPanel>
          <p className="mt-4 text-[.95rem] text-muted">This is a quote enquiry. We reply by email, usually within a working day.</p>
        </section>
      </div>
      <ContactDetails emailLabel="Email" phoneLabel="Phone" />
    </div>
  </>;
}
