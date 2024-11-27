import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  BriefcaseIcon,
  GraduationCap,
  Award,
  Target,
  Star,
  FileText,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ResumeTemplate } from "@/components/resume-template";
import { ResumeData } from "@/types/resume";

interface ResumeEnhancementResult {
  enhancedContent: ResumeData;
  suggestedSkills?: {
    technical?: string[];
    domain?: string[];
    leadership?: string[];
  };
}

interface EnhancementResultsProps {
  result: ResumeEnhancementResult;
}

export function EnhancementResults({ result }: EnhancementResultsProps) {
  const hasSuggestedSkills =
    result.suggestedSkills &&
    (result.suggestedSkills.technical?.length ||
      result.suggestedSkills.domain?.length ||
      result.suggestedSkills.leadership?.length);

  return (
    <Tabs defaultValue="analysis" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="analysis" className="flex items-center gap-2">
          <Target className="h-4 w-4" />
          Analysis
        </TabsTrigger>
        <TabsTrigger value="resume" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Resume
        </TabsTrigger>
        {hasSuggestedSkills && (
          <TabsTrigger value="suggested" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Suggested Skills
          </TabsTrigger>
        )}
      </TabsList>

      {/* Analysis Tab */}
      <TabsContent value="analysis" className="mt-4">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <BriefcaseIcon className="h-4 w-4" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger
              value="optimization"
              className="flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              Optimization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-4 space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Professional Summary
                </h3>
                <p className="text-muted-foreground mb-4">
                  {result.enhancedContent.professionalSummary.content}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.enhancedContent.professionalSummary.highlights.map(
                    (highlight) => (
                      <div key={highlight} className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span>{highlight}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ... other analysis tab contents remain the same ... */}
        </Tabs>
      </TabsContent>

      {/* Resume Tab */}
      <TabsContent value="resume" className="mt-4">
        <ResumeTemplate initialData={result.enhancedContent} />
      </TabsContent>

      {/* Suggested Skills Tab */}
      {hasSuggestedSkills && (
        <TabsContent value="suggested" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.suggestedSkills?.technical &&
                  result.suggestedSkills.technical.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Suggested Technical Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.suggestedSkills.technical.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                {result.suggestedSkills?.domain &&
                  result.suggestedSkills.domain.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Suggested Domain Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.suggestedSkills.domain.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                {result.suggestedSkills?.leadership &&
                  result.suggestedSkills.leadership.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Suggested Leadership Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.suggestedSkills.leadership.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      )}
    </Tabs>
  );
}
