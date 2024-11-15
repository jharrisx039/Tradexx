import React from 'react';
import { format, parseISO } from 'date-fns';
import { Facebook, Instagram, Twitter, Linkedin, MoreHorizontal, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { SocialPost } from '../../../store/marketing';
import clsx from 'clsx';

interface PostListProps {
  posts: SocialPost[];
}

const platformIcons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
};

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  scheduled: 'bg-blue-100 text-blue-800',
  published: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
};

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const sortedPosts = [...posts].sort((a, b) => {
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
                Platform
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Schedule
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPosts.map(post => {
              const Icon = platformIcons[post.platform as keyof typeof platformIcons];
              const StatusIcon = post.status === 'published' ? CheckCircle :
                               post.status === 'failed' ? AlertTriangle : Clock;
              
              return (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {post.media && post.media.length > 0 && (
                        <div className="h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden mr-4">
                          <img
                            src={post.media[0]}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 truncate">
                          {post.content}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
                      statusColors[post.status]
                    )}>
                      <StatusIcon className="h-4 w-4" />
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.scheduledFor ? (
                      format(parseISO(post.scheduledFor), 'MMM d, yyyy h:mm a')
                    ) : (
                      'Not scheduled'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {post.performance ? (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Reach</span>
                          <span className="font-medium text-gray-900">
                            {post.performance.reach.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Engagement</span>
                          <span className="font-medium text-gray-900">
                            {post.performance.engagement.toLocaleString()}%
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No data</span>
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