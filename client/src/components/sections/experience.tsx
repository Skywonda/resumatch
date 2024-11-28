import { EditableText } from "../editableText";
import { ResumeData } from "@/types/resume";
import { SectionHeader } from "./section-header";

interface ExperienceProps {
  positions: ResumeData["experience"]["positions"];
  isEditing: boolean;
  onUpdatePosition: (
    index: number,
    updates: Partial<ResumeData["experience"]["positions"][0]>
  ) => void;
}

export const Experience: React.FC<ExperienceProps> = ({
  positions,
  isEditing,
  onUpdatePosition,
}) => (
  <section>
    <SectionHeader>EXPERIENCE</SectionHeader>
    <div className="space-y-6">
      {positions.map((position, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <EditableText
                value={position.role}
                onChange={(role) => onUpdatePosition(index, { role })}
                isEditing={isEditing}
                className="font-bold text-gray-900"
              />
              <EditableText
                value={position.company}
                onChange={(company) => onUpdatePosition(index, { company })}
                isEditing={isEditing}
                className="text-blue-500"
              />
            </div>
            <EditableText
              value={position.duration}
              onChange={(duration) => onUpdatePosition(index, { duration })}
              isEditing={isEditing}
              className="text-gray-600"
            />
          </div>
          <ul className="list-disc ml-4 space-y-1.5 text-gray-700">
            {position.achievements.map((achievement, i) => (
              <li key={i}>
                <EditableText
                  value={achievement}
                  onChange={(newValue) => {
                    const newAchievements = [...position.achievements];
                    newAchievements[i] = newValue;
                    onUpdatePosition(index, { achievements: newAchievements });
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
