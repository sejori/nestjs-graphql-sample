import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/services/prisma.service';

import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';

@Module({
  providers: [UserService, UserResolver, PrismaService, JwtService],
  exports: [UserService],
})
export class UserModule {}
