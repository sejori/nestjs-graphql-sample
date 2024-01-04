import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import * as request from 'supertest';
import { mockUsers } from '../mock.data';
import { AppModule } from '../../modules/app/app.module';

describe('App auth (e2e)', () => {
  let app: INestApplication;
  let token: string = '';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication(new FastifyAdapter());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(7778);
  });

  afterAll(() => {
    app.close();
  });

  it('/auth/login (POST) - 401', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'bad_email@the.void' })
      .expect(401)
      .expect({
        message: 'Unauthorized',
        statusCode: 401,
      });
  });

  it('/auth/login (POST) - 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: mockUsers[0].email })
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
