import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { EditableText } from "../editableText";
import { ResumeData } from "@/types/resume";

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
    <section>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4 flex-grow">
          EDUCATION
        </h2>
        {isEditing && (
          <Button variant="ghost" size="sm" onClick={addEntry}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div key={`${entry.institution}-${index}`}>
            <div className="flex justify-between">
              <div>
                <EditableText
                  value={entry.degree}
                  onChange={(degree) => onUpdateEntry(index, { degree })}
                  isEditing={isEditing}
                  className="font-bold text-gray-800"
                />
                <EditableText
                  value={entry.institution}
                  onChange={(institution) =>
                    onUpdateEntry(index, { institution })
                  }
                  isEditing={isEditing}
                  className="text-blue-600"
                />
              </div>
              {entry.year && (
                <EditableText
                  value={entry.year}
                  onChange={(year) => onUpdateEntry(index, { year })}
                  isEditing={isEditing}
                  className="text-gray-600 text-sm"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
