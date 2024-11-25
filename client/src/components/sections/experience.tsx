import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { EditableText } from "../editableText";
import { ResumeData } from "@/types/resume";

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
    <section>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4 flex-grow">
          PROFESSIONAL EXPERIENCE
        </h2>
        {isEditing && (
          <Button variant="ghost" size="sm" onClick={addPosition}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Position
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {positions.map((position, index) => (
          <div key={`${position.company}-${index}`} className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <EditableText
                  value={position.role}
                  onChange={(role) => onUpdatePosition(index, { role })}
                  isEditing={isEditing}
                  className="font-bold text-gray-800"
                />
                <EditableText
                  value={position.company}
                  onChange={(company) => onUpdatePosition(index, { company })}
                  isEditing={isEditing}
                  className="text-blue-600"
                />
              </div>
              <EditableText
                value={position.duration}
                onChange={(duration) => onUpdatePosition(index, { duration })}
                isEditing={isEditing}
                className="text-gray-600 text-sm"
              />
            </div>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              {position.achievements.map((achievement, i) => (
                <li key={i}>
                  <EditableText
                    value={achievement}
                    onChange={(newValue) => {
                      const newAchievements = [...position.achievements];
                      newAchievements[i] = newValue;
                      onUpdatePosition(index, {
                        achievements: newAchievements,
                      });
                    }}
                    isEditing={isEditing}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
