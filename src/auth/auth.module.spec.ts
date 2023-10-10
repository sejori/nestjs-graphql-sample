import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { mockExports } from 'test/test.utils';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from './auth.module';

// mock NestJS
jest.mock('@nestjs/common', async () => (mockExports(await import('@nestjs/common'))));
jest.mock('@nestjs/graphql', async () => (mockExports(await import('@nestjs/graphql'))));
jest.mock('@nestjs/config', async () => (mockExports(await import('@nestjs/config'))));
jest.mock('@nestjs/jwt', async () => (mockExports(await import('@nestjs/jwt'))));

// mock custom modules/providers
jest.mock('./services/auth.service', () => ({ AuthService: jest.fn() }));
jest.mock('./controllers/auth.controller', () => ({ AuthController: jest.fn() }));

describe('AuthModule', () => {
  let mockModule = Module as jest.MockedFunction<typeof Module>;
  let authModule: AuthModule;

  beforeEach(() => {
    mockModule.mockImplementationOnce(jest.fn());
    authModule = new AuthModule();
  });

  it('should have been defined correctly with the correct imports, providers and exports', () => {
    expect(authModule).toBeDefined();
    expect(mockModule).toHaveBeenCalledTimes(1);
    expect(mockModule).toHaveBeenCalledWith({
      imports: [AuthModule, JwtModule],
      providers: [AuthService, AuthController],
    });
  });
});
