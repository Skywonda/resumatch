import { Injectable, Logger } from '@nestjs/common';
import { AIService } from 'src/common/services/ai.service';
// import { ResumeRoast } from '../types/roast';
import { createRoastPrompt } from '../prompt/roast';

@Injectable()
export class ResumeRoastService {
  private readonly logger = new Logger(ResumeRoastService.name);

  constructor(private readonly aiService: AIService) {}

  async roastResume(resumeText: string): Promise<any> {
    try {
      const cleanedResumeText = this.preprocessResume(resumeText);
      const { systemPrompt, userPrompt, processResponse } =
        createRoastPrompt(cleanedResumeText);

      const roastContent = await this.aiService.generateWithGemini(
        systemPrompt,
        userPrompt,
      );

      const processedResponse = await processResponse(roastContent);

      return processedResponse;
    } catch (error) {
      this.logger.error(
        `Resume roasting failed: ${error.message}`,
        error.stack,
      );

      if (this.isContextLengthError(error)) {
        throw new Error(
          "Resume is too long to roast. Maybe that's your first problem...",
        );
      }

      if (this.isParsingError(error)) {
        throw new Error(
          "Our roast generator choked on your resume. That's how bad it is.",
        );
      }

      throw new Error(
        'Failed to roast your resume. It might be so bad it broke our system.',
      );
    }
  }

  private preprocessResume(resumeText: string): string {
    return resumeText
      .replace(/\r\n/g, '\n') // Normalize line endings
      .replace(/\n{3,}/g, '\n\n') // Remove excessive blank lines
      .replace(/\t/g, ' ') // Replace tabs with spaces
      .replace(/ {2,}/g, ' ') // Remove multiple spaces
      .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // Remove styles
      .replace(/### LINKS[\s\S]*$/, '') // Remove links section
      .replace(/\[.+?\]/g, '') // Remove markdown links
      .replace(/\(.+?\)/g, '') // Remove parentheticals
      .replace(/\s+/g, ' ') // Normalize whitespace
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

  private sanitizeText(text: string): string {
    return text
      .replace(/[^\w\s.,!?()-]/g, '') // Remove special characters
      .replace(/\b(hate|stupid|dumb|idiot)\b/gi, 'questionable') // Replace harsh words
      .trim();
  }
}
