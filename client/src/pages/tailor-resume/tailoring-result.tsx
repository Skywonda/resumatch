import { ResumeTemplate } from "@/components/resume-template";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeData } from "@/types/resume";

export interface TailoringResult {
  enhancedContent: ResumeData;
  optimization: {
    keyStrengths: string[];
    impactMetrics: string[];
    uniqueValue: string[];
  };
}

export function TailoringResults({ result }: { result: TailoringResult }) {
  return (
    <Tabs defaultValue="resume" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="resume">Enhanced Resume</TabsTrigger>
        <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
      </TabsList>

      <TabsContent value="resume">
        <ResumeTemplate initialData={result.enhancedContent} />
      </TabsContent>

      <TabsContent value="cover-letter">
        <Card>
          <CardContent className="pt-6">
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap">
                {result.enhancedContent.professionalSummary.content}
              </p>
              <div className="mt-6">
                <h4 className="text-lg font-medium">Key Qualifications</h4>
                <ul className="mt-2">
                  {result.optimization.keyStrengths.map((strength, i) => (
                    <li key={i}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-medium">Achievements</h4>
                <ul className="mt-2">
                  {result.optimization.impactMetrics.map((metric, i) => (
                    <li key={i}>{metric}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
