// components/sections/Experience.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, PlusCircle } from "lucide-react";
import type { ResumeData } from "../../types/resume";
import { EditableText } from "../editableText";
import { EditableList } from "../editableList";

interface ExperienceProps {
  positions: ResumeData["enhancedContent"]["experience"]["positions"];
  isEditing: boolean;
  onUpdatePosition: (
    index: number,
    updates: Partial<
      ResumeData["enhancedContent"]["experience"]["positions"][0]
    >
  ) => void;
}

export const Experience: React.FC<ExperienceProps> = ({
  positions,
  isEditing,
  onUpdatePosition,
}) => {
  const addPosition = () => {
    onUpdatePosition(positions.length, {
      role: "New Position",
      company: "Company Name",
      duration: "Present",
      achievements: [""],
      impactMetrics: [""],
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Professional Experience
        </CardTitle>
        {isEditing && (
          <Button variant="outline" size="sm" onClick={addPosition}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Position
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {positions.map((position, index) => (
          <div
            key={`${position.company}-${index}`}
            className="space-y-4 pb-4 border-b last:border-0"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1 flex-grow">
                <EditableText
                  value={position.role}
                  onChange={(role) => onUpdatePosition(index, { role })}
                  isEditing={isEditing}
                />
                <EditableText
                  value={position.company}
                  onChange={(company) => onUpdatePosition(index, { company })}
                  isEditing={isEditing}
                />
              </div>
              <div className="min-w-[120px]">
                <EditableText
                  value={position.duration}
                  onChange={(duration) => onUpdatePosition(index, { duration })}
                  isEditing={isEditing}
                />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Achievements</h4>
              <EditableList
                items={position.achievements}
                onChange={(achievements) =>
                  onUpdatePosition(index, { achievements })
                }
                isEditing={isEditing}
              />
            </div>

            <div>
              <h4 className="font-semibold mb-2">Impact Metrics</h4>
              <EditableList
                items={position.impactMetrics}
                onChange={(impactMetrics) =>
                  onUpdatePosition(index, { impactMetrics })
                }
                isEditing={isEditing}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
