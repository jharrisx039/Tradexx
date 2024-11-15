import React from 'react';
import { Campaign } from '../../../store/marketing';
import { ProgressBar } from '../../ProgressBar';
import { TrendingUp, DollarSign } from 'lucide-react';
import clsx from 'clsx';

interface CampaignMetricsProps {
  campaigns: Campaign[];
}

export const CampaignMetrics: React.FC<CampaignMetricsProps> = ({ campaigns }) => {
  const activeCampaigns = campaigns.filter(c => c.status === 'active');

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Active Campaigns</h2>

      <div className="space-y-6">
        {activeCampaigns.map(campaign => {
          const progress = (campaign.spent / campaign.budget) * 100;
          const roi = campaign.metrics.roi;

          return (
            <div key={campaign.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{campaign.name}</h3>
                  <p className="text-sm text-gray-500">{campaign.description}</p>
                </div>
                <span className={clsx(
                  'inline-flex items-center gap-1 text-sm font-medium',
                  roi >= 0 ? 'text-green-600' : 'text-red-600'
                )}>
                  <TrendingUp className="h-4 w-4" />
                  {roi}% ROI
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-500">
                  <DollarSign className="h-4 w-4" />
                  <span>
                    ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                  </span>
                </div>
                <span className="text-gray-500">
                  {progress.toFixed(1)}% spent
                </span>
              </div>

              <ProgressBar 
                progress={progress} 
                className="h-2 bg-gray-100"
                barClassName={clsx(
                  progress > 90 ? 'bg-red-600' :
                  progress > 75 ? 'bg-yellow-600' :
                  'bg-blue-600'
                )}
              />

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <p className="text-xs text-gray-500">Reach</p>
                  <p className="text-sm font-medium text-gray-900">
                    {campaign.metrics.reach.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Engagement</p>
                  <p className="text-sm font-medium text-gray-900">
                    {campaign.metrics.engagement.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Conversions</p>
                  <p className="text-sm font-medium text-gray-900">
                    {campaign.metrics.conversions.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};