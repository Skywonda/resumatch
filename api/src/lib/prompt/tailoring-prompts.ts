export const generateTailoringPrompt = (
  resumeText: string,
  jobDescription: string,
) => {
  return `As an expert resume optimization AI, analyze this resume against the job description while maintaining strict truthfulness and ethical alignment. Never suggest fabricating or exaggerating experience.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Analysis Guidelines:
1. Truthfulness First
- Never suggest fabricating experience or skills
- Don't recommend exaggerating existing experience
- Maintain ethical integrity in all suggestions

2. Gap Analysis
- Identify genuine matches between experience and requirements
- Highlight truthful alignment with job requirements
- Note actual gaps in experience or skills
- Suggest honest ways to address gaps through existing experience

3. Experience Optimization
- Identify relevant existing experience that aligns with the role
- Suggest better ways to present actual experience
- Highlight transferable skills that genuinely apply
- Focus on authentic achievements that matter for this role

4. Skills Alignment
- Match existing skills to job requirements
- Identify truly relevant technical competencies
- Highlight genuine soft skills that align
- Note which required skills are actually present

5. Recommendations
- Provide specific suggestions for highlighting relevant experience
- Suggest truthful ways to demonstrate capability
- Recommend honest approaches to addressing gaps
- Focus on authentic ways to stand out

Output Format:
1. Alignment Analysis
- Strong matches between experience and requirements
- Partial matches that can be better highlighted
- Genuine gaps and honest ways to address them

2. Optimization Suggestions
- Specific recommendations for each section
- Priority order for modifications
- Honest assessment of competitiveness for the role

3. Keywords and Phrases
- Relevant terms from the job description that match actual experience
- Suggestions for industry-standard terminology that truthfully applies

Remember: The goal is to present the candidate's genuine qualifications in the best light possible while maintaining complete truthfulness. Never suggest misrepresenting experience or capabilities.`;
};
