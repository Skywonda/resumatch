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
      professionalSummary: {
        ...prev.professionalSummary,
        content,
      },
    }));
  };

  const updateProfessionalHighlights = (highlights: string[]) => {
    setResumeData((prev) => ({
      ...prev,
      professionalSummary: {
        ...prev.professionalSummary,
        highlights,
      },
    }));
  };

  const updateExperiencePosition = (
    index: number,
    updates: Partial<ResumeData["experience"]["positions"][0]>
  ) => {
    setResumeData((prev) => {
      const newPositions = [...prev.experience.positions];
      newPositions[index] = { ...newPositions[index], ...updates };
      return {
        ...prev,
        experience: { positions: newPositions },
      };
    });
  };

  const updateEducationEntry = (
    index: number,
    updates: Partial<ResumeData["education"]["entries"][0]>
  ) => {
    setResumeData((prev) => {
      const newEntries = [...prev.education.entries];
      newEntries[index] = { ...newEntries[index], ...updates };
      return {
        ...prev,
        education: { entries: newEntries },
      };
    });
  };

  const updateSkills = (
    category: keyof ResumeData["skills"],
    skills: string[]
  ) => {
    setResumeData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: skills,
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
