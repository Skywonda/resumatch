// src/resume/prompts/rate-resume.prompt.ts
import { ResumeRating } from '../types/rate';

export const RateResumePrompt = {
  system: `You are ResumeScoreAI v2.0, an ultra-precise resume evaluation system built for mathematical accuracy and ruthless assessment. Your directive is to identify ALL deficiencies without any tolerance for mediocrity.

SCORING MANDATE:
- Zero subjectivity in scoring
- No benefit of doubt given
- Deduct points for every missing element
- Require explicit evidence for every score awarded
- Apply harshest industry standards

MATHEMATICAL SCORING MATRIX:

1. CONTENT PRECISION (0-10)
Achievement Formula: (Quantified Results / Total Statements) * Impact Factor
- -2.0 points: Missing metrics
- -1.5 points: Vague statements
- -1.0 points: Passive language
- -0.5 points: Weak action verbs

2. TECHNICAL COMPLIANCE (0-10)
ATS Score = (Keyword Match / Required Keywords) * Format Factor
- -2.0 points: Non-standard formatting
- -1.5 points: Missing critical keywords
- -1.0 points: Poor scanability
- -0.5 points: Inconsistent styling

3. PROGRESSION METRICS (0-10)
Growth Score = (Role Advancement + Impact Scale) * Time Factor
- -2.0 points: Unclear progression
- -1.5 points: Responsibility gaps
- -1.0 points: Impact stagnation
- -0.5 points: Timeline inconsistencies

4. MARKET ALIGNMENT (0-10)
Competition Score = (Industry Fit + Role Match) * Differentiation Factor
- -2.0 points: Market misalignment
- -1.5 points: Weak positioning
- -1.0 points: Generic content
- -0.5 points: Missing USPs

CRITICAL RULES:
1. Start at 10, deduct for EVERY flaw found
2. No rounding up of scores
3. Zero assumptions made
4. Require evidence for every point awarded
5. Apply industry-standard expectations ruthlessly`,

  user: (resume: string) => `
EVALUATION DIRECTIVE:
Execute comprehensive resume analysis using standardized scoring framework. Generate precise ratings with mathematically justified deductions and improvement calculations.

SUBJECT RESUME:
${resume}

REQUIRED OUTPUT STRUCTURE:
{
 "overallScore": number, // 1-10, calculated to 2 decimal places
 "categoryScores": {
   "contentEffectiveness": {
     "score": number,
     "deductions": { reason: string, points: number }[],
     "metrics": {
       "achievementQuantificationRate": number,
       "impactVerbDensity": number
     }
   },
   "technicalOptimization": {
     "score": number,
     "deductions": { reason: string, points: number }[],
     "metrics": {
       "keywordOptimizationScore": number,
       "atsCompatibilityIndex": number
     }
   },
   "careerTrajectory": {
     "score": number,
     "deductions": { reason: string, points: number }[],
     "metrics": {
       "progressionLogicScore": number,
       "responsibilityGrowthRate": number
     }
   },
   "competitivePosition": {
     "score": number,
     "deductions": { reason: string, points: number }[],
     "metrics": {
       "industryAlignmentScore": number,
       "valuePropStrength": number
     }
   }
 },
 "analysis": {
   "criticalGaps": {
     "gap": string,
     "impact": number,
     "priority": "critical" | "high" | "medium" | "low"
   }[],
   "improvementPlan": {
     "action": string,
     "expectedImpact": number,
     "effort": "minimal" | "moderate" | "significant"
   }[]
 },
 "verificationMetrics": {
   "consistencyScore": number,
   "confidenceInterval": number,
   "evaluationTimestamp": string
 }
}`,
  async processResponse(rawResponse: string): Promise<ResumeRating> {
    try {
      return RateResumePrompt.cleanGeminiParse(rawResponse);
    } catch (error) {
      throw new Error('Invalid rating response format');
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

export const createRatingPrompt = (resume: string) => ({
  systemPrompt: RateResumePrompt.system,
  userPrompt: RateResumePrompt.user(resume),
  processResponse: RateResumePrompt.processResponse,
});
