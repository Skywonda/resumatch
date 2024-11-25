// components/ResumeTemplate.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Edit2, Save } from "lucide-react";
import { useResumeData, useResumeExport } from "@/hooks/use-resume-data.hook";
import { ProfessionalSummary, Experience, Skills, Education } from "./sections";
import type { ResumeData } from "../types/resume";

export const ResumeTemplate: React.FC<{ initialData: ResumeData }> = ({
  initialData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    resumeData,
    updateProfessionalSummary,
    updateProfessionalHighlights,
    updateExperiencePosition,
    updateEducationEntry,
    updateSkills,
  } = useResumeData(initialData);
  const { exportToJson } = useResumeExport();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Interactive Resume</h1>
        <div className="flex gap-2">
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Resume
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => exportToJson(resumeData)}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <ProfessionalSummary
          content={resumeData.enhancedContent.professionalSummary.content}
          highlights={resumeData.enhancedContent.professionalSummary.highlights}
          isEditing={isEditing}
          onUpdateContent={updateProfessionalSummary}
          onUpdateHighlights={updateProfessionalHighlights}
        />

        <Experience
          positions={resumeData.enhancedContent.experience.positions}
          isEditing={isEditing}
          onUpdatePosition={updateExperiencePosition}
        />

        <Skills
          skills={resumeData.enhancedContent.skills}
          isEditing={isEditing}
          onUpdateSkills={updateSkills}
        />

        <Education
          entries={resumeData.enhancedContent.education.entries}
          isEditing={isEditing}
          onUpdateEntry={updateEducationEntry}
        />
      </div>
    </div>
  );
};
