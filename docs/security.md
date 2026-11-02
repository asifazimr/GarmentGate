# Security review

What protects GarmentGate, where it lives in the code, and how it's tested. Reviewed before the
first production deployment (November 2026). Re-read it when adding an endpoint, an upload, a
socket event or a third-party service.

## The core rule: buyers and factories never meet

| Control                                                                                 | Where                                                                    | Tested by                                               |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------- |
| Buyer-facing data only from strict "public" schemas and serializers (extra keys throw)  | `catalog/public.serializer.ts`, `packages/shared` schemas                | `public.serializer.spec.ts`, `search-documents.spec.ts` |
| Each side's order/RFQ/dispute/payout view is its own strict schema; margins never cross | `orders/order-views.ts`, `payments`, `trust`                             | e2e suites, `security.e2e-spec.ts` (identity scan)      |
| Free text contact-filtered on the server and scrubbed of the other side's names         | `packages/shared/src/moderation/contact-filter.ts`, `scrubText`          | `contact-filter.test.ts`                                |
| Chat is relayed: no thread ever contains both companies (DB trigger)                    | migrations, `chat/conversations.service.ts`                              | `chat.e2e-spec.ts`                                      |
| Uploaded media stripped of metadata and reviewed before the other side sees it          | `media/*-processor.ts`, `/admin/moderation`                              | processor specs                                         |
| Search index holds only buyer-safe fields                                               | `search/search-documents.ts`                                             | `search-documents.spec.ts`                              |
| Error reports carry no identities, cookies, headers or bodies                           | `instrument.ts`, `common/monitoring/scrub.ts`, web `lib/sentry-scrub.ts` | `scrub.spec.ts`                                         |

`security.e2e-spec.ts` puts a factory's legal name, people, website, email and phone (and the
buyer's) into the database and asserts none of them appears in anything the other side can
fetch, including a buyer brand typed into an order title.

## Authentication and sessions

- Access token: 15-minute JWT in an httpOnly, `SameSite=Lax` cookie (`Secure` in production).
  Refresh token: opaque, stored hashed, rotated on every use; replaying a rotated token outside a
  30 s grace window revokes the whole session family.
- Passwords: argon2. Login answers the same for unknown emails and wrong passwords and runs a
  dummy hash to keep timing equal.
- Suspending a user revokes every session at once; the access token in the browser expires
  within 15 minutes and can't be refreshed.

## Authorization

- `JwtAuthGuard` and `RolesGuard` are global. Every route needs a session unless `@Public()`;
  inspectors are kept off every route that doesn't name them.
- Of 162 routes: 11 public (auth, health, categories, Stripe webhook), 109 role-restricted, 9 for
  any role (session, notifications), 33 for buyers/factories/staff with ownership checked in the
  service (orders, threads, disputes, reviews, shipments, KYC files). Ownership checks load the
  record _with_ the caller's company and answer 404 otherwise, so they don't reveal that a
  record exists.
- `security.e2e-spec.ts` reads every route from the OpenAPI document and asserts each non-public
  one refuses anonymous callers (new routes are covered automatically), keeps inspectors out,
  and has another buyer and another factory probe the order, RFQ, thread, dispute and file
  routes with **valid** bodies (so the ownership check, not validation, is what refuses).
- Open RFQs are visible to every listed factory in the category (by design, anonymized);
  catalog requests are invite-only.

## Rate limiting

- Global limit per `THROTTLE_LIMIT`/`THROTTLE_TTL_MS`; signed-in requests count **per user**
  (an office NAT doesn't throttle a team; one account can't spread a flood across IPs),
  anonymous ones per client IP. The throttler runs after authentication for that reason.
- Tighter per route: register 5/min, login 10/min, refresh 30/min, password reset 3–5/min,
  chat messages 30/min, new threads 20/min, every presigned upload 20/min. Socket typing events
  are throttled in the gateway.
- Tested: a user flooding chat is limited while another user on the same IP is not.

## File uploads

1. Presigned POST straight to private storage, with an exact `Content-Type` and a
   `content-length-range` the storage enforces.
2. On attach, the API checks the object exists with the declared type and size, then reads its
   first bytes and checks the **file signature** (PDF, JPEG, PNG, WebP, MP4, MOV): a renamed
   executable is deleted and rejected.
3. **Malware scan** (ClamAV over clamd INSTREAM) when `CLAMAV_HOST` is set: infected files are
   deleted and marked `INFECTED`; a scanner outage fails the request instead of letting a file
   through. Without a scanner, `scanStatus` stays `PENDING` (not scanned) and the API warns.
4. Media then goes through the worker: Sharp re-encodes images (dropping EXIF/GPS/XMP/ICC),
   PDFs are rebuilt without metadata, scripts, annotations or attachments, videos have metadata
   boxes and GPS tracks zeroed. Browsers only get short-lived signed URLs to the processed copies.

Tested: `file-signature.spec.ts`, `malware-scanner.spec.ts` (against a fake clamd, including
the EICAR signature) and an e2e upload of an executable declared as PNG.

## CSRF, CORS and headers

- Cookies are `SameSite=Lax`: other sites can't make cookie-carrying POSTs.
- Defence in depth (`common/security/origin-check.ts`): state-changing requests must come from
  an allowed origin; browsers' `Sec-Fetch-Site: cross-site` is refused even without `Origin`.
  The Stripe webhook (signature-verified) is the only exemption.
- CORS is limited to `CORS_ORIGINS` with credentials; Socket.io checks the same origins on the
  handshake (blocks cross-site WebSocket hijacking).
- Helmet sets security headers; Swagger can be turned off with `SWAGGER_ENABLED=false`.

## Secrets and configuration

- Every variable is validated at boot. In production the API refuses to start with the
  placeholder secrets from `.env.example`, insecure cookies, plain-HTTP origins, no email key,
  or a Stripe key without its webhook secret.
- `.env*` files are git-ignored (only `.env.example` is committed) and excluded from Docker
  build contexts; images run as an unprivileged user.
- Logs redact `authorization`, `cookie` and `set-cookie`.
- Secrets live in the hosting platform's secret store; rotate `JWT_ACCESS_SECRET` to sign
  everyone out.

## Money

Amounts are integer minor units; the ledger is double-entry, append-only and balanced (checked
in code and by deferred database triggers), idempotent per key. Buyer and factory payment views
are strict schemas that never carry the margin.

## Known limits and follow-ups

- **Access tokens after suspension** stay valid for up to 15 minutes (sessions are revoked
  immediately). Checking account status on every request would close the gap at the cost of a
  lookup per request (could be cached in Redis).
- **Malware scanning is optional** in code: production must set `CLAMAV_HOST` (see the
  deployment guide). A boot-time requirement can be added once every environment has clamd.
- **HTTP long-polling behind Vercel** needs sticky sessions when the API runs on more than one
  instance.
- **Dependency audit**: CI runs `pnpm audit --prod --audit-level high` on every push. At review
  time it reported two _moderate_ advisories, both accepted: `glob` (GHSA-3g3m-2fjr-6pw4) and
  `minimatch` (GHSA-g3hv-75wg-m249), reached only through build tooling (Sentry's bundler
  plugins, typescript-eslint, the react-email CLI) with patterns we write, never with user input.
  Revisit when those tools move to the patched majors. Review new entries in
  `pnpm-workspace.yaml` → `allowBuilds` before allowing install scripts.
