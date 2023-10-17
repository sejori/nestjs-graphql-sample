import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';

import { GravatarModule } from './gravatar.module';
import { GravatarService } from './services/gravatar.service';
import { GravatarResolver } from './resolvers/gravatar.resolver';

describe('GravatarModule', () => {
  let gravatarModule: TestingModule;

  beforeEach(async () => {
    gravatarModule = await Test.createTestingModule({
      imports: [GravatarModule]
    }).compile(); 
  });

  it('should have been defined correctly with the correct imports, providers and exports', () => {
    expect(gravatarModule).toBeDefined();
    expect(gravatarModule.get<GravatarService>(GravatarService)).toBeDefined();
    expect(gravatarModule.get<GravatarResolver>(GravatarResolver)).toBeDefined();
  });
});
