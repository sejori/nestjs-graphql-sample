import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { AuthService } from 'src/auth/services/auth.service';

import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';

@Module({
  providers: [
    UserService, 
    UserResolver, 
    PrismaService, 
    AuthService, 
    JwtService
  ],
  exports: [UserService]
})
export class UserModule {}
