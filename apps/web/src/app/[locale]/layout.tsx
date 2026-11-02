import type { Metadata, Viewport } from 'next';
import { Geist_Mono, Instrument_Sans, Instrument_Serif } from 'next/font/google';
import { availableLocales, isLocale, localeDir } from '@garmentgate/shared';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { Providers } from './providers';
import '../globals.css';

// UI text: a grotesque with a little character, very legible at small sizes.
const instrumentSans = Instrument_Sans({
  variable: '--font-instrument-sans',
  subsets: ['latin'],
  display: 'swap',
});

// Display: an editorial serif for marketing headlines and page heroes only.
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  // Marketing headlines only: don't compete with app pages' critical requests.
  preload: false,
});

// Codes (MFR-BD-0421), order numbers and figures.
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  // Codes and figures fall back to the system monospace until it arrives.
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: 'GarmentGate · Managed garment sourcing',
    template: '%s · GarmentGate',
  },
  description:
    'Source garments from verified factories worldwide. Quotes, samples, QC and payments, managed end to end.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbfc' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0f13' },
  ],
};

/** Every routable locale is prerendered; the proxy picks one per request from the cookie. */
export function generateStaticParams() {
  return availableLocales(process.env.NODE_ENV !== 'production').map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html
      lang={locale}
      dir={localeDir(locale)}
      // next-themes sets the class before paint, so the server and client markup differ here.
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
