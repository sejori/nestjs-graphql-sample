import * as request from 'supertest';
import { mockUsers } from '../mock.data';

describe('App auth (e2e)', () => {
  let token: string = '';

  it('/auth/login (POST) - 401', () => {
    return request(global.app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'bad_email@the.void' })
      .expect(401)
      .expect({
        message: 'Unauthorized',
        statusCode: 401,
      });
  });

  it('/auth/login (POST) - 201', async () => {
    const res = await request(global.app.getHttpServer())
      .post('/auth/login')
      .send({ email: mockUsers[0].email })
      .expect(201);

    token = res.body.access_token;
  });

  it('/auth/check-token (GET) - 401', async () => {
    await request(global.app.getHttpServer())
      .get('/auth/check-token')
      .set('Authorization', '')
      .expect(401);
  });

  it('/auth/check-token (GET) - 200', async () => {
    await request(global.app.getHttpServer())
      .get('/auth/check-token')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .expect({ status: 'ok', message: 'Token is valid' });
  });
});
