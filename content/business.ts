// Fresh Stripes Mowing: fictitious gallery sample. Replace every value with the owner's real details.
import type { OpeningHours } from '../lib/hours.ts';
import { validateHours } from '../lib/hours.ts';

/** Icons available for the Contact checklist (drawn in components/art/icons.tsx). */
export type TipIcon = 'pin' | 'ruler' | 'calendar' | 'stripes' | 'gate' | 'flag';

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Shorter wordmark for narrow screens. */
  shortName: string;
  /** One-line summary used in metadata and the footer. */
  tagline: string;
  /** Plain-text introduction used for fallback metadata and structured data. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public phone number as it should be displayed; blank hides it. */
  phone: string;
  /**
   * Phone-line (office) hours in site.config.json's timeZone. Seven records, one per weekday.
   * Same-day intervals only: `closes` must be after `opens`. Omit both times for a closed day.
   */
  phoneHours: OpeningHours[];
  /** Service-area summary. The suburbs themselves live in content/suburbs.ts. */
  serviceArea: string;
  /** Public reference point (not premises): the crew has no shopfront. */
  landmark: string;
  /** Australian state abbreviation and country code, used in structured data. */
  region: string;
  country: string;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Quotes are enquiries until the customer says yes. */
    introduction: string;
    /** Suggestions for the message text, not additional form inputs. */
    usefulToInclude: { icon: TipIcon; text: string }[];
  };
}

export const business: Business = {
  name: 'Fresh Stripes Mowing',
  shortName: 'Fresh Stripes',
  tagline: "Weekly and fortnightly lawn mowing in Melbourne's inner east",
  introduction: "Weekly and fortnightly lawn mowing in Melbourne's inner east, with crisp stripes, trimmed edges and clippings taken away. Prices by lawn size from $45 a visit.",
  email: 'crew@example.com',
  phone: '0491 570 156',
  phoneHours: [
    { day: 'Monday', opens: '07:00', closes: '17:00' },
    { day: 'Tuesday', opens: '07:00', closes: '17:00' },
    { day: 'Wednesday', opens: '07:00', closes: '17:00' },
    { day: 'Thursday', opens: '07:00', closes: '17:00' },
    { day: 'Friday', opens: '07:00', closes: '17:00' },
    { day: 'Saturday', opens: '08:00', closes: '12:00' },
    { day: 'Sunday' },
  ],
  serviceArea: "Twelve suburbs around Kew, Hawthorn and Camberwell in Melbourne's inner east",
  landmark: 'Victoria Park, Kew',
  region: 'VIC',
  country: 'AU',
  enquiries: {
    title: 'Ask for a quote',
    introduction: "Tell us about your lawn. We'll take a look and reply with a quote. Nothing is booked until you say yes to the quote.",
    usefulToInclude: [
      { icon: 'pin', text: 'Your street and suburb' },
      { icon: 'ruler', text: 'Roughly how big the lawn is, or “front and back, average block”' },
      { icon: 'calendar', text: 'Weekly or fortnightly' },
      { icon: 'stripes', text: 'The stripe pattern you would like' },
      { icon: 'gate', text: 'Access notes: side gate, dogs, locked yard' },
      { icon: 'flag', text: 'The week you would like to start' },
    ],
  },
};

validateHours(business.phoneHours);
