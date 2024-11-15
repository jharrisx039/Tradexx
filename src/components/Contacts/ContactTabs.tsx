import React from 'react';
import { Users, Building } from 'lucide-react';
import clsx from 'clsx';

interface ContactTabsProps {
  activeTab: 'customers' | 'vendors';
  onTabChange: (tab: 'customers' | 'vendors') => void;
}

export const ContactTabs: React.FC<ContactTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => onTabChange('customers')}
          className={clsx(
            'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
            activeTab === 'customers'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          )}
        >
          <Users
            className={clsx(
              'mr-3 h-5 w-5',
              activeTab === 'customers' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
            )}
          />
          Customers
        </button>

        <button
          onClick={() => onTabChange('vendors')}
          className={clsx(
            'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
            activeTab === 'vendors'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          )}
        >
          <Building
            className={clsx(
              'mr-3 h-5 w-5',
              activeTab === 'vendors' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
            )}
          />
          Vendors
        </button>
      </nav>
    </div>
  );
};