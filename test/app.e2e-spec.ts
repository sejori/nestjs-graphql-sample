import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter
} from '@nestjs/platform-fastify';
import * as request from 'supertest';

import { User } from '@prisma/client';
import { AppModule } from './../src/app.module';
import { AuthGuard } from './../src/auth/auth.guard';
import { mockUsers } from './mock.data';

describe('App (e2e)', () => {
  let app: INestApplication;
  let users: User[] = []

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // Mock AuthGuard in testing
      .compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(7777);
  });

  afterAll(() => {
    app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(async (res) => {
        /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(. *?)/g.test(res.body);
      });
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: mockUsers[0].email })
      .expect(401)
      .expect({
        message: 'Unauthorized',
        statusCode: 401
      });
  });

  it('/auth/check-token (GET)', () => {
    return request(app.getHttpServer())
      .get('/auth/check-token')
      .send({ email: mockUsers[0].email })
      .expect(200)
      .expect({ status: 'ok', message: 'Token is valid' });
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
        .expect((res) => res.body.errors[0].extensions.code === 'BAD_USER_INPUT');
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
        .expect((res) => res.body.errors[0].extensions.code === 'BAD_USER_INPUT');
    });

    it('createUser', () => {
      return Promise.all(mockUsers.map(mockUser => {
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
                firstName: mockUser.firstName,
                lastName: mockUser.lastName,
                email: mockUser.email
              }
            }
          })
          .expect(200)
          .expect({ 
            data: {
              createUser: {
                firstName: mockUser.firstName,
                lastName: mockUser.lastName,
                email: mockUser.email
              }
            }
          });
      }));
    });

    it('listUsers - with sorting', () => {
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
            firstNames: mockUsers.map(x => x.firstName),
            lastNames: [''],
            emails: [''],
            sortBy: 'lastName',
            order: 'desc'
          }
        })
        .expect(200)
        .expect((res) => {
          users = res.body.data.listUsers;
          return users[0].firstName === mockUsers[1].firstName
              && users[0].lastName === mockUsers[1].lastName
              && users[0].email === mockUsers[1].email            
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
            'id': users[0].id
          }
        })
        .expect(200)
        .expect((res) => res.body.data.getUser === users[0]);
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
              id: users[0].id,
              email: newEmail,
            }
          }
        })
        .expect(200)
        .expect({ 
          data: {
            updateUser: {
              id: users[0].id,
              email: newEmail
            }
          }
        });
    });
  
    it('deleteUser', () => {
      return Promise.all(users.map(user => {
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
      }));
    });
  });
});
