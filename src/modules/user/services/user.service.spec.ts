import {
  mockUsers,
  updateUserInput,
  updatedUser,
} from '../../../testing/mock.data';
import { PrismaService } from '../../prisma/services/prisma.service';
import { UserService } from './user.service';
import { createMock } from '@golevelup/ts-jest';
import { ListUsersArgs } from '../dto/args/list-users.args';

describe('UserService', () => {
  let mockPrismaService: PrismaService;
  let userService: UserService;

  beforeEach(async () => {
    mockPrismaService = createMock<PrismaService>({
      user: {
        findUnique: jest.fn(() => new Promise((res) => res(mockUsers[0]))),
        findMany: jest.fn(() => new Promise((res) => res(mockUsers))),
        create: jest.fn(() => new Promise((res) => res(mockUsers[0]))),
        update: jest.fn(() => new Promise((res) => res(updatedUser))),
        delete: jest.fn(() => new Promise((res) => res(mockUsers[0]))),
      },
    });

    userService = new UserService(mockPrismaService);
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      const result = await userService.getUser({ id: mockUsers[0].id });

      expect(result).toBe(mockUsers[0]);
      expect(mockPrismaService.user.findUnique).toBeCalledTimes(1);
    });
  });

  describe('listUsers', () => {
    it('should return a list of users', async () => {
      const listUsersArgs = {};

      const result = await userService.listUsers(listUsersArgs);

      expect(result).toEqual(mockUsers);
      expect(mockPrismaService.user.findMany).toBeCalledTimes(1);
    });

    it('should apply filter options and include follows and followedBy', async () => {
      const listUsersArgs = {
        ids: [],
        firstNames: ['Thiago'],
        lastNames: ['Los'],
        emails: ['test@live.net'],
        sortBy: 'email',
        order: 'desc',
        skip: 5,
        limit: 5,
      };

      await userService.listUsers(listUsersArgs as ListUsersArgs);

      expect(mockPrismaService.user.findMany).toBeCalledWith({
        where: {
          OR: [
            { id: { in: [] } },
            { firstName: { in: listUsersArgs.firstNames } },
            { lastName: { in: listUsersArgs.lastNames } },
            { email: { in: listUsersArgs.emails } },
          ],
        },
        include: {
          follows: true,
          followedBy: true,
        },
        orderBy: [
          {
            email: 'desc',
          },
        ],
        skip: 5,
        take: 5,
      });
    });
  });

  describe('createUser', () => {
    it('should create and return a user', async () => {
      const createUserInput = mockUsers[0];

      jest.mock('uuid', () => ({ v4: () => mockUsers[0].id }));

      const result = await userService.createUser(createUserInput);

      expect(result).toBe(mockUsers[0]);
      expect(mockPrismaService.user.create).toBeCalledTimes(1);
    });
  });

  describe('updateUser', () => {
    it('should update and return a user', async () => {
      const result = await userService.updateUser(updateUserInput);

      expect(result).toBe(updatedUser);
      expect(mockPrismaService.user.update).toBeCalledTimes(1);
    });
  });

  describe('followUser', () => {
    it('should utilise prisma connect API', async () => {
      await userService.followUser({
        id: updateUserInput.id,
        follows: mockUsers[1].id,
      });

      expect(mockPrismaService.user.update).toBeCalledWith({
        where: { id: updateUserInput.id },
        include: {
          follows: true,
          followedBy: true,
        },
        data: {
          follows: {
            connect: {
              id: mockUsers[1].id,
            },
          },
        },
      });
    });
  });

  describe('unfollowUser', () => {
    it('should utilise primsa (dis)connect API', async () => {
      await userService.unfollowUser({
        id: updateUserInput.id,
        unfollows: mockUsers[1].id,
      });

      expect(mockPrismaService.user.update).toBeCalledWith({
        where: { id: updateUserInput.id },
        include: {
          follows: true,
          followedBy: true,
        },
        data: {
          follows: {
            disconnect: {
              id: mockUsers[1].id,
            },
          },
        },
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete and return a user', async () => {
      const deleteUserInput = { id: mockUsers[0].id };

      const result = await userService.deleteUser(deleteUserInput);

      expect(result).toBe(mockUsers[0]);
      expect(mockPrismaService.user.delete).toBeCalledTimes(1);
    });
  });
});
