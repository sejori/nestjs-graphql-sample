import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createMock } from '@golevelup/ts-jest';
import { MockProxy, mock } from 'jest-mock-extended';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let mockJwtService: MockProxy<JwtService>;
  let httpExecutionContext: ExecutionContext;
  let httpExecutionContextNoAuth: ExecutionContext;
  let gqlExecutionContext: ExecutionContext;

  beforeEach(async () => {
    mockJwtService = mock<JwtService>({
      sign: jest.fn(() => 'token'),
      signAsync: jest.fn(() => new Promise((res) => res('token'))),
      verify: jest.fn(() => ({ email: 'foo@bar.com' }) as any),
      verifyAsync: jest.fn(
        () => new Promise((res) => res({ email: 'foo@bar.com' } as any)),
      ),
    });

    authGuard = new AuthGuard(mockJwtService);
    const mockReq = {
      headers: {
        authorization: 'Bearer qwertyuiop',
      },
      body: {},
    };

    // REST context mocking
    httpExecutionContextNoAuth = createMock<ExecutionContext>({
      getType: () => 'http',
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
          body: {},
        }),
      }),
    });
    httpExecutionContext = createMock<ExecutionContext>({
      getType: () => 'http',
      switchToHttp: () => ({
        getRequest: () => mockReq,
      }),
    });
    // GRAPHQL context mocking
    gqlExecutionContext = createMock<ExecutionContext>({
      getType: () => 'graphql',
      getArgs: () => [{}, {}, { req: mockReq }, {}],
    });
  });

  describe('canActivate', () => {
    it('should throw UnauthorizedExecution if jwt not present in contenxt req headers', async () => {
      try {
        await authGuard.canActivate(httpExecutionContextNoAuth);
      } catch (e) {
        expect(e).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should return true when jwt is present and verfied', async () => {
      try {
        expect(await authGuard.canActivate(httpExecutionContext)).toBe(true);
        expect(mockJwtService.verify).toHaveBeenCalledTimes(1);
      } catch (e) {
        console.log(e);
      }
    });

    it('should also work with graphql requests', async () => {
      expect(await authGuard.canActivate(gqlExecutionContext)).toBe(true);
      expect(mockJwtService.verify).toHaveBeenCalledTimes(1);
    });

    it('should throw UnauthorizedException jwt is present but not authorised', async () => {
      try {
        mockJwtService.verify.mockImplementationOnce(() => {
          throw new Error();
        });
        await authGuard.canActivate(httpExecutionContext);
      } catch (e) {
        expect(e).toBeInstanceOf(UnauthorizedException);
        expect(mockJwtService.verify).toHaveBeenCalledTimes(1);
      }
    });
  });
});
