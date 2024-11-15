import React from 'react';
import { ChevronRight, ChevronDown, Folder, FolderPlus, Trash2, X } from 'lucide-react';
import { useDocumentStore } from '../../store/documents';
import clsx from 'clsx';

interface FolderTreeProps {
  selectedFolder: string | null;
  onSelectFolder: (folderId: string | null) => void;
}

export const FolderTree: React.FC<FolderTreeProps> = ({ selectedFolder, onSelectFolder }) => {
  const { folders, addFolder, deleteFolder } = useDocumentStore();
  const [newFolderName, setNewFolderName] = React.useState('');
  const [isCreating, setIsCreating] = React.useState(false);

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      addFolder({ name: newFolderName.trim() });
      setNewFolderName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">Folders</h3>
        <button
          onClick={() => setIsCreating(true)}
          className="p-1 text-gray-400 hover:text-gray-500"
        >
          <FolderPlus className="h-5 w-5" />
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreateFolder} className="mb-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="p-1 text-gray-400 hover:text-gray-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}

      <div className="space-y-1">
        <button
          onClick={() => onSelectFolder(null)}
          className={clsx(
            'w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm',
            !selectedFolder ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
          )}
        >
          <Folder className="h-4 w-4" />
          All Documents
        </button>
        
        {folders.map((folder) => (
          <div key={folder.id} className="flex items-center group">
            <button
              onClick={() => onSelectFolder(folder.id)}
              className={clsx(
                'flex-1 flex items-center gap-2 px-2 py-1.5 rounded text-sm',
                selectedFolder === folder.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <Folder className="h-4 w-4" />
              {folder.name}
            </button>
            <button
              onClick={() => deleteFolder(folder.id)}
              className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};