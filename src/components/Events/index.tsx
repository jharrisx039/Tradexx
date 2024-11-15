import React from 'react';
import { Calendar } from './Calendar';
import { EventList } from './EventList';
import { EventMetrics } from './EventMetrics';
import { useEventStore } from '../../store/events';
import { Plus, Search, Filter, Calendar as CalendarIcon } from 'lucide-react';

export const Events = () => {
  const [view, setView] = React.useState<'calendar' | 'list'>('calendar');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showForm, setShowForm] = React.useState(false);
  const { events } = useEventStore();

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
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EventMetrics events={events} />
      </div>

      {view === 'calendar' ? (
        <Calendar 
          events={events}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      ) : (
        <EventList events={events} />
      )}
    </div>
  );
};