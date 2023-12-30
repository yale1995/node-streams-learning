FROM node:latest AS builder

WORKDIR /usr/app

COPY . .

FROM node:alpine

WORKDIR /usr/app

COPY --from=builder /usr/app .

EXPOSE 3333

ENTRYPOINT ["npm", "run", "dev"]