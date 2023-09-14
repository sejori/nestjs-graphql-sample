// THIS FILE IS SOURCED FROM HERE:
// https://github.com/onur-ozkan/feednext/blob/master/server/src/v1/Auth/Service/auth.service.ts

import {
  Controller,
  Headers,
  Post,
  Body,
  UseGuards,
  Get,
  Patch,
  Query,
  Request,
  Res,
  BadRequestException
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { RateLimit } from 'nestjs-rate-limiter'
import { AuthService } from './auth.service'

// TODO: use AuthGuard example from docs or @nestjs/passport?
import { AuthGuard } from '@nestjs/passport'
// import { AuthGuard } from 'src/auth/guard/auth.guard'

@ApiTags('v1/auth')
@Controller()
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @RateLimit({
      points: 5,
      duration: 300,
      errorMessage: 'You have reached the limit of login requests. You have to wait 5 minutes before trying again.'
  })
  @Post('signin')
  async signIn(@Body() body, @Res() res) {
      const user = await this.authService.validateUser(body)
      const authResponse = await this.authService.signIn(user)

      // TODO: do we need refresh tokens, maybe overkill
      // const refreshToken = authResponse.attributes.user.refresh_token
      // delete authResponse.attributes.user.refresh_token

      // if (body.rememberMe) {
      //     res.setCookie('rt', refreshToken, {
      //         //domain: `${configService.getEnv('APP_DOMAIN').split('//')[1]}`,
      //         path: '/api/v1/auth/refresh-token',
      //         httpOnly: true,
      //         secure: true
      //     }).send(authResponse)
      //     return
      // }

      res.send(authResponse)
  }

  @RateLimit({
      points: 1,
      duration: 120,
      errorMessage: 'You have reached the limit. You have to wait 2 minutes before trying again.'
  })
  @Post('signup')
  signUp(@Body() body: any) {
      return this.authService.signUp(body)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('signout')
  async signOut(@Headers('authorization') bearer: string) {
      return this.authService.signOut(bearer)
  }

  // @RateLimit({
  //     points: 3,
  //     duration: 300,
  //     errorMessage: 'You have reached the limit. You have to wait 5 minutes before trying again.'
  // })
  // @Patch('generate-recovery-key')
  // generateRecoveryKey(@Body() dto: GenerateRecoveryKeyDto): Promise<StatusOk> {
  //     return this.authService.generateRecoveryKey(dto)
  // }

  // @RateLimit({
  //     points: 3,
  //     duration: 300,
  //     errorMessage: 'You have reached the limit. You have to wait 5 minutes before trying again.'
  // })
  // @Patch('recover-account')
  // recoverAccount(@Body() dto: RecoverAccountDto): Promise<StatusOk> {
  //     return this.authService.recoverAccount(dto)
  // }

  // @RateLimit({
  //     points: 3,
  //     duration: 300,
  //     errorMessage: 'You have reached the limit. You have to wait 5 minutes before trying again.'
  // })
  // @Get('account-verification')
  // accountVerification(@Query('token') token: string): Promise<StatusOk> {
  //     return this.authService.accountVerification(token)
  // }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('check-token')
  async checkJwtToken() {
      return { status: 'ok', message: 'Token is valid' }
  }

  @Get('refresh-token')
  async refreshJwtToken(@Request() { cookies }) {
      if (!cookies.rt) throw new BadRequestException('Server can not give access token without a refresh token')
      return await this.authService.refreshToken(cookies.rt)
  }
}