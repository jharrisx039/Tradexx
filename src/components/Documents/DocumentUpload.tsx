import React from 'react';
import { Upload, X } from 'lucide-react';
import { useDocumentStore } from '../../store/documents';
import clsx from 'clsx';

interface DocumentUploadProps {
  selectedFolder: string | null;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ selectedFolder }) => {
  const { uploadDocument } = useDocumentStore();
  const [isDragging, setIsDragging] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState<number | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    for (const file of files) {
      try {
        setUploadProgress(0);
        await uploadDocument(file, selectedFolder, (progress) => {
          setUploadProgress(progress);
        });
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
    setUploadProgress(null);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    for (const file of files) {
      try {
        setUploadProgress(0);
        await uploadDocument(file, selectedFolder, (progress) => {
          setUploadProgress(progress);
        });
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
    setUploadProgress(null);
  };

  return (
    <div className="mt-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={clsx(
          'border-2 border-dashed rounded-lg p-6 text-center',
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        )}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple
          onChange={handleFileSelect}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-flex flex-col items-center"
        >
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-600">
            Drop files here or click to upload
          </span>
        </label>
      </div>

      {uploadProgress !== null && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600">Uploading...</span>
            <span className="text-sm text-gray-600">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 rounded-full h-2 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};