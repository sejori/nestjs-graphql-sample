import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiHeader, ApiBody } from '@nestjs/swagger';
import { AuthService } from '../../auth/services/auth.service';
import { AuthGuard } from '../../auth/guards/auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          description: `Email of user to authenticate.`,
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async login(@Body() body: { email: string }) {
    if (!body || !body.email) throw new UnauthorizedException();
    return await this.authService.login(body.email);
  }

  @ApiHeader({
    name: 'Authoroization',
    description: 'Bearer [token]',
  })
  @UseGuards(AuthGuard)
  @Get('check-token')
  checkJwtToken() {
    return { status: 'ok', message: 'Token is valid' };
  }
}
