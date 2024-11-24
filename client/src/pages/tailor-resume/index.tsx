import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ResumeUpload } from "@/components/resume-upload";
import { FileText } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { LoadingModal } from "@/components/loading-modal";
import extractTextFromFile from "@/lib/utils/file-text-extractor";
import { useToast } from "@/hooks/use-toast";
import { validateRateMyResume } from "@/lib/utils/validation";

export default function Tailor() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!resume || !jobDescription) return;

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
      console.log(
        "🚀 ~ handleSubmit ~ resumeText:",
        JSON.stringify(resumeText)
      );

      await new Promise((resolve) => setTimeout(resolve, 3000));
      setResult(`
        Analysis of your resume against the job description:
        
        1. Skills Match: Your resume contains relevant keywords
        2. Experience Alignment: Your background matches the requirements
        3. Suggested Improvements: Consider highlighting specific achievements
      `);
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
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
    <>
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
    </>
  );

  const resultContent = result ? (
    <div className="prose max-w-none">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Analysis Results</h3>
        <div className="whitespace-pre-wrap">{result}</div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <LoadingModal type="resumeTailoring" open={isLoading} />
      <DashboardLayout
        title="Resume Tailoring"
        description="Upload your resume and paste the job description to get personalized optimization suggestions"
        buttonText="Analyze and Tailor Resume"
        isLoading={isLoading}
        onSubmit={handleSubmit}
        result={resultContent}
      >
        {inputContent}
      </DashboardLayout>
    </>
  );
}
