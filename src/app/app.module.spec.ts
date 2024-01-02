import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppModule } from './app.module';
import { AppService } from './services/app.service';
import { AppController } from './controllers/app.controller';

import { AuthModule } from 'src/auth/auth.module';
import { GravatarModule } from 'src/gravatar/gravatar.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should have been defined correctly with the correct imports, providers and exports', () => {
    expect(appModule).toBeDefined();
    expect(appModule.get<AppService>(AppService)).toBeDefined();
    expect(appModule.get<AppController>(AppController)).toBeDefined();
    expect(appModule.get<ConfigModule>(ConfigModule)).toBeDefined();
    expect(appModule.get<GraphQLModule>(GraphQLModule)).toBeDefined();
    expect(appModule.get<ThrottlerModule>(ThrottlerModule)).toBeDefined();
    expect(appModule.get<AuthModule>(AuthModule)).toBeDefined();
    expect(appModule.get<GravatarModule>(GravatarModule)).toBeDefined();
    expect(appModule.get<PrismaModule>(PrismaModule)).toBeDefined();
    expect(appModule.get<UserModule>(UserModule)).toBeDefined();
  });
});
