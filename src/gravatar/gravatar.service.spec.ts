import { Test, TestingModule } from '@nestjs/testing';
import { GravatarService } from './gravatar.service';
import { Logger } from '@nestjs/common';

describe('UserService', () => {
  let gravatarService: GravatarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GravatarService,
        Logger
      ],
    }).compile();

    gravatarService = module.get<GravatarService>(GravatarService);
  });

  describe('getGravatar', () => {
    it('should hash email into gravatar API and return as object', async () => {
      const result = await gravatarService.getUrl('sebringrose@gmail.com');

      expect(result).toStrictEqual({ 
        url: 'https://gravatar.com/avatar/7cf997d80f172b5e026b2ac67a1482da' 
      })
    });
  });
});