export interface ResumeRoast {
  overallRoast: {
    brutalScore: number;
    openingRoast: string;
    generalThoughts: string[];
  };
  sectionRoasts: {
    format: SectionRoast;
    content: SectionRoast;
    impact: SectionRoast;
  };
  topCrimes: {
    description: string;
    evidence: string[];
    remedy: string;
  }[];
  finalThoughts: {
    harshTruth: string;
    actuallyGood: string[];
    finalRoast: string;
  };
}

interface SectionRoast {
  roast: string;
  issues: string[];
  howToFix: string;
}
