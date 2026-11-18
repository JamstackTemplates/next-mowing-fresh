import { business } from '../content/business.ts';
import { fromPrice, topPrice } from '../content/prices.ts';
import { servedSuburbs } from '../content/suburbs.ts';
import { DAYS } from './hours.ts';
import { absoluteUrl } from './paths.ts';
import { site } from './site.ts';

/** HomeAndConstructionBusiness derived from content: only suburbs with status 'served' are listed in areaServed. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url, image: `${site.url}/og.png` } : {}),
    priceRange: `$${fromPrice}–$${topPrice}`,
    currenciesAccepted: 'AUD',
    areaServed: servedSuburbs.map(suburb => ({
      '@type': 'Place',
      name: suburb.name,
      address: { '@type': 'PostalAddress', addressLocality: suburb.name, postalCode: suburb.postcode, addressRegion: business.region, addressCountry: business.country },
    })),
    openingHoursSpecification: DAYS.flatMap(day => {
      const entry = business.phoneHours.find(item => item.day === day);
      return entry?.opens && entry.closes
        ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${day}`, opens: entry.opens, closes: entry.closes }]
        : [];
    }),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
