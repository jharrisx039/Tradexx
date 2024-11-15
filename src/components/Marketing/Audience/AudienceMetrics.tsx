import React from 'react';
import { Users, Target, Share2 } from 'lucide-react';
import { SocialPost, Campaign } from '../../../store/marketing';
import { ProgressBar } from '../../ProgressBar';
import {
  startOfMonth,
  startOfQuarter,
  startOfYear,
  endOfMonth,
  endOfQuarter,
  endOfYear,
  parseISO,
} from 'date-fns';

interface AudienceMetricsProps {
  posts: SocialPost[];
  campaigns: Campaign[];
  dateRange: 'month' | 'quarter' | 'year';
}

export const AudienceMetrics: React.FC<AudienceMetricsProps> = ({
  posts,
  campaigns,
  dateRange,
}) => {
  const getDateRange = () => {
    const now = new Date();
    switch (dateRange) {
      case 'month':
        return { start: startOfMonth(now), end: endOfMonth(now) };
      case 'quarter':
        return { start: startOfQuarter(now), end: endOfQuarter(now) };
      case 'year':
        return { start: startOfYear(now), end: endOfYear(now) };
    }
  };

  const metrics = React.useMemo(() => {
    const { start, end } = getDateRange();
    
    const periodPosts = posts.filter(post => {
      const date = parseISO(post.createdAt);
      return date >= start && date <= end;
    });

    const totalReach = periodPosts.reduce((acc, post) => acc + (post.performance?.reach || 0), 0);
    const totalEngagement = periodPosts.reduce((acc, post) => acc + (post.performance?.engagement || 0), 0);
    const totalShares = periodPosts.reduce((acc, post) => acc + (post.performance?.shares || 0), 0);

    return {
      reach: totalReach,
      engagement: totalEngagement,
      shares: totalShares,
      engagementRate: totalReach > 0 ? (totalEngagement / totalReach) * 100 : 0,
    };
  }, [posts, campaigns, dateRange]);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Audience</p>
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
            75% increase from previous {dateRange}
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
          <div className="p-3 bg-green-50 rounded-full">
            <Target className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={metrics.engagementRate} 
            className="h-2 bg-gray-100"
            barClassName="bg-green-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            {metrics.engagement.toLocaleString()} total engagements
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Virality Rate</p>
            <p className="mt-1 text-2xl font-semibold">
              {((metrics.shares / metrics.reach) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-full">
            <Share2 className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={(metrics.shares / metrics.reach) * 100} 
            className="h-2 bg-gray-100"
            barClassName="bg-purple-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            {metrics.shares.toLocaleString()} total shares
          </p>
        </div>
      </div>
    </>
  );
};