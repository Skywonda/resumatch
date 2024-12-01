export interface RatingResult {
  overallScore: number;
  categoryScores: {
    impactAndAchievements: CategoryScore;
    technicalExcellence: CategoryScore;
    careerProgression: CategoryScore;
    expertiseDepth: CategoryScore;
  };
  criticalImprovements: CriticalImprovement[];
}

interface CategoryScore {
  score: number;
  strengths: string[];
  gaps: Gap[];
}

interface Gap {
  issue: string;
  impact: number;
  suggestion: string;
}

interface CriticalImprovement {
  area: string;
  issue: string;
  solution: string;
  impactScore: number;
}
