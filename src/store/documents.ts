import { create } from 'zustand';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  folderId: string | null;
  createdAt: string;
  modifiedAt: string;
}

export interface Folder {
  id: string;
  name: string;
  createdAt: string;
}

interface DocumentStore {
  documents: Document[];
  folders: Folder[];
  uploadDocument: (file: File, folderId: string | null, onProgress: (progress: number) => void) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  addFolder: (folder: Omit<Folder, 'id' | 'createdAt'>) => void;
  deleteFolder: (id: string) => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  documents: [],
  folders: [],
  uploadDocument: async (file, folderId, onProgress) => {
    const id = crypto.randomUUID();
    const key = `documents/${id}/${file.name}`;

    const command = new PutObjectCommand({
      Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: file.type,
    });

    try {
      await s3Client.send(command);
      
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

      set((state) => ({
        documents: [
          ...state.documents,
          {
            id,
            name: file.name,
            type: file.type,
            size: file.size,
            url,
            folderId,
            createdAt: new Date().toISOString(),
            modifiedAt: new Date().toISOString(),
          },
        ],
      }));
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  },
  deleteDocument: async (id) => {
    const document = set.getState().documents.find((doc) => doc.id === id);
    if (!document) return;

    const command = new DeleteObjectCommand({
      Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
      Key: `documents/${id}/${document.name}`,
    });

    try {
      await s3Client.send(command);
      set((state) => ({
        documents: state.documents.filter((doc) => doc.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  },
  addFolder: (folder) =>
    set((state) => ({
      folders: [
        ...state.folders,
        {
          ...folder,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  deleteFolder: (id) =>
    set((state) => ({
      folders: state.folders.filter((folder) => folder.id !== id),
      documents: state.documents.map((doc) =>
        doc.folderId === id ? { ...doc, folderId: null } : doc
      ),
    })),
}));