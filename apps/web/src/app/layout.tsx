import type { Metadata, Viewport } from 'next';
import { Geist_Mono, Instrument_Sans, Instrument_Serif } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { DEFAULT_LOCALE } from '@/i18n/request';
import { Providers } from './providers';
import './globals.css';

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
});

// Codes (MFR-BD-0421), order numbers and figures.
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
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

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      dir="ltr"
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
