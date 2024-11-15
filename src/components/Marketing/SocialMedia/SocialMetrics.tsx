import React from 'react';
import { Users, Heart, Share2, BarChart2 } from 'lucide-react';
import { SocialPost } from '../../../store/marketing';
import { ProgressBar } from '../../ProgressBar';

interface SocialMetricsProps {
  posts: SocialPost[];
}

export const SocialMetrics: React.FC<SocialMetricsProps> = ({ posts }) => {
  const metrics = React.useMemo(() => {
    const publishedPosts = posts.filter(post => post.status === 'published');
    const totalReach = publishedPosts.reduce((acc, post) => acc + (post.performance?.reach || 0), 0);
    const totalEngagement = publishedPosts.reduce((acc, post) => acc + (post.performance?.engagement || 0), 0);
    const totalShares = publishedPosts.reduce((acc, post) => acc + (post.performance?.shares || 0), 0);

    return {
      reach: totalReach,
      engagement: totalEngagement,
      shares: totalShares,
      engagementRate: totalReach > 0 ? (totalEngagement / totalReach) * 100 : 0,
    };
  }, [posts]);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Reach</p>
            <p className="mt-1 text-2xl font-semibold">
              {metrics.reach.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={75} 
            className="h-2 bg-gray-100"
            barClassName="bg-blue-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            75% increase from last month
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Engagement Rate</p>
            <p className="mt-1 text-2xl font-semibold">
              {metrics.engagementRate.toFixed(1)}%
            </p>
          </div>
          <div className="p-3 bg-red-50 rounded-full">
            <Heart className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={metrics.engagementRate} 
            className="h-2 bg-gray-100"
            barClassName="bg-red-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            Average across all platforms
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Shares</p>
            <p className="mt-1 text-2xl font-semibold">
              {metrics.shares.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <Share2 className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={85} 
            className="h-2 bg-gray-100"
            barClassName="bg-green-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            85% of monthly goal
          </p>
        </div>
      </div>
    </>
  );
};