FROM node:21-alpine3.18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

FROM node:21-alpine3.18 as runner
WORKDIR /app
COPY --from=builder /app/node_modules/ node_modules
COPY doc doc
COPY package*.json ./
COPY tsconfig*.json ./
COPY jest*.json ./
COPY nest-cli.json ./
COPY prisma prisma
COPY src src
EXPOSE 4000
CMD npx prisma migrate dev && npm run start:dev