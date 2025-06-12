"use client";

import { useState, useRef } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Upload, X, File } from "lucide-react";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  onFileSelect: (files: File[]) => void;
  value?: string[];
  placeholder?: string;
}

export function FileUpload({
  accept,
  multiple = false,
  onFileSelect,
  value = [],
  placeholder = "Sélectionner des fichiers",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    onFileSelect(fileArray);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    // Note: This is a simplified version, in a real implementation
    // you'd need to track the actual File objects
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          Glissez-déposez vos fichiers ici ou
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          {placeholder}
        </Button>
        <Input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {value.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Fichiers sélectionnés :</p>
          {value.map((fileName, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <div className="flex items-center space-x-2">
                <File className="h-4 w-4" />
                <span className="text-sm">{fileName}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
