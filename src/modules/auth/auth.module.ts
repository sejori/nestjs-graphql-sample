import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UserModule } from 'src/modules/user/user.module';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { AuthController } from 'src/modules/auth/controllers/auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60m' },
    }),
    GqlExecutionContext,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
