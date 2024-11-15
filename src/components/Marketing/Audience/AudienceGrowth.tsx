import React from 'react';
import { SocialPost } from '../../../store/marketing';
import { ProgressBar } from '../../ProgressBar';
import { format, parseISO, eachDayOfInterval, eachWeekOfInterval } from 'date-fns';
import clsx from 'clsx';

interface AudienceGrowthProps {
  posts: SocialPost[];
  dateRange: string;
}

export const AudienceGrowth: React.FC<AudienceGrowthProps> = ({ posts, dateRange }) => {
  const [platform, setPlatform] = React.useState<'all' | 'facebook' | 'instagram' | 'twitter' | 'linkedin'>('all');

  const data = React.useMemo(() => {
    const now = new Date();
    const intervals = dateRange === 'month'
      ? eachDayOfInterval({ start: new Date(now.setDate(now.getDate() - 30)), end: now })
      : eachWeekOfInterval({ start: new Date(now.setMonth(now.getMonth() - 3)), end: now });

    return intervals.map(date => {
      const periodPosts = posts.filter(post => {
        if (platform !== 'all' && post.platform !== platform) return false;
        const postDate = parseISO(post.createdAt);
        return format(postDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
      });

      return {
        date,
        reach: periodPosts.reduce((acc, post) => acc + (post.performance?.reach || 0), 0),
        engagement: periodPosts.reduce((acc, post) => acc + (post.performance?.engagement || 0), 0),
      };
    });
  }, [posts, dateRange, platform]);

  const totals = React.useMemo(() => {
    return data.reduce((acc, day) => ({
      reach: acc.reach + day.reach,
      engagement: acc.engagement + day.engagement,
    }), { reach: 0, engagement: 0 });
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Audience Growth</h2>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value as any)}
          className="rounded-lg border border-gray-300 py-1 pl-2 pr-8 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Platforms</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter</option>
          <option value="linkedin">LinkedIn</option>
        </select>
      </div>

      <div className="space-y-3">
        {data.map((point, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">
                {format(point.date, dateRange === 'month' ? 'MMM d' : 'MMM d')}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {point.reach.toLocaleString()}
              </span>
            </div>
            <ProgressBar 
              progress={(point.reach / Math.max(...data.map(d => d.reach))) * 100}
              className="h-2 bg-gray-100"
              barClassName={clsx(
                platform === 'facebook' && 'bg-blue-600',
                platform === 'instagram' && 'bg-pink-600',
                platform === 'twitter' && 'bg-blue-400',
                platform === 'linkedin' && 'bg-blue-700',
                platform === 'all' && 'bg-purple-600'
              )}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Reach</p>
            <p className="text-lg font-medium text-gray-900">
              {totals.reach.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Engagement</p>
            <p className="text-lg font-medium text-gray-900">
              {totals.engagement.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};