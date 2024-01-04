import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { UserService } from '../modules/user/services/user.service';
import { AppModule } from '../modules/app/app.module';
import { mockUsers } from './mock.data';

export default async function () {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = module.createNestApplication(new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe());

  global.app = app;
  global.userService = module.get<UserService>(UserService);

  try {
    await Promise.all(
      mockUsers.map((user) => global.userService.createUser(user)),
    );
  } catch (e) {
    console.log(e);
  }

  console.log('Testing setup complete!');
}
