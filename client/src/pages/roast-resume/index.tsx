import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeUpload } from "@/components/resume-upload";
import { FileText } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { LoadingModal } from "@/components/loading-modal";
import extractTextFromFile from "@/lib/utils/file-text-extractor";
import { useToast } from "@/hooks/use-toast";
import { roastMyResume } from "@/lib/utils/api";
import { RoastResult } from "./roast-result";
import { ResumeRoast } from "@/types/roast";

export default function Roast() {
  const [resume, setResume] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResumeRoast | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!resume) {
      toast({
        title: "Missing Resume",
        description: "Please upload your resume to be roasted",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const resumeText = await extractTextFromFile(resume);
      const { data }: { data: any } = await roastMyResume(resumeText);
      setResult(data);

      toast({
        title: "Roast Complete",
        description: "Your resume has been thoroughly roasted!",
      });
    } catch (error) {
      console.error("Resume roasting error:", error);
      toast({
        title: "Roasting failed",
        description:
          error instanceof Error ? error.message : "Failed to roast resume",
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
          Upload Your Resume for a Brutal Roast
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
      <LoadingModal type="resumeRoast" open={isLoading} />
      <DashboardLayout
        title="Resume Roast"
        description="Get brutally honest feedback about your resume. Warning: Not for the faint of heart!"
        buttonText="Roast My Resume"
        isLoading={isLoading}
        onSubmit={handleSubmit}
        result={result ? <RoastResult result={result} /> : null}
      >
        {inputContent}
      </DashboardLayout>
    </>
  );
}
