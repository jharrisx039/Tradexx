import React from 'react';
import { PostList } from './PostList';
import { PostForm } from './PostForm';
import { SocialMetrics } from './SocialMetrics';
import { useMarketingStore } from '../../../store/marketing';
import { Plus, Search, Filter } from 'lucide-react';

export const SocialMedia = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [platformFilter, setPlatformFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const { posts } = useMarketingStore();

  const filteredPosts = posts.filter(post => {
    const matchesPlatform = platformFilter === 'all' || post.platform === platformFilter;
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesPlatform && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SocialMetrics posts={posts} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Platforms</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Create Post
        </button>
      </div>

      <PostList posts={filteredPosts} />

      {showForm && (
        <PostForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};