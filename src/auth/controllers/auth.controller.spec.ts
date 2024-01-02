import { mock, MockProxy } from 'jest-mock-extended';
import { UnauthorizedException } from '@nestjs/common';
import { mockUsers } from 'test/mock.data';

import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthService: MockProxy<AuthService>;

  beforeEach(async () => {
    mockAuthService = mock<AuthService>({
      login: jest.fn(
        () => new Promise((res) => res({ access_token: 'boleto' })),
      ),
    });

    authController = new AuthController(mockAuthService);
  });

  describe('POST /login', () => {
    it('should call authService login', () => {
      expect(
        authController.login({
          email: mockUsers[0].email,
        }),
      ).resolves.toHaveProperty('access_token');
      expect(mockAuthService.login).toBeCalledTimes(1);
    });
  });

  it('should throw UnauthorizedException if no payload', async () => {
    try {
      // @ts-expect-error - allow undefined arg for test
      await authController.login();
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('should throw UnauthorizedException if invalid payload', async () => {
    const email = '';
    try {
      await authController.login({ email });
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
    }
  });

  describe('GET /check-token', () => {
    it('should return valid object when successful', async () => {
      expect(authController.checkJwtToken()).toEqual({
        status: 'ok',
        message: 'Token is valid',
      });
    });

    // No test of AuthGuard in here as is tested in unit + integration / E2E tests
  });
});
