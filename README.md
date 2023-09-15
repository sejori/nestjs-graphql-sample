# Seb's PYNEA coding challenge

Stack: NestJS (Node.js), GraphQL, Prisma
(package versions checked against latest to ensure stability)

The following repos and resources were used in this project's development: 
- https://github.com/onur-ozkan/feednext/
- https://github.com/shkim04/find-your-wc.git
- https://github.com/jmcdo29/fastify-jwt

Source code is written to follow patterns from official documentation as much as possible.

## Setup

You should have a `.env` with the correct db url. With this you can simply run `yarn start` (with the `.env` file in the root directory of the project).

If you don't have a `.env` file, setup a postgres db on [https://railway.app](https://railway.app) (or your platform of choice) and run:

`$ npx prisma migrate dev --name pynea-challenge`

## Overview

### GraphQL

The GraphQL queries and mutations are accessed by making an HTTP request with the POST method to `/graphql`.

The request body should contain a query object, for example: 

```js
const response = await fetch('http://localhost:3000/graphql', {
  method: 'POST',
  body: JSON.stringify({
    query: `
      query users($lastNames: [String!]!, $sortBy: String, $order: String) {
        listUsers(lastNames: $lastNames, sortBy: $sortBy, order: $order) {
          id
          firstName
          lastName
          email
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      lastNames: ['vrai'],
      sortBy: 'firstName',
      order: 'desc'
    }
  })
});

const users = await response.json();
```

And to request a specific user and their picture from Gravatar we can do two queries in one request like so:

```js
const response = await fetch('http://localhost:3000/graphql', {
  method: 'POST',
  body: JSON.stringify({
    query: `
      query user($id: String!, $email: String!) {
        getUser(id: $id) {
          id
          firstName
          lastName
          email
        }
        getGravatar(email: $email) {
          url
        }
      }
    `,
    variables: {
      id: 'aa05343b-2e34-4db1-89fd-463884805f6e',
      email: 'sebringrose@gmail.com'
    }
  })
})
```

The following queries and mutations are available:
- getUser
- getGravatar
- listUsers
- createUser
- updateUser
- deleteUser

(see source code for query args and mutation inputs)


### REST

#### Auth

Basic email authentication is available via `/auth/login`, example:

```js
const response = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  body: JSON.stringify({
    email: 'i_am_the_greatest@live.com'
  })
});

const jwt = await response.text();
```

This is of course insecure but serves as a basic stateless (JWT) auth system. To make this production-ready local authentication (passwords), magic email links or OAuth2.0 would need to be implemented, see `/src/auth/auth.service.ts`. 

The `/auth/check-token` route and most user GraphQL queries require basic authorization via the JWTGuard.