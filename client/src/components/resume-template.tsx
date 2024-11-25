// components/ResumeTemplate.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Edit2, Save, FileText } from "lucide-react";
import { useResumeData } from "@/hooks/use-resume-data.hook";
import { ProfessionalSummary, Experience, Skills, Education } from "./sections";
import type { ResumeData } from "../types/resume";
import { cn } from "@/lib/utils";
import { useFullscreen } from "@/hooks/use-fullscreen.hoook";
import { HeaderSection } from "./sections/header";
import { FullscreenButton } from "./fullscreen-button";
import { headerSectionData } from "@/mock/data";
import { useResumeExport } from "@/hooks/use-resume-export.hook";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ResumeTemplate: React.FC<{ initialData: ResumeData }> = ({
  initialData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const {
    resumeData,
    updateProfessionalSummary,
    updateProfessionalHighlights,
    updateExperiencePosition,
    updateEducationEntry,
    updateSkills,
    updateHeader,
  } = useResumeData(initialData);
  const { exportResume } = useResumeExport();
  const { toast } = useToast();

  const handleExport = async (format: "pdf" | "docx") => {
    try {
      await exportResume(resumeData, format);
      toast({
        title: "Export Successful",
        description: `Resume exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description:
          error instanceof Error ? error.message : "Failed to export resume",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className={cn(
        "transition-all duration-300",
        isFullscreen
          ? "fixed inset-0 bg-white overflow-auto"
          : "max-w-[1000px] mx-auto space-y-6"
      )}
    >
      {/* Editor Controls */}
      <div
        className={cn(
          "flex justify-end gap-2 mb-8 sticky top-0 bg-white z-50 p-4",
          isFullscreen ? "shadow-md" : ""
        )}
      >
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleExport("pdf")}>
              <FileText className="h-4 w-4 mr-2" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("docx")}>
              <FileText className="h-4 w-4 mr-2" />
              Export as DOCX
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <FullscreenButton
          isFullscreen={isFullscreen}
          onClick={toggleFullscreen}
        />
      </div>

      {/* Resume Content */}
      <div
        id="resume-content"
        className={cn(
          "bg-white rounded-lg shadow-sm",
          isFullscreen ? "p-8 max-w-[1000px] mx-auto" : "p-8"
        )}
      >
        <HeaderSection
          isEditing={isEditing}
          data={headerSectionData}
          onUpdate={updateHeader}
        />

        {/* Main Content */}
        <div className="grid grid-cols-[2fr,1fr] gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <ProfessionalSummary
              content={resumeData.enhancedContent.professionalSummary.content}
              highlights={
                resumeData.enhancedContent.professionalSummary.highlights
              }
              isEditing={isEditing}
              onUpdateContent={updateProfessionalSummary}
              onUpdateHighlights={updateProfessionalHighlights}
            />

            <Experience
              positions={resumeData.enhancedContent.experience.positions}
              isEditing={isEditing}
              onUpdatePosition={updateExperiencePosition}
            />

            <Education
              entries={resumeData.enhancedContent.education.entries}
              isEditing={isEditing}
              onUpdateEntry={updateEducationEntry}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Skills
              skills={resumeData.enhancedContent.skills}
              isEditing={isEditing}
              onUpdateSkills={updateSkills}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
