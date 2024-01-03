import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserInput } from './create-user.input';

describe('UpdateUserInput', () => {
  it('should allow id, firstName, lastName, email and follow properties', async () => {
    const input = plainToClass(CreateUserInput, {
      id: 'test',
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.test',
    });

    const errors = await validate(input);
    expect(errors).toHaveLength(0);
  });

  it('should validate email', async () => {
    const input = plainToClass(CreateUserInput, {
      id: 'test',
      firstName: 'test',
      lastName: 'test',
      email: 'test',
    });

    const errors = await validate(input);
    expect(errors).toHaveLength(1);

    expect(errors[0].constraints).toHaveProperty(
      'isEmail',
      'email must be an email',
    );
  });
});
