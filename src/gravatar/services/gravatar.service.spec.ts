import { createHash } from 'crypto';
import { GravatarService } from './gravatar.service';

describe('GravatarService', () => {
  let gravatarService: GravatarService;
  const testEmail = 'bob@burgers.biz';

  beforeEach(async () => {
    gravatarService = new GravatarService();
  });

  describe('getGravatar', () => {
    it('should MD5 hash email into gravatar API and return as object', async () => {
      const testHash = createHash('md5').update(testEmail).digest('hex');
      const result = await gravatarService.getUrl(testEmail);

      expect(result).toStrictEqual({ 
        url: `https://gravatar.com/avatar/${testHash}` 
      })
    });
  });
});