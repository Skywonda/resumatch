export const validateResumeTailoring = (
  file: File | null,
  jobDescription?: string
) => {
  if (!file) return "Pdf file is required";
  // if file size if more than 2MB
  if (file.size > 2 * 1024 * 1024) return "File size should be less than 2MB";
  if (!jobDescription) return "Job description is required";
  if (jobDescription.split(" ").length < 20)
    return "Job description should be at least 20 words";

  return null;
};

export const validateResumeAnalysis = (file: File | null, level?: string) => {
  if (!file) return "Pdf file is required";
  // if file size if more than 2MB
  if (file.size > 2 * 1024 * 1024) return "File size should be less than 2MB";
  if (!level) return "Level is required";

  return null;
};

export const validateJobApplicationQuestion = (
  file: File | null,
  question?: string
) => {
  if (!file) return "Pdf file is required";
  // if file size if more than 2MB
  if (file.size > 2 * 1024 * 1024) return "File size should be less than 2MB";
  if (!question) return "Question is required";
  if (question.split(" ").length < 2)
    return "Question should be at least 2 words";

  return null;
};

export const validateRateMyResume = (
  file: File | null,
  jobDescription?: string
) => {
  if (!file) return "Pdf file is required";
  // if file size if more than 2MB
  if (file.size > 2 * 1024 * 1024) return "File size should be less than 2MB";
  if (jobDescription && jobDescription.split(" ").length < 20)
    return "Job description should be at least 20 words";

  return null;
};
