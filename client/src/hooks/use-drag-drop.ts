import { useState, useCallback } from "react";

interface UseDragDropProps {
  onDrop: (file: File) => void;
  validate?: (file: File) => boolean;
}

export function useDragDrop({ onDrop, validate }: UseDragDropProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const files = Array.from(e.dataTransfer.files);
      const file = files[0];

      if (file && (!validate || validate(file))) {
        onDrop(file);
      }
    },
    [onDrop, validate]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (!validate || validate(file)) {
          onDrop(file);
        }
      }
    },
    [onDrop, validate]
  );

  return {
    dragActive,
    handleDrag,
    handleDrop,
    handleChange,
  };
}
