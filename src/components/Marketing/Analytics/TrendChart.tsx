import React from 'react';
import { SocialPost, Campaign } from '../../../store/marketing';
import { ProgressBar } from '../../ProgressBar';
import { format, parseISO, eachDayOfInterval, eachWeekOfInterval } from 'date-fns';
import clsx from 'clsx';

interface TrendChartProps {
  posts: SocialPost[];
  campaigns: Campaign[];
  dateRange: 'week' | 'month' | 'quarter' | 'year';
}

export const TrendChart: React.FC<TrendChartProps> = ({
  posts,
  campaigns,
  dateRange,
}) => {
  const [metric, setMetric] = React.useState<'reach' | 'engagement' | 'conversions'>('reach');

  const data = React.useMemo(() => {
    const now = new Date();
    const intervals = dateRange === 'week'
      ? eachDayOfInterval({ start: new Date(now.setDate(now.getDate() - 7)), end: now })
      : eachWeekOfInterval({ start: new Date(now.setMonth(now.getMonth() - 3)), end: now });

    return intervals.map(date => {
      const periodPosts = posts.filter(post => {
        const postDate = parseISO(post.createdAt);
        return format(postDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
      });

      const periodCampaigns = campaigns.filter(campaign => {
        const campaignDate = parseISO(campaign.startDate);
        return format(campaignDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
      });

      return {
        date,
        reach: periodPosts.reduce((acc, post) => acc + (post.performance?.reach || 0), 0),
        engagement: periodPosts.reduce((acc, post) => acc + (post.performance?.engagement || 0), 0),
        conversions: periodCampaigns.reduce((acc, campaign) => acc + campaign.metrics.conversions, 0),
      };
    });
  }, [posts, campaigns, dateRange]);

  const maxValue = Math.max(...data.map(d => d[metric]));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Performance Trend</h2>
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value as any)}
          className="rounded-lg border border-gray-300 py-1 pl-2 pr-8 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="reach">Reach</option>
          <option value="engagement">Engagement</option>
          <option value="conversions">Conversions</option>
        </select>
      </div>

      <div className="space-y-3">
        {data.map((point, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">
                {format(point.date, dateRange === 'week' ? 'EEE' : 'MMM d')}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {point[metric].toLocaleString()}
              </span>
            </div>
            <ProgressBar 
              progress={(point[metric] / maxValue) * 100}
              className="h-2 bg-gray-100"
              barClassName={clsx(
                metric === 'reach' && 'bg-blue-600',
                metric === 'engagement' && 'bg-green-600',
                metric === 'conversions' && 'bg-purple-600'
              )}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Total {metric}</span>
          <span className="font-medium text-gray-900">
            {data.reduce((acc, point) => acc + point[metric], 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};