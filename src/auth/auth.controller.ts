import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'

@ApiTags('v1/auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string }) {
    return await this.authService.login(body.email);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('check-token')
  async checkJwtToken() {
    return { status: 'ok', message: 'Token is valid' }
  }
}