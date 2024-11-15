import React from 'react';
import { X } from 'lucide-react';
import { Document } from '../../store/documents';

interface DocumentPreviewProps {
  document: Document;
  onClose: () => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document, onClose }) => {
  const isImage = document.type.startsWith('image/');
  const isPDF = document.type === 'application/pdf';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">{document.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-4 overflow-auto max-h-[calc(90vh-8rem)]">
          {isImage && (
            <img
              src={document.url}
              alt={document.name}
              className="max-w-full h-auto"
            />
          )}
          {isPDF && (
            <iframe
              src={`${document.url}#view=FitH`}
              className="w-full h-[70vh]"
              title={document.name}
            />
          )}
          {!isImage && !isPDF && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Preview not available for this file type.
                <br />
                Please download the file to view it.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};