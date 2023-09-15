# Seb's PYNEA coding challenge

Stack: NestJS (Node.js), GraphQL, Prisma
(All package versions checked against latest to ensure stability)

The following repos and resources were used in this project's development: 
- https://github.com/onur-ozkan/feednext/
- https://github.com/shkim04/find-your-wc.git

All source code is written to follow patterns from official documentation as much as possible.

# Setup

You should have a `.env` with the correct db url. With this you can simply run `yarn start` (with the `.env` file in the root directory of the project).

If you don't have a `.env` file, setup a postgres db on [https://railway.app](https://railway.app) (or your platform of choice) and run:

`$ npx prisma migrate dev --name pynea-challenge`


