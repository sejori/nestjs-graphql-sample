import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { UserService } from '../modules/user/services/user.service';
import { AppModule } from '../modules/app/app.module';
import { createGraphQLClient } from './utils/gql.utils';
import { mockUsers } from './mock.data';

export default async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = module.createNestApplication(new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe());
  const userService = module.get<UserService>(UserService);

  await app.listen(7777);
  const client = createGraphQLClient(app);

  try {
    await Promise.all(mockUsers.map((user) => userService.createUser(user)));
  } catch (e) {
    console.log(e);
  }

  global.app = app;
  global.client = client;
  global.userService = userService;
};
