import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ListUsersArgs } from './list-users.args';

describe('ListUsersArgs', () => {
  it('should not require any properties', async () => {
    const args = plainToClass(ListUsersArgs, {});
    const errors = await validate(args);

    expect(errors).toHaveLength(0);
  });

  it('should allow properties', async () => {
    const args = plainToClass(ListUsersArgs, {
      ids: ['test'],
      firstNames: ['test'],
      lastNames: ['test'],
      emails: ['test'],
      sortBy: 'email',
      order: 'asc',
      skip: 0,
      limit: 20
    });

    const errors = await validate(args);
    expect(errors).toHaveLength(0);
  });

  it('should enforce range on skip and limit properties', async () => {
    const args = plainToClass(ListUsersArgs, {
      skip: -5,
      limit: 500
    });

    const errors = await validate(args);
    expect(errors).toHaveLength(2);
    expect(errors[0].constraints).toHaveProperty(
      'min',
      'skip must not be less than 0',
    );
    expect(errors[1].constraints).toHaveProperty(
      'max',
      'limit must not be greater than 100',
    );
  });
});
