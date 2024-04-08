# Build stage
FROM node:21 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
# Final stage
FROM node:21 as runner
WORKDIR /app
COPY --from=builder /app/node_modules/ node_modules
COPY doc doc
COPY package*.json ./
COPY tsconfig*.json ./
COPY jest*.json ./
COPY nest-cli.json ./
COPY prisma prisma
COPY src src

# Cleanup
RUN npm cache clean --force \
    && rm -rf /tmp/* \

EXPOSE ${PORT}
CMD npx prisma migrate dev && npm run start:dev