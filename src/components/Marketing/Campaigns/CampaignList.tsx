import React from 'react';
import { format, parseISO } from 'date-fns';
import { BarChart2, DollarSign, TrendingUp, MoreHorizontal } from 'lucide-react';
import { Campaign } from '../../../store/marketing';
import { ProgressBar } from '../../ProgressBar';
import clsx from 'clsx';

interface CampaignListProps {
  campaigns: Campaign[];
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  paused: 'bg-yellow-100 text-yellow-800',
};

export const CampaignList: React.FC<CampaignListProps> = ({ campaigns }) => {
  const sortedCampaigns = [...campaigns].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timeline
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCampaigns.map(campaign => {
              const progress = (campaign.spent / campaign.budget) * 100;
              
              return (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {campaign.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {campaign.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      statusColors[campaign.status as keyof typeof statusColors]
                    )}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="font-medium text-gray-900">
                          ${campaign.spent.toLocaleString()}
                        </span>
                        <span className="text-gray-500 ml-1">
                          / ${campaign.budget.toLocaleString()}
                        </span>
                      </div>
                      <ProgressBar 
                        progress={progress}
                        className="h-1 bg-gray-100"
                        barClassName={clsx(
                          progress > 90 ? 'bg-red-500' :
                          progress > 75 ? 'bg-yellow-500' :
                          'bg-blue-500'
                        )}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">ROI</span>
                        <span className={clsx(
                          'font-medium',
                          campaign.metrics.roi >= 0 ? 'text-green-600' : 'text-red-600'
                        )}>
                          {campaign.metrics.roi}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Conversions</span>
                        <span className="font-medium text-gray-900">
                          {campaign.metrics.conversions.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(parseISO(campaign.startDate), 'MMM d, yyyy')}
                    </div>
                    <div className="text-sm text-gray-500">
                      to {format(parseISO(campaign.endDate), 'MMM d, yyyy')}
                    </div>
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