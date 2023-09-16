import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { PrismaService } from '../_database/prisma.service';
import { mockUsers, updateUserInput, updatedUser } from '../../test/mock.data';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService, 
        JwtService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockResolvedValue(mockUsers[0]),
              findMany: jest.fn().mockResolvedValue([mockUsers[1]]),
              create: jest.fn().mockResolvedValue(mockUsers[0]),
              update: jest.fn().mockResolvedValue(updatedUser),
              delete: jest.fn().mockResolvedValue(mockUsers[0]),
            }
          }
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      const result = await userService.getUser({ id: mockUsers[0].id });

      expect(result).toBe(mockUsers[0]);
    });
  });

  describe('listUsers', () => {
    it('should return a list of users matching filter options', async () => {
      const listUsersArgs = { lastNames: ["Los"] };

      const result = await userService.listUsers(listUsersArgs);

      expect(result).toEqual([mockUsers[1]]);
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