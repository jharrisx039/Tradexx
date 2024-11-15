import React from 'react';
import { Flag } from 'lucide-react';

interface PriorityDropdownProps {
  priority: string;
  onChange: (priority: 'low' | 'medium' | 'high' | 'urgent') => void;
}

const priorityColors = {
  low: 'text-gray-500',
  medium: 'text-blue-500',
  high: 'text-orange-500',
  urgent: 'text-red-500',
};

export const PriorityDropdown: React.FC<PriorityDropdownProps> = ({
  priority,
  onChange,
}) => {
  return (
    <div className="relative inline-block">
      <select
        value={priority}
        onChange={(e) => onChange(e.target.value as 'low' | 'medium' | 'high' | 'urgent')}
        className="appearance-none bg-transparent pr-8 pl-7 py-1 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
      <Flag className={`absolute left-2 top-2.5 w-4 h-4 ${priorityColors[priority as keyof typeof priorityColors]}`} />
    </div>
  );
};