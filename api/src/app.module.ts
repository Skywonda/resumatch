import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './app/main.module';

@Module({
  imports: [AuthModule, MainModule],
})
export class AppModule {}
