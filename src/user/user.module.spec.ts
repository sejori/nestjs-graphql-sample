import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/services/prisma.service';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';
import { UserModule } from './user.module';

describe('GravatarModule', () => {
  let userModule: TestingModule;

  beforeEach(async () => {
    userModule = await Test.createTestingModule({
      imports: [UserModule]
    }).compile(); 
  });

  it('should have been defined correctly with the correct imports, providers and exports', () => {
    expect(userModule).toBeDefined();
    expect(userModule.get<JwtService>(JwtService)).toBeDefined();
    expect(userModule.get<PrismaService>(PrismaService)).toBeDefined();

    expect(userModule.get<UserResolver>(UserResolver)).toBeDefined();
    expect(userModule.get<UserService>(UserService)).toBeDefined();
  });
});
