export interface CoverLetterGeneration {
  coverLetter: {
    content: string;
  };
  metadata: {
    tone: string;
    focusPoints: string[];
    keywordsUsed: string[];
    compatibilityScore: number;
  };
  customization: {
    companyInsights: string[];
    roleAlignment: string[];
    valueProposition: string;
  };
}
