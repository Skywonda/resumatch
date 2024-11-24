import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PROFESSIONAL_LEVELS,
  ProfessionalLevelId,
} from "./professional-levels";

interface ProfessionalSelectProps {
  value: ProfessionalLevelId | undefined;
  onChange: (value: ProfessionalLevelId) => void;
}

export function ProfessionalSelect({
  value,
  onChange,
}: ProfessionalSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select your professional level" />
      </SelectTrigger>
      <SelectContent>
        {PROFESSIONAL_LEVELS.map((level) => (
          <SelectItem key={level.id} value={level.id}>
            <div className="flex flex-col">
              <span>{level.label}</span>
              <span className="text-xs text-muted-foreground">
                {level.description}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
