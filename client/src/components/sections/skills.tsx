// components/sections/Skills.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ResumeData } from "../../types/resume";
import { EditableList } from "../editableList";

interface SkillsProps {
  skills: ResumeData["enhancedContent"]["skills"];
  isEditing: boolean;
  onUpdateSkills: (
    category: keyof ResumeData["enhancedContent"]["skills"],
    skills: string[]
  ) => void;
}

export const Skills: React.FC<SkillsProps> = ({
  skills,
  isEditing,
  onUpdateSkills,
}) => {
  const skillCategories = [
    { key: "technical" as const, label: "Technical Skills" },
    { key: "domain" as const, label: "Domain Expertise" },
    { key: "leadership" as const, label: "Leadership Skills" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-5 w-5" />
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skillCategories.map(({ key, label }) => (
          <div key={key}>
            <h4 className="font-semibold mb-2">{label}</h4>
            {isEditing ? (
              <EditableList
                items={skills[key]}
                onChange={(newSkills) => onUpdateSkills(key, newSkills)}
                isEditing={true}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills[key].map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
