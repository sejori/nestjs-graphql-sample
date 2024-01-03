import { GraphQLClient } from 'graphql-request';
import { INestApplication } from '@nestjs/common';
import { agent } from 'supertest';
import { Response, Headers } from 'node-fetch';

export const createGraphQLClient = (
  app: INestApplication,
  headers?: Record<string, string>,
) => {
  // can set headers here for different auth strategies etc
  return new GraphQLClient('/graphql', {
    fetch: supertestFetch(app),
    headers,
  });
};

const supertestFetch = (app: INestApplication) => {
  const request = agent(app.getHttpServer());
  return (
    url: string,
    data: {
      method: string;
      headers: Record<string, string>;
      body: string;
    },
  ) => {
    return request[data.method.toLowerCase()](url)
      .set(data.headers)
      .send(JSON.parse(data.body))
      .then((response): Partial<Response> => {
        return {
          text: () => Promise.resolve(response.text),
          json: () => Promise.resolve(response.body),
          headers: new Headers(response.headers),
          ok: !response?.body?.errors,
          body: response.body,
          status: response.status,
        };
      });
  };
};
