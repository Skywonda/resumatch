import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeUpload } from "@/components/resume-upload";
import { FileText } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { LoadingModal } from "@/components/loading-modal";
import extractTextFromFile from "@/lib/utils/file-text-extractor";
import { useToast } from "@/hooks/use-toast";
import { validateRateMyResume } from "@/lib/utils/validation";
import { rateMyResume } from "@/lib/utils/api";
import { RatingResult } from "@/types/rate";
import { RatingResults } from "./rating-result";

export default function Rating() {
  const [resume, setResume] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RatingResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!resume) {
      toast({
        title: "Missing Resume",
        description: "Please upload your resume",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const validation = validateRateMyResume(resume);
      if (validation) {
        toast({
          title: "Validation Error",
          description: validation,
          variant: "destructive",
        });
        return;
      }

      const resumeText = await extractTextFromFile(resume);
      const { data }: { data: any } = await rateMyResume(resumeText);
      setResult(data);

      toast({
        title: "Analysis Complete",
        description: "Your resume has been rated!",
      });
    } catch (error) {
      console.error("Resume rating error:", error);
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Upload Your Resume
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
  );

  return (
    <>
      <LoadingModal type="resumeRating" open={isLoading} />
      <DashboardLayout
        title="Resume Rating"
        description="Upload your resume to get a detailed analysis and score"
        buttonText="Analyze Resume"
        isLoading={isLoading}
        onSubmit={handleSubmit}
        result={result ? <RatingResults result={result} /> : null}
      >
        {inputContent}
      </DashboardLayout>
    </>
  );
}
