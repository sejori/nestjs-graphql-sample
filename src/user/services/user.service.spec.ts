import { mockUsers, updateUserInput, updatedUser } from 'test/mock.data';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { UserService } from './user.service';
import { createMock } from '@golevelup/ts-jest';
import { ListUsersArgs } from '../dto/args/list-users.args';

describe('UserService', () => {
  let mockPrismaService: PrismaService;
  let userService: UserService;

  beforeEach(async () => {
    mockPrismaService = createMock<PrismaService>({
      user: {
        findUnique: jest.fn(() => new Promise(res => res(mockUsers[0]))),
        findMany: jest.fn(() => new Promise(res => res(mockUsers))),
        create: jest.fn(() => new Promise(res => res(mockUsers[0]))),
        update: jest.fn(() => new Promise(res => res(updatedUser))),
        delete: jest.fn(() => new Promise(res => res(mockUsers[0]))),
      }
    });

    userService = new UserService(mockPrismaService);
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      const result = await userService.getUser({ id: mockUsers[0].id });

      expect(result).toBe(mockUsers[0]);
    });
  });

  describe('listUsers', () => {
    it('should return a list of users', async () => {
      const listUsersArgs = {};

      const result = await userService.listUsers(listUsersArgs);

      expect(result).toEqual(mockUsers);
    });

    it('should apply filter options', async () => {
      const listUsersArgs = { 
        ids: [],
        firstNames: ['Thiago'],
        lastNames: ['Los'],
        emails: ['test@live.net'],
        sortBy: 'email',
        order: 'desc',
        skip: 5,
        limit: 5
      };

      await userService.listUsers(listUsersArgs as ListUsersArgs);

      expect(mockPrismaService.user.findMany).toBeCalledWith({
        orderBy: [
          {
            email: 'desc'
          }
        ],
        skip: 5,
        take: 5,
        where: {
          OR: [
            { id: { in: [] } },
            { firstName: { in: listUsersArgs.firstNames } },
            { lastName: { in: listUsersArgs.lastNames } },
            { email: { in: listUsersArgs.emails } }
          ],
        }
      });
    });
  });

  describe('createUser', () => {
    it('should create and return a user', async () => {
      const createUserInput = mockUsers[0];

      jest.mock('uuid', () => ({ v4: () => mockUsers[0].id }));

      const result = await userService.createUser(createUserInput);

      expect(result).toBe(mockUsers[0]);
    });
  });

  describe('updateUser', () => {
    it('should update and return a user', async () => {
      const result = await userService.updateUser(updateUserInput);

      expect(result).toBe(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete and return a user', async () => {
      const deleteUserInput = { id: mockUsers[0].id }

      const result = await userService.deleteUser(deleteUserInput);

      expect(result).toBe(mockUsers[0]);
    });
  });
});