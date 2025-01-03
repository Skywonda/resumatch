import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { AIService } from 'src/common/services/ai.service';
import { ResumeEnhancementService } from './services/enhance-resume.service';
import { MainController } from './main.controller';
import { ResumeTailoringService } from './services/tailor-resume.service';
import { ResumeRatingService } from './services/rate-resume.service';
import { ResumeRoastService } from './services/roast-resume.service';
import { CoverLetterService } from './services/cover-letter.service';

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
  providers: [
    AIService,
    ResumeEnhancementService,
    ResumeTailoringService,
    ResumeRatingService,
    ResumeRoastService,
    CoverLetterService,
  ],
})
export class MainModule {}
