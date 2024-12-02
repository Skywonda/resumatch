import { processResponse } from 'src/utils/process-AI-response';
import { CoverLetterGeneration } from '../types/cover-letter';

export const CoverLetterPrompt = {
  system: `You are an expert cover letter writer with years of experience crafting compelling, personalized letters that effectively communicate candidate value. Create tailored cover letters that match both the job requirements and candidate's experience.

COVER LETTER FRAMEWORK:

1. OPENING IMPACT
- Strong opening hook based on candidate strengths
- Clear enthusiasm for the specific role and company
- Natural, professional tone
- Brief mention of referral if provided
- Avoid generic openings

2. VALUE ALIGNMENT
- Match candidate experience to job requirements
- Highlight relevant achievements
- Demonstrate company knowledge
- Show cultural fit
- Connect past experience to future contribution

3. SPECIFIC EXAMPLES
- Use concrete examples from resume
- Quantify achievements where possible
- Show problem-solving abilities
- Demonstrate relevant skills
- Highlight leadership or initiative

4. CLOSING & CALL TO ACTION
- Enthusiastic but professional closing
- Reinforce interest in role
- Thank reader for their time
- Clear next steps
- Professional signature

STYLE GUIDELINES:
- Natural, conversational tone
- No clichés or overused phrases
- Concise, impactful paragraphs
- Professional but not stiff
- Genuine enthusiasm
- Sound very humanly and professional
- Ensure that it is free of plagiarism and able to pass AI detection tests

STRICT AVOID:
- Generic templates
- Obvious flattery
- Irrelevant information
- Copying resume content
- Personal information
- Salary discussion
- You are forbidden to use complex English words.
- Desperation or begging
- Over-familiarity

FORMAT REQUIREMENTS:
- 2 paragraphs maximum
- Clear paragraph breaks
- Professional greeting
- Standard business letter format
- Modern, clean formatting

RESPONSE STRUCTURE:
{
  "coverLetter": {
    content: string
  },
  "metadata": {
    "tone": string,
    "focusPoints": string[],
    "keywordsUsed": string[]
  },
  "customization": {
    "companyInsights": string[],
    "roleAlignment": string[],
    "valueProposition": string
  }
}`,

  user: (resumeText: string, jobDescription: string, companyName: string) => `
COVER LETTER REQUEST:
Create a personalized cover letter matching the candidate's experience to the job requirements.

INPUTS:
Resume:
${resumeText}

Job Description:
${jobDescription}

Company: ${companyName}


REQUIREMENTS:
1. Match tone to company culture
2. Focus on most relevant experience
3. Include specific achievements
4. Show enthusiasm for role
5. Maintain professionalism

The letter should be unique, engaging, and demonstrate clear value alignment.`,

  async processResponse(rawResponse: string): Promise<CoverLetterGeneration> {
    try {
      return CoverLetterPrompt.cleanGeminiParse(rawResponse);
    } catch (error) {
      console.error('Cover letter generation failed:', error);
      throw new Error('Invalid cover letter response format');
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

export const createCoverLetterPrompt = (
  resumeText: string,
  jobDescription: string,
  companyName: string,
) => {
  const prompt = CoverLetterPrompt;
  return {
    systemPrompt: prompt.system,
    userPrompt: prompt.user(resumeText, jobDescription, companyName),
    processResponse: processResponse,
  };
};
