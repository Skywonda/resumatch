// types/index.ts
export interface ResumeData {
  enhancedContent: {
    professionalSummary: {
      content: string;
      highlights: string[];
    };
    experience: {
      positions: {
        role: string;
        company: string;
        duration: string;
        achievements: string[];
        impactMetrics: string[];
      }[];
    };
    skills: {
      technical: string[];
      domain: string[];
      leadership: string[];
    };
    education: {
      entries: {
        degree: string;
        institution: string;
        year: string | null;
        highlights: string[];
      }[];
    };
  };
  optimization?: {
    keyStrengths: string[];
    impactMetrics: string[];
    uniqueValue: string[];
  };
}

export interface Section {
  id: string;
  title: string;
  icon: React.FC;
}

// Add more type definitions as needed...
