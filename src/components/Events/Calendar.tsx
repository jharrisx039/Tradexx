import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Users, MapPin } from 'lucide-react';
import { Event } from '../../store/events';
import clsx from 'clsx';

interface CalendarProps {
  events: Event[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const typeColors = {
  meeting: 'bg-blue-100 text-blue-800',
  conference: 'bg-purple-100 text-purple-800',
  training: 'bg-green-100 text-green-800',
  social: 'bg-pink-100 text-pink-800',
  holiday: 'bg-yellow-100 text-yellow-800',
};

export const Calendar: React.FC<CalendarProps> = ({
  events,
  selectedDate,
  onSelectDate,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(startOfMonth(selectedDate));

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const startDate = parseISO(event.startDate);
      const endDate = parseISO(event.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-50 py-2 text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}

        {days.map(day => {
          const dayEvents = getEventsForDate(day);
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentMonth);

          return (
            <div
              key={day.toISOString()}
              onClick={() => onSelectDate(day)}
              className={clsx(
                'min-h-32 bg-white p-2 hover:bg-gray-50 cursor-pointer',
                !isCurrentMonth && 'text-gray-400',
                isSelected && 'bg-blue-50'
              )}
            >
              <p className={clsx(
                'text-sm font-medium',
                isSelected ? 'text-blue-600' : 'text-gray-900'
              )}>
                {format(day, 'd')}
              </p>

              <div className="mt-1 space-y-1">
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    className={clsx(
                      'px-2 py-1 text-xs rounded-lg',
                      typeColors[event.type as keyof typeof typeColors]
                    )}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 opacity-75" />
                      <span className="truncate opacity-75">{event.location}</span>
                    </div>
                    {event.attendees.length > 0 && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <Users className="h-3 w-3 opacity-75" />
                        <span className="opacity-75">{event.attendees.length}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};