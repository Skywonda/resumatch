/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body } from '@nestjs/common';
import { ResumeEnhancementService } from './services/enhance-resume.service';
import { EnhanceResumeDto } from './dto/enhance-resume.dto';
import { TailorResumeDto } from './dto/tailor-resume.dto';
import { ResumeTailoringService } from './services/tailor-resume.service';
import { ResumeRatingService } from './services/rate-resume.service';
import { RateResumeDto } from './dto/rate-resume.dto';
import { ResumeRoastService } from './services/roast-resume.service';
import { RoastResumeDto } from './dto/roast-resume.dto';
import { CoverLetterService } from './services/cover-letter.service';
import { CoverLetterDto } from './dto/cover-letter.dto';

@Controller('api')
export class MainController {
  constructor(
    private readonly resumeEnhancementService: ResumeEnhancementService,
    private readonly resumeTailoringService: ResumeTailoringService,
    private readonly resumeRatingService: ResumeRatingService,
    private readonly resumeRoastService: ResumeRoastService,
    private readonly coverLetterService: CoverLetterService,
  ) {}

  @Post('resume/enhance')
  enhanceResume(@Body() dto: EnhanceResumeDto) {
    return this.resumeEnhancementService.enhanceResume(
      dto.resumeText,
      dto.level,
    );
  }

  @Post('resume/rate')
  async rateResume(@Body() dto: RateResumeDto) {
    return await this.resumeRatingService.rateResume(dto.resumeText);
  }

  @Post('resume/tailor')
  async tailorResume(@Body() dto: TailorResumeDto) {
    return await this.resumeTailoringService.tailorResume(
      dto.resumeText,
      dto.jobDescription,
    );
  }

  @Post('resume/roast')
  async roastResume(@Body() dto: RoastResumeDto) {
    return await this.resumeRoastService.roastResume(dto.resumeText);
  }

  @Post('resume/cover-letter')
  generateCoverLetter(@Body() dto: CoverLetterDto) {
    return this.coverLetterService.generateCoverLetter(dto);
  }
}
