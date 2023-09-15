import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../_database/prisma.service';
import { mockUsers, updateUserInput, updatedUser } from '../../test/mock.data';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService, PrismaService],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      // mock service for unit test isolation
      jest.spyOn(userService, 'getUser').mockResolvedValue(mockUsers[0]);

      const result = await userResolver.getUser({ id: mockUsers[0].id });

      expect(result).toBe(mockUsers[0]);
    });
  });

  describe('listUsers', () => {
    it('should return a list of users', async () => {
      const listUsersArgs = { lastNames: ["Los"] };

      jest.spyOn(userService, 'listUsers').mockResolvedValue([mockUsers[1]]);

      const result = await userResolver.listUsers(listUsersArgs);

      expect(result).toEqual([ mockUsers[1] ]);
    });
  });

  describe('createUser', () => {
    // NOTE: validation tested in app e2e tests as provided by NestJS ValiationPipe
    it('should create and return a user', async () => {
      const createUserInput = mockUsers[0];

      jest.spyOn(userService, 'createUser').mockResolvedValue(mockUsers[0]);

      const result = await userResolver.createUser(createUserInput);

      expect(result).toBe(mockUsers[0]);
    });
  });

  describe('updateUser', () => {
    it('should update and return a user', async () => {
      jest.spyOn(userService, 'updateUser').mockResolvedValue(updatedUser);

      const result = await userResolver.updateUser(updateUserInput);

      expect(result).toBe(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete and return a user', async () => {
      const deleteUserInput = { id: mockUsers[0].id }

      jest.spyOn(userService, 'deleteUser').mockResolvedValue(mockUsers[0]);

      const result = await userResolver.deleteUser(deleteUserInput);

      expect(result).toBe(mockUsers[0]);
    });
  });
});