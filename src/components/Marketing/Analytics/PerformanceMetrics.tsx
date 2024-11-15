import React from 'react';
import { BarChart2, TrendingUp, Users } from 'lucide-react';
import { SocialPost, Campaign } from '../../../store/marketing';
import { ProgressBar } from '../../ProgressBar';
import {
  startOfWeek,
  startOfMonth,
  startOfQuarter,
  startOfYear,
  endOfWeek,
  endOfMonth,
  endOfQuarter,
  endOfYear,
  parseISO,
} from 'date-fns';

interface PerformanceMetricsProps {
  posts: SocialPost[];
  campaigns: Campaign[];
  dateRange: 'week' | 'month' | 'quarter' | 'year';
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  posts,
  campaigns,
  dateRange,
}) => {
  const getDateRange = () => {
    const now = new Date();
    switch (dateRange) {
      case 'week':
        return { start: startOfWeek(now), end: endOfWeek(now) };
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

    const periodCampaigns = campaigns.filter(campaign => {
      const date = parseISO(campaign.startDate);
      return date >= start && date <= end;
    });

    const totalReach = periodPosts.reduce((acc, post) => acc + (post.performance?.reach || 0), 0);
    const totalEngagement = periodPosts.reduce((acc, post) => acc + (post.performance?.engagement || 0), 0);
    const totalConversions = periodCampaigns.reduce((acc, campaign) => acc + campaign.metrics.conversions, 0);
    const totalSpent = periodCampaigns.reduce((acc, campaign) => acc + campaign.spent, 0);
    const totalRevenue = totalConversions * 50; // Assuming $50 per conversion

    return {
      reach: totalReach,
      engagement: totalEngagement,
      engagementRate: totalReach > 0 ? (totalEngagement / totalReach) * 100 : 0,
      conversions: totalConversions,
      revenue: totalRevenue,
      roi: totalSpent > 0 ? ((totalRevenue - totalSpent) / totalSpent) * 100 : 0,
    };
  }, [posts, campaigns, dateRange]);

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
            <BarChart2 className="w-6 h-6 text-green-600" />
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
            <p className="text-sm text-gray-500">ROI</p>
            <p className="mt-1 text-2xl font-semibold">
              {metrics.roi.toFixed(1)}%
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-full">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Conversions</span>
            <span className="font-medium text-gray-900">
              {metrics.conversions.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Revenue</span>
            <span className="font-medium text-gray-900">
              ${metrics.revenue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};