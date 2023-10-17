import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { GetUserArgs } from './get-user.args';

describe('GetUserArgs', () => {
  it('should validate id exists', async () => {
    const args = plainToClass(GetUserArgs, {});
    const errors = await validate(args);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty(
      'isNotEmpty',
      'id should not be empty',
    );
  });

  it('should validate id is string', async () => {
    const args = plainToClass(GetUserArgs, {
      id: 5
    });
    const errors = await validate(args);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toHaveProperty(
      'isString',
      'id must be a string',
    );
  });
});
