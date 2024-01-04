import { INestApplication } from '@nestjs/common';
import { agent } from 'supertest';

export type GraphQLClientRequest = <T>(
  query: string,
  variables: Record<string, unknown>,
  data?: {
    method: string;
    headers: Record<string, string>;
  },
) => Promise<{
  headers: Headers;
  status: number;
  body: {
    data: T;
    errors: Array<{ message: string }>;
  };
  data: T;
  errors: Array<{ message: string }>;
  ok: boolean;
}>;

export class GraphQLClient {
  supertestAgent: ReturnType<typeof agent>;

  constructor(
    app: INestApplication,
    private headers = {},
  ) {
    this.supertestAgent = agent(app.getHttpServer());
  }

  query: GraphQLClientRequest = (
    query,
    variables,
    data = {
      method: 'POST',
      headers: {},
    },
  ) => {
    return this.supertestAgent[data.method.toLowerCase()]('/graphql')
      .set({
        ...this.headers,
        ...data.headers,
      })
      .send({
        query,
        variables,
      })
      .then((response) => {
        return {
          headers: new Headers(response.headers),
          ok: !response?.body?.errors,
          body: response.body,
          data: response.body.data,
          errors: response.body.errors,
          status: response.status,
        };
      });
  };
}
