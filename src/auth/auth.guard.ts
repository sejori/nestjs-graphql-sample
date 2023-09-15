import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name)

  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = this.extractTokenFromContext(context);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.AUTH_SECRET
      });
    } catch(e) {
      this.logger.error(e);
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromContext(context: ExecutionContext): string | undefined {
    let request: any;

    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest();
    } else if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      request = gqlContext.getContext().req;
    }

    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}