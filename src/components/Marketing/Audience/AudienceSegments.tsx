import React from 'react';
import { Campaign } from '../../../store/marketing';
import { ProgressBar } from '../../ProgressBar';
import { Users, MapPin, Briefcase, Clock } from 'lucide-react';
import clsx from 'clsx';

interface AudienceSegmentsProps {
  campaigns: Campaign[];
}

export const AudienceSegments: React.FC<AudienceSegmentsProps> = ({ campaigns }) => {
  const segments = [
    {
      id: 'age',
      name: 'Age Distribution',
      icon: Users,
      data: [
        { label: '18-24', value: 25 },
        { label: '25-34', value: 40 },
        { label: '35-44', value: 20 },
        { label: '45+', value: 15 },
      ],
    },
    {
      id: 'location',
      name: 'Top Locations',
      icon: MapPin,
      data: [
        { label: 'United States', value: 45 },
        { label: 'United Kingdom', value: 20 },
        { label: 'Canada', value: 15 },
        { label: 'Australia', value: 10 },
      ],
    },
    {
      id: 'interests',
      name: 'Interests',
      icon: Briefcase,
      data: [
        { label: 'Technology', value: 35 },
        { label: 'Business', value: 30 },
        { label: 'Marketing', value: 20 },
        { label: 'Design', value: 15 },
      ],
    },
    {
      id: 'activity',
      name: 'Activity Time',
      icon: Clock,
      data: [
        { label: 'Morning', value: 30 },
        { label: 'Afternoon', value: 35 },
        { label: 'Evening', value: 25 },
        { label: 'Night', value: 10 },
      ],
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Audience Segments</h2>

      <div className="space-y-6">
        {segments.map(segment => {
          const Icon = segment.icon;
          
          return (
            <div key={segment.id}>
              <div className="flex items-center gap-2 mb-4">
                <Icon className="w-5 h-5 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-900">{segment.name}</h3>
              </div>

              <div className="space-y-3">
                {segment.data.map((item, index) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {item.value}%
                      </span>
                    </div>
                    <ProgressBar 
                      progress={item.value}
                      className="h-2 bg-gray-100"
                      barClassName={clsx(
                        segment.id === 'age' && 'bg-blue-600',
                        segment.id === 'location' && 'bg-green-600',
                        segment.id === 'interests' && 'bg-purple-600',
                        segment.id === 'activity' && 'bg-yellow-600'
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};