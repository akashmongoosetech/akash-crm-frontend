import { useState, useRef, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onChange],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const handleRemove = useCallback(() => {
    onChange(undefined);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [onChange]);

  return (
    <div className={cn("space-y-2", className)}>
      {value ? (
        <div className="relative inline-block">
          <Avatar className="h-24 w-24 border-2 border-border">
            <AvatarImage src={value} alt="Profile" className="object-cover" />
            <AvatarFallback className="text-lg">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-dashed cursor-pointer transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50",
          )}
        >
          <Upload className="w-6 h-6 text-muted-foreground mb-1" />
          <span className="text-xs text-muted-foreground">Upload</span>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
