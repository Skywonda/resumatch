import { EditableList } from "../editableList";
import { EditableText } from "../editableText";

interface ProfessionalSummaryProps {
  content: string;
  highlights: string[];
  isEditing: boolean;
  onUpdateContent: (content: string) => void;
  onUpdateHighlights: (highlights: string[]) => void;
}

export const ProfessionalSummary: React.FC<ProfessionalSummaryProps> = ({
  content,
  highlights,
  isEditing,
  onUpdateContent,
  onUpdateHighlights,
}) => (
  <section>
    <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
      SUMMARY
    </h2>
    <div className="space-y-4">
      <EditableText
        value={content}
        onChange={onUpdateContent}
        isEditing={isEditing}
        multiline
      />
      <div>
        <h3 className="font-semibold mt-3 mb-2">Key Highlights</h3>
        <EditableList
          items={highlights}
          onChange={onUpdateHighlights}
          isEditing={isEditing}
        />
      </div>
    </div>
  </section>
);
