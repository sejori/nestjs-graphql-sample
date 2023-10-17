import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { GetGravatarArgs } from './get-gravatar.args';

describe('GetGravatarArgs', () => {
  it('should validate email field is provided', async () => {
    const input = plainToClass(GetGravatarArgs, {});
    const errors = await validate(input);
    
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty(
      'isEmail',
      'email must be an email',
    );
  });

  it('should validate email field is valid email address', async () => {
    const input = plainToClass(GetGravatarArgs, { email: '' });
    const errors = await validate(input);

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty(
      'isEmail',
      'email must be an email',
    );
  });
});
