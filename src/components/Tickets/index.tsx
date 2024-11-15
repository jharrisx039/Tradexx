import React from 'react';
import { TicketTabs } from './TicketTabs';
import { TicketList } from './TicketList';
import { useTicketStore } from '../../store/tickets';

export const Tickets = () => {
  const [activeView, setActiveView] = React.useState<'all' | 'open' | 'inProgress' | 'resolved'>('all');
  const { tickets } = useTicketStore();

  const filteredTickets = React.useMemo(() => {
    if (activeView === 'all') return tickets;
    return tickets.filter(ticket => ticket.status === activeView);
  }, [tickets, activeView]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Support Tickets</h1>
        <p className="mt-2 text-gray-600">Manage and track support requests</p>
      </div>

      <TicketTabs activeView={activeView} onViewChange={setActiveView} ticketCounts={{
        all: tickets.length,
        open: tickets.filter(t => t.status === 'open').length,
        inProgress: tickets.filter(t => t.status === 'inProgress').length,
        resolved: tickets.filter(t => t.status === 'resolved').length,
      }} />
      
      <TicketList tickets={filteredTickets} />
    </div>
  );
};