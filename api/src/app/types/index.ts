export enum SeniorityLevel {
  ENTRY = 'entry',
  JUNIOR = 'junior',
  MID = 'mid',
  SENIOR = 'senior',
  LEAD = 'lead',
  PRINCIPAL = 'principal',
  EXECUTIVE = 'executive',
}

export interface ResumeEnhancement {
  enhancedContent: {
    professionalSummary: {
      content: string;
      highlights: string[];
    };
    experience: {
      positions: Array<{
        role: string;
        company: string;
        duration: string;
        achievements: string[];
        impactMetrics: string[];
      }>;
    };
    skills: {
      technical: string[];
      domain: string[];
      leadership: string[];
    };
    education: {
      entries: Array<{
        degree: string;
        institution: string;
        year: string;
        highlights: string[];
      }>;
    };
  };
  optimization: {
    keyStrengths: string[];
    impactMetrics: string[];
    uniqueValue: string[];
  };
}
