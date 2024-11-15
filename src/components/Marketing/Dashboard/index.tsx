import React from 'react';
import { SocialMetrics } from './SocialMetrics';
import { CampaignMetrics } from './CampaignMetrics';
import { ContentOverview } from './ContentOverview';
import { useMarketingStore } from '../../../store/marketing';

export const MarketingDashboard = () => {
  const { posts, campaigns, content } = useMarketingStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SocialMetrics posts={posts} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CampaignMetrics campaigns={campaigns} />
        <ContentOverview content={content} />
      </div>
    </div>
  );
};