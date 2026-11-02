# Deploying GarmentGate

A production setup with managed services. Everything here is also possible on a single VPS
with Docker (see the last section).

```
Browser ──► app.garmentgate.com (Vercel, Next.js) ──/api/* rewrite──► api.garmentgate.com (API container)
                                                                         ├── Postgres (managed)
                                                                         ├── Redis (managed)        queues, rate limits, Socket.io fan-out
                                                                         ├── Meilisearch Cloud      buyer-safe search index
                                                                         ├── Cloudflare R2          files (private bucket)
                                                                         ├── ClamAV (clamd)         upload malware scan
                                                                         └── Resend                 email
```

The browser only ever talks to the web app. `/api/*` is rewritten server-side to the API, so
the auth cookies are first-party to the web domain (httpOnly, `SameSite=Lax`, `Secure`) and no
CORS is involved for normal requests.

## 1. Accounts and services

| Service      | Suggested                                     | Notes                                                                      |
| ------------ | --------------------------------------------- | -------------------------------------------------------------------------- |
| Web          | Vercel                                        | Next.js 16, built from the monorepo                                        |
| API          | Railway, Render, Fly.io or a VPS              | Runs `apps/api/Dockerfile`; HTTP, Socket.io and BullMQ workers             |
| Postgres     | Neon, Supabase, RDS, Railway Postgres         | Postgres 16+; the migrations include triggers and check constraints        |
| Redis        | Upstash (TCP, not REST), Railway, Redis Cloud | BullMQ needs a regular Redis connection with `maxmemory-policy noeviction` |
| Search       | Meilisearch Cloud                             | v1.x; use a **search+admin key**, not the master key, if you can           |
| Files        | Cloudflare R2                                 | S3-compatible, private bucket                                              |
| Malware scan | ClamAV (`clamav/clamav` image)                | A sidecar/private service next to the API                                  |
| Email        | Resend                                        | Verify the sending domain                                                  |
| Monitoring   | Sentry                                        | Two projects: `garmentgate-web`, `garmentgate-api`                         |

## 2. Postgres

1. Create a database and note the connection string (`postgresql://…?sslmode=require`).
2. Migrations run as a **release step**, before new API instances start:
   ```bash
   docker build -f apps/api/Dockerfile --target migrate -t garmentgate-api-migrate .
   docker run --rm -e DATABASE_URL=… garmentgate-api-migrate   # prisma migrate deploy
   ```
   On Railway/Render, set the migrate image (or `pnpm --filter api exec prisma migrate deploy`)
   as the pre-deploy command. Never run `db:seed` in production: it wipes app tables.
3. Create the categories for the catalog (the seed has the default tree; copy the
   `categories` rows from a seeded development database, or insert your own).
4. Create the first staff account (the password is prompted for, or read from `ADMIN_PASSWORD`):
   ```bash
   docker run --rm -it -e DATABASE_URL=… garmentgate-api node scripts/create-admin.mjs admin@garmentgate.com Ada Admin
   ```
   Use **Admin → Users** after that. Inspectors are created from **Admin → Inspectors**.

## 3. Redis

Any Redis 7+ with a normal TCP URL (`rediss://…` for TLS). BullMQ requires
`maxmemory-policy noeviction`; most managed plans let you set it. One Redis serves queues, the
throttler and Socket.io.

## 4. Meilisearch Cloud

Create a project and copy the host and an API key with index/search/document permissions. Set a
`MEILISEARCH_INDEX_PREFIX` (e.g. `prod_`) if staging shares the project. The API rebuilds its
indexes from Postgres on boot, so there is nothing to migrate.

## 5. Cloudflare R2

1. Create a bucket (e.g. `garmentgate-files`). Keep it **private**: no public access, no custom
   domain. Browsers only ever get short-lived presigned URLs.
2. Create an R2 API token with _Object Read & Write_ on that bucket.
3. CORS on the bucket (uploads go browser → R2 with a presigned POST):
   ```json
   [
     {
       "AllowedOrigins": ["https://app.garmentgate.com"],
       "AllowedMethods": ["POST", "GET", "HEAD"],
       "AllowedHeaders": ["*"],
       "MaxAgeSeconds": 3600
     }
   ]
   ```
4. API settings: `S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com`, `S3_REGION=auto`,
   `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_FORCE_PATH_STYLE=true`.

## 6. ClamAV

Run `clamav/clamav:stable` as a private service reachable from the API on port 3310 and set
`CLAMAV_HOST` / `CLAMAV_PORT`. In `clamd.conf` raise `StreamMaxLength` to at least `64M`
(the largest upload, a production video, is 50 MB). It needs ~1.5 GB of RAM for its signatures.
Uploads are scanned when they're attached; if clamd is down, the attach fails and the user
retries, so a file is never accepted unscanned. Without `CLAMAV_HOST` the API logs a warning
and files stay `scanStatus = PENDING` (not scanned).

## 7. The API

Build from the repository root: `docker build -f apps/api/Dockerfile -t garmentgate-api .`
The image runs `node dist/main.js` as an unprivileged user, listens on `PORT` (default 4000)
and has a `HEALTHCHECK` on `/health`. Point the platform's health check at `/health` (liveness)
and use `/health/ready` (checks Postgres, Redis, Meilisearch and storage) for readiness.

Environment (validated at boot; in production the API refuses to start with placeholder
secrets, plain-HTTP origins or insecure cookies):

| Variable                                                        | Production value                                                                 |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `NODE_ENV`                                                      | `production`                                                                     |
| `PORT`                                                          | as the platform requires                                                         |
| `TRUST_PROXY`                                                   | `1` behind one proxy (Railway/Render/Fly); see below                             |
| `CORS_ORIGINS`                                                  | `https://app.garmentgate.com`                                                    |
| `WEB_APP_URL`                                                   | `https://app.garmentgate.com` (links in emails)                                  |
| `SWAGGER_ENABLED`                                               | `false` (or keep it behind auth)                                                 |
| `JWT_ACCESS_SECRET`                                             | `openssl rand -base64 48`                                                        |
| `COOKIE_SECURE`                                                 | `true`                                                                           |
| `RESEND_API_KEY`, `EMAIL_FROM`                                  | from Resend                                                                      |
| `DATABASE_URL`, `REDIS_URL`                                     | from the providers                                                               |
| `MEILISEARCH_HOST`, `MEILISEARCH_API_KEY`                       | from Meilisearch Cloud                                                           |
| `S3_*`                                                          | R2 (section 5)                                                                   |
| `CLAMAV_HOST`, `CLAMAV_PORT`                                    | section 6                                                                        |
| `PLATFORM_*`                                                    | GarmentGate's legal name, address, email and bank details                        |
| `STRIPE_*`                                                      | optional; webhook endpoint `https://api.garmentgate.com/payments/stripe/webhook` |
| `SENTRY_DSN`, `SENTRY_ENVIRONMENT`, `SENTRY_TRACES_SAMPLE_RATE` | section 9                                                                        |

**Client IPs.** Anonymous rate limits count per client IP. Set `TRUST_PROXY` to the number of
proxies in front of the API (e.g. `1` for a platform load balancer) so Express reads the real IP
from `X-Forwarded-For`; requests through the web app's rewrite add one more hop. Signed-in
requests are limited per user, so this mostly matters for sign-in attempts.

**Scaling.** One instance handles HTTP, Socket.io and the BullMQ workers. You can run several:
queues and rate limits live in Redis, and Socket.io events fan out through Redis. If clients
fall back to HTTP long-polling (they do behind Vercel's rewrite, see below), enable **sticky
sessions** on the API's load balancer, or keep a single instance and scale it vertically.

## 8. The web app on Vercel

1. Import the repository. **Root directory:** `apps/web`. Vercel detects Next.js and Turborepo;
   leave the install command (`pnpm install`) and build command (`next build` via Turbo) as
   suggested. Node 22.
2. Environment variables (Production and Preview):
   - `API_URL=https://api.garmentgate.com`: used by the `/api/*` rewrite (**at build time**)
     and the proxy's session refresh (at runtime). Redeploy after changing it.
   - `NEXT_PUBLIC_SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_ENVIRONMENT`, `SENTRY_DSN`,
     `SENTRY_ENVIRONMENT`, and for source maps `SENTRY_ORG`, `SENTRY_PROJECT`,
     `SENTRY_AUTH_TOKEN`.
3. Add the domain `app.garmentgate.com`.
4. **Realtime on Vercel.** Vercel rewrites don't proxy WebSocket upgrades, so the chat and
   notification sockets use HTTP long-polling through `/api/socket.io` (the client falls back
   automatically). It works; enable sticky sessions on the API if you run several instances.
   For native WebSockets, host the web app on a platform that proxies upgrades (the web Docker
   image, below) or put both behind a proxy you control.

### Self-hosting the web app instead

```bash
docker build -f apps/web/Dockerfile --build-arg API_URL=https://api.garmentgate.com \
  --build-arg NEXT_PUBLIC_SENTRY_DSN=… -t garmentgate-web .
docker run -p 3000:3000 -e API_URL=https://api.garmentgate.com garmentgate-web
```

## 9. Sentry

Create two projects. Both SDKs are configured to collect no user info, cookies, headers, bodies
or query strings, and scrub anything that slips through (`scrubEvent`); only an opaque user id is
kept. Session Replay is off on purpose (it would record identities and messages). HTTP errors the
API throws on purpose (4xx) aren't reported; unexpected errors and BullMQ jobs that fail their
last retry are. Source maps upload during the Vercel build when `SENTRY_AUTH_TOKEN` is set.

## 10. A single VPS (alternative)

On one Ubuntu host with Docker: run Postgres, Redis, Meilisearch, MinIO (or R2) and ClamAV with a
production compose file (strong passwords, no published ports except through a reverse proxy),
build both images, and put Caddy or Traefik in front for TLS on `app.` and `api.` (both proxy
WebSockets). Back up the Postgres volume daily (`pg_dump`) and copy it off the host.

## 11. Go-live checklist

- [ ] Migrations applied (`prisma migrate deploy`), categories and the first admin created
- [ ] `/health/ready` is green from the platform
- [ ] Email: register, verify, reset password reach real inboxes
- [ ] Upload a KYC document and a product photo; the photo gets renditions; an EICAR test file
      is rejected (proves ClamAV)
- [ ] A buyer and a factory see each other only as codes (try the journeys end to end)
- [ ] Sentry receives a test error from both apps
- [ ] Postgres backups and point-in-time recovery enabled; R2 bucket private
- [ ] `SWAGGER_ENABLED=false` (or protected), `COOKIE_SECURE=true`, HTTPS everywhere
