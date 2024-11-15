import React from 'react';
import { Clock, MessageSquare, User, ChevronRight } from 'lucide-react';
import { Ticket } from '../../store/tickets';
import { TicketDetails } from './TicketDetails';
import clsx from 'clsx';

interface TicketCardProps {
  ticket: Ticket;
}

const priorityColors = {
  low: 'bg-gray-50 text-gray-700 ring-gray-600/20',
  medium: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  high: 'bg-red-50 text-red-700 ring-red-600/20',
};

const statusColors = {
  open: 'bg-blue-50 text-blue-700',
  inProgress: 'bg-yellow-50 text-yellow-700',
  resolved: 'bg-green-50 text-green-700',
};

export const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:border-blue-300 transition-colors"
        onClick={() => setIsDetailsOpen(true)}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-gray-900">{ticket.title}</h3>
            <p className="text-sm text-gray-500">{ticket.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={clsx(
              'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
              priorityColors[ticket.priority]
            )}>
              {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
            </span>
            <span className={clsx(
              'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
              statusColors[ticket.status]
            )}>
              {ticket.status === 'inProgress' ? 'In Progress' : 
               ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
            </span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{ticket.assignee || 'Unassigned'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>{ticket.comments.length} comments</span>
          </div>
        </div>
      </div>

      <TicketDetails
        ticket={ticket}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </>
  );
};