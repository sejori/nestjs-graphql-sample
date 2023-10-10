import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { mockUsers } from 'test/mock.data';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService, 
        {
          provide: UserService,
          useValue: {
            listUsers: jest.fn().mockResolvedValue([mockUsers[0]])
          }
        },
        JwtService, 
        PrismaService
      ]
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return object containing jwt', async () => {
      const result = await authService.login(mockUsers[0].email);

      expect(result).toHaveProperty('access_token');
      expect(typeof result.access_token).toBe('string');
    });
  });
});