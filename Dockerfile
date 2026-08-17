# syntax=docker/dockerfile:1

# Stage 1: dependency installation.
# Copy the package manifest and lockfile before source so npm ci is cached until
# dependency metadata changes.
FROM node:22-alpine AS deps

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci


# Stage 2: Next.js production build.
# NEXT_PUBLIC_* values are browser-visible config and must be available at
# build time because Next.js inlines them into the client bundle.
FROM deps AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

ARG NEXT_PUBLIC_SITE_URL=https://voltserviceltd.metalbrain.net
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY=

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

COPY . .
RUN npm run build


# Stage 3: test gate.
# This is intentionally a sibling of runtime so local Compose builds stay fast.
# CI/Cloud Build should target this stage explicitly before building runtime.
FROM builder AS tester

RUN npm test


# Stage 4: production runtime.
# Next standalone output, non-root user. No public/ dir to copy — this project
# doesn't use one (see doc/nextjs-migration-plan.md). No forced PORT — Cloud Run
# injects its own and Next's standalone server.js already respects it.
FROM node:22-alpine AS runtime

WORKDIR /app

ARG NEXT_PUBLIC_SITE_URL=https://voltserviceltd.metalbrain.net
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY=

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]
