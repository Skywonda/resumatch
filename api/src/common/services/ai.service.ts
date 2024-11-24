// src/common/services/ai.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AIService {
  private readonly openai: OpenAI;
  private readonly anthropic: Anthropic;
  private readonly gemini: GoogleGenerativeAI;
  private readonly logger = new Logger(AIService.name);

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.getOrThrow<string>('OPENAI_API_KEY'),
    });

    this.anthropic = new Anthropic({
      apiKey: this.configService.getOrThrow<string>('ANTHROPIC_API_KEY'),
    });

    this.gemini = new GoogleGenerativeAI(
      this.configService.getOrThrow<string>('GEMINI_API_KEY'),
    );
  }

  async generateWithOpenAI(systemPrompt: string, userPrompt: string) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4-1106-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0.1,
        response_format: { type: 'json_object' },
      });

      const response = completion.choices[0]?.message?.content;

      if (!response) {
        throw new Error('No completion content generated');
      }

      return JSON.parse(response);
    } catch (error) {
      this.logger.error(`OpenAI request failed: ${error.message}`);
      throw error;
    }
  }

  async generateWithAnthropic(systemPrompt: string, userPrompt: string) {
    try {
      const completion = await this.anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 4000,
        temperature: 0.7,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      });

      return JSON.stringify(completion);
    } catch (error) {
      this.logger.error(`Anthropic request failed: ${error.message}`);
      throw error;
    }
  }

  async generateWithGemini(systemPrompt: string, userPrompt: string) {
    try {
      const model = this.gemini.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });

      const prompt = `${systemPrompt}\n\n${userPrompt}`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      return response;
    } catch (error) {
      this.logger.error(`Gemini request failed: ${error.message}`);
      throw error;
    }
  }
}
