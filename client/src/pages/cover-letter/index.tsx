import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeUpload } from "@/components/resume-upload";
import { FileText, Building } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { LoadingModal } from "@/components/loading-modal";
import extractTextFromFile from "@/lib/utils/file-text-extractor";
import { useToast } from "@/hooks/use-toast";
import { generateCoverLetter } from "@/lib/utils/api";
import { CoverLetterResult } from "./cover-letter-result";

interface CoverLetterGeneration {
  coverLetter: {
    content: string;
  };
  metadata: {
    tone: string;
    focusPoints: string[];
    keywordsUsed: string[];
  };
  customization: {
    companyInsights: string[];
    roleAlignment: string[];
    valueProposition: string;
  };
}

export default function CoverLetter() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CoverLetterGeneration | null>(null);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!resume || !jobDescription.trim() || !companyName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide resume, job description, and company name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const resumeText = await extractTextFromFile(resume);
      const { data }: { data: any } = await generateCoverLetter(
        resumeText,
        jobDescription,
        companyName
      );
      setResult(data);

      toast({
        title: "Generation Complete",
        description: "Your cover letter has been generated!",
      });
    } catch (error) {
      console.error("Cover letter generation error:", error);
      toast({
        title: "Generation failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to generate cover letter",
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Step 3: Company Name
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Enter the company name..."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      <LoadingModal type="coverLetterGen" open={isLoading} />
      <DashboardLayout
        title="Cover Letter Generator"
        description="Upload your resume, paste the job description, and add company details to generate a personalized cover letter"
        buttonText="Generate Cover Letter"
        isLoading={isLoading}
        onSubmit={handleSubmit}
        result={result ? <CoverLetterResult result={result} /> : null}
      >
        {inputContent}
      </DashboardLayout>
    </>
  );
}
