FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn run prisma generate

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]