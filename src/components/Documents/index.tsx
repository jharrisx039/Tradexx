import React from 'react';
import { DocumentList } from './DocumentList';
import { DocumentUpload } from './DocumentUpload';
import { FolderTree } from './FolderTree';
import { useDocumentStore } from '../../store/documents';

export const Documents = () => {
  const [selectedFolder, setSelectedFolder] = React.useState<string | null>(null);
  const { documents } = useDocumentStore();

  const filteredDocuments = React.useMemo(() => {
    if (!selectedFolder) return documents;
    return documents.filter(doc => doc.folderId === selectedFolder);
  }, [documents, selectedFolder]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
        <p className="mt-2 text-gray-600">Manage and organize your files</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <FolderTree
            selectedFolder={selectedFolder}
            onSelectFolder={setSelectedFolder}
          />
          <DocumentUpload selectedFolder={selectedFolder} />
        </div>

        <div className="col-span-9">
          <DocumentList documents={filteredDocuments} />
        </div>
      </div>
    </div>
  );
};