# GarmentGate

A managed B2B marketplace between garment buyers and factories. GarmentGate is the contracting
party in the middle: buyers contract with us, we contract with factories, and every quote,
message, order, file and payment goes through the platform. **Buyers and factories never see
who the other side is**: each only sees a code like `MFR-BD-0421` or `BYR-DE-0007`.

What's built: onboarding and KYC, factory profiles and catalog, search, RFQs and quotes with
automatic markup, relayed chat with contact filtering, orders with samples and production
milestones, escrow payments with a double-entry ledger, QC inspections (AQL), shipping documents,
reviews and disputes, notifications, an admin panel, and English with RTL-ready i18n.

## Stack

Turborepo + pnpm monorepo, TypeScript throughout.

| Path              | What                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| `apps/web`        | Next.js 16 (App Router, Cache Components), Tailwind 4, shadcn/ui (Base UI), Motion, TanStack Query/Table, next-intl |
| `apps/api`        | NestJS 12 (ESM), Prisma 7 + PostgreSQL, Redis + BullMQ, Socket.io, Meilisearch, S3-compatible storage               |
| `packages/shared` | Zod schemas and types shared by both apps (requests, responses, enums, business rules)                              |
| `packages/emails` | React Email templates                                                                                               |
| `packages/config` | ESLint, TypeScript and Prettier configs                                                                             |

## Getting started

Requires Node 22+, pnpm 12 (`corepack enable`) and Docker.

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
pnpm db:up          # Postgres, Redis, Meilisearch, MinIO (with the bucket)
pnpm db:deploy      # apply migrations
pnpm db:seed        # demo data (wipes app tables; logins printed at the end)
pnpm dev            # web on :3000, API on :4000
```

Open http://localhost:3000 and sign in with a demo account (password `Password123!`):

| Role         | Email                              |
| ------------ | ---------------------------------- |
| Admin        | `admin@garmentgate.example`        |
| Buyer        | `jordan@northboundsupply.example`  |
| Buyer        | `lena@gruenfeld-basics.example`    |
| Manufacturer | `rafiq.hossain@meghnaknit.example` |
| Inspector    | `inspector@garmentgate.example`    |

Without `RESEND_API_KEY`, emails (verification, password reset) are printed in the API console.
Swagger: http://localhost:4000/docs · design system: http://localhost:3000/dev/ui.

## Scripts

| Command                           | Does                                                                   |
| --------------------------------- | ---------------------------------------------------------------------- |
| `pnpm dev`                        | Everything in watch mode                                               |
| `pnpm build`                      | Build all packages and apps                                            |
| `pnpm lint` / `pnpm typecheck`    | ESLint (type-aware) / `tsc --noEmit` everywhere                        |
| `pnpm format` / `format:check`    | Prettier                                                               |
| `pnpm test`                       | Unit tests (Vitest)                                                    |
| `pnpm test:e2e`                   | API end-to-end tests against real services (own `garmentgate_test` DB) |
| `pnpm --filter web test:journeys` | Playwright: the four main journeys in a browser (see below)            |
| `pnpm db:up` / `db:down`          | Start / stop local services                                            |
| `pnpm db:migrate`                 | Create and apply a migration after editing `schema.prisma`             |
| `pnpm db:deploy` / `db:seed`      | Apply migrations / load demo data                                      |

## Tests

- **Unit** (`pnpm test`): contact filter, money and ledger, order state machine, AQL, pricing and
  commission, serializers (with sentinel checks that nothing identifying leaks), file signatures,
  the ClamAV client, env validation, CSV export, and more.
- **API e2e** (`pnpm test:e2e`, needs `pnpm db:up`): every feature against Postgres, Redis,
  Meilisearch and MinIO, plus `security.e2e-spec.ts`: every non-public route refuses anonymous
  callers, one company can't reach another's data, no identity crosses sides, cross-site writes
  are refused, rate limits apply per user, and uploads must really be the type they claim.
- **Journeys** (Playwright, phone-sized Chromium): a buyer posts an RFQ; a buyer accepts a quote
  and pays the deposit; a factory submits a quote; a factory updates a milestone. Each also checks
  its click budget. They use their own seeded database (`garmentgate_e2e`):
  ```bash
  pnpm db:up && pnpm build      # stop `pnpm dev` first: the journeys use ports 3000/4000
  pnpm --filter web exec playwright install chromium   # once
  pnpm --filter web test:journeys                       # or PW_CHANNEL=chrome to use your Chrome
  ```

CI (`.github/workflows/ci.yml`) runs all of it on every push and pull request, plus a dependency
audit and both Docker image builds.

## Deployment and security

- [docs/deployment.md](docs/deployment.md): Vercel for the web app; Railway/Render/Fly.io or a VPS
  for the API (Docker); managed Postgres and Redis; Cloudflare R2; Meilisearch Cloud; ClamAV;
  Sentry; go-live checklist.
- [docs/security.md](docs/security.md): how identities, sessions, uploads, rate limits, CSRF and
  secrets are protected, and how each control is tested.

## Working on the code

[CLAUDE.md](CLAUDE.md) is the project handbook: product rules (start with **no direct
contact**), architecture, conventions, the design system and UX principles. Read it before
adding an endpoint, a page or a socket event.
