import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ResumeUpload } from "@/components/resume-upload";
import { FileText } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { LoadingModal } from "@/components/loading-modal";
import extractTextFromFile from "@/lib/utils/file-text-extractor";
import { useToast } from "@/hooks/use-toast";
import { validateResumeTailoring } from "@/lib/utils/validation";
import { resumeTailoring } from "@/lib/utils/api";
import { TailoringResult, TailoringResults } from "./tailoring-result";
import { ResumeData } from "@/types/resume";

interface ResumeEnhancementResult {
  enhancedContent: ResumeData;
  suggestedSkills?: {
    technical?: string[];
    domain?: string[];
    leadership?: string[];
  };
}

export default function Tailor() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TailoringResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!resume || !jobDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both resume and job description",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const validation = validateResumeTailoring(resume, jobDescription);
      if (validation) {
        toast({
          title: "Validation Error",
          description: validation,
          variant: "destructive",
        });
        return;
      }

      const resumeText = await extractTextFromFile(resume);
      const { data }: { data: any } = await resumeTailoring(
        jobDescription,
        resumeText
      );
      setResult(data);

      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed and tailored!",
      });
    } catch (error) {
      console.error("Resume tailoring error:", error);
      toast({
        title: "Analysis failed",
        description:
          error instanceof Error ? error.message : "Failed to analyze resume",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputContent = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Step 1: Upload Your Resume
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

      <Card>
        <CardHeader>
          <CardTitle>Step 2: Add Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste the job description here..."
            className="min-h-[200px]"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      <LoadingModal type="resumeTailoring" open={isLoading} />
      <DashboardLayout
        title="Resume Tailoring"
        description="Upload your resume and paste the job description to get personalized optimization suggestions"
        buttonText="Analyze and Tailor Resume"
        isLoading={isLoading}
        onSubmit={handleSubmit}
        result={result ? <TailoringResults result={result} /> : null}
      >
        {inputContent}
      </DashboardLayout>
    </>
  );
}
