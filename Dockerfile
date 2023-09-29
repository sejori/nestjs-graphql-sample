# base image
FROM node:18 as base

WORKDIR /app

COPY package*.json ./

RUN yarn 

RUN yarn global add dotenv-cli

RUN yarn prisma generate

COPY . .

EXPOSE 3000

# dev image
FROM base as dev

CMD [ "yarn", "start:dev" ]

# prod image
FROM base as prod

RUN yarn build

CMD [ "yarn", "start:prod" ]