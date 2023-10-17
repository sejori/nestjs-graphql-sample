# Base image
FROM node:18 as base

WORKDIR /app

COPY package*.json ./

RUN yarn 

COPY . .

RUN yarn prisma:generate

RUN yarn build

# Dev image
FROM base as dev

RUN yarn global add dotenv-cli

CMD [ "yarn", "start:dev" ]

# Prod image
FROM base as prod

# TODO: You can add a step to prune dependencies here if necessary
RUN yarn install --production && yarn cache clean

CMD [ "yarn", "start:prod" ]