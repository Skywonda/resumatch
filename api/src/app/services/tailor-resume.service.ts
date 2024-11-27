import { Injectable, Logger } from '@nestjs/common';
import { AIService } from '../../common/services/ai.service';
import { createTailoringPrompt } from '../prompt/tailor-resume';
import { ResumeEnhancement } from '../types';

@Injectable()
export class ResumeTailoringService {
  private readonly logger = new Logger(ResumeTailoringService.name);

  constructor(private readonly aiService: AIService) {}

  async tailorResume(
    resumeText: string,
    jobDescription: string,
  ): Promise<ResumeEnhancement> {
    try {
      const cleanedResumeText = this.preprocessResume(resumeText);
      const cleanedJobDescription =
        this.preprocessJobDescription(jobDescription);

      const { systemPrompt, userPrompt, processResponse } =
        createTailoringPrompt(cleanedResumeText, cleanedJobDescription);

      const tailoredContent = await this.aiService.generateWithGemini(
        systemPrompt,
        userPrompt,
      );

      const processedResponse = await processResponse(tailoredContent);

      return processedResponse;
    } catch (error) {
      this.logger.error(
        `Resume tailoring failed: ${error.message}`,
        error.stack,
      );

      if (this.isContextLengthError(error)) {
        throw new Error(
          'Content is too long. Please try a shorter resume or job description.',
        );
      }

      if (this.isParsingError(error)) {
        throw new Error('Failed to process the AI response. Please try again.');
      }

      throw new Error('Failed to tailor resume. Please try again.');
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

  private preprocessJobDescription(jobDescription: string): string {
    return jobDescription
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\t/g, ' ')
      .replace(/ {2,}/g, ' ')
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\b(https?:\/\/[^\s]+)/g, '') // Remove URLs
      .replace(/[^\x20-\x7E\n]/g, '') // Remove non-ASCII characters
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
