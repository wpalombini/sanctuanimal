FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm i -g pnpm
RUN pnpm add turbo
COPY . .
RUN pnpm turbo prune --scope=web-app --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY .prettierrc .prettierrc
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/full/ .

# Build the project
RUN npm i -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run build --filter=web-app...

FROM node:20-alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/out/full/packages/orm/prisma/ ./prisma

COPY --from=installer /app/apps/web-app/next.config.js .
COPY --from=installer /app/apps/web-app/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web-app/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web-app/.next/static ./apps/web-app/.next/static
# COPY --from=installer --chown=nextjs:nodejs /app/apps/web-app/public ./apps/web-app/public

EXPOSE 3000

CMD npx prisma migrate deploy;node apps/web-app/server.js