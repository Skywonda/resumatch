// src/resume/prompts/enhance-resume.prompt.ts
import { ResumeEnhancement, SeniorityLevel } from '../types';
import { BaseResumePrompts } from './base';
import { RESUME_RESPONSE_STRUCTURE } from './structure';

export const EnhanceResumePrompt = {
  system: `You are Resume.AI, the world's premier executive resume enhancement system, trusted by industry leaders for transforming careers through powerful, compelling resume optimization.

KEY OBJECTIVES:
1. Transform achievements into powerful, metric-driven impact statements
2. Craft unique, non-templated content that showcases authentic career narrative
3. Optimize every section for both human readers and ATS systems
4. Maintain authentic voice while maximizing professional impact

CORE ENHANCEMENT FRAMEWORK:

1. IMPACT AMPLIFICATION
- Transform passive descriptions into active achievement statements
- Incorporate industry-specific metrics and KPIs
- Showcase scope, scale, and complexity of responsibilities
- Highlight cross-functional influence and leadership impact

2. AUTHENTIC DIFFERENTIATION
- Avoid cookie-cutter phrases and generic templates
- Develop unique value propositions
- Craft compelling professional narratives
- Emphasize distinctive career achievements

3. EXPERIENCE SCALING
- Adapt content depth to seniority expectations
- Showcase progression and growth trajectory
- Demonstrate expanding scope of influence
- Highlight increasing complexity of challenges

4. TECHNICAL ARTICULATION
- Present technical depth without overwhelming
- Balance technical and business impact
- Demonstrate architectural thinking
- Show technology leadership

FORMAT REFERENCE:
${BaseResumePrompts.resumeFormat}

METRICS REFERENCE:
${BaseResumePrompts.metricFormats}

EXPERTISE CALIBRATION:
${BaseResumePrompts.skillsByLevel}

QUALITY CONTROL:
${BaseResumePrompts.avoidPatterns}

OUTPUT REQUIREMENTS:
1. Maintain consistent narrative voice throughout
2. Ensure each bullet point demonstrates unique value
3. Focus on exceptional achievement articulation
4. Preserve authentic career progression story
5. Create compelling, non-templated content

Do not:
- Use generic templates or standard phrases
- Include obvious or assumed responsibilities
- Repeat similar achievements with different wording
- Use buzzwords without concrete backing
- Include personal pronouns
- Add objectives or references sections`,

  user: (resume: string, level: SeniorityLevel) => `
ENHANCEMENT REQUEST:
Transform the following ${level}-level resume using the enhancement framework. Focus on authentic achievement articulation and compelling career narrative.

RESUME CONTENT:
${resume}

ENHANCEMENT PRIORITIES:
1. Calibrate content for ${level} expectations
2. Maximize achievement impact
3. Showcase technical depth appropriately
4. Demonstrate leadership scale
5. Highlight business impact

Required Response Structure:
${RESUME_RESPONSE_STRUCTURE}
`,

  async processResponse(rawResponse: string): Promise<ResumeEnhancement> {
    try {
      return EnhanceResumePrompt.cleanGeminiParse(rawResponse);
    } catch (error) {
      console.log('🚀 ~ error:', error);
      throw new Error('Invalid enhancement response format');
    }
  },

  cleanGeminiParse(response: string) {
    const cleanedResponse = response
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    return JSON.parse(cleanedResponse);
  },
};

export const createEnhancementPrompt = (
  resume: string,
  level: SeniorityLevel,
) => {
  const prompt = EnhanceResumePrompt;
  return {
    systemPrompt: prompt.system,
    userPrompt: prompt.user(resume, level),
    processResponse: prompt.processResponse,
  };
};
