import React from 'react';
import { Calendar } from './Calendar';
import { ContentList } from './ContentList';
import { useMarketingStore } from '../../../store/marketing';
import { Plus, Search, Filter } from 'lucide-react';

export const ContentCalendar = () => {
  const [view, setView] = React.useState<'calendar' | 'list'>('calendar');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const { content } = useMarketingStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={view}
            onChange={(e) => setView(e.target.value as 'calendar' | 'list')}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="calendar">Calendar View</option>
            <option value="list">List View</option>
          </select>

          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
              className="pl-10 w-full rounded-lg border border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Create Content
        </button>
      </div>

      {view === 'calendar' ? (
        <Calendar 
          content={content}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      ) : (
        <ContentList content={content} />
      )}
    </div>
  );
};