import React from 'react';
import { format } from 'date-fns';
import { Timeline } from './Timeline';
import { FileCarousel } from './FileCarousel';
import { X, MessageSquare, ChevronLeft, Clock, User, Flag } from 'lucide-react';
import clsx from 'clsx';

interface TimelineEvent {
  id: string;
  type: 'created' | 'comment' | 'status' | 'priority' | 'file' | 'assigned';
  description: string;
  content?: string;
  timestamp: string;
  user?: string;
}

interface TicketDetailsProps {
  ticket: any;
  isOpen: boolean;
  onClose: () => void;
}

export const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket, isOpen, onClose }) => {
  const [showChatHistory, setShowChatHistory] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState<string | null>(null);
  const [showActionDropdown, setShowActionDropdown] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [editingEventId, setEditingEventId] = React.useState<string | null>(null);
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  const [events, setEvents] = React.useState<TimelineEvent[]>([
    {
      id: '1',
      type: 'created',
      description: 'Ticket created',
      timestamp: ticket.createdAt,
    },
    ...ticket.comments.map((comment: any) => ({
      id: comment.id,
      type: 'comment',
      description: `Comment by ${comment.author}`,
      content: comment.text,
      timestamp: comment.createdAt,
      user: comment.author,
    })),
  ]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && selectedAction !== 'file') return;

    const newEvent: TimelineEvent = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      user: 'Current User',
      type: selectedAction as TimelineEvent['type'],
      description: '',
      content: inputValue,
    };

    switch (selectedAction) {
      case 'comment':
        newEvent.description = 'Added a comment';
        break;
      case 'status':
        newEvent.description = `Updated status to ${inputValue}`;
        break;
      case 'priority':
        newEvent.description = `Changed priority to ${inputValue}`;
        break;
      case 'file':
        newEvent.description = 'Uploaded new files';
        break;
    }

    setEvents(prev => [...prev, newEvent]);
    setSelectedAction(null);
    setInputValue('');
    setShowActionDropdown(false);
  };

  return (
    <div
      ref={sidebarRef}
      className={clsx(
        'fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            {showChatHistory ? (
              <button
                onClick={() => setShowChatHistory(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => setShowChatHistory(true)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <MessageSquare className="h-5 w-5" />
              </button>
            )}
            <h2 className="text-lg font-semibold text-gray-900">
              {showChatHistory ? 'Chat History' : 'Ticket Details'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {showChatHistory ? (
            <div className="p-4">
              {ticket.chatHistory && ticket.chatHistory.length > 0 ? (
                ticket.chatHistory.map((message: any) => (
                  <div
                    key={message.timestamp}
                    className={clsx(
                      'p-3 rounded-lg mb-2',
                      message.isHighlighted ? 'bg-red-100' : 'bg-gray-100'
                    )}
                  >
                    <p className="text-sm font-medium text-gray-900">{message.sender}</p>
                    <p className="text-sm text-gray-700">{message.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(new Date(message.timestamp), 'MMM d, h:mm a')}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No chat history available for this ticket
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="text-sm font-medium text-gray-900">{ticket.status}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Priority</p>
                  <p className="text-sm font-medium text-gray-900">{ticket.priority}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(ticket.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(ticket.updatedAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>

              {ticket.attachments && ticket.attachments.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments</h4>
                  <FileCarousel files={ticket.attachments} />
                </div>
              )}

              <Timeline
                events={events}
                onEdit={setEditingEventId}
                editingEventId={editingEventId}
              />
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <div className="relative">
            <button
              onClick={() => setShowActionDropdown(!showActionDropdown)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {selectedAction ? selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1) : 'Select action...'}
            </button>
            
            {showActionDropdown && (
              <div className="absolute bottom-full left-0 w-full mb-1 bg-white rounded-lg shadow-lg border border-gray-200">
                <button
                  onClick={() => {
                    setSelectedAction('comment');
                    setShowActionDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Add Comment
                </button>
                <button
                  onClick={() => {
                    setSelectedAction('status');
                    setShowActionDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Update Status
                </button>
                <button
                  onClick={() => {
                    setSelectedAction('priority');
                    setShowActionDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Change Priority
                </button>
                <button
                  onClick={() => {
                    setSelectedAction('file');
                    setShowActionDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Upload Files
                </button>
              </div>
            )}
          </div>

          {selectedAction && (
            <form onSubmit={handleActionSubmit} className="mt-2">
              {selectedAction === 'status' && (
                <select
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select status...</option>
                  <option value="open">Open</option>
                  <option value="inProgress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              )}

              {selectedAction === 'priority' && (
                <select
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select priority...</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              )}

              {selectedAction === 'comment' && (
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your comment..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  rows={3}
                />
              )}

              {selectedAction === 'file' && (
                <input
                  type="file"
                  multiple
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              )}

              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAction(null);
                    setInputValue('');
                  }}
                  className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};