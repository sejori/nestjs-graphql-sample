import { Test, TestingModule } from '@nestjs/testing';
import { GravatarResolver } from './gravatar.resolver';
import { GravatarService } from './gravatar.service';

describe('GravatarResolver', () => {
  let gravatarResolver: GravatarResolver;
  let gravatarService: GravatarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GravatarResolver, GravatarService],
    }).compile();

    gravatarResolver = module.get<GravatarResolver>(GravatarResolver);
    gravatarService = module.get<GravatarService>(GravatarService);
  });

  describe('getGravatar', () => {
    it('should return a gravatar url object', async () => {
      jest.spyOn(gravatarService, 'getUrl').mockResolvedValue({ 
        url: 'https://gravatar.com/avatar/7cf997d80f172b5e026b2ac67a1482da' 
      });

      const result = await gravatarResolver.getGravatar({ email: 'sebringrose@gmail.com' });

      expect(result).toStrictEqual({
        url: 'https://gravatar.com/avatar/7cf997d80f172b5e026b2ac67a1482da' 
      });
    });
  });
});