import React from 'react';
import { format, parseISO } from 'date-fns';
import { FileText, Image, Video, Instagram, MoreHorizontal } from 'lucide-react';
import { ContentPiece } from '../../../store/marketing';
import clsx from 'clsx';

interface ContentListProps {
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

export const ContentList: React.FC<ContentListProps> = ({ content }) => {
  const sortedContent = [...content].sort((a, b) => {
    if (!a.scheduledFor && !b.scheduledFor) return 0;
    if (!a.scheduledFor) return 1;
    if (!b.scheduledFor) return -1;
    return new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime();
  });

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Content
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platform
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Schedule
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedContent.map(piece => {
              const Icon = typeIcons[piece.type as keyof typeof typeIcons];
              
              return (
                <tr key={piece.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={clsx(
                        'p-2 rounded-lg mr-3',
                        piece.type === 'post' && 'bg-blue-50 text-blue-600',
                        piece.type === 'story' && 'bg-pink-50 text-pink-600',
                        piece.type === 'reel' && 'bg-purple-50 text-purple-600',
                        piece.type === 'article' && 'bg-green-50 text-green-600',
                        piece.type === 'video' && 'bg-red-50 text-red-600'
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {piece.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {piece.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {piece.type.charAt(0).toUpperCase() + piece.type.slice(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {piece.platform.map(platform => (
                        <span
                          key={platform}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      statusColors[piece.status as keyof typeof statusColors]
                    )}>
                      {piece.status.charAt(0).toUpperCase() + piece.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {piece.scheduledFor ? (
                      format(parseISO(piece.scheduledFor), 'MMM d, yyyy h:mm a')
                    ) : (
                      'Not scheduled'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};