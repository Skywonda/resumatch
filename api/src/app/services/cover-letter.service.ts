import { Injectable, Logger } from '@nestjs/common';
import { AIService } from '../../common/services/ai.service';
import { CoverLetterGeneration } from '../types/cover-letter';
import { createCoverLetterPrompt } from '../prompt/cover-letter.promt';
import { preprocessResume } from 'src/utils/preprocess-resume';

@Injectable()
export class CoverLetterService {
  private readonly logger = new Logger(CoverLetterService.name);

  constructor(private readonly aiService: AIService) {}

  async generateCoverLetter(data: {
    resumeText: string;
    jobDescription: string;
    companyName: string;
  }): Promise<CoverLetterGeneration> {
    try {
      const cleanedResumeText = preprocessResume(data.resumeText);
      const cleanedJobDescription = this.preprocessJobDescription(
        data.jobDescription,
      );

      const { systemPrompt, userPrompt, processResponse } =
        createCoverLetterPrompt(
          cleanedResumeText,
          cleanedJobDescription,
          data.companyName,
        );

      const coverLetterContent = await this.aiService.generateWithGemini(
        systemPrompt,
        userPrompt,
      );

      const processedResponse = await processResponse<CoverLetterGeneration>(
        coverLetterContent,
      );

      return processedResponse;
    } catch (error) {
      this.logger.error(
        `Cover letter generation failed: ${error.message}`,
        error.stack,
      );

      if (this.isContextLengthError(error)) {
        throw new Error(
          'Content is too long. Please provide shorter resume or job description.',
        );
      }

      if (this.isParsingError(error)) {
        throw new Error('Failed to generate cover letter. Please try again.');
      }

      throw new Error('Cover letter generation failed. Please try again.');
    }
  }

  private preprocessJobDescription(jobDescription: string): string {
    return jobDescription
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\t/g, ' ')
      .replace(/ {2,}/g, ' ')
      .replace(/<[^>]*>/g, '')
      .replace(/\b(https?:\/\/[^\s]+)/g, '')
      .replace(/[^\x20-\x7E\n]/g, '')
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
