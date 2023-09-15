import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter
} from '@nestjs/platform-fastify';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { mockUsers } from './mock.data';
import { User } from '@prisma/client';

describe('App (e2e)', () => {
  let app: INestApplication;
  let user: User

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(7777);
  });

  afterEach(() => {
    app.close();
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/graphql', () => {
    it('email validation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation create_user($createUserData: CreateUserInput!) {
              createUser(createUserData: $createUserData) {
                id
              }
            }
          `,
          variables: {
            createUserData: {
              firstName: mockUsers[1].firstName,
              lastName: mockUsers[1].lastName,
              email: 'i_am_not_an_email'
            }
          }
        })
        .expect((res) => res.body.errors[0].extensions.code === "BAD_USER_INPUT");
    });

    it('null-field validation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation create_user($createUserData: CreateUserInput!) {
              createUser(createUserData: $createUserData) {
                id
              }
            }
          `,
          variables: {
            createUserData: {
              firstName: mockUsers[1].firstName,
              email: mockUsers[1].email
            }
          }
        })
        .expect((res) => res.body.errors[0].extensions.code === "BAD_USER_INPUT");
    });

    it('createUser', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation create_user($createUserData: CreateUserInput!) {
              createUser(createUserData: $createUserData) {
                firstName
                lastName
                email
              }
            }
          `,
          variables: {
            createUserData: {
              firstName: mockUsers[1].firstName,
              lastName: mockUsers[1].lastName,
              email: mockUsers[1].email
            }
          }
        })
        .expect(200)
        .expect({ 
          data: {
            createUser: {
              firstName: mockUsers[1].firstName,
              lastName: mockUsers[1].lastName,
              email: mockUsers[1].email
            }
          }
        });
    });

    it('listUsers', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query users($ids: [String!]!, $firstNames: [String!]!, $lastNames: [String!]!, $emails: [String!]!) {
              listUsers(ids: $ids, firstNames: $firstNames, lastNames: $lastNames, emails: $emails) {
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
            ids: [''],
            firstNames: [mockUsers[1].firstName],
            lastNames: [''],
            emails: ['']
          }
        })
        .expect(200)
        .expect((res) => {
          user = res.body.data.listUsers[0];
          return user.firstName === mockUsers[1].firstName
              && user.lastName === mockUsers[1].lastName
              && user.email === mockUsers[1].email            
        });
    });

    it('getUser', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query user($id: String!) {
              getUser(id: $id) {
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
            'id': user.id
          }
        })
        .expect(200)
        .expect((res) => res.body.data.getUser === user);
    });

    it('updateUser', () => {
      const newEmail = 'a_different@email.com';
  
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation upate_user($updateUserData: UpdateUserInput!) {
              updateUser(updateUserData: $updateUserData) {
                id
                email
              }
            }
          `,
          variables: {
            updateUserData: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: newEmail,
            }
          }
        })
        .expect(200)
        .expect({ 
          data: {
            updateUser: {
              id: user.id,
              email: newEmail
            }
          }
        });
    });
  
    it('deleteUser', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation delete_user($deleteUserData: DeleteUserInput!) {
              deleteUser(deleteUserData: $deleteUserData) {
                id
              }
            }
          `,
          variables: {
            deleteUserData: {
              id: user.id
            }
          }
        })
        .expect(200)
        .expect({ 
          data: {
            deleteUser: {
              id: user.id
            }
          }
        });
    });
  });
});
