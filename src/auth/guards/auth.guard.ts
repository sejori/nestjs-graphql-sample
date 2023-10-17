import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const token = this.extractTokenFromContext(context);
      if (!token) throw new UnauthorizedException();
    
      await this.jwtService.verify(token, {
        secret: process.env.AUTH_SECRET
      });

      return true;
    } catch(e) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromContext(context: ExecutionContext): string | undefined {
    let request: Request;

    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest();
    } else if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      request = gqlContext.getContext().req;
    }

    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}