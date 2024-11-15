import React from 'react';
import { Database, List, Truck, Bell } from 'lucide-react';
import clsx from 'clsx';

interface WarehouseNavProps {
  activeSection?: string;
  onSectionChange: (section: string) => void;
}

export const WarehouseNav: React.FC<WarehouseNavProps> = ({ 
  activeSection = 'master',
  onSectionChange 
}) => {
  const tabs = [
    { id: 'master', label: 'Master', icon: Database },
    { id: 'list', label: 'Warehouse', icon: List },
    { id: 'tracking', label: 'Tracking', icon: Truck },
    { id: 'alerts', label: 'Pre Alerts', icon: Bell },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onSectionChange(tab.id)}
              className={clsx(
                'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
                activeSection === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <Icon
                className={clsx(
                  'mr-3 h-5 w-5',
                  activeSection === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                )}
              />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};