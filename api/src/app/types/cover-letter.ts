export interface CoverLetter {
  content: string;
}

export interface CoverLetterMetadata {
  tone: string;
  focusPoints: string[];
  keywordsUsed: string[];
  compatibilityScore: number;
}

export interface CoverLetterCustomization {
  companyInsights: string[];
  roleAlignment: string[];
  valueProposition: string;
}

export interface CoverLetterGeneration {
  coverLetter: CoverLetter;
  metadata: CoverLetterMetadata;
  customization: CoverLetterCustomization;
}
