import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from './auth.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

import { UserModule } from 'src/user/user.module';

describe('AuthModule', () => {
  let authModule: TestingModule;

  beforeEach(async () => {
    authModule = await Test.createTestingModule({
      imports: [AuthModule]
    }).compile(); 
  });

  it('should have been defined correctly with the correct imports, providers and exports', () => {
    expect(authModule).toBeDefined();
    expect(authModule.get<AuthService>(AuthService)).toBeDefined();
    expect(authModule.get<AuthController>(AuthController)).toBeDefined();
    expect(authModule.get<JwtModule>(JwtModule)).toBeDefined();
    expect(authModule.get<UserModule>(UserModule)).toBeDefined();
  });
});
