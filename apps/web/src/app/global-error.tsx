'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import './globals.css';

/**
 * Last resort when the root layout itself fails: no providers or messages are available here,
 * so the copy is plain English.
 */
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);
  return (
    <html lang="en">
      <body className="bg-background text-foreground flex min-h-dvh items-center justify-center p-6">
        <div role="alert" className="max-w-sm space-y-4 text-center">
          <h1 className="text-lg font-semibold">Something went wrong</h1>
          <p className="text-muted-foreground text-sm">
            GarmentGate couldn’t load this page. Check your connection and try again.
          </p>
          <button
            type="button"
            onClick={reset}
            className="bg-primary text-primary-foreground focus-visible:ring-ring/40 h-11 rounded-lg px-4 text-sm font-medium outline-none focus-visible:ring-3"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
