import { Injectable, Logger } from '@nestjs/common';
import { AIService } from 'src/common/services/ai.service';
import { ResumeRating } from '../types/rate';
import { createRatingPrompt } from '../prompt/rate';

@Injectable()
export class ResumeRatingService {
  private readonly logger = new Logger(ResumeRatingService.name);

  constructor(private readonly aiService: AIService) {}

  async rateResume(resumeText: string): Promise<any> {
    try {
      const cleanedResumeText = this.preprocessResume(resumeText);
      const { systemPrompt, userPrompt, processResponse } =
        createRatingPrompt(cleanedResumeText);

      const ratingContent = await this.aiService.generateWithGemini(
        systemPrompt,
        userPrompt,
      );

      const processedResponse = await processResponse(ratingContent);

      return processedResponse;
    } catch (error) {
      this.logger.error(`Resume rating failed: ${error.message}`, error.stack);

      if (this.isContextLengthError(error)) {
        throw new Error('Resume is too long. Please submit a shorter version.');
      }

      if (this.isParsingError(error)) {
        throw new Error('Rating analysis failed. Please try again.');
      }

      throw new Error('Unable to rate resume. Please try again.');
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

  private isContextLengthError(error: any): boolean {
    const errorMessage = error.message?.toLowerCase() || '';
    return (
      errorMessage.includes('too long') ||
      errorMessage.includes('maximum context length') ||
      errorMessage.includes('context window')
    );
  }

  private isParsingError(error: any): boolean {
    return (
      error.message?.includes('JSON') ||
      error.message?.includes('parse') ||
      error.message?.includes('unexpected token')
    );
  }
}
