# ===== build =====
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ===== production =====
FROM node:20-slim AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist

# ✅ AQUI está o lugar certo para copiar os certificados:
COPY certs /app/certs

EXPOSE 3001
CMD ["node", "dist/main.js"]
