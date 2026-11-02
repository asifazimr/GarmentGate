# syntax=docker/dockerfile:1.7
# GarmentGate API. Build from the repository root:
#   docker build -f apps/api/Dockerfile -t garmentgate-api .
#   docker build -f apps/api/Dockerfile --target migrate -t garmentgate-api-migrate .

FROM node:22-bookworm-slim AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH CI=true
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/* && corepack enable
WORKDIR /repo

# Install and build the API with the workspace packages it depends on.
FROM base AS build
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile --filter "api..."
RUN pnpm --filter "api..." build
# A self-contained copy with production dependencies only (workspace packages included).
RUN pnpm --filter api deploy --legacy --prod /out \
 && cp -r apps/api/dist /out/dist \
 && cp -r apps/api/prisma /out/prisma \
 && cp -r apps/api/scripts /out/scripts

# Release step: apply migrations (`prisma migrate deploy`) before starting new API instances.
FROM build AS migrate
WORKDIR /repo/apps/api
CMD ["pnpm", "exec", "prisma", "migrate", "deploy"]

FROM node:22-bookworm-slim AS api
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production PORT=4000
WORKDIR /app
# Run as the unprivileged "node" user.
COPY --from=build --chown=node:node /out ./
USER node
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "dist/main.js"]
