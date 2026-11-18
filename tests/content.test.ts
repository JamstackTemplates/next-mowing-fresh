import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { addons, validateAddons } from '../content/addons.ts';
import { business } from '../content/business.ts';
import { patterns, validatePatterns } from '../content/patterns.ts';
import { plans, validatePlans } from '../content/plans.ts';
import { bandRange, fromPrice, lawnBands, topPrice, validateBands, type LawnBand } from '../content/prices.ts';
import { suburbs, suburbsByDay, validateSuburbs, type Suburb } from '../content/suburbs.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields', () => {
  for (const key of ['name', 'shortName', 'tagline', 'introduction', 'email', 'serviceArea'] as const) assert.ok(business[key].trim(), `business.${key}: required`);
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) assert.ok(tip.text.trim(), 'business.enquiries.usefulToInclude: empty tip');
});

test('the shipped collections are valid', () => {
  assert.doesNotThrow(() => validateBands(lawnBands));
  assert.doesNotThrow(() => validatePlans(plans));
  assert.doesNotThrow(() => validatePatterns(patterns));
  assert.doesNotThrow(() => validateAddons(addons));
  assert.doesNotThrow(() => validateSuburbs(suburbs));
  assert.equal(fromPrice, 45);
  assert.equal(topPrice, 155);
  assert.deepEqual(lawnBands.map(bandRange), ['Up to 150 m²', '150–350 m²', '350–600 m²', '600–1000 m²', 'Over 1000 m²']);
});

const edit = (index: number, change: Partial<LawnBand>) => lawnBands.map((band, i) => i === index ? { ...band, ...change } : band);

test('price bands must meet without gaps or overlaps, and failures name the band', () => {
  assert.throws(() => validateBands(edit(1, { minM2: 160 })), /band "standard": minM2 must be 150/);
  assert.throws(() => validateBands(edit(2, { maxM2: 340 })), /band "family": maxM2 must be larger/);
  assert.throws(() => validateBands(edit(2, { maxM2: null })), /band "family": only the last band can be open-ended/);
  assert.throws(() => validateBands([...lawnBands.slice(0, 2), lawnBands[1]]), /duplicate id/);
  assert.throws(() => validateBands(edit(0, { id: 'Court Yard' })), /id must be lower-case/);
});

test('prices are positive whole dollars and rise from weekly to fortnightly to one-off', () => {
  assert.throws(() => validateBands(edit(0, { weekly: 45.5 })), /band "courtyard": weekly must be a whole number/);
  assert.throws(() => validateBands(edit(0, { weekly: 0 })), /band "courtyard": weekly/);
  assert.throws(() => validateBands(edit(1, { weekly: 75 })), /band "standard": weekly price must be lower than fortnightly/);
  assert.throws(() => validateBands(edit(3, { oneOff: 110 })), /band "estate": fortnightly price must be lower than one-off/);
  assert.doesNotThrow(() => validateBands(edit(3, { oneOff: null })), 'on enquiry is allowed');
});

test('stripe patterns reference real lawn bands', () => {
  const broken = patterns.map(p => p.id === 'diamond' ? { ...p, minBandId: 'mansion' } : p);
  assert.throws(() => validatePatterns(broken), /pattern "diamond": minBandId "mansion" is not a band/);
  assert.throws(() => validatePatterns(patterns.map(p => p.id === 'checkerboard' ? { ...p, surcharge: -5 } : p)), /pattern "checkerboard": surcharge/);
  assert.throws(() => validateAddons([...addons, addons[0]]), /add-on "hedge-trim": duplicate id/);
});

test('suburbs have four-digit postcodes, Mon–Sat round days and a valid status', () => {
  const change = (id: string, patch: Partial<Suburb>) => suburbs.map(s => s.id === id ? { ...s, ...patch } : s) as Suburb[];
  assert.throws(() => validateSuburbs(change('kew', { postcode: '310' })), /suburb "kew": postcode must be four digits/);
  assert.throws(() => validateSuburbs(change('kew', { roundDay: 'Sun' as never })), /suburb "kew": roundDay/);
  assert.throws(() => validateSuburbs(change('kew', { status: 'maybe' as never })), /suburb "kew": status/);
  assert.throws(() => validateSuburbs([...suburbs, { ...suburbs[0], id: 'kew-2' }]), /suburb "kew-2": duplicate name/);
  assert.deepEqual(suburbsByDay().map(group => group.day), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
});

test('structured data lists only served suburbs, derived from content', () => {
  const data = businessStructuredData();
  assert.equal(data['@type'], 'HomeAndConstructionBusiness');
  const served = suburbs.filter(s => s.status === 'served').map(s => s.name);
  assert.deepEqual(data.areaServed.map(place => place.name), served);
  assert.ok(!served.includes('Balwyn North') && !served.includes('Box Hill'));
  assert.equal(data.priceRange, '$45–$155');
  assert.equal(data.openingHoursSpecification.length, 6, 'Sunday phone lines are closed');
});

test('enquiry copy never claims a booking, schedule or payment', () => {
  const files = ['app/page.tsx', 'app/prices/page.tsx', 'app/contact/page.tsx', 'app/suburbs/page.tsx', 'content/business.ts'];
  const copy = files.map(file => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')).join('\n');
  for (const claim of [/booking (is )?confirmed/i, /(?<!nothing )\bis booked\b/i, /you're booked/i, /\bscheduled\b/i, /\bpay(ment)?\b/i, /\bcheckout\b/i, /\bdeposit\b/i]) {
    assert.doesNotMatch(copy, claim);
  }
  assert.match(business.enquiries.introduction, /Nothing is booked until you say yes/);
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
