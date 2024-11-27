import { ResumeData } from "@/types/resume";
import { EditableList } from "../editableList";
import { SectionHeader } from "./section-header";

interface SkillsProps {
  skills: ResumeData["skills"];
  isEditing: boolean;
  onUpdateSkills: (
    category: keyof ResumeData["skills"],
    skills: string[]
  ) => void;
}

export const Skills: React.FC<SkillsProps> = ({
  skills,
  isEditing,
  onUpdateSkills,
}) => (
  <section>
    <SectionHeader>SKILLS</SectionHeader>
    <div className="flex flex-col gap-4">
      {Object.entries(skills).map(([category, skillList]) => (
        <div key={category}>
          <h3 className="font-semibold text-gray-800 mb-2">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h3>
          {isEditing ? (
            <EditableList
              items={skillList}
              onChange={(newSkills) =>
                onUpdateSkills(category as keyof typeof skills, newSkills)
              }
              isEditing={true}
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {skillList.map((skill, index) => (
                <span
                  key={index}
                  className="text-gray-700 border-b border-gray-300 mr-4"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </section>
);
