import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';

import { GravatarModule } from './gravatar.module';
import { GravatarResolver } from './resolvers/gravatar.resolver';
import { GravatarService } from './services/gravatar.service';

describe('AuthModule', () => {
  let authModule: TestingModule;

  beforeEach(async () => {
    authModule = await Test.createTestingModule({
      imports: [GravatarModule]
    }).compile(); 
  });

  it('should have been defined correctly with the correct imports, providers and exports', () => {
    expect(authModule).toBeDefined();
    expect(authModule.get<GravatarResolver>(GravatarResolver)).toBeDefined();
    expect(authModule.get<GravatarService>(GravatarService)).toBeDefined();
  });
});
