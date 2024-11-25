import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle } from "lucide-react";
import { EditableText } from "./editableText";

interface EditableListProps {
  items: string[];
  onChange: (items: string[]) => void;
  isEditing: boolean;
}

export const EditableList: React.FC<EditableListProps> = ({
  items,
  onChange,
  isEditing,
}) => {
  const addItem = () => onChange([...items, ""]);

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <div className="flex-grow">
            <EditableText
              value={item}
              onChange={(value) => updateItem(index, value)}
              isEditing={isEditing}
            />
          </div>
          {isEditing && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
              className="h-8 w-8"
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
          )}
        </li>
      ))}
      {isEditing && (
        <Button variant="outline" onClick={addItem} className="w-full mt-2">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      )}
    </ul>
  );
};
