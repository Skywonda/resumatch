import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { AIService } from 'src/common/services/ai.service';
import { ResumeEnhancementService } from './services/enhance-resume.service';
import { MainController } from './main.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [MainController],
  providers: [AIService, ResumeEnhancementService],
})
export class MainModule {}
