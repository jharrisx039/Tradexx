import React from 'react';
import { Search, Filter, Download, Eye, Trash2, FileText, FileImage, FileArchive } from 'lucide-react';
import { Document } from '../../store/documents';
import { DocumentPreview } from './DocumentPreview';
import { useDocumentStore } from '../../store/documents';
import clsx from 'clsx';

interface DocumentListProps {
  documents: Document[];
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return FileImage;
  if (type === 'application/pdf') return FileText;
  return FileArchive;
};

export const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDocument, setSelectedDocument] = React.useState<Document | null>(null);
  const { deleteDocument } = useDocumentStore();

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-md border border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Modified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDocuments.map((doc) => {
                const Icon = getFileIcon(doc.type);
                return (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Icon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm text-gray-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(doc.size / 1024).toFixed(2)} KB
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(doc.modifiedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedDocument(doc)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <a
                          href={doc.url}
                          download
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <Download className="h-5 w-5" />
                        </a>
                        <button
                          onClick={() => deleteDocument(doc.id)}
                          className="text-red-400 hover:text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDocument && (
        <DocumentPreview
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};