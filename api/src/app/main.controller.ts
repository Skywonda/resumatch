/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body } from '@nestjs/common';
import { ResumeEnhancementService } from './services/enhance-resume.service';
import { EnhanceResumeDto } from './dto/enhance-resume.dto';

@Controller('api')
export class MainController {
  constructor(
    private readonly resumeEnhancementService: ResumeEnhancementService,
  ) {}

  @Post('resume/enhance')
  enhanceResume(@Body() dto: EnhanceResumeDto) {
    return this.resumeEnhancementService.enhanceResume(
      dto.resumeText,
      dto.level,
    );
  }

  @Post('resume/rate')
  rateResume(@Body() dto: EnhanceResumeDto) {
    return { status: 501, message: 'Not Implemented' };
  }

  @Post('resume/tailor')
  tailorResume(@Body() dto: EnhanceResumeDto) {
    return { status: 501, message: 'Not Implemented' };
  }

  @Post('resume/roast')
  roastResume(@Body() dto: EnhanceResumeDto) {
    return { status: 501, message: 'Not Implemented' };
  }

  @Post('resume/cover-letter')
  generateCoverLetter(@Body() dto: EnhanceResumeDto) {
    return { status: 501, message: 'Not Implemented' };
  }
}
