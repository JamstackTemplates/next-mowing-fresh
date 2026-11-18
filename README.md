# Fresh Stripes Mowing (`next-mowing-fresh`)

Static Next.js website for **Fresh Stripes Mowing**, a fictitious residential lawn-mowing crew in
Melbourne's inner east (sample template for the Jamstacks gallery). No application code depends on
the starter or portal repository at runtime.

## Local preview

Local development requires Node 24 or later and npm:

```sh
npm ci
npm run dev
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home page: hero with live phone-line status, visit inclusions, interactive stripe-pattern picker, mowing plans, lawn-size price teaser, round ribbon, 3-step start and `HomeAndConstructionBusiness` JSON-LD |
| `/prices/` | Plans & prices: weekly/fortnightly spread with winter rhythm, progressive-enhanced lawn-size helper, groundskeeper's price chart, 4 stripe patterns, shed tool-rack add-ons and price notes |
| `/suburbs/` | Suburbs: progressive-enhanced suburb/postcode lookup, schematic patchwork map, Monday–Saturday round sheet and waitlist enquiry band |
| `/contact/` | Get a quote: message checklist, hosted Jamstacks support form when configured (or visible email fallback), email, phone and phone-line hours |
| `/404.html` | Static error page with "Off the lawn" illustration and links to Home, Prices and Suburbs |

## Make it yours

| File | Owns |
| --- | --- |
| `content/business.ts` | Business name, short name, tagline, introduction, public email, phone, 7-day `phoneHours`, service area, landmark (`Victoria Park, Kew`), region/country and Contact checklist tips |
| `content/plans.ts` | `weekly` and `fortnightly` mowing plans (`id`, `name`, `frequency`, `summary`, `bestFor`, `includes`, `seasonNote`, `quietMonths`) |
| `content/prices.ts` | Lawn-size bands (`id`, `label`, `minM2`, `maxM2`, `example`, `weekly`, `fortnightly`, `oneOff`) with contiguous range and price-order validation |
| `content/patterns.ts` | Stripe patterns (`straight`, `diagonal`, `checkerboard`, `diamond`), surcharges and `minBandId` references to `prices.ts` |
| `content/addons.ts` | Optional add-ons (`id`, `name`, `price`, `unit`, `icon`) shown on the Prices shed rack |
| `content/suburbs.ts` | Suburbs served and waitlisted (`id`, `name`, `postcode`, `roundDay`, `status`), driving the Home round ribbon, Suburbs lookup, patchwork map, round sheet and JSON-LD `areaServed` |
| `app/page.tsx`, `app/prices/page.tsx`, `app/suburbs/page.tsx`, `app/contact/page.tsx`, `app/not-found.tsx` | Page composition and editable headings, introductions, labels and calls to action |
| `site.config.json` | Public `name`, `description`, `domain`, `timeZone` (`Australia/Melbourne`) and Jamstacks integration (`siteId`, `cdnUrl`) |
| `app/tailwind.input.css` | Light ("Saturday morning") and dark ("Oval under floodlights") tokens, `@theme inline` mappings, lawn stripe textures, grass fringes, responsive price-table rules and print styles |
| `components/site-header.tsx`, `components/site-footer.tsx`, `components/art/*` | Navigation shell and inline SVG artwork (`hero-yard`, `mower`, `marks`, `lawn-plot`, `plan-calendar`, `suburb-map`, `off-the-lawn`, `icons`) |
| `lib/structured-data.ts`, `lib/lawn-size.ts`, `lib/suburb-lookup.ts`, `lib/phone-lines.ts` | Schema.org `HomeAndConstructionBusiness` JSON-LD, lawn-area band matching, suburb lookup normalisation and Melbourne phone-line hours |
| `app/sitemap.ts`, `app/icon.svg`, `public/og.png` | Static sitemap, site icon and 1200×630 social preview image |

Common owner edits:
- **Change a price:** edit `content/prices.ts` (`weekly`, `fortnightly`, `oneOff`) and run `npm run check`.
- **Move a suburb off the waitlist:** change `status: 'waitlist'` to `'served'` in `content/suburbs.ts` and rebuild; the Home round strip, Suburbs round sheet, patchwork map, lookup and JSON-LD `areaServed` all update automatically.
- **Change phone hours:** edit `phoneHours` in `content/business.ts` (same-day intervals only, in `site.config.json`'s `timeZone`).

Do not add business content to `site.config.json`: the Jamstacks provisioner replaces that file wholesale, possibly adding `provisioningId`.

## Fonts and licences

Self-hosted variable fonts installed via npm (`@fontsource-variable/unbounded`, `@fontsource-variable/onest`, `@fontsource-variable/martian-mono`), all SIL Open Font License (OFL).

## Appearance and optional local-business features

The starter uses system fonts, neutral Tailwind v4 tokens and the published `jamstacks` package's
ThemeProvider, ThemeScript and DarkModeToggle. No font download or font licence file is needed for
system fonts. Each designed template chooses and documents self-hosted font packages and their licences.
Utilities live in components; colours originate in CSS tokens with light, automatic-dark and explicit-dark
values plus `@theme inline` mappings. Keep the hosted form's primary fill dark enough for white text.
Keyboard focus, reduced motion and print styles are included. The footer credit is yours to keep,
reword or remove.

For a business with visiting hours, add address/directions/hours to typed content, set the IANA `timeZone`
in site.config.json and use optional `GoogleMap`, `TimeZoneNote` and `OpenBadge` components. GoogleMap
accepts an address and descriptive title; map helpers need no key. `OpenBadge` accepts seven
`OpeningHours` records, uses the business zone and refreshes each minute in the browser; static/no-JS
output is neutral. Same-day intervals only: overnight hours fail validation and need a tested extension
before use. The baseline home page does not load a map or assert opening hours.

## Public configuration

```json
{
  "name": "Business name",
  "description": "Public description",
  "domain": "next-business-minimal.jamstacks.net",
  "timeZone": "America/New_York",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

The starter itself leaves domain/timeZone unset. Gallery templates use their folder name plus
`.jamstacks.net`; customers replace the demo domain with their own. Do not invent canonical URLs when
the deployed address is unknown.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config timeZone |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Copy .env.example to .env.local for Next.js local work. All listed values are public. Never add tokens,
SMTP credentials or publishing keys. Newer dependencies should stay within reviewed majors; update
package.json and package-lock.json together, then run the full checks.

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear only
on Contact when configured. Without a site ID there is no embed host/request. Email remains visible
in either case. The hosted runtime owns name/email/message fields, validation, submission and results.
Never register the element locally, substitute a form or intercept submission. Contact navigation uses
full document loads via SiteLink because the runtime has no remount API. Copy must describe an enquiry,
not a confirmed booking/order/payment; no attachments or extra input fields.

For local Jamstacks development, configure an explicit local CDN URL and
`JAMSTACKS_ALLOW_LOCAL_CDN=1`; remote builds reject localhost. A locally loaded component does not prove
real message delivery. Test delivery separately against a configured site/backend.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Tests cover config/provisioner compatibility, embed state, content rules, optional opening hours,
and structured-data escaping. Typecheck uses Next's generated route types.
When changing the Contact integration, base paths or canonical URLs, check the exported HTML and
sitemap. Verify both configured and unconfigured Contact with the corresponding build settings.
Test light/dark at desktop and mobile widths, keyboard navigation, unknown routes, repeated Contact
navigation and any added browser interactions. Return to a normal build before capturing final assets.

## GitHub Pages deployment

`.github/workflows/pages.yml` uses npm ci, tests, typecheck and static export. It preserves Jamstacks'
`provisioning_id` dispatch input
and correlated run name. It builds pull requests without deploying, and publishes main/manual runs.
Configure Pages to use GitHub Actions and set its custom domain to the same value as site.config.json.
DNS is managed separately; for template demos the CNAME targets `jamstacktemplates.github.io`.
Do not add public/CNAME. Enable HTTPS after the certificate is ready. This starter performs no remote setup.

## Content Security Policy

A host-level CSP must permit same-origin Next.js scripts/assets, the inline theme bootstrap (using an
appropriate hash/nonce policy), the configured Jamstacks CDN scripts/assets and the published form's
API connection origin. Derive actual directives from the deployed component. Optional maps require
`frame-src https://www.google.com`. Apply CSP at the host; static export cannot set response headers
through a running Next.js server. Do not put private credentials into CSP or relax policies blindly.

## Publishing assets and structure

`app/`, `components/`, `content/`, `lib/` and `types/` are the website. `scripts/` includes static
preview and verification, `tests/` covers customer behavior, and `.github/` supplies deployment.
`jamstacks/` is removable gallery-only source metadata. Ordinary builds, tests and Pages work after
it is deleted. To publish a gallery template, create [its manifest](jamstacks/README.md) and capture
genuine screenshots before running its separate publishing test:

```sh
node /home/mythz/src/mythz/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template /path/to/next-type-style --modes light,dark --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```

Before publication: replace neutral content and shell; validate industry data/schema and all links;
choose licensed fonts; verify both themes/base-path/embed states; create a neutral 1200×630 public/og.png
from the finished design and wire metadata; replace the icon; generate gallery captures and validate;
confirm domain/Pages settings and HTTPS; remove `plan/` and `.claude/skills/` after review. The website must not import or
link the planning folder. No stock screenshot or OG image is supplied as if it were final.
