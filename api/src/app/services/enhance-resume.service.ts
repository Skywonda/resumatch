// src/resume/services/enhance-resume.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { AIService } from '../../common/services/ai.service';
import { createEnhancementPrompt } from '../prompt/enhance-resume';
import { SeniorityLevel, ResumeEnhancement } from '../types';

@Injectable()
export class ResumeEnhancementService {
  private readonly logger = new Logger(ResumeEnhancementService.name);

  constructor(private readonly aiService: AIService) {}

  async enhanceResume(
    resumeText: string,
    level: SeniorityLevel,
  ): Promise<ResumeEnhancement> {
    try {
      const cleanedResumeText = this.preprocessResume(resumeText);

      const { systemPrompt, userPrompt, processResponse } =
        createEnhancementPrompt(cleanedResumeText, level);

      const enhancedContent = await this.aiService.generateWithGemini(
        systemPrompt,
        userPrompt,
      );

      const processedResponse = await processResponse(enhancedContent);

      return processedResponse;
    } catch (error) {
      console.log('🚀 ~ ResumeEnhancementService ~ error:', error);
      this.logger.error(
        `Resume enhancement failed: ${error.message}`,
        error.stack,
      );

      if (
        error.message.includes('too long') ||
        error.message.includes('maximum context length')
      ) {
        throw new Error('Resume is too long. Please try a shorter version.');
      }

      throw new Error('Failed to enhance resume. Please try again.');
    }
  }

  private preprocessResume(resumeText: string): string {
    return resumeText
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\t/g, ' ')
      .replace(/ {2,}/g, ' ')
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/### LINKS[\s\S]*$/, '')
      .trim();
  }
}
