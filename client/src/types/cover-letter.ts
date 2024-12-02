export interface CoverLetterGeneration {
  coverLetter: {
    content: string;
  };
  metadata: {
    tone: string;
    focusPoints: string[];
    keywordsUsed: string[];
  };
  customization: {
    companyInsights: string[];
    roleAlignment: string[];
    valueProposition: string;
  };
}
