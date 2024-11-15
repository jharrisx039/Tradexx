import React from 'react';
import { CampaignList } from './CampaignList';
import { CampaignForm } from './CampaignForm';
import { CampaignMetrics } from './CampaignMetrics';
import { useMarketingStore } from '../../../store/marketing';
import { Plus, Search, Filter } from 'lucide-react';

export const Campaigns = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState('all');
  const { campaigns } = useMarketingStore();

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CampaignMetrics campaigns={campaigns} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
          </select>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Create Campaign
        </button>
      </div>

      <CampaignList campaigns={filteredCampaigns} />

      {showForm && (
        <CampaignForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};