import { User as UserModel } from './user.model';

describe('UserModel', () => {
  it('should have id, firstName, lastName and email fields', async () => {  
    const test = new UserModel();

    expect(Reflect.has(test, 'id')).toBe(true);
    expect(Reflect.has(test, 'firstName')).toBe(true);
    expect(Reflect.has(test, 'lastName')).toBe(true);
    expect(Reflect.has(test, 'email')).toBe(true);
    expect(Reflect.has(test, 'followedBy')).toBe(true);
    expect(Reflect.has(test, 'follows')).toBe(true);
  });
});


