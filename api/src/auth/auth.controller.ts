import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
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
}
