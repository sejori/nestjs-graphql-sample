import { Gravatar as GravatarModel } from './gravatar.model';

describe('GravatarModel', () => {
  it('should have string url field', async () => {  
    const test = new GravatarModel();
    expect(Reflect.has(test, 'url')).toBe(true);
  });
});


