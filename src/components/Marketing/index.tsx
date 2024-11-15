import React from 'react';
import { MarketingDashboard } from './Dashboard';
import { ContentCalendar } from './ContentCalendar';
import { SocialMedia } from './SocialMedia';
import { Campaigns } from './Campaigns';
import { Analytics } from './Analytics';
import { Audience } from './Audience';
import { BrandAssets } from './BrandAssets';
import { Automation } from './Automation';

interface MarketingProps {
  section: string;
}

export const Marketing: React.FC<MarketingProps> = ({ section }) => {
  const renderSection = () => {
    const sectionName = section.split('/')[1];
    
    switch (sectionName) {
      case 'dashboard':
        return <MarketingDashboard />;
      case 'calendar':
        return <ContentCalendar />;
      case 'social':
        return <SocialMedia />;
      case 'campaigns':
        return <Campaigns />;
      case 'analytics':
        return <Analytics />;
      case 'audience':
        return <Audience />;
      case 'assets':
        return <BrandAssets />;
      case 'automation':
        return <Automation />;
      default:
        return <MarketingDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Marketing</h1>
        <p className="mt-2 text-gray-600">Manage your marketing campaigns and social media presence</p>
      </div>
      {renderSection()}
    </div>
  );
};