import { useState } from "react";
import type { ResumeData, ResumeHeader } from "../types/resume";

export function useResumeData(initialData: ResumeData) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);

  const updateHeader = (updates: Partial<ResumeHeader>) => {
    setResumeData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        ...updates,
        contacts: {
          ...prev.header.contacts,
          ...(updates.contacts || {}),
        },
      },
    }));
  };

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
    updateHeader,
    updateProfessionalSummary,
    updateProfessionalHighlights,
    updateExperiencePosition,
    updateEducationEntry,
    updateSkills,
  };
}
