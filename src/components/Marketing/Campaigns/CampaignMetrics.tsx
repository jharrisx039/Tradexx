import React from 'react';
import { Campaign } from '../../../store/marketing';
import { ProgressBar } from '../../ProgressBar';
import { DollarSign, TrendingUp, Users } from 'lucide-react';

interface CampaignMetricsProps {
  campaigns: Campaign[];
}

export const CampaignMetrics: React.FC<CampaignMetricsProps> = ({ campaigns }) => {
  const metrics = React.useMemo(() => {
    const activeCampaigns = campaigns.filter(c => c.status === 'active');
    const totalBudget = activeCampaigns.reduce((acc, c) => acc + c.budget, 0);
    const totalSpent = activeCampaigns.reduce((acc, c) => acc + c.spent, 0);
    const totalReach = activeCampaigns.reduce((acc, c) => acc + c.metrics.reach, 0);
    const totalConversions = activeCampaigns.reduce((acc, c) => acc + c.metrics.conversions, 0);
    const averageRoi = activeCampaigns.length > 0
      ? activeCampaigns.reduce((acc, c) => acc + c.metrics.roi, 0) / activeCampaigns.length
      : 0;

    return {
      totalBudget,
      totalSpent,
      spentPercentage: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0,
      totalReach,
      totalConversions,
      averageRoi,
      activeCampaignCount: activeCampaigns.length,
    };
  }, [campaigns]);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Budget</p>
            <p className="mt-1 text-2xl font-semibold">
              ${metrics.totalBudget.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={metrics.spentPercentage} 
            className="h-2 bg-gray-100"
            barClassName="bg-blue-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            ${metrics.totalSpent.toLocaleString()} spent ({Math.round(metrics.spentPercentage)}%)
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Average ROI</p>
            <p className="mt-1 text-2xl font-semibold">
              {metrics.averageRoi.toFixed(1)}%
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={Math.max(0, metrics.averageRoi)} 
            className="h-2 bg-gray-100"
            barClassName="bg-green-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            Across {metrics.activeCampaignCount} active campaigns
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Reach</p>
            <p className="mt-1 text-2xl font-semibold">
              {metrics.totalReach.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-full">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Conversions</span>
            <span className="font-medium text-gray-900">
              {metrics.totalConversions.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Conversion Rate</span>
            <span className="font-medium text-gray-900">
              {metrics.totalReach > 0
                ? ((metrics.totalConversions / metrics.totalReach) * 100).toFixed(1)
                : '0'}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
};