# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./
RUN npm ci --verbose

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Salin .env.production ke runtime (untuk server.js)
COPY .env.production ./.env.local

RUN chown -R nextjs:nodejs /app
USER nextjs

ENV PORT=8888 HOSTNAME=0.0.0.0 NODE_ENV=production
EXPOSE 8888
CMD ["node", "server.js"]