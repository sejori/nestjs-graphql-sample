import { mock, MockProxy } from 'jest-mock-extended';
import { AppService } from './app.service';
import { UserService } from 'src/user/services/user.service';

import { mockUsers, updatedUser, seedUsers } from 'test/mock.data';

describe('AppService', () => {
  let appService: AppService;
  let mockUserService: MockProxy<UserService>;

  beforeEach(async () => {
    mockUserService = mock<UserService>({
      getUser: jest.fn(() => new Promise((res) => res(mockUsers[0]))),
      listUsers: jest.fn(() => new Promise((res) => res(mockUsers))),
      createUser: jest.fn(() => new Promise((res) => res(mockUsers[0]))),
      updateUser: jest.fn(() => new Promise((res) => res(updatedUser))),
      deleteUser: jest.fn(() => new Promise((res) => res(mockUsers[0]))),
    });

    appService = new AppService(mockUserService);
  });

  describe('getHello()', () => {
    it('should return valid HTML document', () => {
      expect(appService.getHello()).toMatch(
        /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(. *?)/g,
      );
    });
  });

  describe('seedDB()', () => {
    it('should trigger seed logic from service', () => {
      expect(appService.seedDB()).toBeInstanceOf(Promise);
      expect(mockUserService.createUser.mock.calls).toHaveLength(
        seedUsers.length,
      );
    });
  });
});
