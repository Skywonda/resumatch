// components/EditableText.tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  multiline?: boolean;
  className?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  isEditing,
  multiline = false,
  className,
}) => {
  if (!isEditing) {
    return <div className="whitespace-pre-wrap">{value}</div>;
  }

  return multiline ? (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`min-h-[100px] ${className}`}
    />
  ) : (
    <Input value={value} onChange={(e) => onChange(e.target.value)} />
  );
};
