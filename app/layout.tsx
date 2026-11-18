import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import '@fontsource-variable/unbounded/wght.css';
import '@fontsource-variable/onest/wght.css';
import '@fontsource-variable/martian-mono/wght.css';
import { ArtDefs } from '../components/art/defs';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { site } from '../lib/site';
import './tailwind.input.css';

const description = site.description || business.introduction;
const socialImage = site.url
  ? [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: `${business.name}: weekly and fortnightly mowing in Melbourne's inner east` }]
  : undefined;

export const metadata: Metadata = {
  title: { default: `${business.name} · Lawn mowing in Melbourne's inner east`, template: `%s · ${business.name}` },
  description,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: { type: 'website', siteName: business.name, title: business.name, description, locale: 'en_AU', ...(socialImage ? { images: socialImage } : {}) },
  twitter: { card: socialImage ? 'summary_large_image' : 'summary', title: business.name, description, ...(socialImage ? { images: socialImage.map(image => image.url) } : {}) },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f8ea' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1710' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en-AU" suppressHydrationWarning>
    <head><ThemeScript /></head>
    <body><ThemeProvider>
      <ArtDefs />
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter />
    </ThemeProvider></body>
  </html>;
}
