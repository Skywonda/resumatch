// hooks/useResumeData.ts
import { useState } from "react";
import type { ResumeData } from "../types/resume";

export function useResumeData(initialData: ResumeData) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);

  const updateProfessionalSummary = (content: string) => {
    setResumeData((prev) => ({
      ...prev,
      enhancedContent: {
        ...prev.enhancedContent,
        professionalSummary: {
          ...prev.enhancedContent.professionalSummary,
          content,
        },
      },
    }));
  };

  const updateProfessionalHighlights = (highlights: string[]) => {
    setResumeData((prev) => ({
      ...prev,
      enhancedContent: {
        ...prev.enhancedContent,
        professionalSummary: {
          ...prev.enhancedContent.professionalSummary,
          highlights,
        },
      },
    }));
  };

  const updateExperiencePosition = (
    index: number,
    updates: Partial<
      ResumeData["enhancedContent"]["experience"]["positions"][0]
    >
  ) => {
    setResumeData((prev) => {
      const newPositions = [...prev.enhancedContent.experience.positions];
      newPositions[index] = { ...newPositions[index], ...updates };
      return {
        ...prev,
        enhancedContent: {
          ...prev.enhancedContent,
          experience: { positions: newPositions },
        },
      };
    });
  };

  const updateEducationEntry = (
    index: number,
    updates: Partial<ResumeData["enhancedContent"]["education"]["entries"][0]>
  ) => {
    setResumeData((prev) => {
      const newEntries = [...prev.enhancedContent.education.entries];
      newEntries[index] = { ...newEntries[index], ...updates };
      return {
        ...prev,
        enhancedContent: {
          ...prev.enhancedContent,
          education: { entries: newEntries },
        },
      };
    });
  };

  const updateSkills = (
    category: keyof ResumeData["enhancedContent"]["skills"],
    skills: string[]
  ) => {
    setResumeData((prev) => ({
      ...prev,
      enhancedContent: {
        ...prev.enhancedContent,
        skills: {
          ...prev.enhancedContent.skills,
          [category]: skills,
        },
      },
    }));
  };

  return {
    resumeData,
    updateProfessionalSummary,
    updateProfessionalHighlights,
    updateExperiencePosition,
    updateEducationEntry,
    updateSkills,
  };
}

// hooks/useResumeExport.ts
export function useResumeExport() {
  const exportToJson = (data: any) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return { exportToJson };
}
