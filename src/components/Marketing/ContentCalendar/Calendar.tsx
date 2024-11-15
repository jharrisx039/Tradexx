import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ContentPiece } from '../../../store/marketing';
import clsx from 'clsx';

interface CalendarProps {
  content: ContentPiece[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  content,
  selectedDate,
  onSelectDate,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(startOfMonth(selectedDate));

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getContentForDate = (date: Date) => {
    return content.filter(piece => {
      if (!piece.scheduledFor) return false;
      return isSameDay(parseISO(piece.scheduledFor), date);
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
          const dayContent = getContentForDate(day);
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
                {dayContent.map(piece => (
                  <div
                    key={piece.id}
                    className={clsx(
                      'px-2 py-1 text-xs rounded-lg truncate',
                      piece.type === 'post' && 'bg-blue-100 text-blue-800',
                      piece.type === 'story' && 'bg-pink-100 text-pink-800',
                      piece.type === 'reel' && 'bg-purple-100 text-purple-800',
                      piece.type === 'article' && 'bg-green-100 text-green-800',
                      piece.type === 'video' && 'bg-red-100 text-red-800'
                    )}
                  >
                    {piece.title}
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