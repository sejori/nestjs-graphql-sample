import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';
import { PrismaService } from '../_database/prisma.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService, JwtService, PrismaService]
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // Mocking AuthGuard for testing
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
  });

  describe('checkJwtToken', () => {
    it('should return an object with status "ok" and message "Token is valid"', async () => {
      const result = await authController.checkJwtToken();

      expect(result).toEqual({ status: 'ok', message: 'Token is valid' });
    });
  });
});
