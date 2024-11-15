import React from 'react';
import { Calendar, Users, Clock } from 'lucide-react';
import { Event } from '../../store/events';
import { ProgressBar } from '../ProgressBar';

interface EventMetricsProps {
  events: Event[];
}

export const EventMetrics: React.FC<EventMetricsProps> = ({ events }) => {
  const metrics = React.useMemo(() => {
    const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
    const ongoingEvents = events.filter(e => e.status === 'ongoing').length;
    const totalAttendees = events.reduce((acc, e) => acc + e.attendees.length, 0);
    const publicEvents = events.filter(e => e.isPublic).length;

    return {
      upcomingEvents,
      ongoingEvents,
      totalAttendees,
      publicEvents,
      publicPercentage: (publicEvents / events.length) * 100 || 0,
    };
  }, [events]);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Upcoming Events</p>
            <p className="mt-1 text-2xl font-semibold">
              {metrics.upcomingEvents}
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={75} 
            className="h-2 bg-gray-100"
            barClassName="bg-blue-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            {metrics.ongoingEvents} events in progress
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Attendees</p>
            <p className="mt-1 text-2xl font-semibold">
              {metrics.totalAttendees}
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <Users className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={85} 
            className="h-2 bg-gray-100"
            barClassName="bg-green-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            85% attendance rate
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Public Events</p>
            <p className="mt-1 text-2xl font-semibold">
              {metrics.publicEvents}
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-full">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={metrics.publicPercentage} 
            className="h-2 bg-gray-100"
            barClassName="bg-purple-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            {metrics.publicPercentage.toFixed(1)}% of total events
          </p>
        </div>
      </div>
    </>
  );
};