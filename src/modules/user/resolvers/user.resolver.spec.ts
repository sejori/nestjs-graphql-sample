import { UserService } from 'src/modules/user/services/user.service';
import { mockUsers, updateUserInput, updatedUser } from 'src/testing/mock.data';

import { UserResolver } from './user.resolver';
import { mock } from 'jest-mock-extended';

describe('UserResolver', () => {
  let mockUserService: UserService;
  let userResolver: UserResolver;

  beforeEach(async () => {
    mockUserService = mock<UserService>({
      createUser: jest.fn(() => new Promise((res) => res(mockUsers[0]))),
      deleteUser: jest.fn(() => new Promise((res) => res(mockUsers[0]))),
      getUser: jest.fn(() => new Promise((res) => res(mockUsers[0]))),
      listUsers: jest.fn(() => new Promise((res) => res(mockUsers))),
      updateUser: jest.fn(() => new Promise((res) => res(updatedUser))),
    });
    userResolver = new UserResolver(mockUserService);
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      const result = await userResolver.getUser({ id: mockUsers[0].id });

      expect(result).toBe(mockUsers[0]);
      expect(mockUserService.getUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('listUsers', () => {
    it('should return a list of users', async () => {
      const listUsersArgs = {};
      const result = await userResolver.listUsers(listUsersArgs);

      expect(result).toEqual(mockUsers);
      expect(mockUserService.listUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUser', () => {
    // NOTE: validation tested in app e2e tests as provided by NestJS ValiationPipe
    it('should create and return a user', async () => {
      const createUserInput = mockUsers[0];
      const result = await userResolver.createUser(createUserInput);

      expect(result).toBe(mockUsers[0]);
      expect(mockUserService.createUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateUser', () => {
    it('should update and return a user', async () => {
      const result = await userResolver.updateUser(updateUserInput);

      expect(result).toBe(updatedUser);
      expect(mockUserService.updateUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteUser', () => {
    it('should delete and return a user', async () => {
      const deleteUserInput = { id: mockUsers[0].id };
      const result = await userResolver.deleteUser(deleteUserInput);

      expect(result).toBe(mockUsers[0]);
      expect(mockUserService.deleteUser).toHaveBeenCalledTimes(1);
    });
  });
});
