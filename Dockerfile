# my-monorepo/Dockerfile

# ──────────────────────────────────────────────────────────
# Stage 1: base
# Node + pnpm — shared foundation for all stages
# ──────────────────────────────────────────────────────────
FROM node:18-alpine AS base

RUN npm install -g pnpm@latest

WORKDIR /app

# ──────────────────────────────────────────────────────────
# Stage 2: deps
# Install all workspace dependencies
# This layer is cached unless package.json files change
# ──────────────────────────────────────────────────────────
FROM base AS deps

# Copy workspace manifest files first for better caching
COPY package.json          ./
COPY pnpm-workspace.yaml   ./
COPY pnpm-lock.yaml        ./

# Copy each package's package.json
# pnpm needs these to resolve the workspace graph
COPY packages/design-tokens/package.json  ./packages/design-tokens/
COPY packages/ui/package.json             ./packages/ui/
COPY apps/web/package.json                ./apps/web/

# Install all deps — frozen ensures exact versions from lockfile
RUN pnpm install --frozen-lockfile

# ──────────────────────────────────────────────────────────
# Stage 3: tester
# Run all test suites
# Build FAILS and stops here if any test fails
# ──────────────────────────────────────────────────────────
FROM deps AS tester

# Copy shared typescript config
COPY tsconfig.base.json ./

# Copy all package source files
COPY packages/design-tokens/  ./packages/design-tokens/
COPY packages/ui/              ./packages/ui/
COPY apps/web/                 ./apps/web/

# ── Run design-tokens tests ───────────────────────────────
RUN echo "▶ Running @repo/design-tokens tests..." && \
    pnpm --filter @repo/design-tokens test && \
    echo "✅ @repo/design-tokens tests passed"

# ── Run ui tests ──────────────────────────────────────────
RUN echo "▶ Running @repo/ui tests..." && \
    pnpm --filter @repo/ui test && \
    echo "✅ @repo/ui tests passed"

# ── Run web app tests ─────────────────────────────────────
RUN echo "▶ Running web tests..." && \
    pnpm --filter web test && \
    echo "✅ web tests passed"

# ──────────────────────────────────────────────────────────
# Stage 4: builder
# Build production web app
# Only reached if ALL tests passed
# ──────────────────────────────────────────────────────────
FROM tester AS builder

# Accept build-time env vars
# Usage: docker build --build-arg VITE_DEFAULT_TENANT=tenant-a
ARG VITE_DEFAULT_TENANT=tenant-a
ENV VITE_DEFAULT_TENANT=$VITE_DEFAULT_TENANT

# Build workspace libs first (web tsc references their declarations)
RUN echo "▶ Building @repo/design-tokens..." && \
    pnpm --filter @repo/design-tokens build && \
    echo "▶ Building @repo/ui..." && \
    pnpm --filter @repo/ui build && \
    echo "▶ Building web app..." && \
    pnpm --filter web build && \
    echo "✅ Build complete"

# ──────────────────────────────────────────────────────────
# Stage 5: runner — FINAL IMAGE
# Lightweight nginx serving only static files
# No source code, no node_modules, no secrets
# ──────────────────────────────────────────────────────────
FROM nginx:alpine AS runner

# Remove default nginx page
RUN rm /etc/nginx/conf.d/default.conf

# Copy our nginx config
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/app.conf

# Copy ONLY built static files from builder
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK \
    --interval=30s \
    --timeout=3s \
    --start-period=5s \
    --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]