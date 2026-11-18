import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { lawnBands } from '../content/prices.ts';
import { suburbs, type Suburb } from '../content/suburbs.ts';
import { hoursSummary, validateHours } from '../lib/hours.ts';
import { bandForArea, lawnArea, lawnSizeMessage } from '../lib/lawn-size.ts';
import { phoneLinesLabel, phoneLinesStatic } from '../lib/phone-lines.ts';
import { lookupMessage, lookupSuburb } from '../lib/suburb-lookup.ts';

const MEL = 'Australia/Melbourne';
const lines = (iso: string, zone = MEL) => phoneLinesLabel(business.phoneHours, zone, new Date(iso));

test('phone lines: static copy stays neutral and is derived from the hours', () => {
  assert.equal(phoneLinesStatic(business.phoneHours), 'Phone lines Mon–Fri 7am–5pm, Sat 8am–12pm');
  assert.equal(lines('2026-11-18T00:00:00Z', ''), 'Phone lines Mon–Fri 7am–5pm, Sat 8am–12pm', 'no zone: neutral');
});

test('phone lines: 7:00 opens and 17:00 closes, in Melbourne time (AEDT, UTC+11)', () => {
  // Wednesday 18 November 2026, AEDT.
  assert.equal(lines('2026-11-17T19:59:00Z'), 'Phone lines closed, back today 7am');
  assert.equal(lines('2026-11-17T20:00:00Z'), 'Phone lines open, until 5pm');
  assert.equal(lines('2026-11-18T05:59:00Z'), 'Phone lines open, until 5pm');
  assert.equal(lines('2026-11-18T06:00:00Z'), 'Phone lines closed, back tomorrow 7am');
  // The configured business zone decides: the same instant is 3pm Tuesday in New York.
  assert.equal(lines('2026-11-17T20:00:00Z', 'America/New_York'), 'Phone lines open, until 5pm');
  assert.equal(lines('2026-11-17T23:00:00Z', 'America/New_York'), 'Phone lines closed, back tomorrow 7am');
  assert.equal(lines('2026-11-17T23:00:00Z'), 'Phone lines open, until 5pm');
});

test('phone lines: Saturday closes at noon and Sunday is closed until Monday', () => {
  // Saturday 21 November 2026.
  assert.equal(lines('2026-11-20T21:00:00Z'), 'Phone lines open, until 12pm');
  assert.equal(lines('2026-11-21T00:59:00Z'), 'Phone lines open, until 12pm');
  assert.equal(lines('2026-11-21T01:00:00Z'), 'Phone lines closed, back Monday 7am');
  // Sunday 22 November 2026, midday.
  assert.equal(lines('2026-11-22T01:00:00Z'), 'Phone lines closed, back tomorrow 7am');
});

test('phone lines: DST start (first Sunday in October) keeps local opening times', () => {
  // Friday 2 October 2026 is AEST (UTC+10): 7:00 local = 21:00Z the day before.
  assert.equal(lines('2026-10-01T20:59:00Z'), 'Phone lines closed, back today 7am');
  assert.equal(lines('2026-10-01T21:00:00Z'), 'Phone lines open, until 5pm');
  // Sunday 4 October 2026: clocks go forward at 2am. Closed all day.
  assert.equal(lines('2026-10-03T16:30:00Z'), 'Phone lines closed, back tomorrow 7am');
  // Monday 5 October 2026 is AEDT (UTC+11): 7:00 local = 20:00Z on Sunday.
  assert.equal(lines('2026-10-04T19:59:00Z'), 'Phone lines closed, back today 7am');
  assert.equal(lines('2026-10-04T20:00:00Z'), 'Phone lines open, until 5pm');
});

test('phone lines: DST end (first Sunday in April) keeps local opening times', () => {
  // Friday 3 April 2026 is AEDT (UTC+11): 17:00 local = 06:00Z.
  assert.equal(lines('2026-04-03T05:59:00Z'), 'Phone lines open, until 5pm');
  assert.equal(lines('2026-04-03T06:00:00Z'), 'Phone lines closed, back tomorrow 8am');
  // Monday 6 April 2026 is AEST (UTC+10): 7:00 local = 21:00Z on Sunday.
  assert.equal(lines('2026-04-05T20:59:00Z'), 'Phone lines closed, back today 7am');
  assert.equal(lines('2026-04-05T21:00:00Z'), 'Phone lines open, until 5pm');
});

test('phone hours reject overnight intervals, naming the day', () => {
  const overnight = business.phoneHours.map(entry => entry.day === 'Friday' ? { ...entry, opens: '20:00', closes: '02:00' } : entry);
  assert.throws(() => validateHours(overnight), /Friday/);
  assert.equal(hoursSummary(business.phoneHours.map(entry => entry.day === 'Wednesday' ? { day: 'Wednesday' as const } : entry)),
    'Mon–Tue 7am–5pm, Thu–Fri 7am–5pm, Sat 8am–12pm');
});

test('lawn-size helper: band boundaries include their upper bound', () => {
  const id = (area: number) => bandForArea(area, lawnBands)?.id;
  assert.equal(id(1), 'courtyard');
  assert.equal(id(150), 'courtyard');
  assert.equal(id(151), 'standard');
  assert.equal(id(350), 'standard');
  assert.equal(id(351), 'family');
  assert.equal(id(600), 'family');
  assert.equal(id(601), 'estate');
  assert.equal(id(1000), 'estate');
  assert.equal(id(1001), 'acreage');
  assert.equal(id(0), undefined);
  assert.equal(lawnArea(12, 12.5), 150);
  assert.equal(lawnArea(0, 10), null);
  assert.equal(lawnArea(Number.NaN, 10), null);
});

test('lawn-size helper: messages quote the band, and acreage is on enquiry', () => {
  assert.equal(lawnSizeMessage(180, lawnBands), 'About 180 m²: Standard lawn. $60 weekly, $70 fortnightly, $90 one-off a visit.');
  assert.equal(lawnSizeMessage(1200, lawnBands), 'About 1,200 m²: Acreage, price on enquiry.');
  assert.equal(lawnSizeMessage(null, lawnBands), 'Enter the length and width of your lawn in metres.');
});

test('suburb lookup matches names and postcodes, ignoring case, spaces and hyphens', () => {
  const found = (query: string) => {
    const result = lookupSuburb(query, suburbs);
    return result.kind === 'served' || result.kind === 'waitlist' ? `${result.kind}:${result.suburb.id}` : result.kind;
  };
  assert.equal(found('camberwell'), 'served:camberwell');
  assert.equal(found('3124'), 'served:camberwell');
  assert.equal(found('Kew East'), 'served:kew-east');
  assert.equal(found('keweast'), 'served:kew-east');
  assert.equal(found('kew-east'), 'served:kew-east');
  assert.equal(found('KEW'), 'served:kew', 'an exact name beats a longer prefix match');
  assert.equal(found('camb'), 'served:camberwell');
  assert.equal(found('Box Hill'), 'waitlist:box-hill');
  assert.equal(found('Richmond'), 'unknown');
  assert.equal(found('  '), 'empty');
});

test('suburb lookup messages', () => {
  assert.equal(lookupMessage(lookupSuburb('Camberwell', suburbs)), 'Yes, we mow Camberwell on Wednesdays.');
  assert.equal(lookupMessage(lookupSuburb('3104', suburbs)), "Balwyn North is on our waitlist. Send an enquiry and we'll tell you when a spot opens.");
  assert.match(lookupMessage(lookupSuburb('Richmond', suburbs)), /^Richmond isn't on our rounds yet, but send an enquiry/);
});

test('owner edit: moving Balwyn North off the waitlist changes the lookup', () => {
  const edited: Suburb[] = suburbs.map(s => s.id === 'balwyn-north' ? { ...s, status: 'served' } : s);
  assert.equal(lookupMessage(lookupSuburb('Balwyn North', edited)), 'Yes, we mow Balwyn North on Thursdays.');
});
