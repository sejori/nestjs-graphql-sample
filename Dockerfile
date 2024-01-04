# Base image
FROM node:18 as base

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./

RUN pnpm i 

COPY . .

RUN pnpm prisma:generate

RUN pnpm build


# Dev image
FROM base as dev

CMD [ "pnpm", "start:dev" ]


# Prod image
FROM base as prod

RUN pnpm prune --prod

CMD [ "pnpm", "start:prod" ]