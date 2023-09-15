# Seb's PYNEA coding challenge

Stack: NestJS (Node.js), GraphQL, Prisma
(package versions checked against latest to ensure stability)

The following repos and resources were used in this project's development: 
- https://github.com/onur-ozkan/feednext/
- https://github.com/shkim04/find-your-wc.git

Source code is written to follow patterns from official documentation as much as possible.

# Setup

You should have a `.env` with the correct db url. With this you can simply run `yarn start` (with the `.env` file in the root directory of the project).

If you don't have a `.env` file, setup a postgres db on [https://railway.app](https://railway.app) (or your platform of choice) and run:

`$ npx prisma migrate dev --name pynea-challenge`

# Overview

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


