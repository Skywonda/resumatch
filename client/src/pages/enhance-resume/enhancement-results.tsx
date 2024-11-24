import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BriefcaseIcon, GraduationCap, Award } from "lucide-react";
import type { ProfessionalLevel } from "./professional-levels";

interface EnhancementResultsProps {
  result: string;
  level: ProfessionalLevel;
}

export function EnhancementResults({ result, level }: EnhancementResultsProps) {
  return (
    <Tabs defaultValue="suggestions" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="suggestions" className="flex items-center gap-2">
          <Award className="h-4 w-4" />
          Suggestions
        </TabsTrigger>
        <TabsTrigger value="focus" className="flex items-center gap-2">
          <BriefcaseIcon className="h-4 w-4" />
          Focus Areas
        </TabsTrigger>
        <TabsTrigger value="skills" className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          Skills
        </TabsTrigger>
      </TabsList>

      <TabsContent value="suggestions" className="mt-4">
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap">{result}</div>
        </div>
      </TabsContent>

      <TabsContent value="focus" className="mt-4">
        <div className="prose max-w-none">
          <h3>Key Focus Areas for {level.label}</h3>
          <ul>
            {level.details.focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </TabsContent>

      <TabsContent value="skills" className="mt-4">
        <div className="prose max-w-none">
          <h3>Recommended Skills Emphasis</h3>
          <ul>
            {level.details.skillEmphasis.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </TabsContent>
    </Tabs>
  );
}
