import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { RateLimit } from 'nestjs-rate-limiter'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'

@ApiTags('v1/auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @RateLimit({
    points: 5,
    duration: 300,
    errorMessage: 'Request rate limit exceeded.'
  })
  @Post('login')
  async login(@Body() body: { email: string }) {
    return await this.authService.login(body.email);
  }

  @RateLimit({
    points: 5,
    duration: 300,
    errorMessage: 'Request rate limit exceeded.'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('check-token')
  async checkJwtToken() {
    return { status: 'ok', message: 'Token is valid' }
  }
}