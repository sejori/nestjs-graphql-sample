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

### Database

Create a `.env` file from `.env.example`, setup a postgres db on [https://railway.app](https://railway.app) (or your platform of choice), add the db url to `.env` and then run the following command BEFORE starting the application:

`$ npx prisma migrate dev --name pynea-challenge`

Then run `yarn start:dev` and head to [http://localhost:3000/](http://localhost:3000/) for instructions.

### Login

You will need to acquire a token for making requests/queries.

The email authentication available via `/auth/login` serves as a basic stateless (JWT) auth system. However it is clearly insecure, local auth with hashed passwords was not implemented because passwords were not on the user entity in the spec. 

```js
const response = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  body: JSON.stringify({
    email: 'seb2@thesebsite.com'
  })
});

const { access_token } = await response.json();
```

To make this application production-ready, local authentication (passwords), magic email links or OAuth2.0 would need to be implemented, see `/src/auth/auth.service.ts`. 

The access token is a JWT, designed to be used as a bearer token. Once acquired head to the `/graphql` endpoint in a browser to play with the query explorer interface. Remember to set the 'Authorization' header of your requests to 'Bearer {acces_token}'

The `/auth/check-token` route and most user GraphQL queries require basic authorization via the custom AuthGuard built on NestJS's JWT service.

## Overview - GraphQL

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

**Note:** Mercurius graphql driver was left out as it doesn't provide a playground interface like Apollo. In a live application I would suggest an app module config such as:

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

## Bonus tasks and beyond

As you can see I took some creative liberties and added a Gravatar service to the application. I wanted to demonstrate the usefulness of graphQL for custom content queries, such as loading user data along with a gravatar in a single query, something I expect will be commonplace in the PYNEA application.

As for the bonus tasks of auth, sorting and dockerizing: you will see they have been implemented.

To take the project one step further I also added GitHub action scripts to run all Unit and E2E tests in CI, then CD to fly.io. The tests are quite comprehensive, you can run `$ yarn test:cov` for deeper insights, with more time I would likely flesh them out a little more.

Finally, this app currently has very limited monitoring. We would want to use services such as Sentry and AWS X-ray in a production setting 😌