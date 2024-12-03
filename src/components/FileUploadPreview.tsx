import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import { MAX_FILE_SIZE } from '../config/constants';

interface FileUploadPreviewProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  accept?: Record<string, string[]>;
  previewType?: 'image' | 'document' | 'both';
}

export default function FileUploadPreview({
  files,
  onFilesChange,
  maxFiles = 5,
  accept = {
    'image/*': ['.jpeg', '.jpg', '.png'],
    'application/pdf': ['.pdf']
  },
  previewType = 'both'
}: FileUploadPreviewProps) {
  const { t } = useTranslation();

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    maxFiles,
    maxSize: MAX_FILE_SIZE,
    onDrop: (acceptedFiles) => {
      onFilesChange([...files, ...acceptedFiles]);
    },
    onDropRejected: (rejectedFiles) => {
      rejectedFiles.forEach(rejection => {
        if (rejection.errors[0]?.code === 'file-too-large') {
          alert(t('errors.fileTooLarge', { maxSize: MAX_FILE_SIZE / (1024 * 1024) }));
        }
      });
    }
  });

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onFilesChange(newFiles);
  };

  const isImage = (file: File) => file.type.startsWith('image/');
  const isPDF = (file: File) => file.type === 'application/pdf';

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer"
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          اسحب وأفلت الملفات هنا، أو انقر للاختيار
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {previewType === 'image' ? 'JPEG, PNG' :
           previewType === 'document' ? 'PDF' :
           'PDF, JPEG, PNG'} (الحد الأقصى {MAX_FILE_SIZE / (1024 * 1024)}MB)
        </p>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative group border rounded-lg p-2 hover:bg-gray-50"
            >
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 p-1 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>

              {isImage(file) && previewType !== 'document' ? (
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                  {isPDF(file) ? (
                    <FileText className="h-12 w-12 text-gray-400" />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  )}
                </div>
              )}

              <p className="mt-2 text-xs text-gray-500 truncate text-center">
                {file.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}