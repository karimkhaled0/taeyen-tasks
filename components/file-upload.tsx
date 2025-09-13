"use client";

import { CheckIcon, FileIcon, XIcon } from "lucide-react";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  title: string;
  uploadedFile: UploadedFile | null;
  setUploadedFile: React.Dispatch<React.SetStateAction<UploadedFile | null>>;
};

export interface UploadedFile {
  file: File;
  preview?: string;
  id: string;
}

const FileUploadComponent = ({
  title,
  uploadedFile,
  setUploadedFile,
}: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]; // Take only the first file
        const id = Math.random().toString(36).substr(2, 9);
        const newUploadedFile: UploadedFile = {
          file,
          id,
        };

        // Create preview for images
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setUploadedFile({
              ...newUploadedFile,
              preview: e.target?.result as string,
            });
          };
          reader.readAsDataURL(file);
        } else {
          setUploadedFile(newUploadedFile);
        }
      }
    },
    [setUploadedFile]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const removeFile = () => {
    setUploadedFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="text-sm font-bold text-[#162F61]">{title}</p>

      {/* File Preview - Show when file is uploaded */}
      {uploadedFile ? (
        <FilePreview
          uploadedFile={uploadedFile}
          onRemove={removeFile}
          formatFileSize={formatFileSize}
        />
      ) : (
        /* Dropzone - Show when no file is uploaded */
        <div
          {...getRootProps()}
          className={`border border-dashed rounded-[8.5px] transition-colors cursor-pointer ${
            isDragActive && !isDragReject
              ? "border-[#3592E6] bg-blue-50"
              : isDragReject
              ? "border-red-500 bg-red-50"
              : "border-[#6B7177]"
          } flex flex-col items-center justify-center gap-3 p-3`}
        >
          <input {...getInputProps()} />

          <Image src="/up.svg" alt="file" width={26} height={26} />

          <button className="border-[0.66px] text-[#3592E6] font-medium border-[#3592E6] rounded-[3.95px] text-xs py-1.5 px-4 hover:bg-blue-50 transition-colors">
            Add Files
          </button>

          <p className="text-[10px] text-[#797979] font-semibold">
            {isDragActive
              ? isDragReject
                ? "File type not supported"
                : "Drop files here"
              : "Or drop files to upload"}
          </p>
        </div>
      )}

      {/* Error Messages */}
      {fileRejections.length > 0 && (
        <div className="text-xs text-red-500">
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name}>
              {file.name}: {errors.map((e) => e.message).join(", ")}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-1">
        <CheckIcon className="w-4 h-4 text-[#00D072]" />
        <p className="text-[10px] text-[#797979] font-semibold">
          PDF, PNG, JPG — up to 10MB
        </p>
      </div>
    </div>
  );
};

interface FilePreviewProps {
  uploadedFile: UploadedFile;
  onRemove: () => void;
  formatFileSize: (bytes: number) => string;
}

const FilePreview = ({
  uploadedFile,
  onRemove,
  formatFileSize,
}: FilePreviewProps) => {
  const { file, preview } = uploadedFile;
  const isPDF = file.type === "application/pdf";
  const isImage = file.type.startsWith("image/");

  // Get filename without extension
  const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");

  return (
    <div className="border border-[#3592E6] rounded-lg overflow-hidden">
      {/* Top section - Image/File Preview */}
      <div className="relative h-[90px] bg-gray-50">
        {isImage && preview ? (
          <Image src={preview} alt={file.name} fill className="object-cover" />
        ) : isPDF ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
              <FileIcon className="w-8 h-8 text-red-600" />
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileIcon className="w-8 h-8 text-gray-600" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom section - Blue footer with filename */}
      <div className="bg-[#3592E6] px-2 py-2">
        <p className="text-white text-[10px] font-semibold truncate">
          {fileNameWithoutExt}
        </p>
      </div>
    </div>
  );
};

export default FileUploadComponent;
