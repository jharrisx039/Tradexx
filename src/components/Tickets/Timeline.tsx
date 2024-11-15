import React from 'react';
import { format } from 'date-fns';
import { 
  MessageSquare, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  User,
  Pencil,
  FileText,
  Upload,
  Flag
} from 'lucide-react';
import clsx from 'clsx';

interface TimelineEvent {
  id: string;
  type: 'created' | 'comment' | 'status' | 'priority' | 'file' | 'assigned';
  description: string;
  content?: string;
  timestamp: string;
  user?: string;
}

const getEventIcon = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'created':
      return Clock;
    case 'comment':
      return MessageSquare;
    case 'status':
      return CheckCircle;
    case 'priority':
      return Flag;
    case 'file':
      return Upload;
    case 'assigned':
      return User;
    default:
      return FileText;
  }
};

const getEventColor = (type: TimelineEvent['type']) => {
  switch (type) {
    case 'created':
      return 'bg-gray-500 text-white';
    case 'comment':
      return 'bg-blue-500 text-white';
    case 'status':
      return 'bg-green-500 text-white';
    case 'priority':
      return 'bg-yellow-500 text-white';
    case 'file':
      return 'bg-purple-500 text-white';
    case 'assigned':
      return 'bg-indigo-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

interface TimelineProps {
  events: TimelineEvent[];
  onEdit?: (eventId: string) => void;
  editingEventId?: string | null;
}

export const Timeline: React.FC<TimelineProps> = ({ events, onEdit, editingEventId }) => {
  const isEventEditable = (event: TimelineEvent) => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return new Date(event.timestamp) > fiveMinutesAgo;
  };

  return (
    <div className="flow-root">
      <h4 className="text-sm font-medium text-gray-900 mb-4">Activity Timeline</h4>
      <ul className="-mb-8">
        {events.map((event, eventIdx) => {
          const Icon = getEventIcon(event.type);
          const isEditable = isEventEditable(event);
          const isEditing = editingEventId === event.id;

          return (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== events.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={clsx(
                        'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                        getEventColor(event.type)
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">{event.description}</p>
                      {event.content && (
                        <div className="mt-1 group relative">
                          <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                            {event.content}
                          </p>
                          {isEditable && !isEditing && (
                            <button
                              onClick={() => onEdit?.(event.id)}
                              className="absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-200"
                            >
                              <Pencil className="h-4 w-4 text-gray-500" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      <time dateTime={event.timestamp}>
                        {format(new Date(event.timestamp), 'MMM d, h:mm a')}
                      </time>
                      {event.user && (
                        <div className="flex items-center gap-1 mt-1 text-gray-400">
                          <User className="h-3 w-3" />
                          <span className="text-xs">{event.user}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};