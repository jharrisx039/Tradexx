import React from 'react';
import { X, Upload, Paperclip } from 'lucide-react';
import clsx from 'clsx';

interface TicketCreationModalProps {
  onClose: () => void;
  onSubmit: (notes: string, files: File[]) => void;
  selectedMessageCount: number;
}

export const TicketCreationModal: React.FC<TicketCreationModalProps> = ({
  onClose,
  onSubmit,
  selectedMessageCount
}) => {
  const [notes, setNotes] = React.useState('');
  const [files, setFiles] = React.useState<File[]>([]);
  const dropZoneRef = React.useRef<HTMLDivElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedFiles = Array.from(e.clipboardData.files);
    if (pastedFiles.length > 0) {
      setFiles(prev => [...prev, ...pastedFiles]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Create Ticket</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <p className="text-sm text-gray-600">
              Creating ticket from {selectedMessageCount} selected messages
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={4}
              onPaste={handlePaste}
            />
          </div>

          <div
            ref={dropZoneRef}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className={clsx(
              'border-2 border-dashed rounded-lg p-4',
              'transition-colors duration-200',
              'focus-within:border-blue-500 hover:border-blue-500'
            )}
          >
            <div className="text-center">
              <Paperclip className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-1 text-sm text-gray-600">
                Drop files here, paste from clipboard, or{' '}
                <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                  browse
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileInput}
                  />
                </label>
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded p-2"
                  >
                    <span className="text-sm text-gray-600">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(notes, files)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
};