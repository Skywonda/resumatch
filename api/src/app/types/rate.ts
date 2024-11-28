export interface ResumeRating {
  overallScore: number; // 1-10, 2 decimal places
  categoryScores: {
    contentEffectiveness: {
      score: number;
      deductions: {
        reason: string;
        points: number;
      }[];
      metrics: {
        achievementQuantificationRate: number;
        impactVerbDensity: number;
      };
    };
    technicalOptimization: {
      score: number;
      deductions: {
        reason: string;
        points: number;
      }[];
      metrics: {
        keywordOptimizationScore: number;
        atsCompatibilityIndex: number;
      };
    };
    careerTrajectory: {
      score: number;
      deductions: {
        reason: string;
        points: number;
      }[];
      metrics: {
        progressionLogicScore: number;
        responsibilityGrowthRate: number;
      };
    };
    competitivePosition: {
      score: number;
      deductions: {
        reason: string;
        points: number;
      }[];
      metrics: {
        industryAlignmentScore: number;
        valuePropStrength: number;
      };
    };
  };
  analysis: {
    criticalGaps: {
      gap: string;
      impact: number;
      priority: 'critical' | 'high' | 'medium' | 'low';
    }[];
    improvementPlan: {
      action: string;
      expectedImpact: number;
      effort: 'minimal' | 'moderate' | 'significant';
    }[];
  };
  verificationMetrics: {
    consistencyScore: number;
    confidenceInterval: number;
    evaluationTimestamp: string;
  };
}
