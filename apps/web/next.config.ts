import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/** Server-only: where the NestJS API listens. The browser always calls same-origin /api/*. */
const apiUrl = process.env.API_URL ?? 'http://localhost:4000';

const nextConfig: NextConfig = {
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

export default createNextIntlPlugin('./src/i18n/request.ts')(nextConfig);
