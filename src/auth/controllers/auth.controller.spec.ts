import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/services/auth.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserService } from 'src/user/services/user.service';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { UnauthorizedException } from '@nestjs/common';

import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService, 
        UserService, 
        JwtService, 
        PrismaService
      ]
    })
      // Mocking AuthGuard for testing
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

      authController = module.get<AuthController>(AuthController);
      authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return the result of authService.login', async () => {
      const email = 'test@example.com';

      jest.spyOn(authService, 'login').mockImplementation(async () => ({
        access_token: 'beep boop'
      }));

      const result = await authController.login({ email });
      expect(authService.login).toHaveBeenCalledWith(email);
      expect(result).toHaveProperty('access_token');
      expect(typeof result.access_token).toBe('string');
    });

    it('should throw UnauthorizedException if no payload', async () => {
      try {
        // @ts-ignore - allow undefined argument for test case
        await authController.login();
      } catch(e) {
        expect(e).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should throw UnauthorizedException if invalid payload', async () => {
      const email = '';
      try {
        await authController.login({ email });
      } catch(e) {
        expect(e).toBeInstanceOf(UnauthorizedException);
      }
    });
  });

  describe('checkJwtToken', () => {
    it('should return an object with status "ok" and message "Token is valid"', async () => {
      const result = await authController.checkJwtToken();

      expect(result).toEqual({ status: 'ok', message: 'Token is valid' });
    });
  });
});
