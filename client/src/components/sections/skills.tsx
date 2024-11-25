import { ResumeData } from "@/types/resume";
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
    <section>
      <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
        SKILLS
      </h2>
      <div className="space-y-4">
        {skillCategories.map(({ key, label }) => (
          <div key={key}>
            <h3 className="font-semibold mb-2">{label}</h3>
            {isEditing ? (
              <EditableList
                items={skills[key]}
                onChange={(newSkills) => onUpdateSkills(key, newSkills)}
                isEditing={true}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills[key].map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-md text-sm text-gray-700"
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
};
