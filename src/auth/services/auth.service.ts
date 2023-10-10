import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    ) {}

  async login(email: string) {
    try {
      const users = await this.userService.listUsers({
        emails: [email]
      });
      const user = users[0];
  
      // TODO: implement magic link, passwords or OAuth
  
      if (!user) throw new UnauthorizedException();
  
      const payload = { sub: user.id, email: user.email };
  
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.AUTH_SECRET
        })
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}