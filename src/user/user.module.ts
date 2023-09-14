import { Module } from '@nestjs/common';
import { UserController } from '../auth/auth.controller';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from 'src/_database/prisma.service';

@Module({
  controllers: [UserController],
  providers: [AuthService, UserService, UserResolver, PrismaService],
})
export class UserModule {}
