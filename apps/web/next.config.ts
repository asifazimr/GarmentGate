import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs/config';
import createNextIntlPlugin from 'next-intl/plugin';

/** Server-only: where the NestJS API listens. The browser always calls same-origin /api/*. */
const apiUrl = process.env.API_URL ?? 'http://localhost:4000';

const nextConfig: NextConfig = {
  // Docker builds (STANDALONE=1) ship a self-contained server; Vercel builds its own output.
  ...(process.env.STANDALONE && {
    output: 'standalone' as const,
    outputFileTracingRoot: fileURLToPath(new URL('../../', import.meta.url)),
    // Sentry loads these at runtime (tracing hooks); file tracing can't see them.
    outputFileTracingIncludes: {
      '/*': ['../../node_modules/.pnpm/@sentry+*/node_modules/@sentry/**'],
    },
  }),
  cacheComponents: true,
  // The floating dev badge sits on top of the sidebar's collapse button; errors still open the overlay.
  devIndicators: false,
  partialPrefetching: true,
  transpilePackages: ['@garmentgate/shared'],
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  // Same-origin API: auth cookies stay first-party, httpOnly and SameSite=Lax, with no CORS.
  rewrites() {
    return Promise.resolve([{ source: '/api/:path*', destination: `${apiUrl}/:path*` }]);
  },
};

/**
 * Sentry wraps the build only to upload source maps, and only when SENTRY_AUTH_TOKEN is set
 * (CI); local builds stay offline.
 */
export default withSentryConfig(createNextIntlPlugin('./src/i18n/request.ts')(nextConfig), {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  telemetry: false,
  sourcemaps: { disable: !process.env.SENTRY_AUTH_TOKEN },
});
