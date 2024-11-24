import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { LoadingModal } from "@/components/loading-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeUpload } from "@/components/resume-upload";
import { BriefcaseIcon, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProfessionalSelect } from "./professional-select";
import {
  PROFESSIONAL_LEVELS,
  type ProfessionalLevelId,
} from "./professional-levels";
import { EnhancementResults } from "./enhancement-results";

export default function Enhance() {
  const [resume, setResume] = useState<File | null>(null);
  const [professionalLevel, setProfessionalLevel] =
    useState<ProfessionalLevelId>();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!resume || !professionalLevel) {
      toast({
        title: "Missing information",
        description:
          "Please upload your resume and select your professional level",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Get the selected level details
      const selectedLevel = PROFESSIONAL_LEVELS.find(
        (level) => level.id === professionalLevel
      );

      if (!selectedLevel) throw new Error("Invalid professional level");

      // Here you would send resume and professionalLevel to your API
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setResult(`
# Resume Enhancement Suggestions for ${selectedLevel.label}

## Key Focus Areas
${selectedLevel.details.focusAreas.map((area) => `- ${area}`).join("\n")}

## Skills Emphasis
${selectedLevel.details.skillEmphasis.map((skill) => `- ${skill}`).join("\n")}

## Recommended Improvements
- Align experience descriptions with ${selectedLevel.label} expectations
- Highlight achievements relevant to your experience level
- Optimize keywords for ${selectedLevel.label} positions
      `);
    } catch (error) {
      toast({
        title: "Enhancement failed",
        description:
          error instanceof Error ? error.message : "Failed to enhance resume",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputContent = (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BriefcaseIcon className="h-5 w-5" />
            Professional Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProfessionalSelect
            value={professionalLevel}
            onChange={setProfessionalLevel}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Resume Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResumeUpload
            onFileSelect={setResume}
            fileName={resume?.name}
            fileSize={resume?.size}
          />
        </CardContent>
      </Card>
    </>
  );

  return (
    <>
      <LoadingModal type="resumeAnalysis" open={isLoading} />
      <DashboardLayout
        title="Resume Enhancement"
        description="Get AI-powered suggestions to improve your resume's impact and effectiveness"
        buttonText="Enhance Resume"
        isLoading={isLoading}
        onSubmit={handleSubmit}
        result={
          result ? (
            <EnhancementResults
              result={result}
              level={
                PROFESSIONAL_LEVELS.find((l) => l.id === professionalLevel)!
              }
            />
          ) : null
        }
      >
        {inputContent}
      </DashboardLayout>
    </>
  );
}
