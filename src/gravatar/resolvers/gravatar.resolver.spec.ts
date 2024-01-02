import { mock } from 'jest-mock-extended';
import { GravatarService } from 'src/gravatar/services/gravatar.service';
import { GravatarResolver } from './gravatar.resolver';

describe('GravatarResolver', () => {
  let gravatarResolver: GravatarResolver;
  let mockGravatarService: GravatarService;

  beforeEach(async () => {
    mockGravatarService = mock<GravatarService>({
      getUrl: jest.fn(
        () =>
          new Promise((res) =>
            res({
              url: 'https://gravatar.com/image_url',
            }),
          ),
      ),
    });

    gravatarResolver = new GravatarResolver(mockGravatarService);
  });

  describe('getGravatar', () => {
    it('should return a gravatar url object', async () => {
      const result = await gravatarResolver.getGravatar({
        email: 'sebringrose@gmail.com',
      });
      expect(result).toHaveProperty('url');
      expect(mockGravatarService.getUrl).toHaveBeenCalledTimes(1);
    });
  });
});
