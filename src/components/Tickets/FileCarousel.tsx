import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import clsx from 'clsx';

interface File {
  id: string;
  name: string;
  url: string;
  type: string;
}

interface FileCarouselProps {
  files: File[];
}

export const FileCarousel: React.FC<FileCarouselProps> = ({ files }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showPreview, setShowPreview] = React.useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? files.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === files.length - 1 ? 0 : prev + 1));
  };

  const currentFile = files[currentIndex];
  const isImage = currentFile.type.startsWith('image/');
  const isPDF = currentFile.type === 'application/pdf';

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
          {isImage ? (
            <img
              src={currentFile.url}
              alt={currentFile.name}
              className="w-full h-full object-contain cursor-pointer"
              onClick={() => setShowPreview(true)}
            />
          ) : isPDF ? (
            <iframe
              src={`${currentFile.url}#view=FitH`}
              className="w-full h-full"
              title={currentFile.name}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Preview not available</p>
            </div>
          )}
        </div>

        <button
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white shadow-lg hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white shadow-lg hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {files.map((file, index) => (
          <button
            key={file.id}
            onClick={() => setCurrentIndex(index)}
            className={clsx(
              'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2',
              currentIndex === index ? 'border-blue-500' : 'border-transparent'
            )}
          >
            {file.type.startsWith('image/') ? (
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                {file.name.split('.').pop()?.toUpperCase()}
              </div>
            )}
          </button>
        ))}
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={currentFile.url}
              alt={currentFile.name}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};