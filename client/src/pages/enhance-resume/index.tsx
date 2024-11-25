import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { LoadingModal } from "@/components/loading-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeUpload } from "@/components/resume-upload";
import { BriefcaseIcon, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProfessionalSelect } from "./professional-select";
import { ProfessionalLevelId } from "./professional-levels";
import { EnhancementResults } from "./enhancement-results";
import { validateResumeAnalysis } from "@/lib/utils/validation";
import extractTextFromFile from "@/lib/utils/file-text-extractor";
import { resumeEnhancement } from "@/lib/utils/api";

interface EnhancementResult {
  enhancedContent: {
    professionalSummary: {
      content: string;
      highlights: string[];
    };
    experience: {
      positions: {
        role: string;
        company: string;
        duration: string;
        achievements: string[];
        impactMetrics: string[];
      }[];
    };
    skills: {
      technical: string[];
      domain: string[];
      leadership: string[];
    };
    education: {
      entries: {
        degree: string;
        institution: string;
        year: string | null;
        highlights: string[];
      }[];
    };
  };
  optimization: {
    keyStrengths: string[];
    impactMetrics: string[];
    uniqueValue: string[];
  };
}

export default function Enhance() {
  const [resume, setResume] = useState<File | null>(null);
  const [professionalLevel, setProfessionalLevel] =
    useState<ProfessionalLevelId>();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EnhancementResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const validation = validateResumeAnalysis(resume, professionalLevel);
      if (validation) {
        toast({
          title: "Validation Error",
          description: validation,
          variant: "destructive",
        });
        return;
      }

      if (!professionalLevel || !resume) {
        throw new Error(
          "Please select your professional level and upload your resume"
        );
      }

      const resumeText = await extractTextFromFile(resume);
      const { text }: { text: any } = await resumeEnhancement(
        resumeText,
        professionalLevel
      );

      try {
        setResult(text);

        toast({
          title: "Enhancement Complete",
          description: "Your resume has been successfully enhanced!",
        });
      } catch (parseError) {
        console.error("Failed to parse API response:", parseError);
        throw new Error("Unable to process the enhancement results");
      }
    } catch (error) {
      console.error("Resume enhancement error:", error);
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

  const canSubmit = Boolean(resume && professionalLevel && !isLoading);

  const inputContent = (
    <div className="space-y-6">
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
    </div>
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
        // isSubmitDisabled={!canSubmit}
        result={result ? <EnhancementResults result={result} /> : null}
      >
        {inputContent}
      </DashboardLayout>
    </>
  );
}
