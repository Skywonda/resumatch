import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/email/initiate')
  @HttpCode(HttpStatus.OK)
  async initiateEmailLogin(@Body('email') email: string) {
    await this.authService.initiateEmailAuth(email);
    return { message: 'Verification code sent' };
  }

  @Post('login/email/verify')
  @HttpCode(HttpStatus.OK)
  async verifyEmailLogin(
    @Body('email') email: string,
    @Body('code') code: string,
  ) {
    return await this.authService.verifyEmailAndLogin(email, code);
  }

  @Get('status')
  @UseGuards(AuthGuard)
  async getAuthStatus(@Request() req) {
    const user = req.user;
    return {
      isAuthenticated: true,
      user: {
        id: user.sub,
        email: user.email,
      },
    };
  }
}
