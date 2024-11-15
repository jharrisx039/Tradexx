import React from 'react';
import { Filter } from 'lucide-react';
import { Task } from '../types';

interface TaskFiltersProps {
  priorityFilter: string;
  setPriorityFilter: (filter: string) => void;
  sortOrder: 'priority' | 'custom';
  setSortOrder: (order: 'priority' | 'custom') => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  priorityFilter,
  setPriorityFilter,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="mb-6 flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2">
        <Filter size={18} className="text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>
      
      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
        className="rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        <option value="all">All Priorities</option>
        <option value="urgent">Urgent</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'priority' | 'custom')}
          className="rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="priority">Priority</option>
          <option value="custom">Custom</option>
        </select>
      </div>
    </div>
  );
};