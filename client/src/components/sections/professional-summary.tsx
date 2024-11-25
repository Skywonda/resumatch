import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { EditableText } from "../editableText";
import { EditableList } from "../editableList";

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
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Award className="h-5 w-5" />
        Professional Summary
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <EditableText
        value={content}
        onChange={onUpdateContent}
        isEditing={isEditing}
        multiline
      />
      <div>
        <h4 className="font-semibold mb-2">Key Highlights</h4>
        <EditableList
          items={highlights}
          onChange={onUpdateHighlights}
          isEditing={isEditing}
        />
      </div>
    </CardContent>
  </Card>
);
