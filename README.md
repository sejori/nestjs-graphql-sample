# Seb's PYNEA coding challenge

Stack: NestJS (Node.js), GraphQL, Prisma
(package versions checked against latest to ensure stability)

The following repos and resources were used in this project's development: 
- https://github.com/onur-ozkan/feednext/
- https://github.com/shkim04/find-your-wc.git
- https://docs.nestjs.com/security/authentication

Source code is written to follow patterns from official documentation as much as possible.

**View it live: [https://seb-pynea-graphql.fly.dev/](https://seb-pynea-graphql.fly.dev/)**

## Setup

1. create a `.env` file from `.env.example`
2. setup a postgres db on [https://railway.app](https://railway.app) (or your platform of choice)
3. add the db url to `.env`
4. run the following command BEFORE starting the application:
`$ npx prisma migrate dev --name pynea-challenge`
5. Finally, run `yarn start:dev` and head to [http://localhost:3000/](http://localhost:3000/) for auth and query instructions.

## Overview

### Login

You will need to acquire a token for making requests/queries/mutations.

The email authentication available via `/auth/login` serves as a basic stateless (JWT) auth system, however it is clearly insecure. Local auth with hashed passwords was not implemented because passwords were not on the user entity in the spec. 

**Note:** to make this application production-ready, local authentication (passwords), magic email links or OAuth2.0 would need to be implemented, see `/src/auth/auth.service.ts`. 

```js
const response = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  body: JSON.stringify({
    email: 'seb2@thesebsite.com'
  })
});

const { access_token } = await response.json();
```

The access token is a JWT, designed to be used as a bearer token. Once acquired head to the `/graphql` endpoint in a browser to play with the query explorer interface. Remember to set the 'Authorization' header of your requests to 'Bearer {acces_token}'

Most REST routes and GraphQL queries/mutations implement an AuthGuard built on NestJS's JWT service.

### GraphQL

For schema details see `src/schema.graphql` 🤓

The GraphQL queries and mutations are accessed by making an HTTP request with the POST method to `/graphql`.

The request body should contain a query object, for example: 

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

**Note:** Mercurius graphql driver was implemented but subsequently reverted as it doesn't provide a playground interface like Apollo. In a live application I would suggest an app module config such as:

```js
@Module({
  imports: [
    process.env.ENVIRONMENT === 'prod'
      ? GraphQLModule.forRoot<MercuriusDriverConfig>({
        driver: MercuriusDriver,
        autoSchemaFile: 'src/schema.graphql',
        context: ({ req }) => ({ req })
      })
      : GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: 'src/schema.graphql',
        context: ({ req }) => ({ req })
      }),
    ...
  ],
  ...
})
```

This is debatable because it does add dependency bloat to the project. However, this could be circumvented by adding Apollo deps to `devDependencies` only in `package.json`.

## Bonus tasks and beyond

As you can see I took some creative liberties and added a Gravatar service to the application. I wanted to demonstrate the usefulness of graphQL for custom content queries, such as loading user data along with a gravatar in a single query, something I expect will be commonplace in the PYNEA application.

As for the bonus tasks of auth, sorting and dockerizing: you will see they have been implemented.

To take the project one step further I also added GitHub action scripts to run all Unit and E2E tests in CI, then deploy to fly.io for CD. The tests are quite comprehensive, you can run `$ yarn test:cov` for deeper insights, with more time I would flesh them out more.

Finally, in prod we would want to use monitoring & profiling services such as Sentry and AWS X-ray 😌