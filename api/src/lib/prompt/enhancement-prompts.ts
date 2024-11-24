export const generateEnhancementPrompt = (
  resumeText: string,
  level: string,
) => {
  const basePrompt = `As an expert resume optimization AI, analyze and enhance this resume while maintaining complete truthfulness and authenticity. ${resumeText}

Expert Guidelines:
1. Maintain absolute truthfulness - never fabricate or exaggerate
2. Preserve the core experiences and qualifications
3. Focus on clarifying and strengthening existing achievements
4. Use industry-standard terminology appropriately
`;

  const levelSpecificPrompts = {
    entry: `For this entry-level professional:
- Highlight academic achievements and relevant coursework
- Emphasize internships and project work
- Focus on transferable skills and potential
- Use action verbs appropriate for early-career roles
- Suggest areas where additional certifications or training could add value`,

    mid: `For this mid-level professional:
- Emphasize growing responsibilities and project ownership
- Highlight team collaboration and initial leadership experiences
- Quantify achievements with specific metrics
- Focus on technical expertise development
- Suggest ways to demonstrate career progression`,

    senior: `For this senior-level professional:
- Emphasize leadership and strategic contributions
- Highlight cross-functional team management
- Focus on business impact and organizational influence
- Demonstrate technical depth and breadth
- Suggest ways to showcase mentorship and team development`,

    expert: `For this expert-level professional:
- Emphasize industry influence and thought leadership
- Highlight organizational transformation initiatives
- Focus on strategic vision and executive-level impact
- Demonstrate innovation and industry expertise
- Suggest ways to showcase broader industry contributions`,
  };

  return `${basePrompt}

${levelSpecificPrompts[level as keyof typeof levelSpecificPrompts]}

Please provide:
1. Optimized version of each section
2. Specific improvement suggestions
3. Industry-standard formatting recommendations
4. Keywords and phrases to incorporate
5. Areas needing clarification or more detail

Remember: Keep all enhancements truthful and grounded in the actual experience presented.`;
};
