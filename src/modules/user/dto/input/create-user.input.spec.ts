import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserInput } from './create-user.input';

describe('CreateUserInput', () => {
  it('should enforce firstName, lastName and email properties', async () => {
    const input = plainToClass(CreateUserInput, {});

    const errors = await validate(input);
    expect(errors).toHaveLength(3);
    expect(errors[0].constraints).toHaveProperty(
      'isNotEmpty',
      'firstName should not be empty',
    );

    expect(errors[1].constraints).toHaveProperty(
      'isNotEmpty',
      'lastName should not be empty',
    );

    expect(errors[2].constraints).toHaveProperty(
      'isEmail',
      'email must be an email',
    );
  });
});
