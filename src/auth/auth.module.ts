import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'
import { UserService } from '../user/user.service';
import { PrismaService } from '../_database/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60m' }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserService, 
    PrismaService,
    JwtService
  ]
})
export class AuthModule {}