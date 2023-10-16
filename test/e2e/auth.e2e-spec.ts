import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter
} from '@nestjs/platform-fastify';
import { User } from '@prisma/client';
import * as request from 'supertest';

import { AppModule } from 'src/app/app.module';
import { UserService } from 'src/user/services/user.service';

describe('App auth (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  let token: string = '';
  let testUserData = {
    firstName: 'sir',
    lastName: 'testington',
    email: 'i_am_a_test@live.net'
  }
  let testUser: User | null = null;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication(new FastifyAdapter());
    app.useGlobalPipes(new ValidationPipe());
    userService = module.get<UserService>(UserService);

    await app.listen(7778);
  });

  afterAll(() => {
    app.close();
  });

  beforeEach(async () => {
    try {
      testUser = await userService.createUser(testUserData);
    } catch {}
  })

  afterEach(async () => {
    try {
      await userService.deleteUser({ id: testUser.id });
    } catch {}
  })

  it('/auth/login (POST) - 401', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'bad_email@the.void' })
      .expect(401)
      .expect({
        message: 'Unauthorized',
        statusCode: 401
      });
  });

  it('/auth/login (POST) - 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: testUserData.email })
      .expect(201);

    token = res.body.access_token;
  });

  it('/auth/check-token (GET) - 401', async () => {
    await request(app.getHttpServer())
      .get('/auth/check-token')
      .set('Authorization', '')
      .expect(401);
  });

  it('/auth/check-token (GET) - 200', async () => {
    await request(app.getHttpServer())
      .get('/auth/check-token')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect({ status: 'ok', message: 'Token is valid' });
  });
});
