// components/sections/Education.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, PlusCircle } from "lucide-react";
import type { ResumeData } from "../../types/resume";
import { EditableText } from "../editableText";
import { EditableList } from "../editableList";

interface EducationProps {
  entries: ResumeData["enhancedContent"]["education"]["entries"];
  isEditing: boolean;
  onUpdateEntry: (
    index: number,
    updates: Partial<ResumeData["enhancedContent"]["education"]["entries"][0]>
  ) => void;
}

export const Education: React.FC<EducationProps> = ({
  entries,
  isEditing,
  onUpdateEntry,
}) => {
  const addEntry = () => {
    onUpdateEntry(entries.length, {
      degree: "New Degree",
      institution: "Institution Name",
      year: null,
      highlights: [],
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Education
        </CardTitle>
        {isEditing && (
          <Button variant="outline" size="sm" onClick={addEntry}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {entries.map((entry, index) => (
          <div
            key={`${entry.institution}-${index}`}
            className="space-y-4 pb-4 border-b last:border-0"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1 flex-grow">
                <EditableText
                  value={entry.degree}
                  onChange={(degree) => onUpdateEntry(index, { degree })}
                  isEditing={isEditing}
                />
                <EditableText
                  value={entry.institution}
                  onChange={(institution) =>
                    onUpdateEntry(index, { institution })
                  }
                  isEditing={isEditing}
                />
              </div>
              {entry.year && (
                <div className="min-w-[100px]">
                  <EditableText
                    value={entry.year}
                    onChange={(year) => onUpdateEntry(index, { year })}
                    isEditing={isEditing}
                  />
                </div>
              )}
            </div>

            {entry.highlights.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Highlights</h4>
                <EditableList
                  items={entry.highlights}
                  onChange={(highlights) =>
                    onUpdateEntry(index, { highlights })
                  }
                  isEditing={isEditing}
                />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
