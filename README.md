# NestJS GraphQL sample user application

![kitten](https://img.freepik.com/premium-photo/memes-with-kitten-that-roars-like-lion_999671-3099.jpg)

**Stack:** NestJS (Node.js), GraphQL, Prisma

The following repos and resources were used in this project's development:

- https://github.com/onur-ozkan/feednext/
- https://github.com/shkim04/find-your-wc.git
- https://docs.nestjs.com/security/authentication
- https://blog.logrocket.com/implementing-pagination-graphql-nestjs/
- https://github.com/nestjs/nest/issues/11602
- https://www.prisma.io/docs/concepts/components/prisma-schema/relations/self-relations#many-to-many-self-relations

Source code is written to follow patterns from official documentation as much as possible.

**View it live: [https://seb-nestjs-graphql.fly.dev/](https://seb-nestjs-graphql.fly.dev/)**

## Features

- User management, CRUD + many-to-many relations
- Gravatar graphql query
- authentication (kinda - just searches for email)
- listUsers sorting and filtering
- docker for deployments + testing
- ~100% code coverage with unit, integration and E2E tests
- GitHub actions for CI/CD

## Future features 😌

- Integration with auth platform / email service
- Monitoring & profiling with services such as Sentry and AWS X-ray
- Optimisation of docker image size
- Expand OpenAPI docs to cover GraphQL queries & mutations

## Local setup

### Docker

1. run `$ docker compose up`
2. head to [http://localhost:3001/](http://localhost:3001/)

(rebuild dev image with `$ docker build . --no-cache --target dev` if changing deps)

### Native process

1. setup a postgres db ([https://railway.app](https://railway.app) or tool of choice)
2. replace the db url in `.env.local` with your db
3. run `pnpm prisma:migrate-dev`
4. run `pnpm start:dev`, then head to [http://localhost:3000/](http://localhost:3000/)

(**note**: don't commmit your db credentials!)

## Overview

### Login

You will need to acquire a token for making requests/queries/mutations.

The email authentication available via `/auth/login` serves as a basic stateless (JWT) auth system, however it is clearly insecure. Local auth with hashed passwords was not implemented because passwords were not on the user entity in the spec.

**Note:** to make this application production-ready, local authentication (passwords), magic email links or OAuth2.0 would need to be implemented, see `/src/auth/auth.service.ts`.

```js
const response = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  body: JSON.stringify({
    email: 'diana.marquez@example.com',
  }),
});

const { access_token } = await response.json();
```

The access token is a JWT, designed to be used as a bearer token. Once acquired head to the `/graphql` endpoint in a browser to play with the query explorer interface. Remember to set the 'Authorization' header of your requests to 'Bearer {access_token}'

Most REST routes and GraphQL queries/mutations implement an AuthGuard built on NestJS's JWT service.

More information can be found in the auto-generated OpenAPI swagger docs at `/api`.

### GraphQL

For schema details see `src/schema.graphql`.

(**note:** don't edit this file as this project utilises the beautiful code-fist schema approach) 🤓

The GraphQL queries and mutations are accessed by making an HTTP request with the POST method to `/graphql`.

The request body should contain a query object, for example:

```js
const response = await fetch('http://localhost:3000/graphql', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer [token]',
  },
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
      email: 'sebringrose@gmail.com',
    },
  }),
});
```

Other than `getUser` and `getGravatar`, the following GraphQL operations are available:

**Note:** see `src/user/dto` for query args and mutation input details 👍

#### listUsers, e.g:

```
query users($lastNames: [String!], $limit: Int, $skip: Int) {
  listUsers(lastNames: $lastNames, limit: $limit, skip: $skip) {
    id
    firstName
    lastName
    email
    createdAt
    updatedAt
  }
}
```

**Note:** The limit and skip variables are for pagination, have a play!

#### createUser, e.g:

```
mutation create_user($createUserData: CreateUserInput!) {
  createUser(createUserData: $createUserData) {
    id
    firstName
    lastName
    email
  }
}
```

#### updateUser, e.g:

```
mutation upate_user($updateUserData: UpdateUserInput!) {
  updateUser(updateUserData: $updateUserData) {
    id
    firstName
    lastName
    email
  }
}
```

#### deleteUser, e.g:

```
mutation delete_user($deleteUserData: DeleteUserInput!) {
  deleteUser(deleteUserData: $deleteUserData) {
    id
  }
}
```
