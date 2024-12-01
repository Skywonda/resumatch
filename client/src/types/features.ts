export const FeatureKeys = {
  resumeAnalysis: "resumeAnalysis",
  resumeTailoring: "resumeTailoring",
  coverLetterGen: "coverLetterGen",
  skillsExtractor: "skillsExtractor",
  resumeBuilder: "resumeBuilder",
  downloading: "downloading",
  resumeRating: "resumeRating",
} as const;

export type FeatureKey = keyof typeof FeatureKeys;
