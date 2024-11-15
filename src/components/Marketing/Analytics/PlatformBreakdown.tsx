import React from 'react';
import { SocialPost } from '../../../store/marketing';
import { ProgressBar } from '../../ProgressBar';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import clsx from 'clsx';

interface PlatformBreakdownProps {
  posts: SocialPost[];
  dateRange: string;
}

interface PlatformMetrics {
  reach: number;
  engagement: number;
  engagementRate: number;
  posts: number;
}

export const PlatformBreakdown: React.FC<PlatformBreakdownProps> = ({ posts }) => {
  const metrics = React.useMemo(() => {
    const platforms = {
      facebook: { reach: 0, engagement: 0, posts: 0 },
      instagram: { reach: 0, engagement: 0, posts: 0 },
      twitter: { reach: 0, engagement: 0, posts: 0 },
      linkedin: { reach: 0, engagement: 0, posts: 0 },
    } as Record<string, PlatformMetrics>;

    posts.forEach(post => {
      if (!platforms[post.platform]) return;
      
      platforms[post.platform].posts += 1;
      if (post.performance) {
        platforms[post.platform].reach += post.performance.reach;
        platforms[post.platform].engagement += post.performance.engagement;
      }
    });

    // Calculate engagement rates
    Object.keys(platforms).forEach(platform => {
      platforms[platform].engagementRate = platforms[platform].reach > 0
        ? (platforms[platform].engagement / platforms[platform].reach) * 100
        : 0;
    });

    return platforms;
  }, [posts]);

  const platformIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
  };

  const platformColors = {
    facebook: 'text-blue-600 bg-blue-100',
    instagram: 'text-pink-600 bg-pink-100',
    twitter: 'text-blue-400 bg-blue-50',
    linkedin: 'text-blue-700 bg-blue-100',
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Platform Performance</h2>

      <div className="space-y-6">
        {Object.entries(metrics).map(([platform, data]) => {
          const Icon = platformIcons[platform as keyof typeof platformIcons];
          const colorClass = platformColors[platform as keyof typeof platformColors];
          
          return (
            <div key={platform}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={clsx('p-2 rounded-lg', colorClass)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {data.posts} posts
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {data.engagementRate.toFixed(1)}% engagement
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Reach</span>
                  <span className="text-gray-900">{data.reach.toLocaleString()}</span>
                </div>
                <ProgressBar 
                  progress={data.engagementRate}
                  className="h-1 bg-gray-100"
                  barClassName={clsx(
                    platform === 'facebook' && 'bg-blue-600',
                    platform === 'instagram' && 'bg-pink-600',
                    platform === 'twitter' && 'bg-blue-400',
                    platform === 'linkedin' && 'bg-blue-700'
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};