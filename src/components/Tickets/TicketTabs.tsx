import React from 'react';
import { Inbox, Clock, CheckCircle2, LayoutList } from 'lucide-react';
import clsx from 'clsx';

interface TicketTabsProps {
  activeView: 'all' | 'open' | 'inProgress' | 'resolved';
  onViewChange: (view: 'all' | 'open' | 'inProgress' | 'resolved') => void;
  ticketCounts: {
    all: number;
    open: number;
    inProgress: number;
    resolved: number;
  };
}

export const TicketTabs: React.FC<TicketTabsProps> = ({ activeView, onViewChange, ticketCounts }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => onViewChange('all')}
          className={clsx(
            'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
            activeView === 'all'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          )}
        >
          <LayoutList
            className={clsx(
              'mr-3 h-5 w-5',
              activeView === 'all' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
            )}
          />
          All
          <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {ticketCounts.all}
          </span>
        </button>

        <button
          onClick={() => onViewChange('open')}
          className={clsx(
            'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
            activeView === 'open'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          )}
        >
          <Inbox
            className={clsx(
              'mr-3 h-5 w-5',
              activeView === 'open' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
            )}
          />
          Open
          <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {ticketCounts.open}
          </span>
        </button>

        <button
          onClick={() => onViewChange('inProgress')}
          className={clsx(
            'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
            activeView === 'inProgress'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          )}
        >
          <Clock
            className={clsx(
              'mr-3 h-5 w-5',
              activeView === 'inProgress' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
            )}
          />
          In Progress
          <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {ticketCounts.inProgress}
          </span>
        </button>

        <button
          onClick={() => onViewChange('resolved')}
          className={clsx(
            'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
            activeView === 'resolved'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          )}
        >
          <CheckCircle2
            className={clsx(
              'mr-3 h-5 w-5',
              activeView === 'resolved' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
            )}
          />
          Resolved
          <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            {ticketCounts.resolved}
          </span>
        </button>
      </nav>
    </div>
  );
};