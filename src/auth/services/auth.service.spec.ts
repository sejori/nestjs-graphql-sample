import { mock, MockProxy } from 'jest-mock-extended';
import { JwtService } from '@nestjs/jwt';
import { mockUsers } from 'test/mock.data';

import { UserService } from 'src/user/services/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserService: MockProxy<UserService>;
  let mockJwtService: MockProxy<JwtService>;

  beforeEach(async () => {
    mockUserService = mock<UserService>({
      listUsers: jest.fn(() => new Promise(res => res([mockUsers[0]])))
    });

    mockJwtService = mock<JwtService>({
      sign: jest.fn(() => 'i_am_a_donut')
    });
  
    authService = new AuthService(mockUserService, mockJwtService);
  });

  describe('login', () => {
    it('should return object containing jwt', async () => {
      const result = await authService.login(mockUsers[0].email);

      expect(result).toHaveProperty('access_token');
      expect(typeof result.access_token).toBe('string');
      expect(mockJwtService.sign).toHaveBeenCalledTimes(1);
    });
  });
});