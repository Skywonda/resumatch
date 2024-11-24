import { useDragDrop } from "@/hooks/use-drag-drop";
import { Upload } from "lucide-react";
import { useRef } from "react";

interface ResumeUploadProps {
  onFileSelect: (file: File) => void;
  fileName?: string;
  fileSize?: number;
}

const validTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const isValidFileType = (file: File) => {
  return validTypes.includes(file.type);
};

function getFileSize(sizeInBytes: number) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (sizeInBytes === 0) return "0 Byte";

  const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
  return Math.round(sizeInBytes / Math.pow(1024, i)) + " " + sizes[i];
}

export function ResumeUpload({
  onFileSelect,
  fileName,
  fileSize,
}: ResumeUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { dragActive, handleDrag, handleDrop, handleChange } = useDragDrop({
    onDrop: onFileSelect,
    validate: isValidFileType,
  });

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-muted hover:bg-muted/5"
        }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleButtonClick}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4">
          <Upload className="h-8 w-8 text-primary" />
        </div>

        {fileName ? (
          <div className="space-y-1">
            <p className="text-sm font-medium">{fileName}</p>
            {fileSize && (
              <p className="text-xs text-muted-foreground">
                {getFileSize(fileSize)}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              PDF, DOCX (max. 5MB)
            </p>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleChange}
      />
    </div>
  );
}
