import React from 'react';
import { BookOpen, FileText, BarChart2 } from 'lucide-react';
import clsx from 'clsx';

interface AccountingTabsProps {
  activeTab: 'chart' | 'journal' | 'statements';
  onTabChange: (tab: 'chart' | 'journal' | 'statements') => void;
}

export const AccountingTabs: React.FC<AccountingTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => onTabChange('chart')}
          className={clsx(
            'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
            activeTab === 'chart'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          )}
        >
          <BookOpen
            className={clsx(
              'mr-3 h-5 w-5',
              activeTab === 'chart' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
            )}
          />
          Chart of Accounts
        </button>

        <button
          onClick={() => onTabChange('journal')}
          className={clsx(
            'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
            activeTab === 'journal'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          )}
        >
          <FileText
            className={clsx(
              'mr-3 h-5 w-5',
              activeTab === 'journal' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
            )}
          />
          Journal Entries
        </button>

        <button
          onClick={() => onTabChange('statements')}
          className={clsx(
            'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
            activeTab === 'statements'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          )}
        >
          <BarChart2
            className={clsx(
              'mr-3 h-5 w-5',
              activeTab === 'statements' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
            )}
          />
          Financial Statements
        </button>
      </nav>
    </div>
  );
};