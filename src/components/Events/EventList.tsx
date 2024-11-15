import React from 'react';
import { format, parseISO } from 'date-fns';
import { MapPin, Users, Clock, MoreHorizontal } from 'lucide-react';
import { Event } from '../../store/events';
import clsx from 'clsx';

interface EventListProps {
  events: Event[];
}

const typeColors = {
  meeting: 'bg-blue-100 text-blue-800',
  conference: 'bg-purple-100 text-purple-800',
  training: 'bg-green-100 text-green-800',
  social: 'bg-pink-100 text-pink-800',
  holiday: 'bg-yellow-100 text-yellow-800',
};

const statusColors = {
  upcoming: 'bg-blue-100 text-blue-800',
  ongoing: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

export const EventList: React.FC<EventListProps> = ({ events }) => {
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedEvents.map(event => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {event.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {event.description}
                      </div>
                      {event.attendees.length > 0 && (
                        <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees.length} attendees</span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={clsx(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    typeColors[event.type as keyof typeof typeColors]
                  )}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-sm text-gray-900">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div>
                      <div>{format(parseISO(event.startDate), 'MMM d, yyyy')}</div>
                      <div className="text-gray-500">
                        {format(parseISO(event.startDate), 'h:mm a')} - 
                        {format(parseISO(event.endDate), 'h:mm a')}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-sm text-gray-900">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={clsx(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    statusColors[event.status as keyof typeof statusColors]
                  )}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};