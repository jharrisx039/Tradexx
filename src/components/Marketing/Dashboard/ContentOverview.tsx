import React from 'react';
import { ContentPiece } from '../../../store/marketing';
import { FileText, Image, Video, Instagram } from 'lucide-react';
import clsx from 'clsx';

interface ContentOverviewProps {
  content: ContentPiece[];
}

const typeIcons = {
  post: FileText,
  story: Instagram,
  reel: Video,
  article: FileText,
  video: Video,
};

const statusColors = {
  idea: 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  review: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  published: 'bg-purple-100 text-purple-800',
};

export const ContentOverview: React.FC<ContentOverviewProps> = ({ content }) => {
  const recentContent = content
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Content</h2>

      <div className="space-y-4">
        {recentContent.map(piece => {
          const Icon = typeIcons[piece.type as keyof typeof typeIcons];

          return (
            <div
              key={piece.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50"
            >
              <div className={clsx(
                'p-2 rounded-lg',
                piece.type === 'post' && 'bg-blue-50 text-blue-600',
                piece.type === 'story' && 'bg-pink-50 text-pink-600',
                piece.type === 'reel' && 'bg-purple-50 text-purple-600',
                piece.type === 'article' && 'bg-green-50 text-green-600',
                piece.type === 'video' && 'bg-red-50 text-red-600'
              )}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {piece.title}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {piece.description}
                    </p>
                  </div>
                  <span className={clsx(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    statusColors[piece.status as keyof typeof statusColors]
                  )}>
                    {piece.status.charAt(0).toUpperCase() + piece.status.slice(1)}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                  <span>{piece.platform.join(', ')}</span>
                  {piece.scheduledFor && (
                    <span>
                      Scheduled: {new Date(piece.scheduledFor).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};