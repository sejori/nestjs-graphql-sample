import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { mockExports } from 'test/test.utils'

import { AppController } from 'src/app/controllers/app.controller';
import { AuthModule } from 'src/auth/auth.module';
import { GravatarModule } from 'src/gravatar/gravatar.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

import { AppModule } from './app.module';

// mock NestJS
jest.mock('@nestjs/common', async () => (mockExports(await import('@nestjs/common'))));
jest.mock('@nestjs/config', async () => (mockExports(await import('@nestjs/config'))));
jest.mock('@nestjs/throttler', async () => (mockExports(await import('@nestjs/throttler'))));
jest.mock('@nestjs/graphql', async () => (mockExports(await import('@nestjs/graphql'))));
jest.mock('@nestjs/apollo', async () => (mockExports(await import('@nestjs/apollo'))));

// mock custom modules/providers
jest.mock('src/app/controllers/app.controller', () => ({ AppController: jest.fn() }));
jest.mock('src/auth/auth.module', () => ({ AuthModule: jest.fn() }));
jest.mock('src/gravatar/gravatar.module', () => ({ GravatarModule: jest.fn() }));
jest.mock('src/prisma/prisma.module', () => ({ PrismaModule: jest.fn() }));
jest.mock('src/user/user.module', () => ({ UserModule: jest.fn() }));

describe('AppModule', () => {
  let mockModule = Module as jest.MockedFunction<typeof Module>;
  let appModule: AppModule;

  beforeEach(() => {
    mockModule.mockImplementationOnce(jest.fn());
    appModule = new AppModule();
  });

  it('should have been defined correctly with the correct imports, providers and exports', () => {
    expect(appModule).toBeDefined();
    expect(mockModule).toHaveBeenCalledWith({
      imports: [
        ConfigModule,
        GraphQLModule,
        PrismaModule,
        ThrottlerModule,
        AuthModule,
        GravatarModule,
        UserModule
      ],
      providers: [AppController],
    });
  });
});
