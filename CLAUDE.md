# GarmentGate

## Product

GarmentGate is a managed B2B marketplace that connects garment buyers worldwide with garment manufacturers. **GarmentGate is the contracting party in the middle**: buyers contract with us, and we contract with manufacturers. Every quote, chat message, order, file and payment goes through the platform.

### Roles

| Role           | Who                             | Can                                                                                                                                     |
| -------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `BUYER`        | Brands, retailers, importers    | Browse anonymized manufacturer profiles, request quotes (RFQs), chat via the platform, place and track orders, pay GarmentGate          |
| `MANUFACTURER` | Factories and production houses | Maintain their profile and capabilities, respond to RFQs, chat via the platform, fulfil orders, receive payouts from GarmentGate        |
| `ADMIN`        | GarmentGate staff               | Verify manufacturers, moderate content, manage quotes/orders/disputes, see real identities on both sides, configure margins and payouts |

A user has exactly one role. Authorization is enforced in the API (guards on every route); the web app hides UI by role but is never the security boundary.

## Core rule: no direct contact

Buyers and manufacturers must **never** be able to identify or contact each other directly. Any change that could leak identity or contact details is a bug, whatever the feature.

1. **Anonymized manufacturers.** Buyers only ever see a manufacturer's public code, e.g. `MFR-BD-0421` (`MFR-<ISO country code>-<4-digit number>`). Company name, legal entity, address, website, people's names, emails, phone numbers, social handles, and certificate numbers that identify the factory are never sent to a buyer.
   - Buyer-facing API responses are built from dedicated "public" serializers/DTOs. Never return a Prisma model directly, and never rely on the frontend to hide fields.
   - Uploaded media (photos, tech packs, certificates) shown to buyers must be reviewed or processed to remove logos, signage and EXIF/metadata.
   - Buyers are shown to manufacturers in the same anonymized way (e.g. `BYR-<country>-<number>`) unless an admin explicitly decides otherwise.
2. **Contact filtering on all user-generated content.** Chat messages, RFQ descriptions, quote notes, profile text, reviews, file names, and any other free text pass through the shared contact filter in the API before they are stored or delivered. It detects and redacts emails, phone numbers, URLs/domains, messaging handles (WhatsApp, WeChat, Skype, Telegram, Instagram, etc.), and common obfuscations (`name [at] gmail dot com`, spelled-out digits, spaced numbers).
   - Filtering happens server-side. Client-side checks are only a UX hint.
   - Keep the original text in an admin-only field and flag the message for moderation; deliver the redacted version.
   - Repeated attempts are tracked per user so admins can act.
3. **Money and contracts flow through GarmentGate.** Buyers pay GarmentGate; GarmentGate pays manufacturers. No feature may expose bank details, invoices or documents of one side to the other.

When adding any endpoint, socket event, email, notification, export, or search index field, ask: _could this reveal who the other side is or how to reach them?_

### How the rule is enforced in code

- **Buyer-facing data goes through `apps/api/src/modules/catalog/public.serializer.ts` only** (`toPublicManufacturer`, `toPublicProduct`). They copy an explicit allowlist, re-filter free text and scrub the company's own names, website and owners' names (`scrubText`), then parse with **strict** schemas (`PublicManufacturerSchema`, `PublicProductSchema` in `packages/shared`) that throw on any extra key. Load data with the selects in `catalog.queries.ts`. To expose a new field to buyers, add it to the strict schema and the serializer, and extend `public.serializer.spec.ts` (sentinel tests assert nothing identifying leaks).
- **Margin stays hidden both ways.** Buyers only get `buyerUnitPriceMinor`; manufacturers only get `manufacturerUnitPriceMinor` (their queries don't even select buyer prices). Catalog buyer prices come from `pickCatalogRule` + `applyMarkup` in `modules/pricing/margin.ts`.
- **Images**: uploads land privately under `originals/`; the BullMQ `media` worker (`modules/media`) decodes with Sharp, bakes in orientation, **drops all metadata** (EXIF/GPS/XMP/IPTC/ICC) and writes WebP renditions (320/800/1600) under `renditions/`. Browsers only ever get signed URLs to renditions. Factory photos and product images also need **admin approval** (`/admin/media/*`) before buyers see them (logos, signage, faces).
- Factories can check all of this themselves: **Factory profile → Buyer preview** renders `/manufacturer/profile/preview`, which uses the same serializer as buyers.
- **Search** (`modules/search`): Meilisearch documents are built from `toPublicProduct` / `toPublicManufacturer` plus an explicit key allowlist (`search-documents.ts`), so the index holds nothing a buyer couldn't see. Only published products from listed, verified factories are indexed. Services call `SearchService.syncProduct` / `syncManufacturer` after any change that affects visibility (product CRUD, profile, certificates, KYC decisions); a BullMQ `search` worker applies it. Queries ask Meilisearch for ids only and re-hydrate them from Postgres through the serializers. Filter values are always JSON-quoted (`search-filters.ts`) to block filter injection. The API rebuilds the indexes on boot, and `pnpm db:seed` does the same. `MEILISEARCH_INDEX_PREFIX` keeps e2e tests (`test_`) away from the dev indexes.

## Tech stack

Turborepo + pnpm workspaces monorepo.

```
apps/
  web/        Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Motion,
              TanStack Query, React Hook Form + Zod, next-intl
  api/        NestJS, Prisma, PostgreSQL, Redis, BullMQ, Socket.io,
              Meilisearch, S3-compatible object storage
packages/
  shared/     Zod schemas + inferred TypeScript types used by both web and api
  config/     Shared ESLint (base/nest/next), tsconfig (base/library/nestjs/nextjs) and Prettier configs
  emails/     React Email templates + renderEmail(); preview with `pnpm --filter @garmentgate/emails preview`
```

Current versions: Node 22 LTS, pnpm 12, Turborepo 2, Next.js 16 (Turbopack, React 19), NestJS 12 (ESM), Tailwind 4, shadcn/ui (base-nova style, Base UI primitives), Zod 4, Vitest 5.

- **TypeScript is pinned to 6.0.x** and **ESLint to 9.x**: typescript-eslint, @nestjs/swagger and the React/a11y ESLint plugins don't support TS 7 / ESLint 10 yet. Don't bump them until those peer ranges allow it.
- **apps/api is native ESM** (`"type": "module"`, `NodeNext`): relative imports need the `.js` extension (`import { X } from './x.js'`).
- **packages/shared is compiled** with `tsc` to `dist/` and consumed via its `exports`. Turbo builds it before any dependent task, and `pnpm dev` runs it in watch mode.
- **Env vars are validated at boot**: the API's schema lives in `apps/api/src/config/env.schema.ts` and is passed to `ConfigModule` as a Standard Schema. Add new variables there and to `.env.example` together. Read them with `ConfigService<Env, true>` / `AppConfigService` and `{ infer: true }`, never `process.env`.
- **Swagger** reads Zod schemas directly: `@ApiOkResponse({ standardSchema: SomeSchema })`.
- **Rate limiting**: a global `ThrottlerGuard` applies to every route. Opt out with `@SkipThrottle()` (health checks only).
- **pnpm only runs dependency install scripts listed in `allowBuilds`** in `pnpm-workspace.yaml`. Review any new entry before allowing it.
- **Prisma 7** (`apps/api/prisma/schema.prisma`, config in `apps/api/prisma.config.ts`) generates an ESM client into `apps/api/src/generated/prisma` (git-ignored, regenerated on install/build). Import from `../generated/prisma/client.js`. Rules Prisma can't express live as hand-written SQL in the first migration: positive amounts, buyer price ≥ manufacturer price, **ledger transactions must balance (checked at commit) and are append-only**, and **a buyer and a manufacturer can never be in the same conversation**. Keep them when you add migrations.
- **BullMQ 6** needs an `ioredis` client instance (see `src/common/queue/queue.module.ts`); passing connection options under ESM makes it loop and run out of memory.

### Auth and routing

- The browser only ever calls same-origin `/api/*`; `apps/web/next.config.ts` rewrites it to the API. Auth lives in **httpOnly, SameSite=Lax cookies**: `gg_at` (15-min JWT access token: `sub`, `role`, `ev` email-verified, `kyc` status) and `gg_rt` (30-day opaque refresh token, stored hashed, **rotated on every use**; replaying a rotated token outside a 30 s grace window revokes the whole session family).
- API: `JwtAuthGuard` and `RolesGuard` are global. Every route requires a signed-in user unless marked `@Public()`; restrict with `@Roles('ADMIN')`; read the user with `@CurrentUser()`. Validate bodies with `new ZodValidationPipe(SharedSchema)`.
- Web: `apps/web/src/proxy.ts` (Next 16's replacement for `middleware.ts`) decides which page each user sees using `homePathFor()` from `packages/shared`: admins → `/admin`; buyers/manufacturers → `/onboarding` until submitted, `/pending` while under review, then `/buyer` or `/manufacturer`. It refreshes expired sessions server-side. It only decodes the JWT for routing; the API is the security boundary.
- After anything that changes claims (onboarding submit, KYC decision, email verification) call `POST /api/auth/refresh` (`refreshUser()` on the web) so routing picks it up.
- KYC files go **browser → MinIO/S3 directly** via presigned POST (`POST /kyc/uploads`), then are attached with `POST /kyc/documents` or `/kyc/certifications`; the API checks the object exists with the declared type and size. Downloads are 5-minute presigned GETs for the owning company or admins only.
- Emails are queued (BullMQ) and rendered from `packages/emails`. **Without `RESEND_API_KEY` they are logged to the API console instead of sent**: copy verification and reset links from there in development.

- **apps/web**: server components by default; client components only where interactivity is needed. Server state goes through TanStack Query; forms use React Hook Form with `zodResolver` and the schema from `packages/shared`. All user-facing strings go through next-intl; no hard-coded copy. UI primitives come from shadcn/ui; animations use Motion and respect `prefers-reduced-motion`.
- **apps/api**: NestJS modules per feature. Prisma is the only DB access layer. Long-running or retryable work (emails, media processing, search indexing, payouts) runs as BullMQ jobs. Real-time chat and notifications go over Socket.io, which needs the same auth and contact filtering as HTTP. Meilisearch indexes contain only anonymized, buyer-safe fields. Files go to S3-compatible storage through signed URLs; never serve them from a public bucket.
- **packages/shared**: the single source of truth for request/response shapes, enums (roles, order statuses, currencies), and constants. Types are inferred from Zod (`z.infer`); don't hand-write duplicate interfaces.
- **Local infrastructure** (Postgres, Redis, Meilisearch, MinIO for S3) runs in Docker via `docker compose`.

## Coding conventions

- **Strict TypeScript everywhere** (`"strict": true`, `noUncheckedIndexedAccess`). No `any`: use `unknown` and narrow, or write a proper type. Don't silence the compiler with `as` casts or `@ts-ignore`; `@ts-expect-error` needs a comment explaining why.
- **Feature-based folders.** Group by domain, not by technical layer:
  - api: `apps/api/src/modules/<feature>/` (controller, service, module, serializers, tests)
  - web: `apps/web/src/features/<feature>/` (components, hooks, queries, forms), with routes in `app/`
  - shared: `packages/shared/src/<feature>/`
- **DTOs are validated with shared Zod schemas.** Every request body, query and params object, and every socket payload, is parsed with a schema from `packages/shared` via a Zod validation pipe. The web app uses the same schema for its forms. Change the schema once, in `shared`.
- **Money is integer minor units plus a currency code.** Store `amountMinor: Int` (or `BigInt` where totals can be large) next to `currency` (ISO 4217, e.g. `USD`). Never use floats or decimals for money in code or JSON. Do the arithmetic in minor units, and format for display only at the edge with `Intl.NumberFormat`, taking the currency's minor-unit exponent into account (JPY has 0, USD has 2, etc.).
- Dates are stored in UTC and sent as ISO 8601 strings.
- IDs exposed outside the platform are opaque (cuid/uuid or public codes), never sequential database IDs.
- Prefer small, pure, testable functions. Business rules (pricing, margins, contact filtering, status transitions) live in services with unit tests, not in controllers or components.
- Write tests with the feature: unit tests for services and the contact filter, e2e tests for API routes (including "a buyer cannot see manufacturer identity" checks), and component tests for non-trivial UI.

## UX principles

- **Simple journeys.** Each role has a few primary flows (buyer: discover → RFQ → compare quotes → order → track; manufacturer: profile → respond to RFQ → fulfil order). Design these first and keep them linear.
- **Max 3 clicks to any key action** from the role's dashboard (create RFQ, reply to a quote, open a chat, view order status).
- **Mobile-first.** Build for small screens first, then enhance for larger ones. Touch targets are at least 44px, and nothing scrolls horizontally on the page body.
- **Every list and data view has loading, empty and error states.** Loading uses skeletons, empty states explain what to do next and include the primary action, and error states say what went wrong and offer a retry.
- Accessible by default: semantic HTML, labelled form fields, keyboard navigable, WCAG AA contrast.
- All copy goes through next-intl; layouts must survive longer translations and RTL where supported.

## Design system

Browse everything at **http://localhost:3000/dev/ui** (dev only; 404 in production). Aim: calm, precise, trustworthy B2B (Linear/Stripe), not an admin template.

- **Tokens** live in `apps/web/src/app/globals.css` with full light and dark values. Use semantic classes only (`bg-card`, `bg-surface`, `text-muted-foreground`, `text-subtle-foreground`, `border-border-strong`, `bg-primary-soft text-primary-ink`), never raw palette colours or hex. Brand: deep "loom" teal (`primary`), `brand-deep` for dark marketing panels and `brand-gold` as a sparing accent.
- **Status tones**: `success`, `warning`, `info`, `progress`, `danger`, `neutral`, each with `-soft` (background) and `-ink` (text). **Always show a status with `<StatusBadge domain="order" status={…} />`**. Tones come from `STATUS_TONES` in `packages/shared/src/status/statuses.ts`, labels from `statuses.<domain>.<STATUS>` in messages. Add new statuses to both.
- **Type**: Instrument Sans for UI, **Instrument Serif (`font-display`, `text-display*`) only for marketing headlines**, Geist Mono for codes (`MFR-BD-0421`, order numbers; use `<Badge variant="code">`). Numbers in tables and stats use `tabular`. Money is formatted with `formatMoney(minor, currency, locale)` from `@/lib/format`.
- **Elevation**: `shadow-xs` on resting surfaces, `shadow-md` on hover, `shadow-lg/xl` for popovers and dialogs. Radius base is 10px (`rounded-lg`); cards use `rounded-xl`.
- **Components** in `src/components/ui` are shadcn (Base UI) restyled to these tokens. Buttons and inputs are 44px on mobile, compact from `md`. A Button with `render={<Link …/>}` keeps link semantics automatically. Dialogs become bottom sheets on mobile.
- **Patterns** in `src/components/patterns`: `PageHeader`, `EmptyState`, `ErrorState`, `StatCard`, `StatusBadge`, `FileDropzone`, `Timeline`, `PageTransition`. Every list uses skeleton → `EmptyState` (with the next action) / `ErrorState` (with retry).
- **Buyer discovery** (`src/features/discovery`): `/buyer/search` (instant search, facets, sort, grid/list), `/buyer/products/[id]`, `/buyer/factories[/code]`, `/buyer/shortlists` and the dashboard. Search state lives in the URL via **nuqs** (`search-params.ts`; `NuqsAdapter` is in `providers.tsx`), so pages using it render inside `<Suspense>`. "Request quote" / "Order sample" call `POST /catalog/products/:id/request`, which creates an RFQ (plus a CATALOG sample) invited to that factory only. Favourites are the company's default "Favorites" shortlist; heart buttons read `/shortlists/saved` and update optimistically.
- **App shell** (`src/features/shell`): each role's `layout.tsx` wraps pages in `<AppShell role=…>` (collapsible sidebar, mobile bottom nav with "More" sheet, ⌘K command menu, notifications bell, profile menu with theme switch). Navigation is defined once in `nav.ts`; sections not built yet render a "Coming soon" page from `[section]/page.tsx`. When you build a section, add its own route folder and it takes precedence.
- **Motion**: use Motion with the `ease-out-expo` curve, short durations (150–300 ms for UI, ≤ 600 ms for marketing reveals). `MotionConfig reducedMotion="user"` and a global CSS rule disable motion for users who ask.
- **Cache Components gotchas**: read `params`/`searchParams` inside `<Suspense>`; no `new Date()` in prerendered server output (use a `'use cache'` function); use `useSyncExternalStore` (see `@/lib/client-hooks`) instead of setting state in an effect for client-only values.

## Commands

Run from the repo root (Turborepo fans out to the workspaces). Requires Node 22+, pnpm 12 and Docker.

### First-time setup

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
pnpm db:up
pnpm dev
```

### Day to day

```bash
pnpm dev                     # shared (watch) + api :4000 + web :3000 together
pnpm dev --filter web        # one app only (web | api); shared is built first

pnpm db:up                   # start Postgres, Redis, Meilisearch, MinIO (+ bucket) and wait until healthy
pnpm db:down                 # stop the containers (data is kept)
pnpm db:reset                # DELETE all local data volumes, recreate, migrate and seed
pnpm db:logs                 # follow container logs

pnpm db:migrate              # create + apply a migration after editing schema.prisma (prisma migrate dev)
pnpm db:deploy               # apply pending migrations (CI / production)
pnpm db:generate             # regenerate the Prisma client
pnpm db:seed                 # WIPE app tables and load demo data (logins printed at the end)
pnpm db:studio               # browse the database in Prisma Studio

pnpm build                   # build all packages and apps
pnpm start                   # run the production builds
pnpm lint                    # ESLint (type-aware) everywhere
pnpm typecheck               # tsc --noEmit everywhere
pnpm test                    # unit tests (Vitest)
pnpm test:e2e                # API e2e tests against real Postgres/Redis/MinIO (needs `pnpm db:up`);
                             # uses its own `garmentgate_test` database, reset on every run
pnpm format                  # Prettier write; `pnpm format:check` to verify
```

### Demo logins (after `pnpm db:seed`, password `Password123!` for all)

| Role                       | Email                              | State                       |
| -------------------------- | ---------------------------------- | --------------------------- |
| Admin                      | `admin@garmentgate.example`        |                             |
| Buyer (US)                 | `jordan@northboundsupply.example`  | verified, order in progress |
| Buyer (DE)                 | `lena@gruenfeld-basics.example`    | verified, open RFQ          |
| Buyer (GB)                 | `oliver@thamesandhart.example`     | pending review              |
| Manufacturer (MFR-BD-0421) | `rafiq.hossain@meghnaknit.example` | verified, order in progress |
| Manufacturer (MFR-TR-0078) | `emre@bosphorusouterwear.example`  | pending review              |

### Local URLs

| Service                               | URL                                          | Credentials                                                              |
| ------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------ |
| Web                                   | http://localhost:3000                        |                                                                          |
| API                                   | http://localhost:4000                        |                                                                          |
| API liveness                          | http://localhost:4000/health                 |                                                                          |
| API readiness (checks all containers) | http://localhost:4000/health/ready           |                                                                          |
| Swagger UI / OpenAPI JSON             | http://localhost:4000/docs, `/docs/json`     |                                                                          |
| Postgres                              | `localhost:5432`, db `garmentgate`           | `garmentgate` / `garmentgate`                                            |
| Redis                                 | `localhost:6379`                             |                                                                          |
| Meilisearch                           | http://localhost:7700                        | master key `garmentgate-dev-master-key-change-me`                        |
| MinIO S3 API / console                | http://localhost:9000, http://localhost:9001 | `garmentgate` / `garmentgate-dev-secret`, bucket `garmentgate` (private) |

Before finishing any change, run `pnpm lint`, `pnpm typecheck` and `pnpm test`.
