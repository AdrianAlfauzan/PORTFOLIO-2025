# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./
RUN npm ci --verbose

# 🔑 Ini kuncinya: .env.production → .env.local
COPY .env.production ./.env.local

COPY . .

# Build langsung (Next.js otomatis baca .env.local)
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.env.production ./.env.local

RUN chown -R nextjs:nodejs /app
USER nextjs

ENV PORT=8888
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

EXPOSE 8888
CMD ["node", "server.js"]
