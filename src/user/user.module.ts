import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserResolver } from './user.resolver';
import { AuthService } from '../auth/service/auth.service';

@Module({
  controllers: [UserController],
  providers: [AuthService, UserService, UserResolver],
})
export class UserModule {}
