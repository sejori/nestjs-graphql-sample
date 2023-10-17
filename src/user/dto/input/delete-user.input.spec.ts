import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { DeleteUserInput } from './delete-user.input';

describe('DeleteUserInput', () => {
  it('should enforce id', async () => {
    const input = plainToClass(DeleteUserInput, {});

    const errors = await validate(input);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty(
      'isNotEmpty',
      'id should not be empty',
    );
  });
});
