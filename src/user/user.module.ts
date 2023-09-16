import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../_database/prisma.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    UserService, 
    UserResolver, 
    PrismaService, 
    AuthService, 
    JwtService
  ]
})
export class UserModule {}
