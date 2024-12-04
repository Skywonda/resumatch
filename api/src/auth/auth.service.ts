import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  private readonly verificationCodes = new Map<
    string,
    { code: string; expires: Date }
  >();

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async initiateEmailAuth(email: string): Promise<void> {
    const verificationCode = randomBytes(3).toString('hex').toUpperCase();

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 15);
    this.verificationCodes.set(email, { code: verificationCode, expires });

    await this.mailService.sendVerificationEmail(email, verificationCode);
  }

  async verifyEmailAndLogin(
    email: string,
    code: string,
  ): Promise<{ token: string }> {
    const storedData = this.verificationCodes.get(email);

    if (
      !storedData ||
      storedData.code !== code ||
      storedData.expires < new Date()
    ) {
      throw new UnauthorizedException('Invalid or expired verification code');
    }

    this.verificationCodes.delete(email);

    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name: email.split('@')[0],
        },
      });
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { token };
  }

  async getUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async validateToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
